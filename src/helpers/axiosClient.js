import axios from 'axios';
import { getAuthHeader } from './authHeader';

const authHeader = getAuthHeader();

export const axiosClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    authHeader,
  },
});
