import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
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
    return response;
  },
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.log("interceptor response", error);

      await deleteAccessBearerToken().then(() => {
        if (typeof window !== "undefined") {
          localStorage.clear();
          window.location.reload();
        }
      });
    }

    return Promise.reject(error);
  },
);
