import axios from "axios";
import Cookies from "js-cookie";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const TOKEN = `Bearer ${Cookies.get("BEAUTY")}`;

const timeoutConfig: {
  timeout: number;
  timeoutErrorMessage: string;
} = {
  timeout: 30000,
  timeoutErrorMessage: "Server taking too long to respond. Try again.",
};

const headersConfig = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const apiWithOutAuth = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    ...headersConfig,
  },
  ...timeoutConfig,
});

export const apiWithAuth = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    ...headersConfig,
    Authorization: TOKEN,
  },
  ...timeoutConfig,
});

export const getApiResponse = <T>(data: { data: T }) => {
  return {
    status: true,
    data: data.data,
  };
};

// export const getErrorResponse = (error: any) => {
//   if (error?.response?.status === 401) {
//     Cookies.remove("BEAUTY");
//     if (typeof window !== "undefined") window.location.reload();
//   }

//   return {
//     statusCode: error?.response?.status,
//     status: false,
//     data: error?.response?.data,
//   };
// };
