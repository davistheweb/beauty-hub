import AppLayout from "@/components/layouts/AppLayout";
import Staffs from "@/components/staffs";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Staffs",
};

export default function StaffsPage() {
  return (
    <AppLayout>
      <Staffs />
    </AppLayout>
  );
}
