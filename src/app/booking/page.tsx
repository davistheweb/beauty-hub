import AppLayout from "@/components/layouts/AppLayout";
import {
  NoDataFoundTableDesktopComponent,
  NoDataFoundTableMobileComponent,
} from "@/components/no-data";
import SearchInput from "@/components/ui/SearchInput";
import { bookingDetails, bookingTableHeaders } from "@/data";
import { ChevronDown, Dot, EllipsisVertical } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Booking",
};

export default function Booking() {
  return (
    <AppLayout>
      <div className="flex h-full flex-1 flex-col md:p-2">
        <h1 className="inline-block text-2xl font-bold">Bookings</h1>
        <div className="mt-3 flex w-full flex-col gap-3 p-2">
          {/* Bookins Table  */}
          <div className="flex h-[598px] w-full flex-col rounded-md bg-white p-1">
            <div className="flex h-12 w-full items-center justify-center">
              <div className="flex h-[30px] w-full items-center justify-between p-2 md:p-4">
                {/* Search  */}
                <SearchInput />
                <div className="flex gap-1 md:gap-2">
                  <button className="text-custom-green cursor-pointer rounded-xs bg-[#F9FFFB] p-1 pr-2 pl-2 text-center text-[14px] font-medium">
                    Day
                  </button>
                  <button className="cursor-pointer rounded-xs p-1 pr-2 pl-2 text-[14px] font-medium text-[#898A8C] duration-300 hover:bg-[#F9FFFB] hover:text-[#1AB65C]">
                    Month
                  </button>
                  <button className="cursor-pointer rounded-xs p-1 pr-2 pl-2 text-[14px] font-medium text-[#898A8C] duration-300 hover:bg-[#F9FFFB] hover:text-[#1AB65C]">
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
                {!bookingDetails.length ? (
                  <NoDataFoundTableDesktopComponent
                    title="No Information Yet!"
                    subtitle="Once your users start booking an appointment, all informations will be
        displayed here"
                    colSpan={bookingTableHeaders.length}
                  />
                ) : (
                  <tbody className="w-full divide-y divide-gray-100">
                    {bookingDetails.map((bookingDetail, index) => (
                      <tr
                        key={index}
                        className="h-[48px] w-full hover:bg-gray-50"
                      >
                        <td className="px-8 py-2 text-center text-[14px] font-normal">
                          {bookingDetail.customer}
                        </td>
                        <td className="px-4 py-2 text-center text-[14px] text-[#727272]">
                          {bookingDetail.package}
                        </td>
                        <td className="px-4 py-2 text-center text-[13px] font-normal text-[#727272]">
                          {bookingDetail.date}
                        </td>
                        <td
                          className={`flex items-center justify-center px-10 py-1`}
                        >
                          <span
                            className={`rounded-[38.32px] bg-[#EDF5FE] ${bookingDetail.status === "In Progress" ? "text-[#004CE8]" : bookingDetail.status === "Done" ? "text-[#00C247]" : "text-[#FF3333]"} flex w-full items-center justify-center`}
                          >
                            <Dot
                              size={40}
                              className="inline-block"
                            />
                            <span className="w-fit text-center text-[12px]">
                              {bookingDetail.status}
                            </span>
                          </span>
                        </td>
                        <td className="">
                          <span className="flex cursor-pointer items-center justify-center rounded-xs text-center text-[14px] font-medium">
                            <EllipsisVertical className="text-[#737375] hover:bg-[#EDF5FE]" />
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
              {!bookingDetails.length ? (
                <NoDataFoundTableMobileComponent
                  title="No Information Yet!"
                  subtitle="Once your users start booking an appointment, all informations will be
        displayed here"
                />
              ) : (
                <div className="w-full">
                  <div className="flex h-14 w-full items-center justify-center bg-[#F5F5F5]">
                    <h1 className="text-custom-green font-semibold">
                      Team Members Details
                    </h1>
                  </div>
                  <div className="flex w-full flex-col gap-3">
                    {/* Customer Cards  */}
                    {bookingDetails.map((bookingDetail, _i) => (
                      <div
                        className="flex h-[294px] w-full flex-col gap-2 border border-[#E2E5E9] p-2"
                        key={_i}
                      >
                        <div className="flex h-[250px] w-full flex-col gap-5 p-4">
                          <span className="flex items-center justify-between">
                            <h1 className="text-[18px] font-medium">
                              Customer
                            </h1>
                            <p className="text-[14px] font-medium text-[#5C5C5C]">
                              {bookingDetail.customer}
                            </p>
                          </span>
                          <span className="flex items-center justify-between">
                            <h1 className="text-[18px] font-medium">
                              Packages
                            </h1>
                            <p className="text-[14px] font-medium text-[#5C5C5C]">
                              {bookingDetail.package}
                            </p>
                          </span>
                          <span className="flex items-center justify-between">
                            <h1 className="text-[18px] font-medium">
                              Time and Date
                            </h1>
                            <p className="text-[14px] font-medium text-[#5C5C5C]">
                              {bookingDetail.date}
                            </p>
                          </span>
                          <span className="flex items-center justify-between">
                            <h1 className="text-[18px] font-medium">Status</h1>
                            <span
                              className={`rounded-[42.58px] bg-[#EDF5FE] ${bookingDetail.status === "In Progress" ? "text-[#004CE8]" : bookingDetail.status === "Done" ? "text-[#00C247]" : "text-[#FF3333]"} my-4 flex w-[110px] items-center justify-center px-4 text-[14px]`}
                            >
                              <Dot />
                              <span>{bookingDetail.status}</span>
                            </span>
                          </span>
                        </div>
                        <div className="flex justify-end pr-4">
                          <button className="text-custom-green text-[14px] font-medium">
                            Action
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
          {bookingDetails.length > 0 && (
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
      </div>
    </AppLayout>
  );
}
