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
          color="#1AB65C"
          initialPosition={0.08}
          crawlSpeed={120}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={120}
        />
        <ReduxProvider>
          <QueryProvider>{children}</QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
