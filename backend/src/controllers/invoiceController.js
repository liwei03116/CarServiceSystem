const ServiceRequest = require('../models/ServiceRequest');

exports.generateInvoice = async (req, res) => {
  try {
    const { customerContact, invoiceDate } = req.query;
    
    if (!customerContact || !invoiceDate) {
      return res.status(400).json({ message: "Customer contact and invoice date are required" });
    }
    
    // Convert invoiceDate to a Date object and define start/end of day
    const start = new Date(invoiceDate);
    const end = new Date(invoiceDate);
    end.setHours(23, 59, 59, 999);
    
    // Find all service requests for the given customer contact on the specified day
    const requests = await ServiceRequest.find({
      ownerContact: customerContact,
      requestedDate: { $gte: start, $lte: end },
    }).populate('service').populate('assignedMechanic');
    
    // Generate an invoice summary – you can customize the summary as needed.
    const invoice = {
      customerContact,
      invoiceDate,
      totalRequests: requests.length,
      requests,
    };
    
    return res.json(invoice);
  } catch (error) {
    console.error("Error generating invoice:", error);
    return res.status(500).json({ message: error.message });
  }
};
