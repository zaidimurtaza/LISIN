import axios from 'axios';

const BASE_URL = 'https://adminmurtaza.pythonanywhere.com/api';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});