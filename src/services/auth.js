import { axiosClient } from '../helpers/axiosClient';

class AuthService {
  async register(userData) {
    try {
      const { data } = await axiosClient.post('/register', userData);
      return data;
    } catch (error) {
      if (error.response) {
        throw new Error(`${error.response.data}`);
      }
    }
  }

  async login(userData) {
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

  logout = () => {
    localStorage.removeItem('token');
  };

  checkIsAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };
}

export const authService = new AuthService();
