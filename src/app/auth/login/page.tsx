"use client";

import { AuthWrapper } from "@/components/auth/AuthWrapper";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthWrapper
      formTitle="Login"
      formSubtitle="Login into your account"
    >
      <LoginForm />
    </AuthWrapper>
  );
}
