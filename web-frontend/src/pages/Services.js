import React, { useState } from 'react';
import ServiceList from '../components/ServiceList';
import { Container, Typography, Modal, Box } from '@mui/material';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleBook = service => setSelectedService(service);
  const handleCloseModal = () => setSelectedService(null);

  return (
    <Container>
      <ServiceList onBook={handleBook} />
      <Modal open={Boolean(selectedService)} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            p: 4
          }}
        >
          {selectedService && (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                Booking for {selectedService.name}
              </Typography>
              {/* You could include a BookingForm component here */}
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default Services;
