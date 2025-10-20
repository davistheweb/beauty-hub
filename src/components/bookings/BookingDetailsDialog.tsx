"use client";

import { IBookings } from "@/types/IBookings";
import { Dot, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBookingDetailsByID } from "@/hooks";
import {
  BookingStatusFormValues,
  bookingStatusSchema,
} from "@/utils/validators/updateBookingDetailsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BookingDetailsDialogProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  setSelectedBookingId: (id: number | null) => void;
  setSelectedBookingDetails: (details: IBookings | null) => void;
  selectedBookingDetails: IBookings;
}

export const BookingDetailsDialog = ({
  openDialog,
  setOpenDialog,
  setSelectedBookingId,
  setSelectedBookingDetails,
  selectedBookingDetails,
}: BookingDetailsDialogProps) => {
  const { updateBookingStatus } = useBookingDetailsByID();
  const form = useForm<BookingStatusFormValues>({
    resolver: zodResolver(bookingStatusSchema),
    defaultValues: {
      status: "",
    },
  });

  const handleUpdateBookingStatus = (data: BookingStatusFormValues) => {
    updateBookingStatus.mutate(
      {
        id: selectedBookingDetails.id,
        status: data.status,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          setTimeout(() => {
            setOpenDialog(false);
          }, 1500);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };
  return (
    <Dialog
      open={openDialog}
      onOpenChange={(diaLogOpen) => {
        setOpenDialog(diaLogOpen);
        if (!diaLogOpen) {
          setSelectedBookingId(null);
          setSelectedBookingDetails(null);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-custom-green text-[18px] font-bold lg:text-2xl">
            Booking Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Customer information will be displayed here. */}
          <div className="w-full">
            <span className="text-[18px] font-semibold lg:text-xl">
              Customer Information
            </span>
            <div className="flex flex-col rounded-[4px] border border-[#E4E4E4]">
              <div className="flex items-center justify-between p-2">
                <span className="item-center flex gap-2">
                  <div className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center overflow-hidden rounded-full">
                    <Image
                      src={selectedBookingDetails?.user.avatar || ""}
                      draggable={false}
                      className="object-cover"
                      alt="user avatar"
                      width={28}
                      height={28}
                      unoptimized
                    />
                  </div>
                  <span className="text-center text-[15px] font-medium">
                    {selectedBookingDetails.user.name}
                  </span>
                </span>
                <span
                  className={`h-[25px] w-[70px] rounded-[42.58px] bg-[#EDF5FE] pt-[4.73px] pr-[9.46px] pb-[4.73px] pl-[9.46px] ${selectedBookingDetails.status === "pending" ? "text-[#004CE8]" : selectedBookingDetails.status === "completed" ? "text-[#00C247]" : selectedBookingDetails.status === "confirmed" ? "text-[#333]" : selectedBookingDetails.status === "cancelled" && "text-[#FF3333]"} flex w-[130px] items-center justify-center text-[14px]`}
                >
                  <Dot size={40} />
                  <span>
                    {" "}
                    {selectedBookingDetails.status === "pending"
                      ? "In Progress"
                      : selectedBookingDetails.status === "completed"
                        ? "Done"
                        : selectedBookingDetails.status === "confirmed"
                          ? "Confirmed"
                          : selectedBookingDetails.status === "cancelled" &&
                            "Canceled"}
                  </span>
                </span>
              </div>
              <div className="flex w-full justify-between border-t border-[#E4E4E4] p-2">
                <span className="flex items-center gap-2">
                  <Phone
                    size={15}
                    fill="#5C5C5C"
                    className="text-[#5C5C5C]"
                  />
                  <span className="font-[#898A8C] text-[14px]">
                    {selectedBookingDetails.user.phone}
                  </span>
                </span>
                <span className="flex items-center gap-2 text-[14px] text-[#898A8C]">
                  <Mail
                    size={15}
                    className="text-[#5C5C5C]"
                  />
                  <span>{selectedBookingDetails.user.email}</span>
                </span>
              </div>
            </div>
          </div>
          {/* Booking information will display here */}
          <div className="w-full">
            <span className="text-[18px] font-semibold lg:text-xl">
              Booking Information
            </span>
            <div className="flex flex-col rounded-[4px] border border-[#E4E4E4] p-4">
              <div className="flex w-[300px] flex-col gap-3">
                <span className="flex flex-col">
                  <span className="text-xs font-normal text-[#727272]">
                    Types of packages
                  </span>
                  <span className="font-medium">
                    {selectedBookingDetails.package.name}
                  </span>
                </span>
                <span className="flex justify-between gap-3">
                  <span className="flex flex-col">
                    <span className="text-xs font-normal text-[#727272]">
                      Booking amount
                    </span>
                    <span className="text-semibold">
                      ₦{selectedBookingDetails.amount}
                    </span>
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs font-normal text-[#727272]">
                      Date
                    </span>
                    <span className="text-semibold">
                      {selectedBookingDetails.booking_date}
                    </span>
                  </span>
                </span>
                <span className="flex flex-col">
                  <span className="text-xs font-normal text-[#727272]">
                    Location
                  </span>
                  <span className="font-medium">
                    {selectedBookingDetails.location}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateBookingStatus)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger className="h-12 focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none xl:w-[450px]">
                          <SelectValue placeholder="-- Select Status --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full items-center justify-center gap-3">
                <Button
                  type="submit"
                  className={`bg-custom-green cursor-pointer rounded-full py-5 transition-all duration-300 hover:bg-[#1fc966] ${updateBookingStatus.isPending ? "w-5" : "w-[250px]"}`}
                  disabled={updateBookingStatus.isPending}
                >
                  {updateBookingStatus.isPending ? (
                    <div className="flex items-center justify-center">
                      <div className="bg-custom-green w-fit rounded-full p-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-3 border-gray-200 border-t-[#1AB65C]" />
                      </div>
                    </div>
                  ) : (
                    " Start Service"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
