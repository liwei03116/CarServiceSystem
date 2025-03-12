import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/api';

const GenerateReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleGenerate = () => {
    api.get('/admin/report', { params: { startDate, endDate } })
      .then(response => setReportData(response.data))
      .catch(err => console.error(err));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Generate Report
        </Typography>
        <Box component="form" sx={{ mb: 2 }}>
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            sx={{ mr: 2 }}
          />
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button variant="contained" onClick={handleGenerate}>
            Generate
          </Button>
        </Box>
        {reportData && (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Report</Typography>
            <pre>{JSON.stringify(reportData, null, 2)}</pre>
          </Paper>
        )}
        <Button variant="outlined" onClick={handlePrint}>
          Print Report
        </Button>
      </Box>
    </Box>
  );
};

export default GenerateReport;
