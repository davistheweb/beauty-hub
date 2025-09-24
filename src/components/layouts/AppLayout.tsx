"use client";

import { Toaster } from "sonner";
import Navbar from "../navbar";
import Sidebar from "../Sidebar";

// import { Session } from "@/hooks/Auth";
// import { useEffect, useState } from "react";

function AppLayout({ children }: { children: React.ReactNode }) {
  //   const user = useSelector((state) => state.User);
  //   const isAuthenticated = Session(user);
  //   const [showNav, setShowNav] = useState(false);
  //   const router = useRouter();
  //   useEffect(() => {
  //     window.addEventListener("scroll", () => {
  //       setShowNav(false);
  //     });
  //   }, []);
  //   if (isAuthenticated.status === "unauthenticated") {
  //     router.push("/auth/login");
  //   } else {
  //     if (user?.value?.user?.email_verified_at === null) {
  //       router.push("/auth/accountverification");
  //     } else {
  //       return (
  //         <div className="relative">
  //           <Toaster />
  //           {children}
  //         </div>
  //       );
  //     }
  //   }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="relative flex h-full min-h-svh w-full max-w-7xl bg-white">
        <Toaster
          richColors
          position="top-right"
        />
        <Sidebar />
        <div className="relative flex h-full w-full flex-col overflow-x-hidden pt-4">
          <Navbar />
          <main className="scrollbar-thin h-screen w-full flex-1 overflow-x-hidden overflow-y-auto bg-[#E6E6E6] p-4 pt-[80px] lg:py-5">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
