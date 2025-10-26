"use client";

import { useCustomerDetailsByID } from "@/hooks";
import getErrorMessage from "@/utils/getErrorMessage";
import { Dot, Mail } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { PhoneIcon } from "../icons";
import { NoDataFoundElement } from "../no-data";
import { Button } from "../ui/button";
import { ErrorElement } from "../ui/ErrorElement";
import CustomerLoadingSkeletion from "./CustomerLoadingSkeletion";

export const CustomerDetails = ({ customerId }: { customerId: string }) => {
  //   const [copyStatus, setCopyStatus] = useState<"copy" | "copied">("copy");
  const {
    customerDetails,
    suspendedCustomer,
    unsuspendCustomer,
    customerDetailsDataIsLoading,
    isFetchCustomerDetailsError,
    fetchCustomerDetailsErrorMessage,
  } = useCustomerDetailsByID(customerId ?? undefined);

  const handleSuspendAndUnsuspendCustomer = () => {
    if (
      customerDetails?.status === "active" ||
      customerDetails?.status === "inactive" ||
      customerDetails?.status === "archived"
    ) {
      suspendedCustomer.mutate(String(customerDetails.id), {
        onSuccess: (data) => {
          toast.success(data.message);
        },
        onError: (err) => {
          console.log(err);

          const error = getErrorMessage(err);
          toast.error(error.message || "Something went wrong");
          console.log(error);
        },
      });
    } else if (customerDetails?.status === "suspended") {
      unsuspendCustomer.mutate(String(customerDetails.id), {
        onSuccess: (data) => {
          toast.success(data.message);
        },
        onError: (err) => {
          const error = getErrorMessage(err);
          toast.error(error.message || "Something went wrong");
          console.log(error);
        },
      });
    }
  };

  //   const handleCopyToClipboard = async (text: string) => {
  //     try {
  //       await navigator.clipboard.writeText(text);
  //       setCopyStatus("copied");
  //       setTimeout(() => setCopyStatus("copy"), 2000);
  //     } catch (err) {
  //       toast.error("Failed to copy location.");
  //       console.log(err);
  //     }
  //   };

  if (customerDetailsDataIsLoading) {
    return (
      <div className="flex h-[598px] w-full flex-col overflow-hidden rounded-md bg-white p-2">
        <CustomerLoadingSkeletion />
      </div>
    );
  }

  return (
    <div className="mt-3 flex w-full flex-col gap-3 p-2">
      {/* Customers Table*/}
      <div className="flex h-[598px] w-full flex-col overflow-hidden rounded-md bg-white p-2">
        {isFetchCustomerDetailsError ? (
          <ErrorElement
            title="Something went wrong"
            subtitle={fetchCustomerDetailsErrorMessage.message}
            errorType={fetchCustomerDetailsErrorMessage.type}
          />
        ) : (
          customerDetails && (
            <div className="flex h-full w-full flex-col gap-5">
              <div className="w-full">
                <div className="flex w-full flex-col rounded-[4px] border border-[#E4E4E4]">
                  <div className="md:gap-0: flex w-full flex-col justify-start gap-2 p-3 md:flex-row md:justify-between">
                    <span className="item-center flex gap-2">
                      <div className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center overflow-hidden rounded-full">
                        <Image
                          src={
                            customerDetails?.avatar ||
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
                        {customerDetails?.name}
                      </span>
                    </span>
                    <div className="flex gap-3">
                      <span
                        className={`rounded-[38.32px] bg-[#EDF5FE] select-none ${customerDetails?.status === "active" ? "text-[#00C247]" : customerDetails?.status === "inactive" ? "text-[#004CE8]" : customerDetails?.status === "archived" ? "text-[#333]" : customerDetails.status === "suspended" && "text-[#FF3333]"} flex h-[25px] w-[110px] items-center justify-center gap-2 px-2`}
                      >
                        <span className="flex h-3 w-3 items-center justify-center">
                          <Dot
                            size={40}
                            className="shrink-0"
                          />
                        </span>

                        <span className="w-fit text-center text-[12px] capitalize">
                          {customerDetails.status}
                        </span>
                      </span>
                      <Button
                        onClick={handleSuspendAndUnsuspendCustomer}
                        className={`h-[25px] cursor-pointer rounded-full capitalize ${customerDetails?.status === "suspended" ? "bg-custom-green hover:bg-[#1fc966]" : customerDetails?.status === "archived" ? "bg-[#FF3333] hover:bg-red-400" : customerDetails?.status === "inactive" ? "bg-[#FF3333] hover:bg-red-400" : customerDetails?.status === "active" && "bg-[#FF3333] hover:bg-red-400"} w-[110px] font-semibold`}
                        disabled={
                          suspendedCustomer.isPending ||
                          unsuspendCustomer.isPending
                        }
                      >
                        {customerDetails?.status === "suspended"
                          ? "Unsuspend"
                          : customerDetails?.status === "active"
                            ? "Suspend"
                            : customerDetails?.status === "inactive"
                              ? "Suspend"
                              : customerDetails?.status === "archived" &&
                                "Suspend"}
                      </Button>
                    </div>
                  </div>
                  <div className="flex w-full flex-col justify-between gap-1 border-t border-[#E4E4E4] p-3 md:flex-row md:gap-2">
                    <span className="flex items-center gap-2">
                      <PhoneIcon
                        size={15}
                        fill="#5C5C5C"
                        color="text-[#5C5C5C]"
                      />
                      <span className="font-[#898A8C] text-[14px]">
                        {customerDetails?.phone || "no number"}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 text-[14px] text-[#898A8C]">
                      <Mail
                        size={15}
                        className="text-[#5C5C5C]"
                      />
                      <span>{customerDetails?.email}</span>
                    </span>
                  </div>
                </div>
              </div>

              {!customerDetails?.bookings.length ? (
                <div className="h-full w-full items-center justify-center">
                  <NoDataFoundElement
                    title="No Booking Information Yet!"
                    subtitle="All customer details will be displayed here once they begin signing up and making bookings."
                  />
                </div>
              ) : (
                <div className="flex w-full flex-col gap-4">
                  <span className="text-[16px] font-semibold lg:text-xl">
                    All Booking Information
                  </span>
                  <div className="scrollbar-thin grid max-h-[400px] gap-4 overflow-y-auto pb-4 md:grid-cols-2">
                    {customerDetails.bookings.map((booking, _i) => (
                      <div
                        key={_i}
                        className="flex w-full flex-col rounded-[4px] border border-[#E4E4E4] p-2 pb-5"
                      >
                        <div className="flex h-fit w-full flex-col gap-1 px-2 md:gap-3">
                          <span className="flex w-full items-center justify-between border-b border-[#E4E4E4] pb-2">
                            <span className="flex flex-col">
                              <span className="text-xs text-[#727272]">
                                Date Booked
                              </span>
                              <span className="font-medium text-[#070500]">
                                {booking.booking_date}
                              </span>
                            </span>
                            <span>
                              <span
                                className={`rounded-[38.32px] bg-[#EDF5FE] select-none ${booking.status === "pending" ? "text-[#004CE8]" : booking.status === "completed" ? "text-[#00C247]" : booking.status === "confirmed" ? "text-[#333]" : booking.status === "cancelled" && "text-[#FF3333]"} flex h-[25px] items-center justify-center gap-2 px-2`}
                              >
                                <span className="flex h-3 w-3 items-center justify-center">
                                  <Dot
                                    size={40}
                                    className="shrink-0"
                                  />
                                </span>

                                <span className="w-fit text-center text-[12px]">
                                  {booking.status === "pending"
                                    ? "In Progress"
                                    : booking.status === "completed"
                                      ? "Completed"
                                      : booking.status === "confirmed"
                                        ? "Confirmed"
                                        : booking.status === "cancelled" &&
                                          "Canceled"}
                                </span>
                              </span>
                            </span>
                          </span>
                          <span className="flex justify-between">
                            <span className="flex flex-col">
                              <span className="text-xs text-[#727272]">
                                Types of package
                              </span>
                              <span className="font-medium text-[#070500]">
                                {booking.package.name}
                              </span>
                            </span>
                            {/* <span className="flex flex-col">
                              <span className="text-xs text-[#727272]">
                                Barber
                              </span>
                              <span className="font-medium text-[#070500]">
                                Barber
                              </span>
                            </span> */}
                          </span>
                          <span className="flex gap-16">
                            <span className="flex flex-col">
                              <span className="text-xs text-[#727272]">
                                Date and time
                              </span>
                              <span className="font-medium text-[#070500]">
                                {booking.booking_date}
                              </span>
                            </span>
                            <span className="flex flex-col">
                              <span className="text-xs text-[#727272]">
                                Booking amount
                              </span>
                              <span className="font-medium text-[#070500]">
                                ₦{booking.amount.split(".")[0]}
                              </span>
                            </span>
                          </span>
                          <span className="flex flex-col gap-1">
                            <span className="text-xs font-normal text-[#727272]">
                              Location
                            </span>
                            <span className="flex items-center gap-2 text-xs font-medium md:text-[16px]">
                              {booking.location}
                            </span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};
