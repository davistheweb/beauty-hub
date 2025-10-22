import { IPackagesResponse } from "@/types/IPackages";
import { API } from "./axios";
import { getApiResponse } from "./helpers";
import { multipartConfig } from "./httpConfig";

const fetchAllPackagesAndServices = async (): Promise<IPackagesResponse> =>
  getApiResponse(await API.post("/admin/package/fetch_all_packages"));

const addPackageAndService = async (data: FormData) =>
  getApiResponse(
    await API.post("/admin/package/add_package", data, {
      ...multipartConfig,
    }),
  );

const updatePackageService = async (data: FormData) =>
  getApiResponse(
    await API.post("/admin/package/update_package", data, {
      ...multipartConfig,
    }),
  );

export {
  addPackageAndService,
  fetchAllPackagesAndServices,
  updatePackageService,
};
