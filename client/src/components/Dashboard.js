'use client'

import { useState, useEffect } from 'react'
import { Box, Grid, Typography, Card, CardContent } from '@mui/material'
import TransactionTable from './TransactionTable'
import TransactionModal from './TransactionModal'
import AmountChart from './AmountChart'
import FrequencyChart from './FrequencyChart'
import UploadCSV from './UploadCSV'
export default function Dashboard() {
  const [transactions, setTransactions] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [amountChartData, setAmountChartData] = useState([])
  const [frequencyChartData, setFrequencyChartData] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('transactionData') || '[]');
    setTransactions(data);
    processChartData(data);
  }, []);

  const handlePredictionsReceived = (data) => {
    setTransactions(data)
    processChartData(data)
  }

  const processChartData = (data) => {
    // Process amount chart data
    const amountData = data.reduce((acc, transaction) => {
      if (transaction && typeof transaction.amount === 'number') {
        const range = Math.floor(transaction.amount / 50000) * 50000
        const key = `${range}-${range + 50000}`
        acc[key] = (acc[key] || 0) + 1
      }
      return acc
    }, {})
    setAmountChartData(Object.entries(amountData).map(([name, value]) => ({ name, value })))

    // Process frequency chart data
    const frequencyData = data.reduce((acc, transaction) => {
      if (transaction && transaction.date) {
        const date = transaction.date.split(' ')[0]
        acc[date] = (acc[date] || 0) + 1
      }
      return acc
    }, {})
    setFrequencyChartData(Object.entries(frequencyData).map(([name, value]) => ({ name, value })))
  }

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Fraud Detection Dashboard</Typography>
      {transactions.length > 0 ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <AmountChart data={amountChartData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <FrequencyChart data={frequencyChartData} />
          </Grid>
          <Grid item xs={12}>
            <Card elevation={0} sx={{ borderRadius: 2 }}>
              <CardContent>
                <TransactionTable 
                  transactions={transactions} 
                  onSelectTransaction={handleSelectTransaction}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <UploadCSV onPredictionsReceived={handlePredictionsReceived} />

      )}
      <TransactionModal 
        isOpen={!!selectedTransaction} 
        onClose={() => setSelectedTransaction(null)} 
        transaction={selectedTransaction}
      />
    </Box>
  )
}