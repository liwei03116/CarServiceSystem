import React, { useEffect, useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/api';

const ManageMechanics = () => {
  // State for mechanics list
  const [mechanics, setMechanics] = useState([]);
  // State for Add modal and form data
  const [openAdd, setOpenAdd] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    specialization: '',
    status: 'active',
  });
  // State for Edit modal and edit data
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  // Fetch mechanics on mount
  useEffect(() => {
    api.get('/mechanics')
      .then((response) => setMechanics(response.data))
      .catch((err) => console.error(err));
  }, []);

  // --- Add New Mechanic functions ---
  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setFormData({
      name: '',
      contact: '',
      email: '',
      specialization: '',
      status: 'active',
    });
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    api.post('/mechanics', formData)
      .then((response) => {
        setMechanics((prev) => [...prev, response.data]);
        handleCloseAdd();
      })
      .catch((err) => console.error(err));
  };

  // --- Edit Mechanic functions ---
  const handleEditPress = (mechanic) => {
    setEditData(mechanic);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditData(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    api.put(`/mechanics/${editData._id}`, editData)
      .then((response) => {
        setMechanics((prev) =>
          prev.map((m) => (m._id === editData._id ? response.data : m))
        );
        handleCloseEdit();
      })
      .catch((err) => console.error(err));
  };

  // --- Delete function ---
  const handleDelete = (id) => {
    api.delete(`/mechanics/${id}`)
      .then(() => {
        setMechanics((prev) => prev.filter((m) => m._id !== id));
      })
      .catch((err) => console.error(err));
  };

  const renderItem = ({ item }) => (
    <TableRow key={item._id}>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.contact}</TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell>{item.specialization}</TableCell>
      <TableCell>{item.status}</TableCell>
      <TableCell>
        <Button color="primary" onClick={() => handleEditPress(item)}>Edit</Button>
        <Button color="secondary" onClick={() => handleDelete(item._id)}>Delete</Button>
      </TableCell>
    </TableRow>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Mechanics
        </Typography>
        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleClickOpenAdd}>
          Add New Mechanic
        </Button>

        {/* Add Mechanic Dialog */}
        <Dialog open={openAdd} onClose={handleCloseAdd}>
          <DialogTitle>Add New Mechanic</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleAddSubmit} sx={{ mt: 2 }}>
              <TextField
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleAddChange}
                required
              />
              <TextField
                margin="dense"
                name="contact"
                label="Contact"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.contact}
                onChange={handleAddChange}
                required
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleAddChange}
                required
              />
              <TextField
                margin="dense"
                name="specialization"
                label="Specialization"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.specialization}
                onChange={handleAddChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleAddChange}
                required
                select
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
              <DialogActions>
                <Button onClick={handleCloseAdd} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Add Mechanic
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Edit Mechanic Dialog */}
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle>Edit Mechanic</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSaveEdit} sx={{ mt: 2 }}>
              <TextField
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={editData?.name || ''}
                onChange={handleEditChange}
                required
              />
              <TextField
                margin="dense"
                name="contact"
                label="Contact"
                type="text"
                fullWidth
                variant="outlined"
                value={editData?.contact || ''}
                onChange={handleEditChange}
                required
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={editData?.email || ''}
                onChange={handleEditChange}
                required
              />
              <TextField
                margin="dense"
                name="specialization"
                label="Specialization"
                type="text"
                fullWidth
                variant="outlined"
                value={editData?.specialization || ''}
                onChange={handleEditChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Status"
                name="status"
                value={editData?.status || ''}
                onChange={handleEditChange}
                required
                select
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
              <DialogActions>
                <Button onClick={handleCloseEdit} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

        <Paper sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mechanics.map((mechanic) => (
                <TableRow key={mechanic._id}>
                  <TableCell>{mechanic.name}</TableCell>
                  <TableCell>{mechanic.contact}</TableCell>
                  <TableCell>{mechanic.email}</TableCell>
                  <TableCell>{mechanic.specialization}</TableCell>
                  <TableCell>{mechanic.status}</TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => handleEditPress(mechanic)}>
                      Edit
                    </Button>
                    <Button color="secondary" onClick={() => handleDelete(mechanic._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
};

export default ManageMechanics;
