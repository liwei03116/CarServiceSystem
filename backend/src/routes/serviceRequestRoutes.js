const express = require('express');
const router = express.Router();
const {
  createServiceRequest,
  getServiceRequests,
  updateServiceRequest,
  deleteServiceRequest
} = require('../controllers/serviceRequestController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Public can create service request
router.post('/', createServiceRequest);

// Admin can see all requests (with optional date filtering)
router.get('/', protect, adminOnly, getServiceRequests);

// Similarly for getServiceRequestById, updateServiceRequest, deleteServiceRequest...

// Admin can update a service request by ID
router.put('/:id', protect, adminOnly, updateServiceRequest);

// Admin can delete a service request by ID
router.delete('/:id', protect, adminOnly, deleteServiceRequest);

module.exports = router;
