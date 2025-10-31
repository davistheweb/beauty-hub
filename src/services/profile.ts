import { API } from "./API";
import { getApiResponse } from "./helpers";
import { multipartConfig } from "./httpConfig";

const updateProfile = async (name: string, phoneNuber: string) =>
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

export { changeProfileAvatar, updateAccountPassword, updateProfile };
