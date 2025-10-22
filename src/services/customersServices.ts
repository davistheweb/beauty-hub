import {
  ICustomerDetailsResponse,
  ICustomersResponse,
} from "@/types/ICustomers";
import { API } from "./axios";
import { getApiResponse } from "./helpers";

const fetchCustomers = async (): Promise<ICustomersResponse> => {
  const res = await API.post("/admin/user/fetch_all_users");

  return getApiResponse(res);
};

const fetchCustomerDetails = async (
  id: string,
): Promise<ICustomerDetailsResponse> => {
  const res = await API.post("/admin/user/fetch_user_details", { id });

  return getApiResponse(res);
};

export { fetchCustomerDetails, fetchCustomers };
