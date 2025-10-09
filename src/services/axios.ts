import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { headersConfig, timeoutConfig } from "./httpConfig";
import { deleteAccessBearerToken } from "./server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

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
    const cookieStore = await cookies();

    const token = cookieStore.get("access_bearer_token");

    console.log("AccessBearerToken from apiWithAuth:", token);

    if (token) config.headers.Authorization = `Bearer ${token}` as string;
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
    Promise.reject(error);
  },
);
