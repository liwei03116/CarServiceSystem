const Service = require('../models/Service');

exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    return res.status(201).json(service);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().populate('category');
    return res.json(services);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Similar pattern for getServiceById, updateService, deleteService...
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('category');
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    return res.json(service);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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