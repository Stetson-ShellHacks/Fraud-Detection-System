import { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  TextField, Typography, Box, Card, CardContent, IconButton
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { styled } from '@mui/material/styles';

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

export default function TransactionTable({ transactions, onSelectTransaction }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter(transaction =>
    transaction.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.amount.toString().includes(searchTerm) ||
    transaction.date.includes(searchTerm)
  );

  return (
    <Card elevation={0} sx={{ mb: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, color: '#555' }}>
          Bank Transactions
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
          <SearchOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
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
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <StyledTableRow key={transaction.id}>
                  <StyledTableCell>{transaction.bank}</StyledTableCell>
                  <StyledTableCell>${transaction.amount}</StyledTableCell>
                  <StyledTableCell>{transaction.date}</StyledTableCell>
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
