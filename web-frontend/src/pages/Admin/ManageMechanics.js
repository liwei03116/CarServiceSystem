import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/api';

const ManageMechanics = () => {
  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
    api.get('/mechanics')
      .then(response => setMechanics(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = id => {
    api.delete(`/mechanics/${id}`)
      .then(() => setMechanics(mechanics.filter(m => m.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Mechanics
        </Typography>
        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
          Add New Mechanic
        </Button>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Expertise</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mechanics.map(mechanic => (
                <TableRow key={mechanic.id}>
                  <TableCell>{mechanic.id}</TableCell>
                  <TableCell>{mechanic.name}</TableCell>
                  <TableCell>{mechanic.expertise}</TableCell>
                  <TableCell>
                    <Button color="primary">Edit</Button>
                    <Button color="secondary" onClick={() => handleDelete(mechanic.id)}>Delete</Button>
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

export default ManageMechanics;
