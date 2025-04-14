import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  ScrollView,
  Text,
} from "react-native";
import {
  Card,
  Title,
  Button,
  Avatar,
  TextInput,
  Appbar,
  ActivityIndicator,
  Chip,
} from "react-native-paper";
import api from "../api/api"; // Assuming axios is configured

const ManageMechanicsScreen = () => {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [currentMechanic, setCurrentMechanic] = useState(null);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    specialization: "",
    status: "active",
  });

  useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics = async () => {
    try {
      const res = await api.get("/mechanics");
      setMechanics(res.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch mechanics");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/mechanics/${id}`);
      setMechanics((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      Alert.alert("Error", "Failed to delete mechanic");
    }
  };

  const handleEdit = (mechanic) => {
    setCurrentMechanic(mechanic);
    setForm({
      name: mechanic.name,
      contact: mechanic.contact,
      email: mechanic.email,
      specialization: mechanic.specialization,
      status: mechanic.status,
    });
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await api.put(`/mechanics/${currentMechanic._id}`, form);
      setMechanics((prev) =>
        prev.map((m) => (m._id === currentMechanic._id ? res.data : m))
      );
      setEditModalVisible(false);
      setCurrentMechanic(null);
    } catch (error) {
      Alert.alert("Error", "Failed to update mechanic");
    }
  };

  const handleAdd = async () => {
    if (!form.name || !form.contact || !form.email || !form.specialization) {
      Alert.alert("Validation Error", "All fields are required");
      return;
    }

    try {
      const res = await api.post("/mechanics", form);
      setMechanics((prev) => [res.data, ...prev]);
      setAddModalVisible(false);
      setForm({
        name: "",
        contact: "",
        email: "",
        specialization: "",
        status: "active",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to add mechanic");
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.name}
        subtitle={item.specialization}
        left={() => <Avatar.Icon size={40} icon="wrench" />}
      />
      <Card.Content>
        <Text>Email: {item.email}</Text>
        <Text>Contact: {item.contact}</Text>
        <Chip style={styles.chip} mode="outlined">
          Status: {item.status}
        </Chip>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => handleEdit(item)}>Edit</Button>
        <Button onPress={() => handleDelete(item._id)} color="red">
          Remove
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
        data={mechanics}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
      <Button mode="contained" onPress={() => setAddModalVisible(true)}>
        Add New Mechanic
      </Button>

      {/* Add Modal */}
      <Modal visible={addModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Appbar.Header style={styles.modalHeader}>
              <Appbar.BackAction onPress={() => setAddModalVisible(false)} />
              <Appbar.Content title="Add Mechanic" />
            </Appbar.Header>
            <ScrollView contentContainerStyle={styles.formContainer}>
              {["name", "contact", "email", "specialization"].map((field) => (
                <TextInput
                  key={field}
                  mode="outlined"
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChangeText={(text) =>
                    setForm((prev) => ({ ...prev, [field]: text }))
                  }
                  style={styles.input}
                />
              ))}
              <Button
                mode="contained"
                onPress={() =>
                  setForm((prev) => ({
                    ...prev,
                    status: prev.status === "active" ? "inactive" : "active",
                  }))
                }
              >
                Toggle Status (Current: {form.status})
              </Button>
              <View style={styles.buttonRow}>
                <Button mode="contained" onPress={handleAdd}>
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

      {/* Edit Modal */}
      <Modal visible={editModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Appbar.Header style={styles.modalHeader}>
              <Appbar.BackAction onPress={() => setEditModalVisible(false)} />
              <Appbar.Content title="Edit Mechanic" />
            </Appbar.Header>
            <ScrollView contentContainerStyle={styles.formContainer}>
              {["name", "contact", "email", "specialization"].map((field) => (
                <TextInput
                  key={field}
                  mode="outlined"
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChangeText={(text) =>
                    setForm((prev) => ({ ...prev, [field]: text }))
                  }
                  style={styles.input}
                />
              ))}
              <Button
                mode="contained"
                onPress={() =>
                  setForm((prev) => ({
                    ...prev,
                    status: prev.status === "active" ? "inactive" : "active",
                  }))
                }
              >
                Toggle Status (Current: {form.status})
              </Button>
              <View style={styles.buttonRow}>
                <Button mode="contained" onPress={handleSaveEdit}>
                  Save
                </Button>
                <Button onPress={() => setEditModalVisible(false)} color="red">
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { marginBottom: 10 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    width: "95%",
    maxHeight: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
  },
  modalHeader: { backgroundColor: "#6200ee" },
  formContainer: { padding: 20 },
  input: { marginBottom: 15 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  chip: { marginTop: 10 },
});

export default ManageMechanicsScreen;
