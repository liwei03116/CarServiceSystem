import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AboutUs = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Welcome to our Car Service Shop. We are committed to providing top-notch car maintenance,
          repair, and customization services. Our experienced mechanics and state-of-the-art facilities
          ensure that your vehicle stays in peak condition.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
