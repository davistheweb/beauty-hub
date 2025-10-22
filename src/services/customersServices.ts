import {
  ICustomerDetailsResponse,
  ICustomersResponse,
} from "@/types/ICustomers";
import { API } from "./axios";
import { getApiResponse } from "./helpers";

const fetchCustomers = async (): Promise<ICustomersResponse> =>
  getApiResponse(await API.post("/admin/user/fetch_all_users"));

const fetchCustomerDetails = async (
  id: string,
): Promise<ICustomerDetailsResponse> =>
  getApiResponse(await API.post("/admin/user/fetch_user_details", { id }));

export { fetchCustomerDetails, fetchCustomers };
