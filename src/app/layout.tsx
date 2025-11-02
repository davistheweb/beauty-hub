import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import QueryProvider from "./QueryProvider";
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
      <body
        className={`${dm_sans.className} h-screen w-full overflow-x-hidden antialiased`}
      >
        <NextTopLoader
          showSpinner={false}
          height={2.5}
          color="#1AB65C"
        />
        <ReduxProvider>
          <QueryProvider>{children}</QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
