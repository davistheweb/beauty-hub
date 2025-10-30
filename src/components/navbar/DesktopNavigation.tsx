import { useDate, useNotifications } from "@/hooks";
import { AppDispatch, RootState } from "@/store";
import { setOpenNotifications } from "@/store/utils/notificationStateSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { CustomBellICon, CustomDot } from "../icons";
export default function DesktopNavigation() {
  const avatar =
    useSelector((state: RootState) => state.admin.profile?.avatar) || "";

  const { customDate } = useDate();

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
    <nav className="hidden h-[40px] w-auto items-center justify-between border-b-2 border-b-[#D1F0DE] bg-white p-6 lg:flex">
      <div>
        <span className="text-[14px] text-[#898A8C]">{customDate}</span>
      </div>
      <div className="flex items-center gap-5 p-2 pb-3">
        <div className="h-8 w-[0.1] bg-gray-400" />
        <button
          className="relative cursor-pointer"
          onClick={handleOpenNotification}
        >
          {hasNotification && (
            <CustomDot
              color="#FF3333"
              size={8}
              className="absolute top-0.5 right-1 w-fit shrink"
            />
          )}
          <CustomBellICon
            size={28}
            color="#5C5A55"
          />
        </button>
        <div className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center overflow-hidden rounded-full">
          <Image
            draggable={false}
            src={avatar}
            className="object-cover"
            alt="profile-img"
            width={28}
            height={28}
            unoptimized
            onClick={() => router.push("/settings")}
          />
        </div>
      </div>
    </nav>
  );
}
