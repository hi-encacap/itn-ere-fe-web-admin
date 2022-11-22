import axios from 'axios';

import { AuthService } from '../../../../app/Services';
import errorHandler from './errorHandler';

declare module 'axios' {
  export interface AxiosRequestConfig {
    redirectWhenError?: boolean;
    autoRefreshToken?: boolean;
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  timeout: 30000,
  responseEncoding: 'utf8',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (request) => {
    if (request.headers != null) {
      const accessToken = AuthService.getAccessTokens().accessToken as string;
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  async (error) => await Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => await errorHandler(error, axiosInstance),
);

export default axiosInstance;
