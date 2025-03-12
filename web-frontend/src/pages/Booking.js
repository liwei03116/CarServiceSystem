import React from 'react';
import { Container, Typography } from '@mui/material';
// Optionally, you can reuse ServiceRequestForm for bookings
import ServiceRequestForm from '../components/ServiceRequestForm';

const Booking = () => {
  return (
    <Container>
      <Typography variant="h4" component="h2" sx={{ mt: 4 }}>
        Book a Service
      </Typography>
      <ServiceRequestForm />
    </Container>
  );
};

export default Booking;
