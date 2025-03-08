const express = require('express');
const router = express.Router();
const {
  createServiceRequest,
  getServiceRequests
} = require('../controllers/serviceRequestController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Public can create service request
router.post('/', createServiceRequest);

// Admin can see all requests (with optional date filtering)
router.get('/', protect, adminOnly, getServiceRequests);

// Similarly for getServiceRequestById, updateServiceRequest, deleteServiceRequest...

module.exports = router;
