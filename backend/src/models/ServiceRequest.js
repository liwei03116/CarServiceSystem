const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  ownerContact: { type: String, required: true },
  ownerEmail: { type: String },
  address: { type: String, required: true },
  carName: { type: String },
  carType: { type: String, required: true },
  carRegistrationNumber: { type: String },
  service: {
    type: String,
    enum: ['oilChange', 'brakeService', 'engineRepair', 'tireRotation'],
    default: 'oilChange',
    required: true
  },
  description: { type: String },
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
