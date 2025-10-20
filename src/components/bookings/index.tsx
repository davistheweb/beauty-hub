"use client";
import {
  NoDataFoundTableDesktopComponent,
  NoDataFoundTableMobileComponent,
} from "@/components/no-data";
import SearchInput from "@/components/ui/SearchInput";
import { bookingTableHeaders } from "@/data";
import { useBookingDetailsByID, useBookings } from "@/hooks";
import { IBookings } from "@/types/IBookings";
import { ChevronDown, Dot, EllipsisVertical, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { BookingDetailsDialog } from "./BookingDetailsDialog";

export default function Bookings() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null,
  );
  const [selectedBookingDetails, setSelectedBookingDetails] =
    useState<IBookings | null>(null);
  const { bookingDetails, bookingDetailsDataIsLoading } = useBookingDetailsByID(
    selectedBookingId ?? undefined,
  );

  const { bookings, isAllBookingsDataLoading } = useBookings();

  useEffect(() => {
    if (bookingDetails) {
      setSelectedBookingDetails(bookingDetails);
      setOpenDialog(true);
      console.log(bookingDetails);
    }
  }, [bookingDetails]);

  const handleViewBookingDetails = (booking_id: number) => {
    setSelectedBookingId(booking_id);

    if (bookingDetails !== undefined) {
      console.log("Booking details", bookingDetails);
    }
  };

  return (
    <div className="mt-3 flex w-full flex-col gap-3 p-2">
      {selectedBookingDetails && openDialog && (
        <BookingDetailsDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          setSelectedBookingId={setSelectedBookingId}
          selectedBookingDetails={selectedBookingDetails}
          setSelectedBookingDetails={setSelectedBookingDetails}
        />
      )}
      {/* Bookins Table  */}
      <div className="flex h-[598px] w-full flex-col rounded-md bg-white p-1">
        <div className="flex h-12 w-full items-center justify-center">
          <div className="flex h-[30px] w-full items-center justify-between p-2 md:p-4">
            {/* Search  */}
            <SearchInput />
            <div className="flex gap-0 md:gap-2">
              <button className="text-custom-green cursor-pointer rounded-xs bg-[#F9FFFB] p-1 pr-1 pl-1 text-center text-[12px] font-medium md:text-[14px] lg:pr-2 lg:pl-2">
                Day
              </button>
              <button className="cursor-pointer rounded-xs p-1 pr-1 pl-1 text-[12px] font-medium text-[#898A8C] duration-300 hover:bg-[#F9FFFB] hover:text-[#1AB65C] md:text-[14px] lg:pr-2 lg:pl-2">
                Month
              </button>
              <button className="cursor-pointer rounded-xs p-1 pr-1 pl-1 text-[12px] font-medium text-[#898A8C] duration-300 hover:bg-[#F9FFFB] hover:text-[#1AB65C] md:text-[14px] lg:pr-2 lg:pl-2">
                Year
              </button>
            </div>
          </div>
        </div>
        {/* Customers Display Table  */}
        <div className="table-parent-scrollbar hidden h-full w-full overflow-x-auto p-1 md:flex">
          <table
            className="h-full w-full overflow-x-auto bg-white"
            suppressHydrationWarning={true}
          >
            <thead className="w-full bg-[#F9F9F9] text-[#5C5A55]">
              <tr className="w-full">
                {bookingTableHeaders.map((header, _i) => (
                  <th
                    key={_i}
                    className={`${header === "Action" ? "w-[50px]" : "w-[200px]"} border-b border-gray-200 px-4 py-2 text-center text-[14px] font-medium tracking-wide`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            {!isAllBookingsDataLoading && !bookings.length ? (
              <NoDataFoundTableDesktopComponent
                title="No Information Yet!"
                subtitle="Once your users start booking an appointment, all informations will be
        displayed here"
                colSpan={bookingTableHeaders.length}
              />
            ) : (
              <tbody className="w-full divide-y divide-gray-100">
                {isAllBookingsDataLoading
                  ? Array.from(
                      { length: bookingTableHeaders.length },
                      (_, i) => i,
                    ).map((i) => (
                      <tr
                        key={i}
                        className="h-[4px] w-full hover:bg-gray-50"
                      >
                        {Array.from(
                          { length: bookingTableHeaders.length },
                          (_, i) => i,
                        ).map((i) => (
                          <td
                            key={i}
                            className="h-[10px] px-8 py-2 text-center text-[14px] font-normal"
                          >
                            <Skeleton className="z-10 h-[10px] bg-[#E6E6E6]" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : bookings.map((bookingDetail, index) => (
                      <tr
                        key={index}
                        className="h-[48px] w-full hover:bg-gray-50"
                      >
                        <td className="px-8 py-2 text-center text-[14px] font-normal">
                          {bookingDetail.user.name}
                        </td>
                        <td className="px-4 py-2 text-center text-[14px] text-[#727272]">
                          {bookingDetail.package.name}
                        </td>
                        <td className="px-4 py-2 text-center text-[13px] font-normal text-[#727272]">
                          {bookingDetail.booking_date}
                        </td>
                        <td
                          className={`flex items-center justify-center px-10 py-1`}
                        >
                          <span
                            className={`rounded-[38.32px] bg-[#EDF5FE] ${bookingDetail.status === "pending" ? "text-[#004CE8]" : bookingDetail.status === "completed" ? "text-[#00C247]" : bookingDetail.status === "confirmed" ? "text-[#333]" : bookingDetail.status === "cancelled" && "text-[#FF3333]"} flex w-full items-center justify-center`}
                          >
                            <Dot
                              size={40}
                              className="inline-blocki"
                            />
                            <span className="w-fit text-center text-[12px]">
                              {bookingDetail.status === "pending"
                                ? "In Progress"
                                : bookingDetail.status === "completed"
                                  ? "Done"
                                  : bookingDetail.status === "confirmed"
                                    ? "Confirmed"
                                    : bookingDetail.status === "cancelled" &&
                                      "Canceled"}
                            </span>
                          </span>
                        </td>
                        <td className="">
                          <span
                            className="flex cursor-pointer items-center justify-center rounded-xs text-center text-[14px] font-medium"
                            onClick={() =>
                              handleViewBookingDetails(bookingDetail.id)
                            }
                          >
                            {bookingDetailsDataIsLoading &&
                            selectedBookingId === bookingDetail.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <EllipsisVertical />
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            )}
          </table>
        </div>
        {/* Customers Display Card  */}
        <div className="scrollbar-thin flex h-full w-full items-center justify-center overflow-y-auto md:hidden">
          {!isAllBookingsDataLoading && !bookings.length ? (
            <NoDataFoundTableMobileComponent
              title="No Information Yet!"
              subtitle="Once your users start booking an appointment, all informations will be
        displayed here"
            />
          ) : isAllBookingsDataLoading ? (
            <div className="flex w-full flex-col gap-3">
              {Array.from({ length: 5 }, (_, i) => i).map((i) => (
                <Skeleton
                  key={i}
                  className="h-[340px] w-[330px] bg-[#E6E6E6] sm:w-[300px] md:w-[330px] lg:w-[300px] xl:w-[450px]"
                />
              ))}
            </div>
          ) : (
            <div className="h-full w-full">
              <div className="flex h-14 w-full items-center justify-center bg-[#F5F5F5]">
                <h1 className="text-custom-green font-semibold">
                  Booking Details
                </h1>
              </div>
              <div className="flex w-full flex-col gap-3">
                {/* Customer Cards  */}
                {bookings.map((bookingDetail, _i) => (
                  <div
                    className="flex h-[294px] w-full flex-col gap-2 border border-[#E2E5E9] p-2"
                    key={_i}
                  >
                    <div className="flex h-[250px] w-full flex-col gap-5 p-4">
                      <span className="flex items-center justify-between">
                        <h1 className="text-[18px] font-medium">Customer</h1>
                        <p className="text-[14px] font-medium text-[#5C5C5C]">
                          {bookingDetail.user.name}
                        </p>
                      </span>
                      <span className="flex items-center justify-between">
                        <h1 className="text-[18px] font-medium">Packages</h1>
                        <p className="text-[14px] font-medium text-[#5C5C5C]">
                          {bookingDetail.package.name}
                        </p>
                      </span>
                      <span className="flex items-center justify-between">
                        <h1 className="text-[18px] font-medium">
                          Time and Date
                        </h1>
                        <p className="text-[14px] font-medium text-[#5C5C5C]">
                          {bookingDetail.booking_date}
                        </p>
                      </span>
                      <span className="flex items-center justify-between">
                        <h1 className="text-[18px] font-medium">Status</h1>
                        <span
                          className={`rounded-[42.58px] bg-[#EDF5FE] pt-[4.73px] pr-[9.46px] pb-[4.73px] pl-[9.46px] ${bookingDetail.status === "pending" ? "text-[#004CE8]" : bookingDetail.status === "completed" ? "text-[#00C247]" : bookingDetail.status === "confirmed" ? "text-[#333]" : bookingDetail.status === "cancelled" && "text-[#FF3333]"} flex w-[130px] items-center justify-center text-[14px]`}
                        >
                          <Dot size={40} />
                          <span>
                            {" "}
                            {bookingDetail.status === "pending"
                              ? "In Progress"
                              : bookingDetail.status === "completed"
                                ? "Done"
                                : bookingDetail.status === "confirmed"
                                  ? "Confirmed"
                                  : bookingDetail.status === "cancelled" &&
                                    "Canceled"}
                          </span>
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-end pr-4">
                      <button
                        className="text-custom-green text-[14px] font-medium"
                        onClick={() =>
                          handleViewBookingDetails(bookingDetail.id)
                        }
                      >
                        {bookingDetailsDataIsLoading &&
                        selectedBookingId === bookingDetail.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          " Action"
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Pagination  */}
      {bookings.length > 0 && (
        <div className="hidden h-[40px] w-[900px] flex-col rounded-md md:flex">
          <div className="flex h-full w-[500px] items-center justify-between">
            <div className="flex h-[35px] w-[140px] items-center justify-center gap-2">
              <span className="text-[12px] text-[#5C5A55]">Show</span>
              <div className="relative inline-block">
                <select
                  name=""
                  id=""
                  className="scrollbar-thin h-[35px] w-[64px] cursor-pointer appearance-none rounded-sm border border-[#C2C2C2] px-3"
                >
                  {Array.from({ length: 12 }, (arr, i) => i).map((arr) => (
                    <option
                      key={` :: ${arr}`}
                      value={arr + 1}
                      className=""
                    >
                      {arr + 1}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-gray-500">
                  <ChevronDown />
                </span>
              </div>
              <span className="text-[12px] text-[#5C5A55]">Row</span>
            </div>
            <div className="h-[35px] w-[300px] bg-yellow-500"></div>
          </div>
        </div>
      )}
    </div>
  );
}
