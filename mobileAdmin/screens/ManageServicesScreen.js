import React from 'react';
import { View, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const services = [
  { id: '1', name: 'Oil Change', description: 'Quick oil replacement service' },
  { id: '2', name: 'Tire Rotation', description: 'Balance and rotate tires' },
];

const ManageServicesScreen = () => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>{item.description}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
};

export default ManageServicesScreen;
