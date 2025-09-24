import AppLayout from "@/components/layouts/AppLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Settings",
};

export default function Settings() {
  return (
    <AppLayout>
      <div className="flex-1">
        <p>Settings</p>
      </div>
    </AppLayout>
  );
}
