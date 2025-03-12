import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Back to Home
      </Button>
    </Container>
  );
};

export default NotFound;
