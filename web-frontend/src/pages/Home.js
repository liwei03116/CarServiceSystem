import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import VehicleCategoryList from "../components/VehicleCategoryList";
import ServiceList from "../components/ServiceList";
import ServiceRequestForm from "../components/ServiceRequestForm";
import AboutUs from "../components/AboutUs";

const Home = () => {
  return (
    <div>
      {/* Welcome Section */}
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          backgroundImage: `url('/images/home_page_bg.jpg')`, // update this path to your background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom sx={{ color: 'white' }}>
            Welcome to Our Car Service Shop
          </Typography>
          <Typography variant="h6" sx={{ color: 'white' }}>
            Quality services for your vehicle. Explore our offerings and submit
            a service request today!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/services"
          >
            Our Services
          </Button>
        </Container>
      </Box>

      {/* Vehicle Categories */}
      {/*<VehicleCategoryList />*/}

      {/* Services Provided */}
      <ServiceList onBook={() => {}} />

      {/* Service Request Form */}
      <ServiceRequestForm />

      {/* About Us */}
      <AboutUs />
    </div>
  );
};

export default Home;
