import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Dropdown } from 'react-native-paper';

const ServiceRequestForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput label="Customer Name" value={customerName} onChangeText={setCustomerName} style={{ marginBottom: 10 }} />
      <TextInput label="Service Type" value={serviceType} onChangeText={setServiceType} style={{ marginBottom: 10 }} />
      <TextInput label="Vehicle Model" value={vehicleModel} onChangeText={setVehicleModel} style={{ marginBottom: 10 }} />
      <Button mode="contained" onPress={() => alert('Service Request Submitted')}>Submit</Button>
    </View>
  );
};

export default ServiceRequestForm;
