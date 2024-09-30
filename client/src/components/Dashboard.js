'use client'

import { useState, useEffect } from 'react'
import { Box, Grid, Typography, Card, CardContent } from '@mui/material'
import TransactionTable from './TransactionTable'
import TransactionModal from './TransactionModal'
import AmountChart from './AmountChart'
import FraudChart from './FraudChart'  // New import
import UploadCSV from './UploadCSV'

export default function Dashboard() {
  const [transactions, setTransactions] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [amountChartData, setAmountChartData] = useState([])
  const [fraudChartData, setFraudChartData] = useState([])  // New state

  useEffect(() => {
    const storedData = localStorage.getItem('transactionData');
    console.log(storedData);
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        if (Array.isArray(data)) {
          setTransactions(data);
          processChartData(data);
        }
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    }
  }, []);

  const processChartData = (data) => {
    // Process amount chart data
    const amountData = data.reduce((acc, transaction) => {
      const range = Math.floor(transaction.amount / 50000) * 50000
      const key = `${range}-${range + 50000}`
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})
    setAmountChartData(Object.entries(amountData).map(([name, value]) => ({ name, value })))

    // Process fraud chart data
    const fraudData = data.reduce((acc, transaction) => {
      acc[transaction.prediction === 1 ? 'Fraudulent' : 'Normal'] += 1
      return acc
    }, { Fraudulent: 0, Normal: 0 })
    setFraudChartData(Object.entries(fraudData).map(([name, value]) => ({ name, value })))
  }

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Fraud Detection Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AmountChart data={amountChartData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FraudChart data={fraudChartData} />
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
      <TransactionModal 
        isOpen={!!selectedTransaction} 
        onClose={() => setSelectedTransaction(null)} 
        transaction={selectedTransaction}
      />
    </Box>
  )
}