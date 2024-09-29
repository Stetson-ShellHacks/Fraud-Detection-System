import pandas as pd
import random
import datetime

# Configuration
num_transactions = 1000  # Number of transactions to generate
user_city = "US, New York"
usual_hours = (8, 23)  # User's usual transaction hours (8 AM to 11 PM)
usual_ips = ["192.168", "172.0", "172.16"]  # Recognized IP address patterns
user_income = 2500  # Monthly income
# Daily usual spending based on income
usual_transaction_amount = user_income / 30
usual_login_frequency = 3  # Usual logins per day

# Function to generate a random time in 24-hour format (HH:MM)


def random_time():
    random_hour = random.randint(0, 23)
    random_minute = random.randint(0, 59)
    return f"{random_hour:02}:{random_minute:02}"  # Format time as HH:MM

# Function to generate a random dataset


def generate_random_dataset(file_name):
    transactions = []

    for _ in range(num_transactions):
        # Randomize location
        location = user_city if random.random() > 0.15 else random.choice(
            ["Europe, London", "Asia, Tokyo", "South America, Rio"])

        # Randomize transaction amount
        amount = usual_transaction_amount if random.random() > 0.15 else random.uniform(
            usual_transaction_amount * 1.5, user_income)

        # Generate a random time for the transaction
        timestamp = random_time()

        # Randomize IP
        ip_address = random.choice(
            usual_ips) + "." + ".".join([str(random.randint(0, 255)) for _ in range(2)])
        if random.random() > 0.85:
            ip_address = ".".join([str(random.randint(1, 255))
                                  for _ in range(4)])

        # Randomize login frequency with a small chance of being outside the usual range
        login_frequency = usual_login_frequency if random.random(
        ) > 0.15 else random.randint(1, 10)

        # Create the transaction record
        transaction = {
            "Location_Region": location,
            "Transaction_Amount": round(amount, 2),
            "Timestamp": timestamp,
            "IP_Address": ip_address,
            "Login_Frequency": login_frequency
        }

        transactions.append(transaction)

    # Create DataFrame
    df_transactions = pd.DataFrame(transactions)

    # Save to CSV
    df_transactions.to_csv(file_name, index=False)
    print(f"Dataset created and saved as '{file_name}'")


# Generate three random datasets with different file names
generate_random_dataset('transactions_dataset_1.csv')
generate_random_dataset('transactions_dataset_2.csv')
generate_random_dataset('transactions_dataset_3.csv')
