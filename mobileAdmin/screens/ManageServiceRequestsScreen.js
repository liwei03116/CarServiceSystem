import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform
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
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import api from "../api/api";

const ManageServiceRequestsScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for edit modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  // Dropdown state for Edit Modal (Status)
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusItems, setStatusItems] = useState([
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Done", value: "Done" },
    { label: "Cancelled", value: "Cancelled" },
  ]);

  // State for add modal and new request form data
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
    preferredDateTime: null, // ISO string date
    description: "",
    requestType: "",
    status: "Pending",
  });

  // Dropdown state for Add Modal (Car Type)
  const [carTypeOpen, setCarTypeOpen] = useState(false);
  const [carTypeItems, setCarTypeItems] = useState([
    { label: "Sedan", value: "Sedan" },
    { label: "SUV", value: "SUV" },
    { label: "Truck", value: "Truck" },
    { label: "Van", value: "Van" },
  ]);

  // Dropdown state for Add Modal (Service)
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceItems, setServiceItems] = useState([
    { label: "Oil Change", value: "oilChange" },
    { label: "Brake Service", value: "brakeService" },
    { label: "Engine Repair", value: "engineRepair" },
    { label: "Tire Rotation", value: "tireRotation" },
  ]);

  useEffect(() => {
    fetchRequests(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchRequests();
    }, 10000); // Auto-refresh every 10 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
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
    setEditData({
      ...item,
      status: item.status || "Pending",
    });
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

            {/* Edit Modal: Service Dropdown */}
<View style={{ zIndex: 2000, marginBottom: 15 }}>
  <DropDownPicker
    open={serviceOpen}
    value={editData?.service}
    items={serviceItems}
    setOpen={setServiceOpen}
    setValue={(callback) => {
      const newVal = callback(editData?.service);
      setEditData((prev) => ({ ...prev, service: newVal }));
    }}
    setItems={setServiceItems}
    placeholder="Select Service"
    dropDownContainerStyle={{ zIndex: 2000 }}
  />
</View>

{/* Edit Modal: Status Dropdown */}
<View style={{ zIndex: 1000, marginBottom: 15 }}>
  <DropDownPicker
    open={statusOpen}
    value={editData?.status}
    items={statusItems}
    setOpen={setStatusOpen}
    setValue={(callback) => {
      const newVal = callback(editData?.status);
      setEditData((prev) => ({ ...prev, status: newVal }));
    }}
    setItems={setStatusItems}
    placeholder="Select Status"
    dropDownContainerStyle={{ zIndex: 1000 }}
  />
</View>

            <View style={styles.dateTimeContainer}>
              <Button mode="outlined" onPress={() => setShowDatePicker(true)}>
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
        <KeyboardAvoidingView
          style={newRequestStyles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={newRequestStyles.modalContent}>
            <Appbar.Header style={newRequestStyles.modalHeader}>
              <Appbar.BackAction onPress={() => setAddModalVisible(false)} />
              <Appbar.Content title="Add New Request" />
            </Appbar.Header>
            {/* Replace ScrollView with FlatList */}
            <FlatList
              data={[{}]} // Single item array to render the form
              renderItem={() => (
                <View style={newRequestStyles.scrollViewContent}>
                  {/* Form elements remain the same */}
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

                  {/* Add Modal: Car Type Dropdown */}
                  <View style={{ zIndex: 900, marginBottom: 15 }}>
                    <DropDownPicker
                      open={carTypeOpen}
                      value={newRequestData.carType}
                      items={carTypeItems}
                      setOpen={setCarTypeOpen}
                      setValue={(callback) => {
                        const newVal = callback(newRequestData.carType);
                        setNewRequestData((prev) => ({ ...prev, carType: newVal }));
                      }}
                      setItems={setCarTypeItems}
                      placeholder="Select Car Type *"
                      dropDownContainerStyle={{ zIndex: 900 }}
                    />
                  </View>

                  {/* Add Modal: Service Dropdown */}
                  <View style={{ zIndex: 800, marginBottom: 15 }}>
                    <DropDownPicker
                      open={serviceOpen}
                      value={newRequestData.service}
                      items={serviceItems}
                      setOpen={setServiceOpen}
                      setValue={(callback) => {
                        const newVal = callback(newRequestData.service);
                        setNewRequestData((prev) => ({ ...prev, service: newVal }));
                      }}
                      setItems={setServiceItems}
                      placeholder="Select Service *"
                      dropDownContainerStyle={{ zIndex: 800 }}
                    />
                  </View>

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
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={newRequestStyles.scrollViewContent}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

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
