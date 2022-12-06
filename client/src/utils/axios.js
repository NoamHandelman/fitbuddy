import axios from 'axios';

export const customRequest = axios.create({
  baseURL: '/api/v1/',
});
