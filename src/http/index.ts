import axios from 'axios';

import { getValueWithExpiry } from '../utils/storage';

export const API_URL = 'https://evening-lowlands-21075.herokuapp.com/';

const $api = axios.create({
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${getValueWithExpiry('token')}`;
  }

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = '/';
    } else {
      throw error;
    }
  }
);

export default $api;
