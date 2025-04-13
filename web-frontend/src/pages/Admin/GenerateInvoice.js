import React, { useState } from 'react';
import {
  Box, Typography, Button, TextField, Paper, Table,
  TableHead, TableBody, TableRow, TableCell, Checkbox
} from '@mui/material';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/api';

const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const GenerateInvoice = () => {
  const [customerContact, setCustomerContact] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const res = await api.get(`/services/getServicesByContact/${customerContact}`);
      setServices(res.data);
      setSelectedServices([]); // Clear previous selection
      setError('');
    } catch (err) {
      setServices([]);
      setSelectedServices([]);
      setError('No services found or an error occurred.');
    }
  };

  const handleGenerateInvoice = async () => {
    const selected = services.filter(service => selectedServices.includes(service._id));
    if (!selected.length) return;
  
    try {
      const response = await api.post('/invoice/generate', { services: selected }, {
        responseType: 'blob' // Important for receiving PDF binary
      });
  
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error generating invoice PDF:', error);
      alert('Failed to generate invoice.');
    }
  };
  
  const handlePrint = async () => {
    const selected = services.filter(service => selectedServices.includes(service._id));
    if (!selected.length) {
      alert("Please select at least one service.");
      return;
    }
  
    try {
      const response = await api.post('/invoice/generate', { services: selected }, {
        responseType: 'blob'
      });
  
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
  
      const printWindow = window.open(url, '_blank');
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.focus();
          printWindow.print();
        };
      } else {
        alert("Unable to open print window. Please check your browser settings.");
      }
    } catch (error) {
      console.error('Error generating invoice PDF:', error);
      alert('Failed to generate invoice.');
    }
  };

  const handleSelectService = (id) => {
    setSelectedServices(prev =>
      prev.includes(id)
        ? prev.filter(sid => sid !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedServices(services.map(service => service._id));
    } else {
      setSelectedServices([]);
    }
  };

  const isAllSelected = services.length > 0 && selectedServices.length === services.length;

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
          <Button variant="contained" onClick={handleSearch} sx={{ mr: 2 }}>
            Search
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleGenerateInvoice}
            disabled={selectedServices.length === 0}
          >
            Generate Invoice
          </Button>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          <Paper sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Requested Date</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service._id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedServices.includes(service._id)}
                        onChange={() => handleSelectService(service._id)}
                      />
                    </TableCell>
                    <TableCell>{service.ownerName}</TableCell>
                    <TableCell>{service.ownerContact}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>{formatDateTime(service.requestedDate)}</TableCell>
                    <TableCell>${service.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
        <Button variant="outlined" onClick={handlePrint}>
          Print Invoice
        </Button>
      </Box>
    </Box>
  );
};

export default GenerateInvoice;
