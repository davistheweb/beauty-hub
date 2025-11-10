import { Package } from "@/components/packages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Packages",
};

export default function PackagesPge() {
  return <Package />;
}
