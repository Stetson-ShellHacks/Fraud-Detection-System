import { useState } from 'react'
import { Typography, Grid, Box } from '@mui/material'
import TransactionTable from './TransactionTable'
import FrequencyChart from './FrequencyChart'
import AmountChart from './AmountChart'
import TransactionModal from './TransactionModal'

const transactionData = [
  { id: 1, bank: 'Bank A', amount: 1000, date: '2024-09-28' },
  { id: 2, bank: 'Bank B', amount: 1500, date: '2024-09-28' },
  { id: 3, bank: 'Bank C', amount: 2000, date: '2024-09-27' },
  { id: 4, bank: 'Bank A', amount: 500, date: '2024-09-27' },
  { id: 5, bank: 'Bank B', amount: 3000, date: '2024-09-26' },
  { id: 6, bank: 'Bank C', amount: 750, date: '2024-09-26' },
  { id: 7, bank: 'Bank A', amount: 1200, date: '2024-09-25' },
  { id: 8, bank: 'Bank B', amount: 12000, date: '2024-09-25' },
]

const frequencyData = [
  { name: 'Mon', value: 4 },
  { name: 'Tue', value: 3 },
  { name: 'Wed', value: 6 },
  { name: 'Thu', value: 8 },
  { name: 'Fri', value: 5 },
  { name: 'Sat', value: 2 },
  { name: 'Sun', value: 1 },
]

const amountData = [
  { name: 'Mon', value: 5000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 7000 },
  { name: 'Thu', value: 9000 },
  { name: 'Fri', value: 6000 },
  { name: 'Sat', value: 2000 },
  { name: 'Sun', value: 1000 },
]

export default function Dashboard() {
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction)
    setIsModalOpen(true)
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 300, color: '#333', mb: 4 }}>
        Fraud Detection Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TransactionTable 
            transactions={transactionData} 
            onSelectTransaction={handleSelectTransaction} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FrequencyChart data={frequencyData} />
          <AmountChart data={amountData} />
        </Grid>
      </Grid>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={selectedTransaction}
      />
    </Box>
  )
}