import { IStaffResponse } from "@/types/Istaff";
import { API } from "./axios";
import { getApiResponse } from "./helpers";

const fetchStaffs = async (): Promise<IStaffResponse> =>
  getApiResponse(await API.post("/admin/staff/fetch_all_staff"));

export { fetchStaffs };
