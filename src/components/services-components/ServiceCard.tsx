import Image from "next/image";
import { MarkGreenIcon } from "../icons";
import { Button } from "../ui/button";

interface IServiceCardProps extends TDummyServices {}

const ServiceCard = ({
  imgSrc,
  serviceType,
  serviceAmount,
  allServices,
  status,
}: IServiceCardProps) => (
  <div className="relative flex h-[407px] w-[320px] flex-col items-center justify-between overflow-hidden rounded-md border border-[#E6E6E6] bg-white pb-2">
    <div className="relative h-[243px] min-w-full overflow-hidden rounded-md">
      <Image
        src={imgSrc}
        alt="service image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="rounded-md object-cover"
        draggable={false}
      />
    </div>
    <div className="relative flex h-[159px] w-full flex-col justify-between gap-1 overflow-hidden px-3 py-2">
      <div className="flex w-full justify-between">
        <span className="text-[18px] font-semibold">{serviceType}</span>
        <span className="text-xl font-bold">{serviceAmount}</span>
      </div>
      <div className="flex w-full justify-between overflow-hidden px-1 py-2">
        {/* ALl Services */}
        <div className="flex flex-col gap-2 overflow-hidden">
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
          <button className="text-custom-green cursor-pointer text-[14px] font-medium">
            See all service
          </button>
          <Button className="text-custom-green cursor-pointer rounded-full border border-[#1AB65C] bg-[#F9FFFB] text-sm font-semibold hover:bg-[#f1faf4]">
            Edit Info
          </Button>
        </div>
      </div>
    </div>
  </div>
);
export default ServiceCard;
