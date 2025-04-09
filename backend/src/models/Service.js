const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true
  },
  ownerContact: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0
  },
  requestedDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Service', serviceSchema);
