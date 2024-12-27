import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});


export default axiosInstance;
