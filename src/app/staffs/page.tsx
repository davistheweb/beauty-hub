import AppLayout from "@/components/layouts/AppLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Staffs",
};

export default function StaffsPage() {
  return (
    <AppLayout>
      <div className="flex-1">
        <p>Staffs</p>
      </div>
    </AppLayout>
  );
}
