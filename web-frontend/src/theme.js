import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: { main: '#1976d2' },
            secondary: { main: '#dc004e' }
          }
        : {
            primary: { main: '#90caf9' },
            secondary: { main: '#f48fb1' }
          })
    }
  });
