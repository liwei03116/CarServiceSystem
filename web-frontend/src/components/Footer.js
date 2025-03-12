import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        textAlign: 'center',
        mt: 'auto',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Car Service System. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
