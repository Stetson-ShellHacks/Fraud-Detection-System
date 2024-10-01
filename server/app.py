from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import io

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Load the trained model
model = joblib.load('fraud_detection_model.joblib')

@app.route('/')
def home():
    return "Fraud Detection API is running!"

@app.route('/api/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file:
        # Read the CSV file
        df = pd.read_csv(io.StringIO(file.stream.read().decode("UTF8")), delimiter=",")
        df['balanceOrig_change'] = df['newbalanceOrig'] - df['oldbalanceOrg']
        df['balanceDest_change'] = df['newbalanceDest'] - df['oldbalanceDest']
        df['amount_log'] = np.log1p(df['amount'])
        
        # Select features (adjust based on your model)
        features = ['type', 'amount', 'amount_log', 'oldbalanceOrg', 'newbalanceOrig', 
                    'oldbalanceDest', 'newbalanceDest', 'balanceOrig_change', 'balanceDest_change']
        X = df[features]
        
        # Make predictions
        predictions = model.predict(X)
        probabilities = model.predict_proba(X)[:, 1]  
        
        # Prepare results
        results = []
        for i, (pred, prob) in enumerate(zip(predictions, probabilities)):
            results.append({
                "id": i,
                "prediction": int(pred),
                "probability": float(prob),
                **df.iloc[i].to_dict() 
            })
        return jsonify(results)

    return jsonify({"error": "Something went wrong"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000)