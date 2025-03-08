const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  ownerContact: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  address: { type: String },
  carName: { type: String, required: true },
  carType: { type: String, required: true },
  carRegistrationNumber: { type: String, required: true },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  requestType: { type: String }, // e.g., "Drop Off", "Pick Up"
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Done', 'Cancelled'],
    default: 'Pending'
  },
  assignedMechanic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mechanic'
  },
  requestedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
