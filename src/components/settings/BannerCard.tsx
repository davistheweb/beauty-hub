import { Dot } from "lucide-react";
import Image from "next/image";
import { CustomTrashIcon } from "../icons";
import { Button } from "../ui/button";

interface IBannerCardProps {
  imgSrc: string;
  title: string;
  message: string;
  status: "active" | "inactive";
  handleDeleteBanner: () => void;
  handleUpdateBanner: () => void;
}

const BannerCard = ({
  imgSrc,
  title,
  message,
  status,
  handleDeleteBanner,
  handleUpdateBanner,
}: IBannerCardProps) => (
  <div className="relative flex w-[330px] flex-col items-center justify-between overflow-hidden rounded-md border border-[#E6E6E6] bg-white pb-1 sm:w-[300px] md:w-[330px] lg:w-[300px] xl:w-[450px]">
    <div className="relative h-[270px] min-w-full overflow-hidden rounded-md bg-white">
      <Image
        src={imgSrc}
        alt="service image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
        className="rounded-md object-cover"
        draggable={false}
        unoptimized
        priority
      />
    </div>

    <div className="flex h-full w-full flex-col justify-between gap-2">
      <div className="flex h-full w-full items-center justify-between p-4">
        <span className="h- flex w-full flex-col pr-3">
          <span className="text-[14px] font-semibold break-words whitespace-normal text-[#070500] lg:text-[18px]">
            {title}
          </span>
          <p className="text-[14px] font-normal break-words whitespace-normal text-[#5C5A55]">
            {message}
          </p>
        </span>
        <span
          className="cursor-pointer"
          onClick={handleDeleteBanner}
        >
          <CustomTrashIcon
            color="#FF3333"
            size={15}
          />
        </span>
      </div>
      <div className="flex w-full items-center justify-between p-4">
        <span
          className={`top-[8px] right-3 z-1 rounded-[42.58px] bg-[#EDF5FE] ${
            status.toUpperCase() === "ACTIVE"
              ? "text-[#00C247]"
              : status.toUpperCase() === "INACTIVE" && "text-[#004CE8]"
          } flex h-[25px] w-[90px] items-center justify-center gap-1 text-[14px] capitalize select-none`}
        >
          <span className="flex h-3 w-3 items-center justify-center">
            <Dot
              size={40}
              className="shrink-0"
            />
          </span>
          <span className="text-xs font-medium">{status}</span>
        </span>
        <Button
          className="text-custom-green bg-custom-green px[20px] w-[100px] cursor-pointer rounded-full border border-[#1AB65C] text-sm font-semibold text-white hover:bg-[#198f4a]"
          onClick={handleUpdateBanner}
        >
          Edit
        </Button>
      </div>
    </div>
  </div>
);

export default BannerCard;
