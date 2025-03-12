import React, { useState, useContext } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const AdminLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/auth/login', credentials)
      .then(response => {
        login(response.data);
        navigate('/admin');
      })
      .catch(err => {
        setError('Invalid username or password');
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Admin Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Email" name="email" value={credentials.username} onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Password" name="password" type="password" value={credentials.password} onChange={handleChange} required />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminLogin;
