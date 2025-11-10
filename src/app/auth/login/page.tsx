import { AuthWrapper } from "@/components/auth/AuthWrapper";
import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty- Login",
};
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
