import { Dot } from "lucide-react";
import Image from "next/image";
import CustomTrashIcon from "../icons/CustomTrashIcon";
import { Button } from "../ui/button";

const BannerCard = ({
  imgSrc,
  title,
  message,
  status,
}: {
  imgSrc: string;
  title: string;
  message: string;
  status: "Active" | "Inactive";
}) => (
  <div className="relative flex h-[340px] w-[330px] flex-col items-center justify-between overflow-hidden rounded-md border border-[#E6E6E6] bg-white pb-2 md:w-[370px] xl:w-[450px]">
    <div className="relative h-[270px] min-w-full overflow-hidden rounded-md bg-white">
      <Image
        src={imgSrc}
        alt="service image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="rounded-md object-cover"
        draggable={false}
      />
    </div>

    <div className="flex h-full w-full flex-col justify-between gap-2">
      <div className="flex w-full items-center justify-between p-4">
        <span className="flex flex-col">
          <span className="text-[18px] font-semibold text-[#070500]">
            {title}
          </span>
          <span className="font-normal text-[#5C5A55]">{message}</span>
        </span>
        <span className="cursor-pointer">
          <CustomTrashIcon
            color="#FF3333"
            size={15}
          />
        </span>
      </div>
      <div className="flex w-full items-center justify-between p-4">
        <span
          className={`top-[8px] right-3 z-1 rounded-[42.58px] bg-[#EDF5FE] ${
            status === "Active" ? "text-[#00C247]" : "text-[#004CE8]"
          } flex h-[25px] w-[90px] items-center justify-center gap-1 text-[14px] select-none`}
        >
          <span className="flex h-3 w-3 items-center justify-center">
            <Dot
              size={40}
              className="shrink-0"
            />
          </span>
          <span className="text-xs font-medium">{status}</span>
        </span>
        <Button className="text-custom-green bg-custom-green px[20px] w-[100px] cursor-pointer rounded-full border border-[#1AB65C] text-sm font-semibold text-white hover:bg-[#198f4a]">
          Edit
        </Button>
      </div>
    </div>
  </div>
);

export default BannerCard;
