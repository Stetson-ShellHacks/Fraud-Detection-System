import pandas as pd

# Load the datasets
transaction_records = pd.read_csv(
    'archive/Data/Transaction Data/transaction_records.csv')
transaction_metadata = pd.read_csv(
    'archive/Data/Transaction Data/transaction_metadata.csv')
fraud_indicators = pd.read_csv(
    'archive/Data/Fraudulent Patterns/fraud_indicators.csv')

# Merge datasets on TransactionID
merged_df = pd.merge(transaction_metadata,
                     transaction_records, on='TransactionID')
merged_df = pd.merge(merged_df, fraud_indicators, on='TransactionID')

# Select the required columns
combined_df = merged_df[['TransactionID',
                         'Timestamp', 'Amount', 'FraudIndicator']]

# Save the combined dataset to a new CSV file
combined_df.to_csv(
    'combined_dataset.csv', index=False)
