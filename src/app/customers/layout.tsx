import AppLayout from "@/components/layouts/AppLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty",
  description: "Beauty app",
};

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 <AppLayout>{children}</AppLayout>
  );
}
