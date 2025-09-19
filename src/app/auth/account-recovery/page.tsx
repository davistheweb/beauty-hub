import { AuthWrapper } from "../_components/AuthWrapper";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";

export default function LoginPage() {
  return (
    <AuthWrapper
      formTitle="Forgot Password"
      formSubtitle="Don't worry, We'll send you reset instructions"
    >
      <ForgotPasswordForm />
    </AuthWrapper>
  );
}
