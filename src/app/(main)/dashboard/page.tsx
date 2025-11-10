import Dashboard from "@/components/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Dashboard",
};

export default function DashboardPage() {
  return <Dashboard />;
}
