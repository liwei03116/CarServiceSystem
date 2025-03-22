import React from 'react';
import { View } from 'react-native';
import { List, Avatar } from 'react-native-paper';

const ManageAccountScreen = () => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <List.Item
        title="Admin Name"
        description="admin@example.com"
        left={(props) => <Avatar.Icon {...props} icon="account" />}
      />
      <List.Item title="Change Password" left={(props) => <List.Icon {...props} icon="lock" />} />
      <List.Item title="Logout" left={(props) => <List.Icon {...props} icon="logout" />} />
    </View>
  );
};

export default ManageAccountScreen;
