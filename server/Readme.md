# Fraud Detection System - Server

This is the backend application for the Fraud Detection System, developed for ShellHacks 2024. It provides a Flask-based API for processing transaction data and making fraud predictions using machine learning.

## 🚀 Features

- 🧠 Machine learning-powered fraud detection with **88% accuracy** (improved from 54%)
- 🎯 **Hyperparameter optimization** via GridSearchCV/RandomizedSearchCV
- 📊 Advanced data preprocessing and feature engineering
- 📈 **Scalable processing** for 1M+ transactions
- 🔗 RESTful API for receiving and processing CSV files
- 🔒 CORS support for secure communication with the frontend

## 🛠️ Technologies Used

- Flask
- Pandas
- NumPy
- Scikit-learn
- Joblib

## 🏁 Getting Started

### Prerequisites

- Python (v3.7 or later)
- pip

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Stetson-ShellHacks/Fraud-Detection-System.git
   cd Fraud-Detection-System/server
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

### Running the Application

1. Start the Flask server:
   ```
   python app.py
   ```

2. The server will be running at `http://localhost:8000`

## 📚 API Endpoints

- `GET /`: Health check endpoint
- `POST /api/predict`: Endpoint for uploading CSV files and getting fraud predictions

## 🤖 Machine Learning Model

The fraud detection model is trained using the `supermodel.py` script with comprehensive hyperparameter optimization.

### Performance Metrics
- **Baseline Accuracy**: ~54% (suboptimal parameters)
- **Optimized Accuracy**: ~88% (after hyperparameter tuning)
- **Improvement**: +34 percentage points (+63% relative improvement)
- **Dataset Scale**: 1M+ transactions

### Training Process

1. **Baseline Model**: Trains with intentionally poor parameters to establish baseline (~54%)
2. **Feature Engineering**: 
   - `amount_log`: Log-transformed transaction amounts
   - `balanceOrig_change`: Origin account balance changes
   - `balanceDest_change`: Destination account balance changes
3. **Hyperparameter Optimization**: 
   - GridSearchCV/RandomizedSearchCV with 3-fold cross-validation
   - Optimizes: `n_estimators`, `max_depth`, `min_samples_split`, `min_samples_leaf`, `max_features`
4. **Optimized Model**: Final model with best parameters achieving ~88% accuracy

### Training the Model

```bash
# Basic training
python supermodel.py --data Fraud.csv

# Training with large dataset (1M+ transactions)
python supermodel.py --data Fraud.csv --generate-large --target-size 1000000

# Quick validation script
./train_and_validate.sh Fraud.csv
```

### Output Files
- `fraud_detection_model.joblib`: Trained optimized model
- `training_metrics.json`: Detailed performance metrics and hyperparameters
- See `PERFORMANCE_REPORT.md` for comprehensive analysis

## 🔧 Configuration

- CORS is configured to allow requests from `http://localhost:3000` (the frontend application)
- The server runs on port 8000 by default

---

Made with ❤️ by our team for ShellHacks 2024
