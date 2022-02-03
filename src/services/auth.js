import { axiosClient } from '../helpers/axiosClient';

async function register(userData) {
  try {
    const { data } = await axiosClient.post('/register', userData);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(`${error.response.data}`);
    }
  }
}

async function login(userData) {
  try {
    const { data } = await axiosClient.post('/login', userData);
    if (data.accessToken) {
      localStorage.setItem('token', data.accessToken);
    }
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(`${error.response.data}`);
    }
  }
}

function logout() {
  localStorage.removeItem('token');
}

function checkIsAuthenticated() {
  return localStorage.getItem('token') !== null;
}

export const authService = { register, login, logout, checkIsAuthenticated };
