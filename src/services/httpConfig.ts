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

const getApiResponse = <T>(response: { data: T }) => {
  return {
    status: true,
    data: response.data,
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

export { getApiResponse, getErrorResponse, headersConfig, timeoutConfig };
