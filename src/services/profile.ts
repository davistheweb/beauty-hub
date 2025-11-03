import { IProfileResponse } from "@/types/IProfile";
import { API } from "./API";
import { getApiResponse } from "./helpers";
import { multipartConfig } from "./httpConfig";

const getProfile = async (): Promise<IProfileResponse> =>
  (await API.post("/admin/profile/fetch_profile")).data;

const updateProfile = async ({
  name,
  phoneNuber,
}: {
  name: string;
  phoneNuber: string;
}) =>
  API.post("/admin/profile/update_profile", {
    name,
    phone: phoneNuber,
  }).then(getApiResponse);

const updateAccountPassword = async (
  old_password: string,
  new_password: string,
) =>
  API.post("/admin/profile/change_password", {
    old_password,
    new_password,
  }).then(getApiResponse);

const changeProfileAvatar = async (formData: FormData) =>
  API.post("/admin/profile/change_avatar", formData, {
    ...multipartConfig,
  }).then(getApiResponse);

export {
  changeProfileAvatar,
  getProfile,
  updateAccountPassword,
  updateProfile,
};
