import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beauty",
  description: "Beauty app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dm_sans.className} antialiased w-full h-screen overflow-x-hidden`}>
        <ReduxProvider>
        {children}

        </ReduxProvider>
      </body>
    </html>
  );
}
