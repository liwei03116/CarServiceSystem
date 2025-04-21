import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Update as needed

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to attach token if available
api.interceptors.request.use(
  (config) => {
    // Retrieve user data from local storage (or update this if using a context)
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      // Assuming your token is stored under parsedUser.token
      if (parsedUser.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
