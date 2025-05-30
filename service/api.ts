import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.225:8080/api', 
});

// Attach token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/'; // Or navigation logic if React Native
    }
    return Promise.reject(error);
  }
);

export default api;