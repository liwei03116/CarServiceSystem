import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        sx={{ my: 2 }}
        component={Link}
        to="/"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        Car Service System
      </Typography>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/services">
          <ListItemText primary="Services" />
        </ListItem>
        <ListItem button component={Link} to="/booking">
          <ListItemText primary="Booking" />
        </ListItem>
        {auth ? (
          <>
            <ListItem button component={Link} to="/admin">
              <ListItemText primary="Admin Dashboard" />
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={Link} to="/admin/login">
            <ListItemText primary="Admin" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Title on the left */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              Car Service System
            </Typography>
            {/* Navigation buttons on the right (for sm and up) */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/services">
                Services
              </Button>
              <Button color="inherit" component={Link} to="/booking">
                Booking
              </Button>
              {auth ? (
                <>
                  <Button color="inherit" component={Link} to="/admin">
                    Admin Dashboard
                  </Button>
                  <Button color="inherit" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button color="inherit" component={Link} to="/admin/login">
                  Admin
                </Button>
              )}
            </Box>
            {/* Menu icon for mobile (on xs screens) */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better performance on mobile.
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;
