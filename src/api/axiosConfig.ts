import axios from 'axios';

export const baseURL = 'http://localhost:8080';

const axiosConfig = axios.create({
  baseURL
});

export default axiosConfig;
