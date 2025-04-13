import React from 'react';
import { View, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button, Avatar } from 'react-native-paper';

const mechanics = [
  { id: '1', name: 'John Doe', expertise: 'Engine Specialist' },
  { id: '2', name: 'Jane Smith', expertise: 'Brake System' },
];

const ManageMechanicsScreen = () => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={mechanics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <Card.Title title={item.name} subtitle={item.expertise} left={() => <Avatar.Icon size={40} icon="wrench" />} />
            <Card.Actions>
              <Button>Edit</Button>
              <Button>Remove</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
};

export default ManageMechanicsScreen;
