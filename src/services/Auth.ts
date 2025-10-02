import {
  apiWithOutAuth,
  getApiResponse,
  getErrorResponse,
} from "./httpService";

const loginAdmin = async (email: string, password: string) =>
  apiWithOutAuth
    .post("/login", { email, password })
    .then(getApiResponse)
    .catch(getErrorResponse);

const sendOtpViaMail = async (email: string) =>
  apiWithOutAuth.post("/recover/send_otp", { email }).then(getApiResponse);

const verifyOtpCode = async (otp: string, email: string) =>
  apiWithOutAuth
    .post("/recover/verify_otp", { otp, email })
    .then(getApiResponse);

const resendOtp = async (email: string) =>
  apiWithOutAuth.post("/recover/resend_otp", { email }).then(getApiResponse);

export { loginAdmin, resendOtp, sendOtpViaMail, verifyOtpCode };
