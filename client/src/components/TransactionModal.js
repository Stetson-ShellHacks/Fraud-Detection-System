import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Chip, useTheme, useMediaQuery, Avatar, Divider } from '@mui/material'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import SecurityIcon from '@mui/icons-material/Security'

const DetailItem = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
      {icon}
    </Avatar>
    <Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">
        {value}
      </Typography>
    </Box>
  </Box>
)

export default function TransactionModal({ isOpen, onClose, transaction }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxWidth: isMobile ? '100%' : '600px',
          width: '100%'
        }
      }}
    >
      <DialogTitle sx={{ 
        fontWeight: 500, 
        bgcolor: transaction && transaction.prediction === 1 ? 'error.light' : 'success.light',
        color: transaction && transaction.prediction === 1 ? 'error.dark' : 'success.dark'
      }}>
        Transaction Details
      </DialogTitle>
      <DialogContent>
        {transaction && (
          <Box sx={{ mt: 2 }}>
            <DetailItem 
              icon={<AccountBalanceIcon />} 
              label="Type" 
              value={transaction.type} 
            />
            <DetailItem 
              icon={<AttachMoneyIcon />} 
              label="Amount" 
              value={`$${transaction.amount.toFixed(2)}`} 
            />
            <DetailItem 
              icon={<CalendarTodayIcon />} 
              label="Step" 
              value={transaction.step} 
            />
            <DetailItem 
              icon={<FingerprintIcon />} 
              label="From" 
              value={transaction.nameOrig} 
            />
            <DetailItem 
              icon={<FingerprintIcon />} 
              label="To" 
              value={transaction.nameDest} 
            />
            <Divider sx={{ my: 2 }} />
            <DetailItem 
              icon={<SecurityIcon />} 
              label="Status" 
              value={
                transaction.prediction === 1 ? (
                  <Chip size="small" label="Suspicious" color="error" />
                ) : (
                  <Chip size="small" label="Normal" color="success" />
                )
              } 
            />
            <Typography variant="body2" color={transaction.prediction === 1 ? "error" : "success"} sx={{ mt: 2 }}>
              Fraud Probability: {(transaction.probability * 100).toFixed(2)}%
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}