import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';

const user = getUserFromLocalStorage();

export const customRequest = axios.create({
  baseURL: '/api/v1/',
});

customRequest.interceptors.request.use(
  (config) => {
    if (user) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === '401' || '403') {
      console.log(error);
      console.log('You hit axios interceptors response error func');
    }
    return Promise.reject(error);
  }
);
