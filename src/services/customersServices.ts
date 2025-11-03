import {
  ICustomerDetailsResponse,
  ICustomersResponse,
} from "@/types/ICustomers";
import { API } from "./API";
import { getApiResponse } from "./helpers";

const fetchCustomers = async ({
  page = 1,
  search = "",
}: {
  page?: number;
  search?: string;
}): Promise<ICustomersResponse> =>
  getApiResponse(
    await API.post(`/admin/user/fetch_all_users?page=${page}`, { search }),
  );

const fetchCustomerDetails = async (
  id: string,
): Promise<ICustomerDetailsResponse> =>
  getApiResponse(await API.post("/admin/user/fetch_user_details", { id }));

export { fetchCustomerDetails, fetchCustomers };
