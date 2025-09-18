import { AuthWrapper } from "../_components/AuthWrapper";
import PasswordReset from "../_components/PasswordReset";

export default function LoginPage() {
  return (
    <AuthWrapper
      title="Welcome Back, Admin"
      subtitle="Manage barbers, users, and appointments seamlessly. <br/> Your control panel for keeping the beauty hub running smoothly."
      formTitle="Confirm New Password"
      formSubtitle="Please ensure your new password is distinct from any you have used before."
    >
      <PasswordReset />
    </AuthWrapper>
  );
}
