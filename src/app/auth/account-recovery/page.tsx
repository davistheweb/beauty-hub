import { Metadata } from "next";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Beauty- Account Recovery",
};

export default function AccountRecovery() {
  return <ForgotPasswordForm />;
}
