import Cookies from "js-cookie";
import { API } from "./API";
import { getApiResponse } from "./helpers";
import { deleteAccessBearerToken } from "./server";

const loginAdmin = async (email: string, password: string) =>
  API.post("/login", { email, password }).then(getApiResponse);

const sendOtpViaMail = async (email: string) =>
  API.post("/recover/send_otp", { email }).then(getApiResponse);

const verifyOtpCode = async (otp: string, email: string) =>
  API.post("/recover/verify_otp", { otp, email }).then(getApiResponse);

const resendOtp = async (email: string) =>
  API.post("/recover/resend_otp", { email }).then(getApiResponse);

const createNewPassword = async (password: string, email: string) =>
  API.post("/recover/create_new_password", {
    new_password: password,
    email,
  }).then(getApiResponse);

const logoutAdmin = async () => {
  await API.post("/admin/profile/logout").then(
    async () => await deleteAccessBearerToken(),
  );
  Cookies.remove("cached_bearer_token", { path: "/" });
};

export {
  createNewPassword,
  loginAdmin,
  logoutAdmin,
  resendOtp,
  sendOtpViaMail,
  verifyOtpCode,
};
