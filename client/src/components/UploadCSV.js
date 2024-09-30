import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadCSV() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      localStorage.setItem('transactionData', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the file');
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '300px',
        borderRadius: 2,
        backgroundColor: 'background.default'
      }}
    >
      <CloudUploadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        Upload a CSV File
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 2 }}>
        Please upload a CSV file to visualize the transaction data and perform fraud detection analysis.
      </Typography>
      <input
        accept=".csv"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Choose File
        </Button>
      </label>
      {file && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Selected file: {file.name}
        </Typography>
      )}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleUpload} 
        sx={{ mt: 2 }}
        disabled={!file}
      >
        Upload and Analyze
      </Button>
    </Paper>
  );
}