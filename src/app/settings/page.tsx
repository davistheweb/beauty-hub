import AppLayout from "@/components/layouts/AppLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Settings",
};

export default function Settings() {
  return (
    <AppLayout>
      <div className="flex h-full flex-1 flex-col md:p-2">
        <h1 className="inline-block text-2xl font-bold">Settings</h1>
      </div>
    </AppLayout>
  );
}
