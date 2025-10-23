import { IFetchBannerResponse } from "@/types/IBanner";
import { API } from "./axios";
import { getApiResponse } from "./helpers";
import { multipartConfig } from "./httpConfig";

const fetchBannersService = async (): Promise<IFetchBannerResponse> =>
  getApiResponse(await API.post("/admin/banner/fetch_all_banners"));

const addBannerService = async (data: FormData) =>
  getApiResponse(
    await API.post("/admin/banner/add_banner", data, {
      ...multipartConfig,
    }),
  );

const updateBannerService = async (data: FormData) =>
  getApiResponse(
    await API.post("/admin/banner/update_banner", data, {
      ...multipartConfig,
    }),
  );

const deleteBannerService = async (
  id: number,
): Promise<{
  message: string;
  status: boolean;
}> => getApiResponse(await API.post("/admin/banner/delete_banner", { id }));

export {
  addBannerService,
  deleteBannerService,
  fetchBannersService,
  updateBannerService,
};
