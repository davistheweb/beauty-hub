import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../globals.css";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beauty",
  description: "Beauty app",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body
      className={`${dm_sans.className} h-screen w-full overflow-x-hidden antialiased`}
    >
      {children}
    </body>
  );
}
