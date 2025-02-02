import axios, { InternalAxiosRequestConfig } from 'axios';
import router from '../routes/router.ts';
import { useSessionStore } from '../store/sessionStore.ts';

const whitelistTable = ['/api/v1/user/verifyCode', '/api/v1/security'];

function checkWhitelistUri(uri: string) {
  return whitelistTable.some((val: string) => {
    return val === uri;
  });
}

export const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 2000,
});
instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const token = localStorage.getItem('token');
    const store = useSessionStore();
    if (token === null) {
      if (!checkWhitelistUri(<string>config.url)) {
        // 登录uri不做过滤
        (window as any).$message.error('还未登录，请重试');
        store.clearState();
        router.push({ name: 'login' });
      }
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
    if (!error.response) {
      (window as any).$message.error(error.message);
      return Promise.reject(error);
    }
    if (error.response.status) {
      const store = useSessionStore();
      console.log(error);
      switch (error.response.status) {
        case 401:
          (window as any).$message.warning('登录已过期，请重新登录');
          store.clearState();
          localStorage.removeItem('token');
          router.push({ name: 'login' });
          break;
        case 403:
          (window as any).$message.error('没有操作的权限，请重试');
          break;
      }
      return Promise.reject(error.response);
    }
  },
);
