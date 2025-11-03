/* eslint-disable @typescript-eslint/no-explicit-any */
import { IErrorInfo } from "@/types/Error";
import { AxiosError, AxiosResponse } from "axios";

const getApiResponse = <T>(response: AxiosResponse<T>) => {
  const data = response.data as any;
  return {
    status: data.success ?? false,
    message: data.message ?? "",
    data,
  };
};

export default function getErrorResponse(error: unknown): IErrorInfo {
  console.log("error getErrorResponse", error);

  if (!error) return { type: "unknown", message: "An unknown error occurred." };

  if (error instanceof AxiosError) {
    // Handle network / server errors
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        return { type: "not_found", message: error.response.data.message };
      }
      if (status === 401) {
        return {
          type: "unknown",
          message:
            "Your Session is expired, Please login again, redirecting.....",
        };
      }
      return {
        type: "server",
        message:
          error.response.data?.message ||
          "An unexpected server error occurred.",
      };
    } else if (error.request) {
      return {
        type: "network",
        message: "Network error. Please check your connection and try again.",
      };
    }

    return { type: "unknown", message: error.message };
  }

  if (error instanceof Error) {
    return { type: "unknown", message: error.message };
  }

  return { type: "unknown", message: "Unknown error occurred." };
}

export { getApiResponse, getErrorResponse };
