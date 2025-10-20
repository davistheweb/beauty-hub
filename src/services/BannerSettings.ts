import { IFetchBannerResponse } from "@/types/IBanner";
import { API } from "./axios";
import { getApiResponse } from "./helpers";

const fetchBannersService = async (): Promise<IFetchBannerResponse> => {
  const res = await API.post("/admin/banner/fetch_all_banners");

  return getApiResponse(res);
};

const addBannerService = async (data: FormData) => {
  const res = await API.post("/admin/banner/add_banner", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return getApiResponse(res);
};

const updateBannerService = async (data: FormData) => {
  const res = await API.post("/admin/banner/update_banner", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return getApiResponse(res);
};

const deleteBannerService = async (
  id: number,
): Promise<{
  message: string;
  status: boolean;
}> => {
  const res = await API.post("/admin/banner/delete_banner", { id });

  return getApiResponse(res);
};

export {
  addBannerService,
  deleteBannerService,
  fetchBannersService,
  updateBannerService,
};
