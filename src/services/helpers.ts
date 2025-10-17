/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";

const getApiResponse = <T>(response: AxiosResponse<T>) => {
  const data = response.data as any;
  return {
    status: data.success ?? false,
    message: data.message ?? "",
    data,
  };
};

const getErrorResponse = (error: any) => {
  console.error("error from get error res", error);

  return {
    // statusCode: error?.response?.status,
    status: false,
    errorMsg: error?.response?.data,
  };
};

export { getApiResponse, getErrorResponse };
