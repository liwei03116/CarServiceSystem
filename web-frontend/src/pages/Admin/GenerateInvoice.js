import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/api';

const GenerateInvoice = () => {
  // Use customerContact instead of customerId
  const [customerContact, setCustomerContact] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceData, setInvoiceData] = useState(null);

  // Handler to generate invoice by calling your backend endpoint.
  // Now, we pass customerContact and invoiceDate as query parameters.
  const handleGenerateInvoice = () => {
    api.get('/admin/invoice', { params: { customerContact, invoiceDate } })
      .then((response) => setInvoiceData(response.data))
      .catch((err) => console.error(err));
  };

  // Handler to print the invoice using the browser's print functionality.
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Generate Invoice
        </Typography>
        <Box component="form" sx={{ mb: 2 }}>
          <TextField
            label="Customer Contact"
            type="text"
            fullWidth
            variant="outlined"
            value={customerContact}
            onChange={(e) => setCustomerContact(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Invoice Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleGenerateInvoice}>
            Generate Invoice
          </Button>
        </Box>
        {invoiceData && (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Invoice
            </Typography>
            <pre>{JSON.stringify(invoiceData, null, 2)}</pre>
          </Paper>
        )}
        <Button variant="outlined" onClick={handlePrint}>
          Print Invoice
        </Button>
      </Box>
    </Box>
  );
};

export default GenerateInvoice;
