const express = require('express');
const router = express.Router();
const { generateInvoice } = require('../controllers/invoiceController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const generateEnhancedInvoicePDF = require("../utils/pdfGenerator");


// GET /admin/invoice
router.get('/invoice', protect, adminOnly, generateInvoice);

// POST /api/invoice/generate
router.post("/generate", async (req, res) => {
    try {
      const invoiceData = req.body;
      const pdfBuffer = await generateEnhancedInvoicePDF(invoiceData);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
      res.send(pdfBuffer);
    } catch (err) {
      console.error("Invoice generation error:", err);
      res.status(500).send("Error generating invoice PDF");
    }
});

module.exports = router;
