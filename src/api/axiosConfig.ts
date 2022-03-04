import axios from 'axios';

export const baseURL = 'http://localhost:3000';

const axiosConfig = axios.create({
  baseURL
});

export default axiosConfig;
