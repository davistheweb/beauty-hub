"use client";

import { Toaster } from "sonner";
import Navbar from "../navbar";
import Notifications from "../Notifications";
import Sidebar from "../Sidebar";
function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden">
      <div className="relative flex h-full min-h-svh w-full max-w-[2000px] bg-white">
        <Toaster
          richColors
          position="top-right"
        />
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
  );
}

export default AppLayout;
