import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty",
  description: "Beauty AUTH",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
