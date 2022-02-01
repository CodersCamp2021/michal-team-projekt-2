import axios from 'axios';
import { getAuthHeader } from './authHeader';

const authHeader = getAuthHeader();

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    authHeader,
  },
});
