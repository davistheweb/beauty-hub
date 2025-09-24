"use client";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Notifications from "../Notifications";
import Logo from "../ui/Logo";
import MobileNavMenu from "./MobileNavMenu";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className="border-b-gray-[#A4B9DA] fixed top-0 right-0 z-10 flex w-full items-center justify-between border-b-1 bg-white p-2 lg:hidden">
      {/* <div>1 May 2025 | 11:09 AM GMT</div> */}
      {/* Header */}

      <Logo
        width={45}
        height={45}
      />
      {/* Navitems */}
      <div className="flex items-center justify-center gap-3">
        <Notifications />
        <div className="flex items-center justify-center rounded-full">
          <Image
            src="/images/admin-img.png"
            alt="profile-img"
            width={35}
            height={35}
          />
        </div>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <Menu size={30} />
        </button>
      </div>
      <MobileNavMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </nav>
  );
}
