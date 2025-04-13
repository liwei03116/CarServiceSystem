import React from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';

function Footer() {
  const theme = useTheme();
  const footerBackgroundColor =
    theme.palette.mode === 'light' ? '#f5f5f5' : theme.palette.background.default;

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        textAlign: 'center',
        mt: 'auto',
        backgroundColor: footerBackgroundColor,
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
