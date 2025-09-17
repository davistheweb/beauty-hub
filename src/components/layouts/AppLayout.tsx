"use client";
import { Session } from "@/hooks/Auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "sonner";

function AppLayout({ children }) {
  const user = useSelector((state) => state.User);
  const isAuthenticated = Session(user);
  const [showNav, setShowNav] = useState(false);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShowNav(false);
    });
  }, []);

  if (isAuthenticated.status === "unauthenticated") {
    router.push("/auth/login");
  } else {
    if (user?.value?.user?.email_verified_at === null) {
      router.push("/auth/accountverification");
    } else {
      return (
        <div className="relative">
          <Toaster />
          {children}
        </div>
      );
    }
  }
}

export default AppLayout;
