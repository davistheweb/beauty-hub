import { apiWithAuth, getApiResponse, getErrorResponse } from "./httpService";

export const pagination = (formData) =>
  apiWithAuth.post(formData).then(getApiResponse).catch(getErrorResponse);
