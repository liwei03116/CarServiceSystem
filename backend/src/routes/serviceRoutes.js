const express = require('express');
const router = express.Router();
const {
  createService,
  getServices
} = require('../controllers/serviceController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.post('/', protect, adminOnly, createService);
router.get('/', getServices);

// Similarly for getServiceById, updateService, deleteService...

module.exports = router;
