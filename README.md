# Fraud Detection Dashboard

## 🚀 Overview

The Fraud Detection Dashboard is a powerful web application developed for the ShellHacks 2024 hackathon. It combines machine learning with interactive data visualization to help identify and analyze potentially fraudulent transactions. This project consists of a React-based frontend for data visualization and a Flask backend for processing and serving predictions.

## 🏆 ShellHacks 2024

This project was created as part of ShellHacks 2024, one of Florida's largest hackathons. Our team aimed to address the growing concern of financial fraud by creating an intuitive and powerful tool for transaction analysis.

## ✨ Features

- 📊 Interactive charts for transaction amount distribution and fraud analysis
- 📋 Detailed transaction table with search functionality
- 🔍 In-depth transaction details modal
- 📁 CSV file upload for batch transaction analysis
- 🧠 Machine learning-powered fraud detection
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
   git clone https://github.com/your-username/fraud-detection-dashboard.git
   cd fraud-detection-dashboard
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

### Running the Application

1. Start the backend server:
   ```
   cd server
   python app.py
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

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