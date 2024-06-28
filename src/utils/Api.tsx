import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    // timeout: 1000,
    // headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
  });
export default api;