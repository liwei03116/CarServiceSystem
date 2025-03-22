import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AdminNavigator from './navigation/AdminNavigator';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AdminNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
