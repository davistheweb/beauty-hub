import { AuthWrapper } from "../_components/AuthWrapper";
import PasswordReset from "../_components/PasswordReset";

export default function LoginPage() {
  return (
    <AuthWrapper
      formTitle="Confirm New Password"
      formSubtitle="Please ensure your new password is distinct from any you have used before."
    >
      <PasswordReset />
    </AuthWrapper>
  );
}
