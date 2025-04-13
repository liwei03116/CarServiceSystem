const Service = require('../models/Service');
const ServiceRequest = require('../models/ServiceRequest');

exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    return res.status(201).json(service);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getServicesDashBoard = async (req, res) => {
  try {
    const services = await Service.find();
    return res.json(services);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getServices = async (req, res) => {
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
};

exports.updateService = async (req, res) => {
  try {
    const { id } = req.params; // Extract the service ID from the request parameters
    const updateData = req.body; // The data to update

    // Find the service by ID and update it with the new data
    const updatedService = await Service.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true // Run validators to ensure data integrity
    });

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    return res.json(updatedService);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// GET /api/services/by-contact/:contact
exports.getServicesByContact = async (req, res) => {
  try {
    const contact = req.params.contact;
    const services = await Service.find({ ownerContact: contact });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { id } = req.params; // Extract the service ID from the request parameters
    const updateData = req.body; // The data to update

    // Find the service by ID and update it with the new data
    const updatedService = await Service.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true // Run validators to ensure data integrity
    });

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    return res.json(updatedService);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};