import { IPackage } from "@/types/IPackages";
import Image from "next/image";
import { CustomTrashIcon, MarkGreenIcon } from "../icons";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface IServiceDetailsProps {
  openServiceDetailsModal: boolean;
  setOpenServiceDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPackage: IPackage | null;
  setSelectedPackage: React.Dispatch<React.SetStateAction<IPackage | null>>;
  handleUpdatePackage: () => void;
}
export const ServiceDetails = ({
  openServiceDetailsModal,
  setOpenServiceDetailsModal,
  selectedPackage,
  setSelectedPackage,
  handleUpdatePackage,
}: IServiceDetailsProps) => (
  <Dialog
    open={openServiceDetailsModal}
    onOpenChange={(serviceModalOpen) => {
      setOpenServiceDetailsModal(serviceModalOpen);
      if (!serviceModalOpen) {
        setSelectedPackage(null);
      }
    }}
  >
    <DialogContent className="w-full max-w-md">
      <DialogHeader>
        <DialogTitle className="text-custom-green text-[18px] font-bold lg:text-xl">
          Service Details
        </DialogTitle>
      </DialogHeader>

      <div className="relative flex flex-col gap-3 overflow-hidden">
        <div className="space-y-1">
          <h1 className="font-semibold text-[#070500]">Customer Information</h1>
          <div className="flex h-[180px] flex-col justify-start rounded-[4px] border border-[#E4E4E4] p-2 px-5 lg:h-[150px] lg:flex-row lg:items-center lg:justify-center lg:gap-10 lg:px-0">
            <div className="relative h-[170px] w-[200px] overflow-hidden rounded-[10px] border border-[#E4E4E4] lg:h-[100px]">
              <Image
                src={
                  selectedPackage?.image ||
                  "https:\/\/beauty.literesults.net\/storage\/images\/package\/Afro_Taper_Beard_1759941070.png"
                }
                alt="service image"
                fill
                className="rounded-lg object-cover"
                draggable={false}
                unoptimized
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-[14px] font-semibold text-[#070500] md:text-xl">
                {selectedPackage?.name}
              </h1>
              <p className="text-[15px] font-bold text-[#5C5A55] md:text-xl">
                ₦{selectedPackage?.price.split(".")[0]}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="font-semibold text-[#070500]">All Serives</h1>
          <ul className="scrollbar-thin flex h-fit max-h-[100px] flex-col gap-1 overflow-y-auto border border-[#E4E4E4] p-3 lg:max-h-[150px]">
            {selectedPackage?.services.map((service, _i) => (
              <li
                key={_i}
                className="flex justify-between"
              >
                <span className="flex items-center gap-1 text-[14px] font-normal text-[#5C5A55]">
                  <span>
                    <MarkGreenIcon
                      size={14}
                      color="#1AB65C"
                    />
                  </span>
                  {service.name}
                </span>
                <button
                  type="button"
                  className="cursor-pointer"
                  // onClick={() => handleRemoveService(_i)}
                >
                  <CustomTrashIcon
                    color="#FF3333"
                    size={15}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Action Buttons  */}
        <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:gap-2">
          <Button
            onClick={handleUpdatePackage}
            className="text-custom-green h-[50px] w-full cursor-pointer rounded-full border border-[#1AB65C] bg-[#F9FFFB] text-sm font-semibold hover:bg-[#f1faf4] lg:w-[200px]"
          >
            Update Package
          </Button>
          <Button className="h-[50px] w-full cursor-pointer rounded-full bg-[#FF3333] font-semibold hover:bg-red-400 lg:w-[200px]">
            Delete
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);
