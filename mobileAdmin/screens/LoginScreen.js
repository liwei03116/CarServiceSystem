import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      navigation.replace('AdminPanel');
    } catch (error) {
      alert('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Admin Login</Title>
      <TextInput 
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput 
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        autoCapitalize="none"
      />
      <Button 
        mode="contained" 
        onPress={handleLogin} 
        loading={loading}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding: 20 },
  title: { textAlign: 'center', marginBottom: 20, fontSize: 24 },
  input: { marginBottom: 15 }
});

export default LoginScreen;
