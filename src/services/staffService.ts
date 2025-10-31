import { IStaffResponse } from "@/types/IStaff";
import { API } from "./API";
import { getApiResponse } from "./helpers";

const fetchStaffs = async (page: number = 1): Promise<IStaffResponse> =>
  getApiResponse(await API.post(`/admin/staff/fetch_all_staff?page=${page}`));

const addStaffService = async ({
  name,
  email,
  phone,
  password,
}: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) =>
  getApiResponse(
    await API.post("/admin/staff/add_staff", { name, email, phone, password }),
  );

const updateStaffService = async ({
  id,
  name,
  email,
  phone,
}: {
  id: string;
  name: string;
  email: string;
  phone: string;
}) =>
  getApiResponse(
    await API.post("/admin/staff/update_staff", { id, name, email, phone }),
  );

export { addStaffService, fetchStaffs, updateStaffService };
