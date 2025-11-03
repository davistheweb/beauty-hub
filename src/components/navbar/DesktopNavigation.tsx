import { useDate, useNotifications, useProfile } from "@/hooks";
import { AppDispatch, RootState } from "@/store";
import { setOpenNotifications } from "@/store/utils/notificationStateSlice";
import Cookies from "js-cookie";
import { useRouter } from "nextjs-toploader/app";
import { useDispatch, useSelector } from "react-redux";
import { CustomBellICon, CustomDot } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
export default function DesktopNavigation() {
  //Fallback image url if profile fails to fetch

  const avatar = useSelector((state: RootState) => state.admin.profile?.avatar);

  const { profileInfo, profileLoading } = useProfile();

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
          {/* <Image
            draggable={false}
            src={avatar}
            className="object-cover"
            alt="profile-img"
            width={28}
            height={28}
            unoptimized
            onClick={() => {
              Cookies.remove("currentSettingsTab");
              router.push("/settings");
            }}
          /> */}
          {profileLoading ? (
            <Skeleton className="bg-muted flex size-full items-center justify-center rounded-full" />
          ) : (
            <Avatar
              onClick={() => {
                Cookies.remove("currentSettingsTab");
                router.push("/settings");
              }}
            >
              <AvatarImage src={profileInfo?.avatar || avatar} />
              <AvatarFallback>
                {profileInfo?.name
                  .split(" ")
                  .map((n) => n[0].toUpperCase())
                  .slice(2)
                  .join("") || "A"}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </nav>
  );
}
