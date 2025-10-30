"use client";

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { Toaster } from "sonner";
import Navbar from "../navbar";
import Notifications from "../Notifications";
import Sidebar from "../Sidebar";

const theme = createTheme({
  primaryColor: "beautyGreen",
  colors: {
    beautyGreen: [
      "#E9F9F0",
      "#C9F0DB",
      "#A8E7C6",
      "#86DDB1",
      "#64D49C",
      "#42CB87",
      "#1AB65C",
      "#159C4E",
      "#107F3F",
      "#0B6331",
    ],
  },
  fontFamily: "DM Sans, sans-serif",
});

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorSchemeScript />
      <MantineProvider
        theme={theme}
        defaultColorScheme="light"
      >
        <Toaster
          richColors
          position="top-right"
        />

        <div className="flex h-screen items-center justify-center overflow-hidden">
          <div className="relative flex h-full min-h-svh w-full max-w-[2000px] bg-white">
            <Notifications />
            <Sidebar />
            <div className="relative flex h-full w-full flex-col overflow-x-hidden pt-4">
              <Navbar />
              <main className="scrollbar-thin h-screen w-full flex-1 overflow-x-hidden overflow-y-auto bg-[#E6E6E6] p-1 pt-[80px] lg:p-4 lg:py-5">
                <div className="pb-5">{children}</div>
              </main>
            </div>
          </div>
        </div>
      </MantineProvider>
    </>
  );
}

export default AppLayout;
