"use client";

import { Toaster } from "sonner";
import Navbar from "../navbar";
import Sidebar from "../Sidebar";

// import { Session } from "@/hooks/Auth";

function AppLayout({ children }: { children: React.ReactNode }) {
  // const user = useSelector((state) => state.User);
  // const isAuthenticated = Session(user);
  // const router = useRouter();
  // if (isAuthenticated.status === "unauthenticated") {
  //   router.push("/auth/login");
  // } else {
    return (
      <div className="flex h-screen items-center justify-center overflow-hidden">
        <div className="relative flex h-full min-h-svh w-full max-w-[1400px] bg-white">
          <Toaster
            richColors
            position="top-right"
          />
          <Sidebar />
          <div className="relative flex h-full w-full flex-col overflow-x-hidden pt-4">
            <Navbar />
            <main className="scrollbar-thin h-screen w-full flex-1 overflow-x-hidden overflow-y-auto bg-[#E6E6E6] p-4 pt-[80px] lg:py-5">
              <div className="pb-5">{children}</div>
            </main>
          </div>
        </div>
      </div>
    );
  }
// }
export default AppLayout;
