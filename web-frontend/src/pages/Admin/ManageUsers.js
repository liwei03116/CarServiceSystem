import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users')
      .then(response => setUsers(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = id => {
    api.delete(`/users/${id}`)
      .then(() => setUsers(users.filter(u => u.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Users
        </Typography>
        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
          Add New User
        </Button>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button color="primary">Edit</Button>
                    <Button color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
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

export default ManageUsers;
