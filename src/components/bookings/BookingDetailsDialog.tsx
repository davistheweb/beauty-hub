"use client";

import { IBookings } from "@/types/IBookings";
import { Check, Dot, Mail } from "lucide-react";
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
import { IErrorInfo } from "@/types/Error";
import {
  BookingStatusFormValues,
  bookingStatusSchema,
} from "@/utils/validators/updateBookingDetailsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CopyIcon, PhoneIcon } from "../icons";
import { ErrorElement } from "../ui/ErrorElement";

interface BookingDetailsDialogProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  setSelectedBookingId: (id: number | null) => void;
  setSelectedBookingDetails: (details: IBookings | null) => void;
  selectedBookingDetails: IBookings | null;
  detailsIsLoading: boolean;
  isFetchBookingDetailsError: boolean;
  fetchBookingDetailsErrorMessage: IErrorInfo;
}

export const BookingDetailsDialog = ({
  openDialog,
  setOpenDialog,
  setSelectedBookingId,
  setSelectedBookingDetails,
  selectedBookingDetails,
  detailsIsLoading,
  isFetchBookingDetailsError,
  fetchBookingDetailsErrorMessage,
}: BookingDetailsDialogProps) => {
  const [copyStatus, setCopyStatus] = useState<"copy" | "copied">("copy");

  const { updateBookingStatus } = useBookingDetailsByID();

  const form = useForm<BookingStatusFormValues>({
    resolver: zodResolver(bookingStatusSchema),
    defaultValues: {
      status: "",
    },
  });

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("copy"), 2000);
    } catch (err) {
      toast.error("Failed to copy location.");
      console.log(err);
    }
  };

  const handleUpdateBookingStatus = (data: BookingStatusFormValues) => {
    updateBookingStatus.mutate(
      {
        id: selectedBookingDetails?.id as number,
        status: data.status,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          setSelectedBookingId(null);
          setSelectedBookingDetails(null);
          setTimeout(() => {
            setOpenDialog(false);
          }, 1000);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };

  // if (isFetchBookingDetailsError)
  //   return (
  //     <Dialog
  //       open={openDialog}
  //       onOpenChange={(diaLogOpen) => {
  //         setOpenDialog(diaLogOpen);
  //         if (!diaLogOpen) {
  //           setSelectedBookingId(null);
  //           setSelectedBookingDetails(null);
  //         }
  //       }}
  //     >
  //       <DialogContent className="max-w-fit">
  //         <DialogHeader>
  //           <DialogTitle className="text-custom-green text-[16px] font-bold lg:text-2xl">
  //             Booking Details
  //           </DialogTitle>
  //         </DialogHeader>

  //         <div className="flex h-[300px] w-full items-center justify-center">
  //           <h1 className="text-xl font-semibold text-[#333]">
  //             {fetchBookingDetailsErrorMessage}
  //           </h1>
  //         </div>
  //       </DialogContent>
  //     </Dialog>
  //   );

  return (
    <Dialog
      open={openDialog || detailsIsLoading}
      onOpenChange={(diaLogOpen) => {
        setOpenDialog(diaLogOpen);
        if (!diaLogOpen) {
          setSelectedBookingId(null);
          setSelectedBookingDetails(null);
        }
      }}
    >
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle className="text-custom-green text-[16px] font-bold lg:text-2xl">
            Booking Details
          </DialogTitle>
        </DialogHeader>

        {detailsIsLoading ? (
          <div className="flex h-[300px] w-full items-center justify-center">
            <div className="w-fit rounded-full bg-white p-2">
              <div className="h-20 w-20 animate-spin rounded-full border-4 border-gray-200 border-t-[#1AB65C]" />
            </div>
          </div>
        ) : isFetchBookingDetailsError ? (
          <div className="flex h-[300px] w-full items-center justify-center">
            <ErrorElement
              title="Something went wrong"
              subtitle={fetchBookingDetailsErrorMessage.message}
              errorType={fetchBookingDetailsErrorMessage.type}
            />
          </div>
        ) : (
          selectedBookingDetails && (
            <div className="flex flex-col gap-2">
              {/* Customer information will be displayed here. */}
              <div className="w-full">
                <span className="text-[16px] font-semibold lg:text-xl">
                  Customer Information
                </span>
                <div className="flex w-full flex-col rounded-[4px] border border-[#E4E4E4]">
                  <div className="md:gap-0: flex w-full flex-col justify-start gap-2 p-3 md:flex-row md:justify-between">
                    <span className="item-center flex gap-2">
                      <div className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center overflow-hidden rounded-full">
                        <Image
                          src={
                            selectedBookingDetails.user.avatar ||
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
                        {selectedBookingDetails.user.name}
                      </span>
                    </span>
                    <span
                      className={`rounded-[38.32px] bg-[#EDF5FE] select-none ${selectedBookingDetails.status === "pending" ? "text-[#004CE8]" : selectedBookingDetails.status === "completed" ? "text-[#00C247]" : selectedBookingDetails.status === "confirmed" ? "text-[#333]" : selectedBookingDetails.status === "cancelled" && "text-[#FF3333]"} flex h-[25px] w-[110px] items-center justify-center gap-2 px-2`}
                    >
                      <span className="flex h-3 w-3 items-center justify-center">
                        <Dot
                          size={40}
                          className="shrink-0"
                        />
                      </span>

                      <span className="w-fit text-center text-[12px]">
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
                  <div className="flex w-full flex-col justify-between gap-1 border-t border-[#E4E4E4] p-3 md:flex-row md:gap-2">
                    <span className="flex items-center gap-2">
                      <PhoneIcon
                        size={15}
                        fill="#5C5C5C"
                        color="text-[#5C5C5C]"
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
                <span className="text-[16px] font-semibold lg:text-xl">
                  Booking Information
                </span>
                <div className="flex flex-col rounded-[4px] border border-[#E4E4E4] p-2">
                  <div className="flex w-[300px] flex-col gap-1 md:gap-3">
                    <span className="grid grid-cols-2 md:grid-cols-1 md:gap-3">
                      <span className="flex flex-col">
                        <span className="text-xs font-normal text-[#727272]">
                          Types of packages
                        </span>
                        <span className="text-xs font-medium md:text-[16px]">
                          {selectedBookingDetails.package.name}
                        </span>
                      </span>
                      <span className="flex justify-between gap-3">
                        <span className="flex flex-col">
                          <span className="text-[10px] font-normal text-[#727272] md:text-xs">
                            Booking amount
                          </span>
                          <span className="text-semibold text-xs md:text-[16px]">
                            ₦{selectedBookingDetails.amount.split(".")[0]}
                          </span>
                        </span>
                        <span className="flex flex-col">
                          <span className="text-xs font-normal text-[#727272]">
                            Date
                          </span>
                          <span className="text-semibold text-xs md:text-[16px]">
                            {selectedBookingDetails.booking_date}
                          </span>
                        </span>
                      </span>
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-xs font-normal text-[#727272]">
                        Location
                      </span>
                      <span className="flex items-center gap-2 text-xs font-medium md:text-[16px]">
                        {selectedBookingDetails.location}
                      </span>
                      <span className="cursor-pointer">
                        {copyStatus === "copy" ? (
                          <CopyIcon
                            color="#898A8C"
                            size={16}
                            onClick={() =>
                              handleCopyToClipboard(
                                selectedBookingDetails.location || "",
                              )
                            }
                          />
                        ) : (
                          <Check
                            className="text-[#898A8C]"
                            size={16}
                          />
                        )}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              {!(selectedBookingDetails.status === "completed") && (
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
                              <SelectTrigger className="h-12 w-full focus:border-green-300 focus:ring-1 focus:ring-green-500 focus:outline-none">
                                <SelectValue placeholder="-- Select Status --" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">
                                  Confirmed
                                </SelectItem>
                                <SelectItem value="completed">
                                  Completed
                                </SelectItem>
                                <SelectItem value="cancelled">
                                  Cancelled
                                </SelectItem>
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
                        className={`bg-custom-green cursor-pointer rounded-full transition-all duration-300 hover:bg-[#1fc966] ${updateBookingStatus.isPending ? "w-5" : "w-[250px] py-5"}`}
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
              )}
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};
