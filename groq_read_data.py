import pandas as pd
from langchain_groq import ChatGroq
from langchain_experimental.agents.agent_toolkits import create_csv_agent

# Reading a CSV file
csv_file_path = 'transactions_dataset_1.csv'
df_csv = pd.read_csv(csv_file_path)

groq_api = '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'
llm = ChatGroq(temperature=0, model="llama3-70b-8192", api_key=groq_api)


# Create the CSV agent
agent = create_csv_agent(
    llm, csv_file_path, verbose=True, allow_dangerous_code=True)


def query_data(query):
    response = agent.invoke(query)
    return response


query = "We have a fraud case. Please find the details of the transaction where the fraud was detected. Give the average fraud probability for the transactions where the fraud was detected."
response = query_data(query)
print(response)
