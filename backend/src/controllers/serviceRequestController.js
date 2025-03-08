const ServiceRequest = require('../models/ServiceRequest');

exports.createServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.create(req.body);
    return res.status(201).json(serviceRequest);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getServiceRequests = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let query = {};
    if (startDate && endDate) {
      query.requestedDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const requests = await ServiceRequest.find(query)
      .populate('service')
      .populate('assignedMechanic');
    return res.json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Additional CRUD: getServiceRequestById, updateServiceRequest, deleteServiceRequest...
exports.getServiceRequestById = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id)
      .populate('service')
      .populate('assignedMechanic');
    if (!serviceRequest) {
      return res.status(404).json({ message: 'Service request not found' });
    }
    return res.json(serviceRequest);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};