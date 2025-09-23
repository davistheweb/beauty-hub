import AppLayout from "@/components/layouts/AppLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Dashboard",
};

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="flex-1">
        <p>Dashboard</p>
      </div>
    </AppLayout>
  );
}
