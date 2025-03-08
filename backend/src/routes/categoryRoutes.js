const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories
} = require('../controllers/categoryController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.post('/', protect, adminOnly, createCategory);
router.get('/', getCategories);

// Similarly for getCategoryById, updateCategory, deleteCategory...

module.exports = router;
