import axios from 'axios';

const api = axios.create({
  // baseURL: "http://192.168.1.17:8082" //your api URL
    baseURL: "http://localhost:8082" //your api URL
});

export default api;