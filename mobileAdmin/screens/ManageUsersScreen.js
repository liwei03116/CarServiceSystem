import React, { useEffect, useState } from "react";
import { View, FlatList, Alert } from "react-native";
import { List, IconButton, FAB, ActivityIndicator } from "react-native-paper";
import api from "../api/api";

const ManageUsersScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");

      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setUsers([]); // Fallback
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert("Confirm", "Are you sure you want to delete this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await api.delete(`/users/${id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          } catch (error) {
            Alert.alert("Error", "Failed to delete user.");
          }
        },
        style: "destructive",
      },
    ]);
  };

  if (loading) {
    return <ActivityIndicator animating={true} size="large" style={{ marginTop: 20 }} />;
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={users}
        keyExtractor={(item, index) => (item?.id ? item.id.toString() : `user-${index}`)}
        renderItem={({ item }) =>
          item ? (
            <List.Item
              title={item.name}
              description={item.email}
              left={(props) => <List.Icon {...props} icon="account" />}
              right={(props) => (
                <View style={{ flexDirection: "row" }}>
                  <IconButton icon="pencil" onPress={() => navigation.navigate("EditUser", { user: item })} />
                  <IconButton icon="delete" color="red" onPress={() => handleDelete(item.id)} />
                </View>
              )}
            />
          ) : null
        }
      />
      <FAB style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }} icon="plus" onPress={() => navigation.navigate("AddUser")} />
    </View>
  );
};

export default ManageUsersScreen;
