import { apiWithOutAuth, getApiResponse } from "./httpService";

const login = async (email: string, password: string) =>
  apiWithOutAuth.post("/login", { email, password }).then(getApiResponse);

const sendOtpViaMail = async (email: string) =>
  apiWithOutAuth.post("/recover/send_otp", { email }).then(getApiResponse);

const verifyOtpCode = async (otp: string, email: string) =>
  apiWithOutAuth
    .post("/recover/verify_otp", { otp, email })
    .then(getApiResponse);

const resendOtp = async (email: string) =>
  apiWithOutAuth.post("/recover/resend_otp", { email }).then(getApiResponse);

const createNewPassword = async (password: string, email: string) =>
  apiWithOutAuth
    .post("/recover/create_new_password", { new_password: password, email })
    .then(getApiResponse);

export { createNewPassword, login, resendOtp, sendOtpViaMail, verifyOtpCode };
