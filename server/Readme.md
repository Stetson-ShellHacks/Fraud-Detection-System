# Fraud Detection System - Server

This is the backend application for the Fraud Detection System, developed for ShellHacks 2024. It provides a Flask-based API for processing transaction data and making fraud predictions using machine learning.

## 🚀 Features

- 🧠 Machine learning-powered fraud detection
- 📊 Data preprocessing and feature engineering
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

The fraud detection model is trained using the `supermodel.py` script. It uses a pipeline of preprocessing steps and a Random Forest Classifier. The trained model is saved as `fraud_detection_model.joblib`.

## 🔧 Configuration

- CORS is configured to allow requests from `http://localhost:3000` (the frontend application)
- The server runs on port 8000 by default

---

Made with ❤️ by our team for ShellHacks 2024
