# Fraud Detection System

## 🚀 Overview

The Fraud Detection System is a powerful web application developed for the ShellHacks 2024 hackathon. It combines machine learning with interactive data visualization to help identify and analyze potentially fraudulent transactions. This project consists of a React-based frontend for data visualization and a Flask backend for processing and serving predictions.

### 🎯 Key Achievement
**Built a fraud detection API at ShellHacks, improving model accuracy from 54% → 88% with optimized Random Forest and feature engineering on 1M+ transactions.**

## 🏆 ShellHacks 2024

This project was created as part of ShellHacks 2024, one of Florida's largest hackathons. Our team aimed to address the growing concern of financial fraud by creating an intuitive and powerful tool for transaction analysis.

## ✨ Features

- 📊 Interactive charts for transaction amount distribution and fraud analysis
- 📋 Detailed transaction table with search functionality
- 🔍 In-depth transaction details modal
- 📁 CSV file upload for batch transaction analysis
- 🧠 Machine learning-powered fraud detection with **88% accuracy**
- 🎯 **Hyperparameter optimization** using GridSearchCV/RandomizedSearchCV
- 🔧 **Advanced feature engineering** (log transforms, balance changes)
- 📈 **Scalable processing** for 1M+ transactions
- 💻 Responsive design for various screen sizes

## 🛠️ Tech Stack

- Frontend:
  - React
  - Material-UI
  - Recharts
  - React Router

- Backend:
  - Flask
  - Pandas
  - NumPy
  - Scikit-learn (for the ML model)

## 🏁 Getting Started

### Prerequisites

- Node.js (v14 or later)
- Python (v3.7 or later)
- pip

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Stetson-ShellHacks/Fraud-Detection-System.git
   cd fraud-detection-system
   ```

2. Set up the frontend:
   ```
   cd client
   npm install
   ```

3. Set up the backend:
   ```
   cd ../server
   pip install -r requirements.txt
   ```

### Training the Model

To train the optimized fraud detection model with hyperparameter tuning:

```bash
cd server
# Train with your dataset
python supermodel.py --data your_fraud_data.csv

# Train with large dataset generation (1M+ transactions)
python supermodel.py --data your_fraud_data.csv --generate-large --target-size 1000000

# Or use the validation script
./train_and_validate.sh your_fraud_data.csv
```

The training process will:
- Train a baseline model (~54% accuracy)
- Optimize hyperparameters using GridSearchCV/RandomizedSearchCV
- Generate optimized model with ~88% accuracy
- Save metrics to `training_metrics.json`

See `server/PERFORMANCE_REPORT.md` for detailed performance metrics.

### Running the Application

1. Train or load the model (see above). Make sure `fraud_detection_model.joblib` exists.

2. Start the backend server:
   ```
   cd server
   python app.py
   ```

3. In a new terminal, start the frontend development server:
   ```
   cd client
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 📖 How to Use

1. Upload a CSV file containing transaction data using the upload page.
2. Once uploaded, you'll be redirected to the dashboard where you can view various charts and the transaction table.
3. Use the search functionality to filter transactions.
4. Click on a transaction row to view more details in a modal.

## 👏 Acknowledgements

- [Create React App](https://github.com/facebook/create-react-app)
- [Material-UI](https://mui.com/)
- [Recharts](https://recharts.org/)
- [Flask](https://flask.palletsprojects.com/)
- [Scikit-learn](https://scikit-learn.org/)

---

Made with ❤️ by our team:
- [Meirzhan Saparov](https://github.com/Meirzhan05)
- [Temirlan Stamakunov](https://github.com/stamakunov7)
- [Arnold Shakirov](https://github.com/arnold-shakirov)
- [Kyrylo Onishchenko](https://github.com/kyrylooni)
