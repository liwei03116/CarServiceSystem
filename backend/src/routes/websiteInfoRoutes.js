const express = require('express');
const router = express.Router();
const {
  getWebsiteInfo,
  updateWebsiteInfo
} = require('../controllers/websiteInfoController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Public can get website info
router.get('/', getWebsiteInfo);

// Admin can update
router.put('/', protect, adminOnly, updateWebsiteInfo);

module.exports = router;
