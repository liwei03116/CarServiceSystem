import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import {
  Card,
  Title,
  Button,
  Paragraph,
  Text,
  TextInput,
  Appbar,
} from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import api from "../api/api";

const ManageServiceRequestsScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for edit modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  // State for add modal, date picker and new request form data
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newRequestData, setNewRequestData] = useState({
    ownerName: "",
    ownerContact: "",
    ownerEmail: "",
    address: "",
    carName: "",
    carType: null,
    carRegistrationNumber: "",
    service: null,
    // We replace requestedDate with preferredDateTime to store ISO string
    preferredDateTime: null,
    description: "",
    requestType: "",
    status: "Pending",
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
    // Simple validation for required fields
    if (
      !newRequestData.ownerName.trim() ||
      !newRequestData.ownerContact.trim() ||
      !newRequestData.address.trim() ||
      !newRequestData.carType ||
      !newRequestData.service ||
      !newRequestData.preferredDateTime
    ) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return;
    }

    try {
      await api.post("/requests", newRequestData);
      fetchRequests();
      setAddModalVisible(false);
      // Reset form
      setNewRequestData({
        ownerName: "",
        ownerContact: "",
        ownerEmail: "",
        address: "",
        carName: "",
        carType: null,
        carRegistrationNumber: "",
        service: null,
        preferredDateTime: null,
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
        <Paragraph>
          Preferred Date:{" "}
          {item.requestedDate
            ? new Date(item.requestedDate).toLocaleString()
            : ""}
        </Paragraph>
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

      {/* Edit Request Modal (unchanged for brevity) */}
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
            <View style={styles.dateTimeContainer}>
        <Button
          mode="outlined"
          onPress={() => setShowDatePicker(true)}
        >
          {editData?.requestedDate
            ? new Date(editData.requestedDate).toLocaleString()
            : "Select Request Date & Time"}
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={
              editData?.requestedDate
                ? new Date(editData.requestedDate)
                : new Date()
            }
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                handleEditChange("requestedDate", selectedDate.toISOString());
              }
            }}
          />
        )}
      </View>
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

      {/* Add New Request Modal with enhanced UI */}
      <Modal visible={addModalVisible} animationType="slide" transparent>
        <View style={newRequestStyles.modalContainer}>
          <View style={newRequestStyles.modalContent}>
            <Appbar.Header style={newRequestStyles.modalHeader}>
              <Appbar.BackAction onPress={() => setAddModalVisible(false)} />
              <Appbar.Content title="Add New Request" />
            </Appbar.Header>
            <ScrollView contentContainerStyle={newRequestStyles.scrollViewContent}>
              <TextInput
                mode="outlined"
                label="Owner Name *"
                value={newRequestData.ownerName}
                onChangeText={(text) => handleAddChange("ownerName", text)}
                style={newRequestStyles.input}
              />
              <TextInput
                mode="outlined"
                label="Owner Email"
                value={newRequestData.ownerEmail}
                onChangeText={(text) => handleAddChange("ownerEmail", text)}
                style={newRequestStyles.input}
                keyboardType="email-address"
              />
              <TextInput
                mode="outlined"
                label="Owner Contact *"
                value={newRequestData.ownerContact}
                onChangeText={(text) => handleAddChange("ownerContact", text)}
                style={newRequestStyles.input}
                keyboardType="phone-pad"
              />
              <TextInput
                mode="outlined"
                label="Address *"
                value={newRequestData.address}
                onChangeText={(text) => handleAddChange("address", text)}
                style={newRequestStyles.input}
              />
              <RNPickerSelect
                onValueChange={(value) => handleAddChange("carType", value)}
                items={[
                  { label: "Sedan", value: "Sedan" },
                  { label: "SUV", value: "SUV" },
                  { label: "Truck", value: "Truck" },
                  { label: "Van", value: "Van" },
                ]}
                value={newRequestData.carType}
                placeholder={{ label: "Select Car Type *", value: null }}
                style={pickerSelectStyles}
              />
              <RNPickerSelect
                onValueChange={(value) => handleAddChange("service", value)}
                items={[
                  { label: "Oil Change", value: "Oil Change" },
                  { label: "Brake Service", value: "Brake Service" },
                  { label: "Engine Repair", value: "Engine Repair" },
                  { label: "Tire Rotation", value: "Tire Rotation" },
                ]}
                value={newRequestData.service}
                placeholder={{ label: "Select Service *", value: null }}
                style={pickerSelectStyles}
              />
              <View style={newRequestStyles.dateTimeContainer}>
                <Button mode="outlined" onPress={() => setShowDatePicker(true)}>
                  {newRequestData.preferredDateTime
                    ? new Date(newRequestData.preferredDateTime).toLocaleString()
                    : "Select Preferred Date & Time *"}
                </Button>
              </View>
              {showDatePicker && (
                <DateTimePicker
                  value={
                    newRequestData.preferredDateTime
                      ? new Date(newRequestData.preferredDateTime)
                      : new Date()
                  }
                  mode="datetime"
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      handleAddChange("preferredDateTime", selectedDate.toISOString());
                    }
                  }}
                />
              )}
              <TextInput
                mode="outlined"
                label="Description"
                value={newRequestData.description}
                onChangeText={(text) => handleAddChange("description", text)}
                style={newRequestStyles.input}
                multiline
                numberOfLines={3}
              />
              <TextInput
                mode="outlined"
                label="Request Type"
                value={newRequestData.requestType}
                onChangeText={(text) => handleAddChange("requestType", text)}
                style={newRequestStyles.input}
              />
              <View style={newRequestStyles.buttonRow}>
                <Button mode="contained" onPress={handleAddRequest}>
                  Submit
                </Button>
                <Button onPress={() => setAddModalVisible(false)} color="red">
                  Cancel
                </Button>
              </View>
            </ScrollView>
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
    marginBottom: 15,
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
    marginBottom: 15,
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
  input: { marginBottom: 15 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  dateTimeContainer: {
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

const newRequestStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    width: "95%",
    maxHeight: "95%",
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
  },
  modalHeader: {
    backgroundColor: "#6200ee",
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 40,
  },
  input: { marginBottom: 15 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  dateTimeContainer: {
    marginBottom: 15,
  },
});

export default ManageServiceRequestsScreen;
