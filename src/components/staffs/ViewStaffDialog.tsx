import { useStaff } from "@/hooks";
import getErrorResponse from "@/services/helpers";
import { IStaff } from "@/types/IStaff";
import { Dot, Mail, PhoneIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface IViewStaffDialogProps {
  openStaffDialog: boolean;
  setOpenStaffDialog: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStaff: IStaff | null;
  setSelectedStaff: React.Dispatch<React.SetStateAction<IStaff | null>>;
  handleUpdateStaffDetails: () => void;
}
export const ViewStaffDialog = ({
  openStaffDialog,
  setOpenStaffDialog,
  selectedStaff,
  setSelectedStaff,
  handleUpdateStaffDetails,
}: IViewStaffDialogProps) => {
  const { suspendedStaff, unsuspendStaff } = useStaff();

  const handleSuspendAndUnsuspendStaff = () => {
    if (
      selectedStaff?.status === "active" ||
      selectedStaff?.status === "inactive"
    ) {
      suspendedStaff.mutate(String(selectedStaff.id), {
        onSuccess: (data) => {
          toast.success(data.message);
          setTimeout(() => {
            setSelectedStaff(null);
            setOpenStaffDialog(false);
          }, 1200);
        },
        onError: (err) => {
          // console.log(err);

          const error = getErrorResponse(err);
          toast.error(error.message || "Something went wrong");
          // console.log(error);
        },
      });
    } else if (selectedStaff?.status === "suspended") {
      unsuspendStaff.mutate(String(selectedStaff.id), {
        onSuccess: (data) => {
          toast.success(data.message);
          setTimeout(() => {
            setSelectedStaff(null);
            setOpenStaffDialog(false);
          }, 1200);
        },
        onError: (err) => {
          const error = getErrorResponse(err);
          toast.error(error.message || "Something went wrong");
          // console.log(error);
        },
      });
    }
  };

  return (
    <Dialog
      open={openStaffDialog}
      onOpenChange={(staffDialogOpen) => {
        setOpenStaffDialog(staffDialogOpen);
        if (!staffDialogOpen) {
          setSelectedStaff(null);
        }
      }}
    >
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-custom-green text-[18px] font-bold lg:text-xl">
            Service Details
          </DialogTitle>
        </DialogHeader>

        <div className="relative flex h-full flex-col gap-3 overflow-hidden">
          <div className="space-y-1">
            <h1 className="font-semibold text-[#070500]">
              Stylist Information
            </h1>

            <div className="w-full">
              <div className="flex w-full flex-col rounded-[4px] border border-[#E4E4E4]">
                <div className="md:gap-0: flex w-full flex-col justify-start gap-2 border-b border-[#E4E4E4] p-3 md:flex-row md:justify-between">
                  <span className="item-center flex gap-2">
                    <div className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center overflow-hidden rounded-full">
                      <Image
                        src={
                          selectedStaff?.avatar ||
                          "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?semt=ais_hybrid&w=740&q=80"
                        }
                        draggable={false}
                        className="object-cover"
                        alt="user avatar"
                        width={28}
                        height={28}
                        unoptimized
                      />
                    </div>
                    <span className="text-center text-[15px] font-medium">
                      {selectedStaff?.name}
                    </span>
                  </span>
                  <span
                    className={`gap-2 rounded-[42.58px] bg-[#EDF5FE] pt-[4.73px] pr-[1.46px] pb-[4.73px] pl-[1.46px] ${selectedStaff?.status === "active" ? "text-[#00C247]" : selectedStaff?.status === "inactive" ? "text-[#004CE8]" : selectedStaff?.status === "suspended" && "text-[#FF3333]"} flex w-[130px] items-center justify-center text-[14px]`}
                  >
                    <span className="flex h-3 w-3 items-center justify-center">
                      <Dot
                        size={40}
                        className="shrink-0"
                      />
                    </span>
                    <span className="capitalize">{selectedStaff?.status}</span>
                  </span>
                </div>
                <div className="flex w-full flex-col justify-between gap-1 p-3 px-2 md:flex-row md:gap-2">
                  <span className="flex items-center gap-2">
                    <PhoneIcon
                      size={15}
                      fill="#5C5C5C"
                      color="text-[#5C5C5C]"
                    />
                    <span className="font-[#898A8C] text-[14px]">
                      {selectedStaff?.phone || "no number"}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-[14px] text-[#898A8C]">
                    <Mail
                      size={15}
                      className="text-[#5C5C5C]"
                    />
                    <span>{selectedStaff?.email}</span>
                  </span>
                </div>
                <div className="flex w-full px-4 py-2">
                  <div className="flex w-full border-t border-[#E4E4E4] py-2">
                    <span className="flex gap-16">
                      <span className="flex flex-col">
                        <span className="text-xs text-[#727272]">
                          Joined Date
                        </span>
                        <span className="font-medium text-[#070500]">
                          {new Date(selectedStaff?.created_at as string)
                            .toLocaleDateString()
                            .split("/")
                            .join("-")}
                        </span>
                      </span>
                      {/* <span className="flex flex-col">
                        <span className="text-xs text-[#727272]">
                          No of booking
                        </span>
                        <span className="font-medium text-[#070500]">
                          number
                        </span>
                      </span> */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Action Buttons  */}
          <div className="relative flex h-full flex-col items-center justify-between gap-5 py-2 align-middle lg:flex-row lg:gap-2">
            <Button
              onClick={handleUpdateStaffDetails}
              className="text-custom-green h-[50px] w-full cursor-pointer rounded-full border border-[#1AB65C] bg-[#F9FFFB] text-sm font-semibold hover:bg-[#f1faf4] lg:w-[200px]"
            >
              Edit Profile
            </Button>
            <Button
              onClick={handleSuspendAndUnsuspendStaff}
              className={`h-[50px] w-full cursor-pointer rounded-full ${selectedStaff?.status === "suspended" ? "bg-custom-green hover:bg-[#1fc966]" : selectedStaff?.status === "inactive" ? "bg-[#FF3333] hover:bg-red-400" : selectedStaff?.status === "active" && "bg-[#FF3333] hover:bg-red-400"} font-semibold lg:w-[200px]`}
              disabled={suspendedStaff.isPending || unsuspendStaff.isPending}
            >
              {selectedStaff?.status === "suspended"
                ? "Unsuspend"
                : selectedStaff?.status === "active"
                  ? "Suspend"
                  : selectedStaff?.status === "inactive" && "Suspend"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
