import { IPackagesResponse } from "@/types/IPackages";
import { API } from "./axios";
import { getApiResponse } from "./helpers";
import { multipartConfig } from "./httpConfig";

const fetchAllPackagesAndServices = async (): Promise<IPackagesResponse> => {
  const res = await API.post("/admin/package/fetch_all_packages");

  return getApiResponse(res);
};

const addPackageAndService = async (data: FormData) => {
  const res = await API.post("/admin/package/add_package", data, {
    ...multipartConfig,
  });

  return getApiResponse(res);
};

const updatePackage = async (data: FormData) => {
  const res = await API.post("/admin/package/update_package", data, {
    ...multipartConfig,
  });
};

export { addPackageAndService, fetchAllPackagesAndServices, updatePackage };
