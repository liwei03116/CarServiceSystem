import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import api from "../api/api";

const ServiceRequestForm = ({ onSuccess }) => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerContact: "",
    ownerEmail: "",
    address: "",
    carName: "",
    carType: "",
    carRegistrationNumber: "",
    service: "",
    requestedDate: "",
    description: "",
    requestType: "", // "Drop Off" or "Pick Up"
  });
  const [success, setSuccess] = useState(null);

  // Fetch available services from backend (if available)
  useEffect(() => {
    api
      .get("/requests")
      .then((response) => setServices(response.data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // POST request; backend sets status (default "Pending") and requestedDate (if not provided)
    api
      .post("/requests", formData)
      .then(() => {
        setSuccess(true);
        setFormData({
          ownerName: "",
          ownerContact: "",
          ownerEmail: "",
          address: "",
          carName: "",
          carType: "",
          carRegistrationNumber: "",
          service: "",
          requestedDate: "",
          description: "",
          requestType: "",
        });
        // Call the onSuccess callback to notify the parent component.
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        console.error("Error submitting service request:", error);
        setSuccess(false);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Submit a Service Request
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        {/* Owner Details */}
        <TextField
          fullWidth
          margin="normal"
          label="Owner Name"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Owner Email"
          name="ownerEmail"
          type="email"
          value={formData.ownerEmail}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Owner Contact"
          name="ownerContact"
          value={formData.ownerContact}
          onChange={handleChange}
          required
          type="tel"
          inputProps={{ pattern: "[0-9]{10,15}" }}
          helperText="Enter a valid phone number (10-15 digits)"
        />

        {/* Car Details */}
        <TextField
          fullWidth
          margin="normal"
          label="Car Name"
          name="carName"
          value={formData.carName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Car Type"
          name="carType"
          value={formData.carType}
          onChange={handleChange}
          required
          select
        >
          <MenuItem value="Sedan">Sedan</MenuItem>
          <MenuItem value="SUV">SUV</MenuItem>
          <MenuItem value="Truck">Truck</MenuItem>
          <MenuItem value="Van">Van</MenuItem>
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          label="Car Registration Number"
          name="carRegistrationNumber"
          value={formData.carRegistrationNumber}
          onChange={handleChange}
        />

        {/* Service Selection */}
        <TextField
          fullWidth
          margin="normal"
          label="Service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          select
        >
          <MenuItem value="oilChange">Oil Change</MenuItem>
          <MenuItem value="brakeService">Brake Service</MenuItem>
          <MenuItem value="engineRepair">Engine Repair</MenuItem>
          <MenuItem value="tireRotation">Tire Rotation</MenuItem>
        </TextField>

        {/* Requested Date */}
        <TextField
          fullWidth
          margin="normal"
          label="Preferred Date and Time"
          name="requestedDate"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={formData.requestedDate}
          onChange={handleChange}
          required
        />

        {/* Additional Details */}
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Request Type"
          name="requestType"
          value={formData.requestType}
          onChange={handleChange}
          select
        >
          <MenuItem value="Drop Off">Drop Off</MenuItem>
          <MenuItem value="Pick Up">Pick Up</MenuItem>
        </TextField>

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit Request
        </Button>
        {success === true && (
          <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
            Service request submitted successfully!
          </Typography>
        )}
        {success === false && (
          <Typography variant="body1" color="error.main" sx={{ mt: 2 }}>
            Error submitting request. Please try again.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ServiceRequestForm;
