import { API } from "./axios";
import { getApiResponse } from "./helpers";

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
    headers: { "Content-Type": "multipart/form-data" },
  }).then(getApiResponse);

export { changeProfileAvatar, updateAccountPassword, updateProfile };
