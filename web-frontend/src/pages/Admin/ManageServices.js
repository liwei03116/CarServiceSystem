import React, { useEffect, useState } from 'react';
import api from "../../api/api";
import AdminSidebar from "../../components/AdminSidebar";
import {
  Container,
  Grid2 as Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  InputAdornment
} from '@mui/material';

const ManageServices = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerContact: '',
    description: '',
    price: ''
  });
  const [dataUpdated, setDataUpdated] = useState(false); // State to track data updates

  useEffect(() => {
    // Fetch filtered service requests from the API (only "In Progress" requests)
    api.get('/services/manageService')
      .then(response => {
        setServiceRequests(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching service requests:', error);
      });
  }, [dataUpdated]); // Depend on dataUpdated to refetch data after updates

  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
    setFormData({
      customerName: request.ownerName,
      customerContact: request.ownerContact,
      description: request.description,
      price: request.price || ''
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedRequest(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    const updatedData = { ...selectedRequest, price: formData.price, description: formData.description };

    api.put(`/services/${selectedRequest._id}`, updatedData)
      .then(response => {
        //alert('Service request updated successfully');
        setDataUpdated(prev => !prev); // Toggle dataUpdated to trigger re-fetch
        setOpenDialog(false);
      })
      .catch(error => {
        console.error('Error updating service request:', error);
        alert('Error updating service request');
      });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={9}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
              Manage Service
            </Typography>
            <TableContainer sx={{ width: '100%' }}>
              <Table sx={{ minWidth: 650 }} aria-label="service table">
                <TableHead>
                  <TableRow>
                    <TableCell>Owner Name</TableCell>
                    <TableCell>Owner Contact</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serviceRequests.map(request => (
                    <TableRow
                      key={request._id}
                      hover
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleSelectRequest(request)}
                    >
                      <TableCell>{request.ownerName}</TableCell>
                      <TableCell>{request.ownerContact}</TableCell>
                      <TableCell>{request.description}</TableCell>
                      <TableCell>${request.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      {/* Popup Dialog for updating customer details */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Update Customer Detail</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              label="Customer Name"
              name="customerName"
              value={formData.customerName}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Customer Contact"
              name="customerContact"
              value={formData.customerContact}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              helperText="You can update the description"
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default ManageServices;
