import {
  ICustomerDetailsResponse,
  ICustomersResponse,
} from "@/types/ICustomers";
import { API } from "./API";
import { getApiResponse } from "./helpers";

const fetchCustomers = async (page: number = 1): Promise<ICustomersResponse> =>
  getApiResponse(await API.post(`/admin/user/fetch_all_users?page=${page}`));

const fetchCustomerDetails = async (
  id: string,
): Promise<ICustomerDetailsResponse> =>
  getApiResponse(await API.post("/admin/user/fetch_user_details", { id }));

export { fetchCustomerDetails, fetchCustomers };
