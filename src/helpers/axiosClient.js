import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const noInterceptAxiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const responseSuccessHandler = async (response) => {
  return response;
};

const responseErrorHandler = async (error) => {
  const config = error.config;
  const code = error.response.status;
  if (code === 401 && config.url === '/auth/token') {
    return Promise.reject(error);
  }
  if (code === 401 && !config._retry) {
    config._retry = true;
    const res = await noInterceptAxiosClient.post('/auth/token', {
      refreshToken: localStorage.getItem('refreshToken'),
    });
    if (res) {
      const { token } = res.data;
      localStorage.setItem('token', token);
    }
    return Promise.reject(error);
  }
};

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
  (response) => responseSuccessHandler(response),
  async (error) => responseErrorHandler(error),
);
