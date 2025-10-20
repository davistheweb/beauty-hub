import { IPackagesResponse } from "@/types/IServices";
import { API } from "./axios";
import { getApiResponse } from "./helpers";

const fetchAllPackagesAndServices = async (): Promise<IPackagesResponse> => {
  const res = await API.post("/admin/package/fetch_all_packages");

  return getApiResponse(res);
};

const addPackageAndService = async (data: FormData) => {
  const res = await API.post("", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return getApiResponse(res);
};

export { addPackageAndService, fetchAllPackagesAndServices };
