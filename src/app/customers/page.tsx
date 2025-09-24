import AppLayout from "@/components/layouts/AppLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Customers",
};

export default function Customers() {
  return (
    <AppLayout>
      <div className="flex-1">
        <p>Customers</p>
      </div>
    </AppLayout>
  );
}
