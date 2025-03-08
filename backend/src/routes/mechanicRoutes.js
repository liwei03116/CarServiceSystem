const express = require('express');
const router = express.Router();
const {
  createMechanic,
  getMechanics,
  getMechanicById,
  updateMechanic,
  deleteMechanic
} = require('../controllers/mechanicController');

const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Admin routes
router.post('/', protect, adminOnly, createMechanic);
router.get('/', protect, adminOnly, getMechanics);
router.get('/:id', protect, adminOnly, getMechanicById);
router.put('/:id', protect, adminOnly, updateMechanic);
router.delete('/:id', protect, adminOnly, deleteMechanic);

module.exports = router;
