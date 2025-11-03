"use client";
import { logoutAdmin } from "@/services/Auth";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { CustomLogoutIcon } from "../icons";
import { NavLinks } from "./NavLinks";

export default function MobileNavMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setIsOpen(false);
    };

    if (isOpen) document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen, setIsOpen]);

  const handleLogout = async () => {
    await logoutAdmin().then(() => {
      localStorage.clear();
      window.location.reload();
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute top-0 left-0 flex h-screen w-full justify-end bg-[#4C4C4C57] backdrop-blur-xs lg:hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            ref={navRef}
          >
            <div className="relative h-[100%] bg-white p-10 pr-20 pl-5">
              <div className="absolute top-3 right-4">
                <button
                  className="text-gray-400"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <X size={35} />
                </button>
              </div>
              <div className="flex flex-col items-start justify-between">
                <ul className="mt-10 flex flex-col gap-7">
                  {NavLinks.map(({ title, href, Icon }, i) => (
                    <li
                      key={i}
                      className="w-full"
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={17} />
                        <Link
                          href={href}
                          onClick={() => setIsOpen((prev) => !prev)}
                        >
                          {title}
                        </Link>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="">
                  <button
                    className="mt-10 flex gap-3 p-3 text-red-600"
                    onClick={handleLogout}
                  >
                    <CustomLogoutIcon /> <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
