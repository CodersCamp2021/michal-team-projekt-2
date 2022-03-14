import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;
    if (error.response.status === 401 && config.url === '/auth/token') {
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const res = await axiosClient.post('/auth/token', {
          refreshToken: localStorage.getItem('refreshToken'),
        });
        const { token } = res.data;
        localStorage.setItem('token', token);
        window.location.reload();
        return config;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  },
);
