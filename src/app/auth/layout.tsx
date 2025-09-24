"use client";
import { usePathname } from "next/navigation";
import { AuthWrapper } from "./_components/AuthWrapper";

const authWrapperText = {
  "/auth/login": {
    formTitle: "Login",
    formSubtitle: "Login into your account",
  },
  "/auth/account-recovery": {
    formTitle: "Reset your password",
    formSubtitle: "Don't worry, We'll send you reset instructions",
  },
  "/auth/otp": {
    formTitle: "Enter OTP",
    formSubtitle:
      "A 4 digits code has been sent to your email <span style='color: #1AB65C;'>*****oe@gmail.com</span> to verify account.",
  },
  "/auth/password-reset": {
    formTitle: "Confirm New Password",
    formSubtitle:
      "Please ensure your new password is distinct from any you have used before.",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { formTitle, formSubtitle } =
    authWrapperText[pathname as keyof typeof authWrapperText] ||
    authWrapperText["/auth/login"];

  return (
    <AuthWrapper
      formTitle={formTitle}
      formSubtitle={formSubtitle}
    >
      {children}
    </AuthWrapper>
  );
}
