"use client";
import { useNotifications } from "@/hooks";
import { AppDispatch, RootState } from "@/store";
import { setOpenNotifications } from "@/store/utils/notificationStateSlice";
import Cookies from "js-cookie";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomBellICon, CustomDot } from "../icons";
import Logo from "../ui/Logo";
import MobileNavMenu from "./MobileNavMenu";

export default function MobileNavigation() {
  const avatar =
    useSelector((state: RootState) => state.admin.profile?.avatar) || "";
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const isNotificationsOpen = useSelector(
    (state: RootState) => state.notification.openNotifications,
  );

  const { hasNotification } = useNotifications();

  const router = useRouter();

  const handleOpenNotification = () => {
    dispatch(setOpenNotifications(!isNotificationsOpen));
  };

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
        <button
          className="relative"
          onClick={handleOpenNotification}
        >
          {hasNotification && (
            <CustomDot
              color="#FF3333"
              size={8}
              className="absolute top-0.5 right-0.5"
            />
          )}

          <CustomBellICon
            size={28}
            color="#5C5A55"
          />
        </button>
        <div className="flex h-[27px] w-[27px] items-center justify-center overflow-hidden rounded-full">
          <Image
            src={avatar}
            alt="profile-img"
            width={27}
            height={27}
            className="object-cover"
            unoptimized
            onClick={() => {
              Cookies.remove("currentSettingsTab");
              router.push("/settings");
            }}
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
