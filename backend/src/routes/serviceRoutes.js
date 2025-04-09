const express = require('express');
const router = express.Router();
const {
  createService,
  getServices,
  updateService
} = require('../controllers/serviceController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const ServiceRequest = require('../models/ServiceRequest');
const Service = require('../models/Service');

router.post('/', protect, adminOnly, createService);
router.get('/', getServices);
// Admin can update a service request by ID
router.put('/:id', protect, adminOnly, updateService);
router.get('/manageService', async (req, res) => {
  try {
    // Retrieve in-progress service requests with necessary fields (including requestedDate)
    const inProgressRequests = await ServiceRequest.find(
      { status: 'In Progress' },
      'ownerName ownerContact description requestedDate'
    );
    
    const savedServices = [];

    for (const request of inProgressRequests) {
      // Convert requestedDate to a Date object (if not already)
      const reqDate = new Date(request.requestedDate);
      
      // Calculate the start and end of the day for the requestedDate
      const startOfDay = new Date(reqDate.getFullYear(), reqDate.getMonth(), reqDate.getDate());
      const endOfDay = new Date(reqDate.getFullYear(), reqDate.getMonth(), reqDate.getDate() + 1);
      
      // Check if a service with the same ownerName and requestedDate (within the same day) already exists
      const existingService = await Service.findOne({
        ownerName: request.ownerName,
        requestedDate: { $gte: startOfDay, $lt: endOfDay }
      });
      
      // Only create a new Service if one does not exist
      if (!existingService) {
        const newService = new Service({
          ownerName: request.ownerName,
          ownerContact: request.ownerContact,
          description: request.description,
          requestedDate: request.requestedDate  // copy the date as is
        });
        
        const savedService = await newService.save();
        savedServices.push(savedService);
      }
    }
    const allServices = await Service.find();
    res.status(200).json({ data: allServices });
  } catch (error) {
    console.error('Error retrieving and storing service requests:', error);
    res.status(500).json({ message: 'Error retrieving and storing service requests.' });
  }
});

// Similarly for getServiceById, updateService, deleteService...

module.exports = router;
