const express = require('express');
const router = express.Router();
const { generateInvoice } = require('../controllers/invoiceController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// GET /admin/invoice
router.get('/invoice', protect, adminOnly, generateInvoice);

module.exports = router;
