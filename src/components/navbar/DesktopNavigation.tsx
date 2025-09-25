import { useDate } from "@/hooks/useDate";
import Image from "next/image";
import Notifications from "../Notifications";

export default function DesktopNavigation() {
  const { customDate } = useDate();
  return (
    <nav className="hidden h-[40px] w-auto items-center justify-between border-b-2 border-b-[#D1F0DE] bg-white p-6 lg:flex">
      <div>
        <span className="text-[14px] text-[#898A8C]">{customDate}</span>
      </div>
      <div className="flex items-center gap-5 p-2 pb-3">
        <div className="h-8 w-[0.1] bg-gray-400" />
        <button className="cursor-pointer">
          <Notifications />
        </button>
        <div className="flex cursor-pointer items-center justify-center rounded-full">
          <Image
            src="/images/admin-img.png"
            alt="profile-img"
            width={28}
            height={28}
          />
        </div>
      </div>
    </nav>
  );
}
