"use client";
import { AuthWrapper } from "../_components/AuthWrapper";
import { OtpForm } from "../_components/OtpForm";

export default function OTP() {
  return (
    <AuthWrapper
      formTitle="Enter OTP"
      formSubtitle="A 4 digits code has been sent to your email <span style='color: #1AB65C;'>*****oe@gmail.com</span> to verify account."
    >
      <OtpForm />
    </AuthWrapper>
  );
}
