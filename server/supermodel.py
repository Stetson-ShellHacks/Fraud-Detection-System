import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.impute import SimpleImputer
from sklearn.utils.class_weight import compute_class_weight
import joblib
import os
import sys
from rich.progress import Progress, SpinnerColumn, BarColumn, TextColumn
from rich.console import Console

console = Console()

def load_and_preprocess_data(file_path):
    try:
        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            BarColumn(),
            TextColumn("[progress.percentage]{task.percentage:>3.0f}%"),
        ) as progress:
            task = progress.add_task("[green]Loading data...", total=100)
            
            # Load the CSV file
            df = pd.read_csv(file_path, encoding='utf-8')
            progress.update(task, advance=50)
            
            console.print(f"Successfully loaded {file_path}")
            console.print(f"Columns found: {', '.join(df.columns)}")
            console.print(f"Number of rows: {len(df)}")
            
            # Convert amount to float (if not already)
            df['amount'] = df['amount'].astype(float)
            
            # Create log-transformed amount feature
            df['amount_log'] = np.log1p(df['amount'])
            
            # Calculate balance changes
            df['balanceOrig_change'] = df['newbalanceOrig'] - df['oldbalanceOrg']
            df['balanceDest_change'] = df['newbalanceDest'] - df['oldbalanceDest']
            
            progress.update(task, advance=50)
        
        return df
    except Exception as e:
        console.print(f"[red]An error occurred while loading or preprocessing the data: {str(e)}")
        console.print(f"[red]Error occurred at line: {sys.exc_info()[-1].tb_lineno}")
        return None

def train_model(X, y):
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        TextColumn("[progress.percentage]{task.percentage:>3.0f}%"),
    ) as progress:
        task = progress.add_task("[green]Training model...", total=100)
        
        # Split the data with 70% for training and 30% for testing
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
        progress.update(task, advance=10)
        
        # Define features
        numeric_features = ['amount', 'amount_log', 'oldbalanceOrg', 'newbalanceOrig', 
                            'oldbalanceDest', 'newbalanceDest', 'balanceOrig_change', 'balanceDest_change']
        categorical_features = ['type']
        
        # Create preprocessing steps
        preprocessor = ColumnTransformer(
            transformers=[
                ('num', Pipeline([
                    ('imputer', SimpleImputer(strategy='median')),
                    ('scaler', StandardScaler())
                ]), numeric_features),
                ('cat', Pipeline([
                    ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
                    ('onehot', OneHotEncoder(handle_unknown='ignore'))
                ]), categorical_features)
            ])
        progress.update(task, advance=20)
        
        # Calculate class weights
        class_weights = compute_class_weight('balanced', classes=np.unique(y), y=y)
        class_weight_dict = dict(zip(np.unique(y), class_weights))
        
        # Create a pipeline
        clf = Pipeline([
            ('preprocessor', preprocessor),
            ('classifier', RandomForestClassifier(n_estimators=100, random_state=42, class_weight=class_weight_dict))
        ])
        progress.update(task, advance=20)
        
        # Fit the model
        clf.fit(X_train, y_train)
        progress.update(task, advance=40)
        
        # Evaluate the model
        y_pred = clf.predict(X_test)
        progress.update(task, advance=10)
    
    console.print("[bold green]Classification Report:")
    console.print(classification_report(y_test, y_pred))
    console.print("[bold green]Confusion Matrix:")
    console.print(confusion_matrix(y_test, y_pred))
    
    return clf, X_test, y_test

def save_model(model, file_path):
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        TextColumn("[progress.percentage]{task.percentage:>3.0f}%"),
    ) as progress:
        task = progress.add_task("[green]Saving model...", total=100)
        joblib.dump(model, file_path)
        progress.update(task, advance=100)
    console.print(f"[bold green]Model saved to {file_path}")

def load_model(file_path):
    return joblib.load(file_path)

def predict_fraud(clf, transaction_data):
    # Create a DataFrame with the input data
    input_data = pd.DataFrame([transaction_data])
    
    # Calculate balance changes
    input_data['balanceOrig_change'] = input_data['newbalanceOrig'] - input_data['oldbalanceOrg']
    input_data['balanceDest_change'] = input_data['newbalanceDest'] - input_data['oldbalanceDest']
    
    # Log transform the amount
    input_data['amount_log'] = np.log1p(input_data['amount'])
    
    # Make prediction
    prediction = clf.predict(input_data)
    probability = clf.predict_proba(input_data)[0][1]  # Probability of fraud
    
    return prediction[0], probability

if __name__ == "__main__":
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
    else:
        file_path = 'Fraud.csv'  # Update this to your actual file name
    
    if not os.path.exists(file_path):
        console.print(f"[red]Error: File not found at {file_path}")
        sys.exit(1)

    df = load_and_preprocess_data(file_path)
    if df is not None:
        # Prepare features and target
        features = ['type', 'amount', 'amount_log', 'oldbalanceOrg', 'newbalanceOrig', 
                    'oldbalanceDest', 'newbalanceDest', 'balanceOrig_change', 'balanceDest_change']
        X = df[features]
        y = df['isFraud']
        
        # Train the model
        model, X_test, y_test = train_model(X, y)
        
        # Save the model
        model_path = 'fraud_detection_model.joblib'
        save_model(model, model_path)
        
        console.print("[bold green]Model training completed successfully.")
        
        # Check predictions on test set
        y_pred = model.predict(X_test)
        correct_predictions = (y_pred == y_test).sum()
        total_predictions = len(y_test)
        accuracy = correct_predictions / total_predictions
        
        console.print("\n[bold cyan]Test Set Prediction Check:")
        console.print(f"Correct predictions: {correct_predictions} out of {total_predictions}")
        console.print(f"Accuracy: {accuracy:.2%}")
        
        # Print misclassified instances
        misclassified = X_test[y_pred != y_test]
        console.print(f"\n[bold yellow]Misclassified instances: {len(misclassified)}")
        if len(misclassified) > 0:
            console.print("[bold yellow]Sample of misclassified instances:")
            console.print(misclassified.head())
        
        # Example usage of predict_fraud function
        example_transaction = {
            'type': 'TRANSFER',
            'amount': 1000000.0,
            'oldbalanceOrg': 1000000.0,
            'newbalanceOrig': 0.0,
            'oldbalanceDest': 0.0,
            'newbalanceDest': 1000000.0
        }

        prediction, probability = predict_fraud(model, example_transaction)
        console.print("\n[bold magenta]Example Prediction:")
        console.print(f"Prediction: {'[red]Fraudulent' if prediction == 1 else '[green]Not Fraudulent'}")
        console.print(f"Probability of fraud: {probability:.2f}")
    else:
        console.print("[red]Unable to train model due to data loading or preprocessing error.")

console.print("[bold green]Script execution completed.")