import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/api';

const ManageServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/admin/services')
      .then(response => setServices(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = id => {
    api.delete(`/admin/services/${id}`)
      .then(() => setServices(services.filter(s => s.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Services
        </Typography>
        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
          Add New Service
        </Button>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Service Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map(service => (
                <TableRow key={service.id}>
                  <TableCell>{service.id}</TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell>
                    <Button color="primary">Edit</Button>
                    <Button color="secondary" onClick={() => handleDelete(service.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
};

export default ManageServices;
