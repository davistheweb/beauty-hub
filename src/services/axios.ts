import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { headersConfig, timeoutConfig } from "./httpConfig";
import { deleteAccessBearerToken, getAccessToken } from "./lib";

const API_BASE_URL: string | undefined = process.env
  .NEXT_PUBLIC_API_BASE_URL as string;

export const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    ...headersConfig,
  },
  ...timeoutConfig,
});

API.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const token = await getAccessToken();

    if (token !== undefined) {
      console.log("AccessBearerToken from apiWithAuth:", token);

      config.headers.Authorization = `Bearer ${token}` as string;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  async (response: AxiosResponse): Promise<AxiosResponse> => {
    if (response.status === 401) {
      await deleteAccessBearerToken().then(() => {
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
