const getApiResponse = <T>(response: { data: T }) => {
  return {
    status: true,
    data: response.data,
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */

const getErrorResponse = (error: any) => {
  console.error("error from get error res", error);

  return {
    // statusCode: error?.response?.status,
    status: false,
    errorMsg: error?.response?.data,
  };
};

export { getApiResponse, getErrorResponse };
