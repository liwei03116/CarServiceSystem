import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import api from '../api/api';

const VehicleCategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch vehicle categories from the backend
    api.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching vehicle categories:', error));
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Vehicle Categories
      </Typography>
      <Grid container spacing={3}>
        {categories.map(category => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {category.name}
                </Typography>
                {/* Optionally, add more information about the category */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VehicleCategoryList;
