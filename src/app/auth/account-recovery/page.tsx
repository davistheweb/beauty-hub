import AccountRecovery from "@/components/auth/AccountRecovery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty- Account Recovery",
};

export default function AccountRecoveryPage() {
  return <AccountRecovery />;
}
