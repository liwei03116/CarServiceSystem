import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BuildIcon from '@mui/icons-material/Build';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';
import ReportIcon from '@mui/icons-material/Report';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
 {/* import AccountBoxIcon from '@mui/icons-material/AccountBox';*/}

const sidebarContent = (
  <Box sx={{ width: 250, height: '100%', paddingTop: 2 }}>
    <List>
      <ListItem button component={Link} to="/admin">
        <ListItemIcon><DashboardIcon /></ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <Divider />
      <ListItem button component={Link} to="/admin/mechanics">
        <ListItemIcon><BuildIcon /></ListItemIcon>
        <ListItemText primary="Manage Mechanics" />
      </ListItem>
      <ListItem button component={Link} to="/admin/service-requests">
        <ListItemIcon><AssignmentIcon /></ListItemIcon>
        <ListItemText primary="Service Requests" />
      </ListItem>
      <ListItem button component={Link} to="/admin/vehicle-categories">
        <ListItemIcon><CategoryIcon /></ListItemIcon>
        <ListItemText primary="Vehicle Categories" />
      </ListItem>
      <ListItem button component={Link} to="/admin/services">
        <ListItemIcon><BuildIcon /></ListItemIcon>
        <ListItemText primary="Manage Services" />
      </ListItem>
      <ListItem button component={Link} to="/admin/invoice">
        <ListItemIcon><ReportIcon /></ListItemIcon>
        <ListItemText primary="Generate Invoice" />
      </ListItem>
      <ListItem button component={Link} to="/admin/report">
        <ListItemIcon><ReportIcon /></ListItemIcon>
        <ListItemText primary="Generate Report" />
      </ListItem>
      <Divider />
      <ListItem button component={Link} to="/admin/users">
        <ListItemIcon><PeopleIcon /></ListItemIcon>
        <ListItemText primary="Manage Users" />
      </ListItem>
      <ListItem button component={Link} to="/admin/website-info">
        <ListItemIcon><InfoIcon /></ListItemIcon>
        <ListItemText primary="Website Info" />
      </ListItem>
      {/* 
      <ListItem button component={Link} to="/admin/account">
        <ListItemIcon><AccountBoxIcon /></ListItemIcon>
        <ListItemText primary="Account Credentials" />
      </ListItem>
      */}
    </List>
  </Box>
);

const AdminSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <Box sx={{ display: { xs: 'block', sm: 'none' }, p: 1 }}>
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
      </Box>
      {/* Permanent Sidebar for larger screens */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        {sidebarContent}
      </Box>
      {/* Drawer for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 }
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default AdminSidebar;
