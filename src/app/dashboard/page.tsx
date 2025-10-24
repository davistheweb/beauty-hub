import Dashboard from "@/components/dashboard";
import AppLayout from "@/components/layouts/AppLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Dashboard",
};

export default function DashboardPage() {
  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  );
}
