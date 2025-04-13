import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  //baseURL: 'http://localhost:5000/api', // Replace with your backend URL
  //baseURL: 'http://10.0.2.2:5000/api', // For Android Emulator
  baseURL: 'http://192.168.0.202:5000/api', // For Physical IOS Device 
  headers: { 'Content-Type': 'application/json' }
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No token found in AsyncStorage');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
