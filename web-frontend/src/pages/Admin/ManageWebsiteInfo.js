import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/api';

const ManageWebsiteInfo = () => {
  const [info, setInfo] = useState({ title: '', description: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    api.get('/admin/website-info')
      .then(response => setInfo(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => setInfo({ ...info, [e.target.name]: e.target.value });

  const handleSave = () => {
    api.put('/admin/website-info', info)
      .then(() => setEditing(false))
      .catch(err => console.error(err));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Website Information
        </Typography>
        <Paper sx={{ p: 2 }}>
          <TextField fullWidth margin="normal" label="Title" name="title" value={info.title} onChange={handleChange} disabled={!editing} />
          <TextField fullWidth margin="normal" label="Description" name="description" value={info.description} onChange={handleChange} disabled={!editing} multiline rows={4} />
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

export default ManageWebsiteInfo;
