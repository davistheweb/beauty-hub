import AppLayout from "@/components/layouts/AppLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Customers",
};

export default function Customers() {
  return (
    <AppLayout>
      <div className="flex-1">
        <h1 className="inline-block text-2xl font-bold">Customers</h1>
      </div>
    </AppLayout>
  );
}
