import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import ServiceCard from './ServiceCard';
import api from '../api/api';

function ServiceList({ onBook }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/services')
      .then(response => setServices(response.data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  return (
    <Container sx={{ py: 4 }} maxWidth="lg">
      <Typography variant="h4" component="h2" gutterBottom>
        Our Services
      </Typography>
      <Grid container spacing={4}>
        {services.map(service => (
          <Grid item key={service.id} xs={12} sm={6} md={4}>
            <ServiceCard service={service} onBook={onBook} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ServiceList;
