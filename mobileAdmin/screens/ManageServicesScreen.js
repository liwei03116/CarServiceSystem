import React, { useEffect, useState } from 'react';
import { FlatList, View, Platform, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import {
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Dialog,
  Portal,
  TextInput,
  Snackbar,
  ActivityIndicator
} from 'react-native-paper';
import api from "../api/api";

// Helper to format date
const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const ManageServicesScreen = () => {
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({ description: '', price: '' });
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await api.get('/services');
      setServices(response.data.data);
    } catch (error) {
      console.error(error);
      setSnackbarMsg('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openDialog = (item) => {
    setSelected(item);
    setFormData({
      description: item.description || '',
      price: item.price ? String(item.price) : ''
    });
    setVisible(true);
  };

  const closeDialog = () => {
    setVisible(false);
    setSelected(null);
  };

  const handleUpdate = async () => {
    if (!selected) return;

    try {
      const updated = {
        ...selected,
        description: formData.description,
        price: formData.price
      };

      await api.put(`/services/${selected._id}`, updated);
      setSnackbarMsg('Service updated');
      closeDialog();
      fetchServices(); // Refresh list
    } catch (error) {
      console.error(error);
      setSnackbarMsg('Update failed');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchServices().then(() => setRefreshing(false));
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {loading ? (
        <ActivityIndicator animating size="large" />
      ) : (
        <FlatList
          data={services}
          keyExtractor={item => item._id}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <Card style={{ marginVertical: 5 }} onPress={() => openDialog(item)}>
              <Card.Content>
                <Title>{item.ownerName}</Title>
                <Paragraph>Contact: {item.ownerContact}</Paragraph>
                <Paragraph>Description: {item.description}</Paragraph>
                <Paragraph>Date: {formatDateTime(item.requestedDate)}</Paragraph>
                <Paragraph>Price: ${item.price}</Paragraph>
              </Card.Content>
            </Card>
          )}
        />
      )}

<Portal>
  <Dialog
    visible={visible}
    onDismiss={closeDialog}
    style={{
      maxHeight: Dimensions.get('window').height * 0.85, // Use 85% of screen height
    }}
  >
    <Dialog.Title>Update Service</Dialog.Title>

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
    >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <Dialog.Content>
          <TextInput
            label="Customer Name"
            value={selected?.ownerName || ''}
            disabled
            style={{ marginBottom: 10 }}
          />
          <TextInput
            label="Customer Contact"
            value={selected?.ownerContact || ''}
            disabled
            style={{ marginBottom: 10 }}
          />
          <TextInput
            label="Description"
            multiline
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
            style={{ marginBottom: 10, minHeight: 80 }}
            textAlignVertical="top"
          />
          <TextInput
            label="Price"
            keyboardType="numeric"
            value={formData.price}
            onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
          />
        </Dialog.Content>
      </ScrollView>
    </KeyboardAvoidingView>

    <Dialog.Actions>
      <Button onPress={closeDialog}>Cancel</Button>
      <Button onPress={handleUpdate}>Update</Button>
    </Dialog.Actions>
  </Dialog>
</Portal>

      <Snackbar
        visible={!!snackbarMsg}
        onDismiss={() => setSnackbarMsg('')}
        duration={3000}
      >
        {snackbarMsg}
      </Snackbar>
    </View>
  );
};

export default ManageServicesScreen;
