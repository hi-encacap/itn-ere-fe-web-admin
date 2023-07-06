import axios from "axios";

import { authService } from "@services/index";

import errorHandler from "./errorHandler";

declare module "axios" {
  export interface AxiosRequestConfig {
    redirectWhenError?: boolean;
    autoRefreshToken?: boolean;
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_RE_DASH_APP_API_URL,
  timeout: 30000,
  responseEncoding: "utf8",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (request) => {
    if (request.headers !== null && request.headers !== undefined) {
      const { accessToken } = authService.getAuthTokens();
      request.headers.Authorization = `Bearer ${String(accessToken)}`;
    }
    return request;
  },
  async (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => errorHandler(error, axiosInstance),
);

export default axiosInstance;
