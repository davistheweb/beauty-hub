import { IPackagesResponse } from "@/types/IPackages";
import { API } from "./API";
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
const addSerive = async ({
  package_id,
  name,
}: {
  package_id: number;
  name: string;
}) =>
  getApiResponse(
    await API.post("/admin/package/add_service", { package_id, name }),
  );

const deleteService = async (id: number) =>
  getApiResponse(await API.post("/admin/package/delete_service", { id }));

export {
  addPackageAndService,
  addSerive,
  deleteService,
  fetchAllPackagesAndServices,
  updatePackageService,
};
