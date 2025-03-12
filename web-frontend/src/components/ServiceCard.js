import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';

function ServiceCard({ service, onBook }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {service.image && (
        <CardMedia
          component="img"
          height="140"
          image={service.image}
          alt={service.name}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {service.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {service.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onBook(service)}>
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
}

export default ServiceCard;
