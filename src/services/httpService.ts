import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

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

const apiWithOutAuth = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    ...headersConfig,
  },
  ...timeoutConfig,
});

const getApiResponse = <T>(data: { data: T }) => {
  return {
    status: true,
    data: data.data,
  };
};

export { apiWithOutAuth, getApiResponse, headersConfig, timeoutConfig };

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
