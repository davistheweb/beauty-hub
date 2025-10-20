import AppLayout from "@/components/layouts/AppLayout";
import { Package } from "@/components/packages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Packages",
};

export default function PackagesPge() {
  return (
    <AppLayout>
      <Package />
    </AppLayout>
  );
}
