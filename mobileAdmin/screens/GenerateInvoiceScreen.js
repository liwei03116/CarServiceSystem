import React, { useState } from 'react';
import { ScrollView, Alert, View } from 'react-native';
import { TextInput, Button, DataTable, Checkbox, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { Buffer } from 'buffer';
import api from '../api/api';

const GenerateInvoiceScreen = () => {
  const [customerContact, setCustomerContact] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const res = await api.get(`/services/getServicesByContact/${customerContact}`);
      setServices(res.data);
      setSelectedServices([]);
      setError('');
    } catch {
      setServices([]);
      setSelectedServices([]);
      setError('No services found or an error occurred.');
    }
  };

  const handleGenerateInvoice = async () => {
    if (!selectedServices.length) {
      Alert.alert('Error', 'Please select at least one service.');
      return;
    }

    try {
      const selected = services.filter(s => selectedServices.includes(s._id));
      const payload = { services: selected };
      if (invoiceDate) payload.invoiceDate = invoiceDate;

      const response = await api.post(
        '/invoice/generate',
        payload,
        { responseType: 'arraybuffer' }
      );

      const base64 = Buffer.from(response.data, 'binary').toString('base64');
      const fileUri = FileSystem.documentDirectory + 'invoice.pdf';
      await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 });
      await Sharing.shareAsync(fileUri, { mimeType: 'application/pdf' });
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to generate or share invoice.');
    }
  };

  const handlePrint = async () => {
    if (!selectedServices.length) {
      Alert.alert('Error', 'Please select at least one service.');
      return;
    }

    try {
      const selected = services.filter(s => selectedServices.includes(s._id));
      const payload = { services: selected };
      if (invoiceDate) payload.invoiceDate = invoiceDate;

      const response = await api.post(
        '/invoice/generate',
        payload,
        { responseType: 'arraybuffer' }
      );

      const base64 = Buffer.from(response.data, 'binary').toString('base64');
      const fileUri = FileSystem.documentDirectory + 'invoice.pdf';
      await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 });
      await Print.printAsync({ uri: fileUri });
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to generate or print invoice.');
    }
  };

  const handleSelectService = id => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedServices(prev =>
      prev.length === services.length ? [] : services.map(s => s._id)
    );
  };

  const isAllSelected = services.length > 0 && selectedServices.length === services.length;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Generate Invoice
      </Text>

      <TextInput
        label="Customer Contact"
        value={customerContact}
        onChangeText={setCustomerContact}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />

      <TextInput
        label="Invoice Date (optional)"
        value={invoiceDate}
        placeholder="Select date"
        mode="outlined"
        style={{ marginBottom: 16 }}
        onFocus={() => setShowDatePicker(true)}
      />

      {showDatePicker && (
        <DateTimePicker
          value={invoiceDate ? new Date(invoiceDate) : new Date()}
          mode="date"
          display="default"
          onChange={(e, date) => {
            setShowDatePicker(false);
            if (date) setInvoiceDate(date.toISOString().split('T')[0]);
          }}
        />
      )}

      <Button mode="contained" onPress={handleSearch} style={{ marginVertical: 4 }}>
        Search
      </Button>
      <Button
        mode="contained"
        onPress={handleGenerateInvoice}
        disabled={!selectedServices.length}
        style={{ marginVertical: 4 }}
      >
        Generate & Share
      </Button>
      <Button
        mode="outlined"
        onPress={handlePrint}
        disabled={!selectedServices.length}
        style={{ marginVertical: 4 }}
      >
        Print Invoice
      </Button>

      {error ? <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text> : null}

      <DataTable style={{ marginTop: 24 }}>
        {/* Custom header row to ensure full visibility */}
        <DataTable.Header style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 40, alignItems: 'center' }}>
            <Checkbox
              status={isAllSelected ? 'checked' : 'unchecked'}
              onPress={handleSelectAll}
            />
          </View>
          <DataTable.Title style={{ flex: 2 }}>Owner</DataTable.Title>
          <DataTable.Title style={{ flex: 2 }}>Requested</DataTable.Title>
          <DataTable.Title style={{ flex: 1 }} numeric>Price</DataTable.Title>
        </DataTable.Header>

        {services.map(service => (
          <DataTable.Row key={service._id} style={{ minHeight: 48, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 40, alignItems: 'center' }}>
              <Checkbox
                status={selectedServices.includes(service._id) ? 'checked' : 'unchecked'}
                onPress={() => handleSelectService(service._id)}
              />
            </View>
            <DataTable.Cell style={{ flex: 2 }}>{service.ownerName}</DataTable.Cell>
            <DataTable.Cell style={{ flex: 2 }}>
              {new Date(service.requestedDate).toLocaleString()}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }} numeric>
              ${service.price}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

export default GenerateInvoiceScreen;
