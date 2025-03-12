import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  MenuItem,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AdminSidebar from "../../components/AdminSidebar";
import api from "../../api/api";
import ServiceRequestForm from "../../components/ServiceRequestForm"; // used for adding new request

// Helper function to format date/time as "yyyy-mm-dd HH:mm"
const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const statusOptions = ["Pending", "In Progress", "Done", "Cancelled"];

const ManageServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  // States for filtering
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterOwner, setFilterOwner] = useState("");
  // State to control Add New Request popup
  const [openAddModal, setOpenAddModal] = useState(false);
  // States for editing: when a row is to be edited, store its data here.
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // Function to refresh the list of requests
  const refreshRequests = () => {
    api
      .get("/requests")
      .then((response) => setRequests(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    refreshRequests();
  }, []);

  const handleDelete = (id) => {
    api
      .delete(`/requests/${id}`)
      .then(() => setRequests(requests.filter((r) => r._id !== id)))
      .catch((err) => console.error(err));
  };

  const handleStatusChange = (id, newStatus) => {
    // Directly update the status for the given row
    api
      .put(`/requests/${id}`, { status: newStatus })
      .then((response) => {
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? response.data : r))
        );
      })
      .catch((err) => console.error(err));
  };

  // When clicking "Edit", open the edit dialog with the row data.
  const handleEdit = (row) => {
    setEditData({ ...row });
    setOpenEditModal(true);
  };

  // When editing, update the editData state.
  const handleEditFieldChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  // Save changes from the edit dialog.
  const handleEditSave = () => {
    api
      .put(`/requests/${editData._id}`, editData)
      .then((response) => {
        setRequests((prev) =>
          prev.map((r) => (r._id === editData._id ? response.data : r))
        );
        setOpenEditModal(false);
        setEditData(null);
      })
      .catch((err) => console.error(err));
  };

  // Filter the requests based on owner name and status.
  const filteredRequests = requests.filter((req) => {
    const matchesOwner = req.ownerName
      .toLowerCase()
      .includes(filterOwner.toLowerCase());
    const matchesStatus = filterStatus === "All" || req.status === filterStatus;
    return matchesOwner && matchesStatus;
  });

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Service Requests
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => setOpenAddModal(true)}
        >
          Add New Request
        </Button>

        {/* Filter Controls */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Filter by Customer Name"
              value={filterOwner}
              onChange={(e) => setFilterOwner(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Filter by Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Customer Contact</TableCell>
                <TableCell>Customer Address</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Car Type</TableCell>
                <TableCell>Requested Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.map((req) => (
                <TableRow key={req._id}>
                  <TableCell>{req._id}</TableCell>
                  <TableCell>{req.ownerName}</TableCell>
                  <TableCell>{req.ownerContact}</TableCell>
                  <TableCell>{req.address}</TableCell>
                  <TableCell>{req.service}</TableCell>
                  <TableCell>{req.carType}</TableCell>
                  <TableCell>{formatDateTime(req.requestedDate)}</TableCell>
                  <TableCell>
                    <TextField
                      select
                      value={req.status}
                      onChange={(e) =>
                        handleStatusChange(req._id, e.target.value)
                      }
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => handleEdit(req)}>
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => handleDelete(req._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* Add New Request Popup */}
        <Dialog
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add New Service Request</DialogTitle>
          <DialogContent>
            <ServiceRequestForm
              onSuccess={() => {
                refreshRequests();
                setOpenAddModal(false);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddModal(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Request Popup */}
        <Dialog
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Service Request</DialogTitle>
          <DialogContent>
            {editData && (
              <Box component="form" sx={{ mt: 2 }}>
                {/* Owner Details */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Owner Name"
                  name="ownerName"
                  value={editData.ownerName}
                  onChange={(e) =>
                    handleEditFieldChange("ownerName", e.target.value)
                  }
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Owner Email"
                  name="ownerEmail"
                  type="email"
                  value={editData.ownerEmail}
                  onChange={(e) =>
                    handleEditFieldChange("ownerEmail", e.target.value)
                  }
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Address"
                  name="address"
                  value={editData.address}
                  onChange={(e) =>
                    handleEditFieldChange("address", e.target.value)
                  }
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Owner Contact"
                  name="ownerContact"
                  type="tel"
                  value={editData.ownerContact}
                  onChange={(e) =>
                    handleEditFieldChange("ownerContact", e.target.value)
                  }
                  required
                  inputProps={{ pattern: "[0-9]{10,15}" }}
                  helperText="Enter a valid phone number (10-15 digits)"
                />

                {/* Car Details */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Car Name"
                  name="carName"
                  value={editData.carName}
                  onChange={(e) =>
                    handleEditFieldChange("carName", e.target.value)
                  }
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Car Type"
                  name="carType"
                  value={editData.carType}
                  onChange={(e) =>
                    handleEditFieldChange("carType", e.target.value)
                  }
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
                  value={editData.carRegistrationNumber}
                  onChange={(e) =>
                    handleEditFieldChange(
                      "carRegistrationNumber",
                      e.target.value
                    )
                  }
                />

                {/* Service Selection */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Service"
                  name="service"
                  value={editData.service}
                  onChange={(e) =>
                    handleEditFieldChange("service", e.target.value)
                  }
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
                  value={
                    editData.requestedDate
                      ? editData.requestedDate.substring(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    handleEditFieldChange("requestedDate", e.target.value)
                  }
                  required
                />

                {/* Additional Details */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Description"
                  name="description"
                  value={editData.description}
                  onChange={(e) =>
                    handleEditFieldChange("description", e.target.value)
                  }
                  multiline
                  rows={4}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Request Type"
                  name="requestType"
                  value={editData.requestType}
                  onChange={(e) =>
                    handleEditFieldChange("requestType", e.target.value)
                  }
                  required
                  select
                >
                  <MenuItem value="Drop Off">Drop Off</MenuItem>
                  <MenuItem value="Pick Up">Pick Up</MenuItem>
                </TextField>
                <TextField
                  select
                  fullWidth
                  margin="normal"
                  label="Status"
                  name="status"
                  value={editData.status}
                  onChange={(e) =>
                    handleEditFieldChange("status", e.target.value)
                  }
                  required
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditModal(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ManageServiceRequests;
