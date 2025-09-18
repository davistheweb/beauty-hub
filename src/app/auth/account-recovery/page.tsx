import { AuthWrapper } from "../_components/AuthWrapper";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";

export default function LoginPage() {
  return (
    <AuthWrapper
      title="Welcome Back, Admin"
      subtitle="Manage barbers, users, and appointments seamlessly. <br/> Your control panel for keeping the beauty hub running smoothly."
      formTitle="Forgot Password"
      formSubtitle="Don't worry, We'll send you reset instructions"
    >
      <ForgotPasswordForm />
    </AuthWrapper>
  );
}
