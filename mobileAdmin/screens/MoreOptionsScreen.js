import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { List, Text } from "react-native-paper";

const MoreOptionsScreen = ({ navigation }) => {
  const options = [
    { title: "User", screen: "Users", icon: "account" },
    { title: "Mechanics", screen: "Mechanics", icon: "tools" },
    { title: "Invoice", screen: "Invoice", icon: "file-document" },
    { title: "Logout", screen: "Login", isLogout: true, icon: "logout" },
  ];

  const handlePress = (item) => {
    if (item.isLogout) {
      // Perform logout logic (clear tokens, navigate to login)
      navigation.replace("Login");
    } else {
      navigation.navigate(item.screen);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            onPress={() => handlePress(item)}
            left={(props) => <List.Icon {...props} icon={item.icon} />}
            titleStyle={item.isLogout ? styles.logoutText : null}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  logoutText: { color: "red" },
});

export default MoreOptionsScreen;
