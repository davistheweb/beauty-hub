"use client";
import { useNotifications, useProfile } from "@/hooks";
import { getInitials } from "@/lib/utils/getInitials";
import { AppDispatch, RootState } from "@/store";
import { setOpenNotifications } from "@/store/utils/notificationStateSlice";
import Cookies from "js-cookie";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomBellICon, CustomDot } from "../icons";
import Logo from "../ui/Logo";
import { Avatar } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import MobileNavMenu from "./MobileNavMenu";

export default function MobileNavigation() {
  //Fallback image url if profile fails to fetch

  const adminState = useSelector((state: RootState) => state.admin.profile);

  const { profileInfo, profileLoading } = useProfile();

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
          {profileLoading ? (
            <Skeleton className="bg-muted flex size-full items-center justify-center rounded-full" />
          ) : (
            <Avatar
              onClick={() => {
                Cookies.remove("currentSettingsTab");
                router.push("/settings");
              }}
              className="h-[27px] w-[27px]"
            >
              <div className="relative size-full overflow-hidden rounded-full">
                <Image
                  draggable={false}
                  src={profileInfo?.avatar || (adminState?.avatar as string)}
                  alt={getInitials(
                    profileInfo?.name || (adminState?.fullName as string),
                    2,
                  )}
                  fill
                  className="object-cover text-[14px]"
                  unoptimized
                  priority
                />
              </div>
              {/* <AvatarFallback className="text-[12px]">
                {getInitials(
                  profileInfo?.name || (adminState?.fullName as string),
                  2,
                )}
              </AvatarFallback> */}
            </Avatar>
          )}
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
