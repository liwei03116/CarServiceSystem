import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import { Card, Title, Button, Paragraph, Text, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import api from "../api/api";

const ManageServiceRequestsScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for edit modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  
  // State for add modal and new request form data
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newRequestData, setNewRequestData] = useState({
    ownerName: "",
    ownerContact: "",
    ownerEmail: "",
    address: "",
    carName: "",
    carType: "",
    carRegistrationNumber: "",
    service: "",
    requestedDate: "",
    description: "",
    requestType: "",
    status: "Pending", // default status for new requests
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/requests");
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching requests", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/requests/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      Alert.alert("Error", "Could not delete request");
    }
  };

  // For editing an existing request
  const handleEditPress = (item) => {
    setEditData(item);
    setEditModalVisible(true);
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/requests/${editData._id}`, editData);
      setRequests((prev) =>
        prev.map((r) => (r._id === editData._id ? editData : r))
      );
      setEditModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "Could not update request");
    }
  };

  // For adding a new request
  const handleAddChange = (field, value) => {
    setNewRequestData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddRequest = async () => {
    try {
      await api.post("/requests", newRequestData);
      fetchRequests();
      setAddModalVisible(false);
      // Reset new request form
      setNewRequestData({
        ownerName: "",
        ownerContact: "",
        ownerEmail: "",
        address: "",
        carName: "",
        carType: "",
        carRegistrationNumber: "",
        service: "",
        requestedDate: "",
        description: "",
        requestType: "",
        status: "Pending",
      });
    } catch (error) {
      Alert.alert("Error", "Could not add request");
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.ownerName}</Title>
        <Paragraph>Status: {item.status}</Paragraph>
        <Paragraph>Owner Contact: {item.ownerContact}</Paragraph>
        <Paragraph>Address: {item.address}</Paragraph>
        <Paragraph>Request Date: {item.requestedDate}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => handleEditPress(item)}>Edit</Button>
        <Button onPress={() => handleDelete(item._id)} color="red">
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
      <Button mode="contained" onPress={() => setAddModalVisible(true)}>
        Add New Request
      </Button>

      {/* Edit Request Modal */}
      <Modal visible={editModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Request</Text>
            <TextInput
              mode="outlined"
              label="Owner Name"
              value={editData?.ownerName}
              onChangeText={(text) => handleEditChange("ownerName", text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Owner Contact"
              value={editData?.ownerContact}
              onChangeText={(text) => handleEditChange("ownerContact", text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Address"
              value={editData?.address}
              onChangeText={(text) => handleEditChange("address", text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Service"
              value={editData?.service}
              onChangeText={(text) => handleEditChange("service", text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Request Date"
              value={editData?.requestedDate}
              onChangeText={(text) => handleEditChange("requestedDate", text)}
              style={styles.input}
            />

            {/* Dropdown for Status */}
            <RNPickerSelect
              onValueChange={(value) => handleEditChange("status", value)}
              items={[
                { label: "Pending", value: "Pending" },
                { label: "In Progress", value: "In Progress" },
                { label: "Done", value: "Done" },
                { label: "Cancelled", value: "Cancelled" },
              ]}
              value={editData?.status}
              placeholder={{ label: "Select Status", value: null }}
              style={pickerSelectStyles}
            />

            <View style={styles.buttonRow}>
              <Button mode="contained" onPress={handleSaveEdit}>
                Save
              </Button>
              <Button onPress={() => setEditModalVisible(false)} color="red">
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add New Request Modal */}
      <Modal visible={addModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Request</Text>
            <TextInput
              mode="outlined"
              label="Owner Name"
              value={newRequestData.ownerName}
              onChangeText={(text) => handleAddChange("ownerName", text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Owner Email"
              value={newRequestData.ownerEmail}
              onChangeText={(text) => handleAddChange("ownerEmail", text)}
              style={styles.input}
              keyboardType="email-address"
            />
            <TextInput
              mode="outlined"
              label="Owner Contact"
              value={newRequestData.ownerContact}
              onChangeText={(text) => handleAddChange("ownerContact", text)}
              style={styles.input}
              keyboardType="phone-pad"
            />
            <TextInput
              mode="outlined"
              label="Address"
              value={newRequestData.address}
              onChangeText={(text) => handleAddChange("address", text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Car Name"
              value={newRequestData.carName}
              onChangeText={(text) => handleAddChange("carName", text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Car Type"
              value={newRequestData.carType}
              onChangeText={(text) => handleAddChange("carType", text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Car Registration Number"
              value={newRequestData.carRegistrationNumber}
              onChangeText={(text) => handleAddChange("carRegistrationNumber", text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Service"
              value={newRequestData.service}
              onChangeText={(text) => handleAddChange("service", text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Preferred Date"
              value={newRequestData.requestedDate}
              onChangeText={(text) => handleAddChange("requestedDate", text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Description"
              value={newRequestData.description}
              onChangeText={(text) => handleAddChange("description", text)}
              style={styles.input}
              multiline
              numberOfLines={3}
            />
            <TextInput
              mode="outlined"
              label="Request Type"
              value={newRequestData.requestType}
              onChangeText={(text) => handleAddChange("requestType", text)}
              style={styles.input}
            />
            {/* Optional: Allow user to change status if needed; else default is "Pending" */}
            <RNPickerSelect
              onValueChange={(value) => handleAddChange("status", value)}
              items={[
                { label: "Pending", value: "Pending" },
                { label: "In Progress", value: "In Progress" },
                { label: "Done", value: "Done" },
                { label: "Cancelled", value: "Cancelled" },
              ]}
              value={newRequestData.status}
              placeholder={{ label: "Select Status", value: null }}
              style={pickerSelectStyles}
            />

            <View style={styles.buttonRow}>
              <Button mode="contained" onPress={handleAddRequest}>
                Submit
              </Button>
              <Button onPress={() => setAddModalVisible(false)} color="red">
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
  },
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { marginBottom: 15 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default ManageServiceRequestsScreen;
