import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const ManageWebsiteInfoScreen = () => {
  const [websiteName, setWebsiteName] = React.useState('Auto Services');
  const [contactEmail, setContactEmail] = React.useState('support@example.com');

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput label="Website Name" value={websiteName} onChangeText={setWebsiteName} style={{ marginBottom: 10 }} />
      <TextInput label="Contact Email" value={contactEmail} onChangeText={setContactEmail} style={{ marginBottom: 10 }} />
      <Button mode="contained">Save Changes</Button>
    </View>
  );
};

export default ManageWebsiteInfoScreen;
