import numberFormat from "@/utils/numberFormat";
import { Dot } from "lucide-react";
import Image from "next/image";
import { MarkGreenIcon } from "../icons";
import { Button } from "../ui/button";

interface IPackageCardProps {
  imgSrc: string;
  packageType: string;
  serviceAmount: string;
  allServices: string[];
  status: "active" | "inactive";
  handleViewServices: () => void;
  handleUpdatePackage: () => void;
}

const PackageCard = ({
  imgSrc,
  packageType,
  serviceAmount,
  allServices,
  status,
  handleViewServices,
  handleUpdatePackage,
}: IPackageCardProps) => (
  <div className="relative flex h-[407px] w-[320px] flex-col items-center justify-between overflow-hidden rounded-md border border-[#E6E6E6] bg-white pb-2">
    {status && (
      <span
        className={`absolute top-[8px] right-3 z-1 rounded-[42.58px] bg-[#EDF5FE] ${
          status === "active" ? "text-[#00C247]" : "text-[#004CE8]"
        } flex h-[25px] w-[90px] items-center justify-center gap-1 text-[14px] select-none`}
      >
        <span className="flex h-3 w-3 items-center justify-center">
          <Dot
            size={40}
            className="shrink-0"
          />
        </span>
        <span className="text-xs font-medium">
          {status === "active" ? "Active" : status === "inactive" && "Inactive"}
        </span>
      </span>
    )}
    <div className="relative h-[243px] min-w-full overflow-hidden rounded-md">
      <Image
        src={
          imgSrc ||
          "https:\/\/beauty.literesults.net\/storage\/images\/package\/Afro_Taper_Beard_1759941070.png"
        }
        alt="service image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="rounded-md object-cover"
        draggable={false}
        unoptimized
      />
    </div>
    <div className="relative flex h-[159px] w-full flex-col justify-between gap-1 overflow-hidden px-3 py-2">
      <div className="flex w-full justify-between">
        <span className="text-[16px] font-semibold break-words whitespace-normal">
          {packageType}
        </span>
        <span className="truncate text-xl font-bold">
          ₦{numberFormat(Number(serviceAmount))}
        </span>
      </div>
      <div className="flex w-full justify-between overflow-hidden px-1">
        {/* ALl Services */}
        <div className="over flex flex-col gap-2">
          {allServices.slice(0, 3).map((service, i) => (
            <span
              key={i}
              className="flex gap-2"
            >
              <span>
                <MarkGreenIcon color="#1AB65C" />
              </span>
              <span className="font-normal text-[#5C5A55]">{service}</span>
            </span>
          ))}
        </div>
        {/* Actions  */}
        <div className="flex flex-col items-center justify-center gap-2 overflow-hidden">
          <button
            onClick={handleViewServices}
            className="text-custom-green cursor-pointer text-[14px] font-medium"
          >
            See all service
          </button>
          <Button
            onClick={handleUpdatePackage}
            className="text-custom-green cursor-pointer rounded-full border border-[#1AB65C] bg-[#F9FFFB] text-sm font-semibold hover:bg-[#f1faf4]"
          >
            Edit Info
          </Button>
        </div>
      </div>
    </div>
  </div>
);
export default PackageCard;
