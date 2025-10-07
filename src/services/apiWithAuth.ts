import axios from "axios";
import { cookies } from "next/headers";
import { API_BASE_URL, headersConfig, timeoutConfig } from "./httpService";

export const apiWithAuth = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    ...headersConfig,
  },
  ...timeoutConfig,
});

apiWithAuth.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();

  const token = cookieStore.get("access_bearer_token");

  console.log(token);
  

  if (token) config.headers.Authorization = `Bearer ${token}` as string;
  return config;
});


