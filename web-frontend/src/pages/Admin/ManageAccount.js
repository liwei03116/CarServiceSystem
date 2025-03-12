import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/api';

const ManageAccount = () => {
  const [account, setAccount] = useState({ username: '', password: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    api.get('/admin/account')
      .then(response => setAccount(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => setAccount({ ...account, [e.target.name]: e.target.value });

  const handleSave = () => {
    api.put('/admin/account', account)
      .then(() => setEditing(false))
      .catch(err => console.error(err));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Account Credentials
        </Typography>
        <Paper sx={{ p: 2 }}>
          <TextField fullWidth margin="normal" label="Username" name="username" value={account.username} onChange={handleChange} disabled={!editing} />
          <TextField fullWidth margin="normal" label="Password" name="password" type="password" value={account.password} onChange={handleChange} disabled={!editing} />
          {editing ? (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button variant="contained" onClick={() => setEditing(true)}>
              Edit
            </Button>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ManageAccount;
