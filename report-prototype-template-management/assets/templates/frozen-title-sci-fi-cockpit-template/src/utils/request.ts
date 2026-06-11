import axios, { AxiosHeaders, type AxiosError } from 'axios';
import { ElMessage } from 'element-plus';
import { useStore } from '@/stores';
import { login } from './login';

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || undefined,
  timeout: 15000,
});

service.interceptors.request.use(
  (config) => {
    const { haierToken } = useStore();

    if (haierToken) {
      const headers = AxiosHeaders.from(config.headers);

      headers.set('Access-Token', haierToken);
      config.headers = headers;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

service.interceptors.response.use(
  async (res) => {
    const payload = res.data;
    const code = payload?.code;

    if (code === 401) {
      useStore().clearUserSession();
      await login(true);
      return service(res.config);
    }

    if (code && code !== 200) {
      if (payload?.msg) {
        ElMessage.error(payload.msg);
      }

      return Promise.reject(payload?.msg ?? payload);
    }

    return payload;
  },
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      await login(true);
    } else if (status === 429) {
      ElMessage.error('Too many requests. Please try again later.');
    } else {
      ElMessage.error('Request failed. Please try again later.');
    }

    return Promise.reject(error);
  },
);

export default service;
