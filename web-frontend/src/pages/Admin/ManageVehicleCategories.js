import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/api';

const ManageVehicleCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/categories')
      .then(response => setCategories(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = id => {
    api.delete(`/categories/${id}`)
      .then(() => setCategories(categories.filter(c => c.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Vehicle Categories
        </Typography>
        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
          Add New Category
        </Button>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map(cat => (
                <TableRow key={cat.id}>
                  <TableCell>{cat.id}</TableCell>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>
                    <Button color="primary">Edit</Button>
                    <Button color="secondary" onClick={() => handleDelete(cat.id)}>Delete</Button>
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

export default ManageVehicleCategories;
