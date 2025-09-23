import AppLayout from "@/components/layouts/AppLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Services",
};

export default function Services() {
  return (
    <AppLayout>
      <div className="flex-1">
        <p>Services</p>
      </div>
    </AppLayout>
  );
}
