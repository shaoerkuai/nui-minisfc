import axios, { InternalAxiosRequestConfig } from 'axios';
import router from '../routes/router.ts';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 2000,
});

instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const token = localStorage.getItem('token');
    if (token === null) {
      (window as any).$message.error('还未登录，请重试');
      router.push({ name: 'login' });
    } else {
      config.headers.set('Authorization', 'Bearer ' + token);
    }
    return config;
  },
  function (error: any) {
    (window as any).$message.error(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          (window as any).$message.warning('登录已过期，请重新登录');
          break;
        default:
          (window as any).$message.error(error.response);
      }
      return Promise.reject(error.response);
    }
  },
);
