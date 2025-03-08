const mongoose = require('mongoose');

const websiteInfoSchema = new mongoose.Schema({
  aboutUs: { type: String, default: '' },
  contactEmail: { type: String, default: '' },
  contactPhone: { type: String, default: '' },
  address: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WebsiteInfo', websiteInfoSchema);
