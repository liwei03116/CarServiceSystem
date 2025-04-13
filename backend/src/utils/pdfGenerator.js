const PDFDocument = require('pdfkit');
const moment = require('moment');

const generateEnhancedInvoicePDF = async (invoiceData) => {
  const services = invoiceData.services || [];
  const customer = services[0] || {};

  const invoiceNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
  const invoiceDate = moment().format('DD-MMM-YYYY HH:mm');
  const total = services.reduce((sum, s) => sum + s.price, 0);
  const gst = (total * 0.1).toFixed(2);
  const exGST = (total - gst).toFixed(2);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];

    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => {
      const buffer = Buffer.concat(chunks);
      resolve(buffer);
    });

    doc.on('error', reject);

    // Header
    doc.fontSize(12).text('Super Cheap Auto Pty Ltd - Bayswater', 50, 40);
    doc.text('ABN 511 1066 7411');
    doc.text('191 CANTERBURY ROAD');
    doc.text('BAYSWATER VIC 3153');
    doc.text('Telephone: 03 8706 5510');

    doc.fontSize(16).text('Tax Invoice', 400, 40, { align: 'right' });
    doc.fontSize(12).text(`Invoice Number: ${invoiceNumber}`, 400, 65, { align: 'right' });
    doc.text(`Invoice Date: ${invoiceDate}`, { align: 'right' });
    doc.text(`Sale Date: ${invoiceDate}`, { align: 'right' });

    // Customer
    doc.moveDown(2);
    doc.text('Bill to:', 50);
    doc.text(customer.ownerName || 'Customer');
    doc.text(customer.ownerContact || '');

    // Table Header
    doc.moveDown().text('Item', 50).text('Description', 100).text('Qty', 350).text('Price', 400);

    // Items
    doc.moveDown(0.5);
    services.forEach((service, i) => {
      doc.text(`#${i + 1}`, 50);
      doc.text(service.description, 100);
      doc.text('1', 350);
      doc.text(`$${service.price.toFixed(2)}`, 400);
      doc.moveDown(0.5);
    });

    // Totals
    doc.moveDown(1);
    doc.text(`Item total - ex GST: $${exGST}`);
    doc.text(`GST: $${gst}`);
    doc.text(`Invoice amount (inc GST): $${total.toFixed(2)}`);

    doc.text('# Indicates taxable supply', 50, doc.y + 20);

    doc.end(); // Triggers 'end' event above
  });
};

module.exports = generateEnhancedInvoicePDF;
