import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const ServiceRequestEditForm = ({ route }) => {
  const { requestId } = route.params;
  const [status, setStatus] = useState('Pending');

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput label="Request ID" value={requestId} disabled style={{ marginBottom: 10 }} />
      <TextInput label="Status" value={status} onChangeText={setStatus} style={{ marginBottom: 10 }} />
      <Button mode="contained" onPress={() => alert('Service Request Updated')}>Update</Button>
    </View>
  );
};

export default ServiceRequestEditForm;
