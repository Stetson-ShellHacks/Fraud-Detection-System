import { useState, useMemo } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  TextField, Typography, Box, Card, CardContent, IconButton, Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningIcon from '@mui/icons-material/Warning';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 'none',
  padding: theme.spacing(2),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const isFraudulent = (amount) => amount > 10000;

export default function TransactionTable({ transactions, onSelectTransaction }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = useMemo(() => 
    transactions.filter(transaction =>
      transaction.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm) ||
      transaction.date.includes(searchTerm)
    ),
    [transactions, searchTerm]
  );

  const fraudCount = useMemo(() => 
    filteredTransactions.filter(t => isFraudulent(t.amount)).length,
    [filteredTransactions]
  );

  return (
    <Card elevation={0} sx={{ mb: 3, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 500, color: '#555' }}>
            Bank Transactions
          </Typography>
          <Chip 
            icon={<WarningIcon />} 
            label={`${fraudCount} Potential Fraud`} 
            color="error" 
            variant="outlined"
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            fullWidth
            variant="standard"
            placeholder="Search transactions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 400, overflow: 'auto', borderRadius: 2 }}>
          <Table stickyHeader aria-label="bank transactions table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Bank</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <StyledTableRow 
                  key={transaction.id}
                  sx={isFraudulent(transaction.amount) ? { backgroundColor: 'error.light' } : {}}
                >
                  <StyledTableCell>{transaction.bank}</StyledTableCell>
                  <StyledTableCell>${transaction.amount}</StyledTableCell>
                  <StyledTableCell>{transaction.date}</StyledTableCell>
                  <StyledTableCell>
                    {isFraudulent(transaction.amount) ? (
                      <Chip size="small" label="Suspicious" color="error" />
                    ) : (
                      <Chip size="small" label="Normal" color="success" />
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      size="small"
                      onClick={() => onSelectTransaction(transaction)}
                    >
                      <InfoOutlinedIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
