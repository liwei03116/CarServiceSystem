import React from "react";
import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import api from '../api/api';

const ServiceItem = ({ service, customer }) => {
  const handleGenerateInvoice = async () => {
    // Build invoice data object from service and customer details
    const invoiceData = {
      invoiceNumber: service.invoiceNumber || `INV-${service._id}`,
      invoiceDate: new Date().toLocaleString(),
      serviceDate: new Date(service.serviceDate).toLocaleString(),
      serviceId: service._id,
      customerName: customer.name,
      customerAddress: customer.address,
      customerNumber: customer.contact,
      items: service.items || [],
      // Calculate totals if not stored (adjust if your data is already computed)
      exGstTotal: service.exGstTotal || service.items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
      gst: service.gst || (service.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) * 0.1),
      total: service.total || (service.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) * 1.1)
    };

    try {
      const res = api.get("/invoice/generate", invoiceData, {
        responseType: "blob"
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Error generating invoice", err);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{service.serviceType}</Typography>
        <Typography variant="body2" color="textSecondary">
          Service Date: {new Date(service.serviceDate).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleGenerateInvoice}>
          Generate Invoice
        </Button>
      </CardActions>
    </Card>
  );
};

export default ServiceItem;
