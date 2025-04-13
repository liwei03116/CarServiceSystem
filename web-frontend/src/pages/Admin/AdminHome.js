import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AdminSidebar from "../../components/AdminSidebar";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const AdminHome = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    mechanics: 0,
    services: 0,
    requests: 0,
    users: 0,
  });

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  useEffect(() => {
    api
      .get("/users")
      .then((res) => setStats((prev) => ({ ...prev, users: res.data.length })))
      .catch((err) => console.error(err));

    api
      .get("/mechanics")
      .then((res) =>
        setStats((prev) => ({ ...prev, mechanics: res.data.length }))
      )
      .catch((err) => console.error(err));

    api
      .get("/services/dashboard")
      .get("/services")
      .then((res) =>
        setStats((prev) => ({ ...prev, services: res.data.length }))
      )
      .catch((err) => console.error(err));

    api
      .get("/requests")
      .then((res) =>
        setStats((prev) => ({ ...prev, requests: res.data.length }))
      )
      .catch((err) => console.error(err));
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4">Dashboard</Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        <Container sx={{ py: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">{stats.users}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6">Total Mechanics</Typography>
                <Typography variant="h4">{stats.mechanics}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6">Total Services</Typography>
                <Typography variant="h4">{stats.services}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6">Total Requests</Typography>
                <Typography variant="h4">{stats.requests}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminHome;
