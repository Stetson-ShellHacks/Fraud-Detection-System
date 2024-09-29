import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Chip, useTheme, useMediaQuery, Avatar, Divider } from '@mui/material'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import SecurityIcon from '@mui/icons-material/Security'

const isFraudulent = (amount) => amount > 10000

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
          maxWidth: isMobile ? '100%' : '600px', // Increased from 400px to 600px
          width: '100%'
        }
      }}
    >
      <DialogTitle sx={{ 
        fontWeight: 500, 
        bgcolor: transaction && isFraudulent(transaction.amount) ? 'error.light' : 'success.light',
        color: transaction && isFraudulent(transaction.amount) ? 'error.dark' : 'success.dark'
      }}>
        Transaction Details
      </DialogTitle>
      <DialogContent>
        {transaction && (
          <Box sx={{ mt: 2 }}>
            <DetailItem 
              icon={<AccountBalanceIcon />} 
              label="Bank" 
              value={transaction.bank} 
            />
            <DetailItem 
              icon={<AttachMoneyIcon />} 
              label="Amount" 
              value={`$${transaction.amount}`} 
            />
            <DetailItem 
              icon={<CalendarTodayIcon />} 
              label="Date" 
              value={transaction.date} 
            />
            <DetailItem 
              icon={<FingerprintIcon />} 
              label="Transaction ID" 
              value={transaction.id} 
            />
            <Divider sx={{ my: 2 }} />
            <DetailItem 
              icon={<SecurityIcon />} 
              label="Status" 
              value={
                isFraudulent(transaction.amount) ? (
                  <Chip size="small" label="Suspicious" color="error" />
                ) : (
                  <Chip size="small" label="Normal" color="success" />
                )
              } 
            />
            {isFraudulent(transaction.amount) && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                This transaction has been flagged as potentially fraudulent due to its high amount. Please review and verify.
              </Typography>
            )}
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
