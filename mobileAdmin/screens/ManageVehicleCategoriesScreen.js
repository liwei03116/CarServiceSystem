import React from 'react';
import { View, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const vehicleCategories = [
  { id: '1', name: 'Sedan', description: 'Small to mid-sized cars' },
  { id: '2', name: 'SUV', description: 'Sports Utility Vehicles' },
];

const ManageVehicleCategoriesScreen = () => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={vehicleCategories}
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

export default ManageVehicleCategoriesScreen;
