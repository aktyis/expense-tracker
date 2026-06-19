import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  auth: {
    username: 'admin',
    password: 'admin'
  }
});

export default apiClient;
