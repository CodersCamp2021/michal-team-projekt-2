import { axiosClient } from '../helpers/axiosClient';

async function register(userData) {
  try {
    const { data } = await axiosClient.post('/auth/register', userData);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(`${error.response.data}`);
    }
  }
}

async function login(userData) {
  try {
    const { data } = await axiosClient.post('/auth/login', userData);
    if (data.token && data.refreshToken) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(`${error.response.data}`);
    }
  }
}

async function logout() {
  await axiosClient.get('/auth/logout');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
}

async function checkIsAuthenticated() {
  try {
    const user = await axiosClient.get('/user/me');
    return !!user.data;
  } catch (error) {
    return false;
  }
}

export const authService = { register, login, logout, checkIsAuthenticated };
