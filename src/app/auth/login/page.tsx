"use client";
import { AuthWrapper } from "../_components/AuthWrapper";
import LoginForm from "../_components/LoginForm";

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
