import AppLayout from "@/components/layouts/AppLayout";
import {
  NoDataFoundTableDesktopComponent,
  NoDataFoundTableMobileComponent,
} from "@/components/no-data";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/SearchInput";
import { dummyStaffs, staffTableHeaders } from "@/data";
import { ChevronDown, Dot, EllipsisVertical, Plus } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Staffs",
};

export default function StaffsPage() {
  return (
    <AppLayout>
      <div className="flex h-full flex-1 flex-col md:p-2">
        <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
          <h1 className="inline-block text-2xl font-bold">Admin Staff</h1>
          {dummyStaffs.length > 0 && (
            <div className="px-4 lg:px-0">
              <Button className="bg-custom-green w-full cursor-pointer rounded-full px-[50px] font-semibold transition-all duration-500 ease-in-out hover:-translate-y-0.5 hover:bg-[#169B4E] hover:shadow-lg">
                <span>
                  <Plus />
                </span>
                Add Staff
              </Button>
            </div>
          )}
        </div>
        <div className="mt-3 flex w-full flex-col gap-3 p-2">
          {/* Staff Table  */}
          <div className="flex h-[598px] w-full flex-col rounded-md bg-white p-1">
            <div className="flex h-12 w-full items-center justify-center">
              <div className="flex h-[30px] w-full items-center justify-between p-2 md:p-4">
                {/* Search  */}
                <SearchInput />
                {/* <div className="flex gap-0 md:gap-2">
                  <button className="text-custom-green cursor-pointer rounded-xs bg-[#F9FFFB] p-1 pr-1 pl-1 text-center text-[12px] font-medium md:text-[14px] lg:pr-2 lg:pl-2">
                    Day
                  </button>
                  <button className="cursor-pointer rounded-xs p-1 pr-1 pl-1 text-[12px] font-medium text-[#898A8C] duration-300 hover:bg-[#F9FFFB] hover:text-[#1AB65C] md:text-[14px] lg:pr-2 lg:pl-2">
                    Month
                  </button>
                  <button className="cursor-pointer rounded-xs p-1 pr-1 pl-1 text-[12px] font-medium text-[#898A8C] duration-300 hover:bg-[#F9FFFB] hover:text-[#1AB65C] md:text-[14px] lg:pr-2 lg:pl-2">
                    Year
                  </button>
                </div> */}
              </div>
            </div>
            {/* Staff Display Table  */}
            <div className="table-parent-scrollbar hidden h-full w-full overflow-x-auto p-1 md:flex">
              <table
                className="h-full w-full overflow-x-auto bg-white"
                suppressHydrationWarning={true}
              >
                <thead className="w-full bg-[#F9F9F9] text-[#5C5A55]">
                  <tr className="w-full">
                    {staffTableHeaders.map((header, _i) => (
                      <th
                        key={_i}
                        className={`${header === "Action" ? "w-[50px]" : "w-[200px]"} border-b border-gray-200 px-4 py-2 text-center text-[14px] font-medium tracking-wide`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                {!dummyStaffs.length ? (
                  <NoDataFoundTableDesktopComponent
                    title="No Admin staffs Yet!"
                    subtitle="Add a Staff and see the list here."
                    colSpan={staffTableHeaders.length}
                  >
                    <Button className="bg-custom-green cursor-pointer rounded-full hover:bg-[#169B4E]">
                      {" "}
                      <span>
                        <Plus />
                      </span>
                      Admin Staff
                    </Button>
                  </NoDataFoundTableDesktopComponent>
                ) : (
                  <tbody className="w-full divide-y divide-gray-100">
                    {dummyStaffs.map((staff, index) => (
                      <tr
                        key={index}
                        className="h-[48px] w-full hover:bg-gray-50"
                      >
                        <td className="px-8 py-2 text-center text-[14px] font-normal">
                          {staff.staffName}
                        </td>
                        <td className="px-8 py-2 text-center text-[14px] font-normal">
                          {staff.numberOfBookings}
                        </td>
                        <td className="px-4 py-2 text-center text-[14px] text-[#727272]">
                          {staff.joinedDate}
                        </td>
                        <td
                          className={`flex items-center justify-center px-10 py-1`}
                        >
                          <span
                            className={`rounded-[38.32px] bg-[#EDF5FE] ${staff.status === "Active" ? "text-[#00C247]" : staff.status === "Inactive" ? "text-[#004CE8]" : staff.status === "Suspended" && "text-[#FF3333]"} flex w-full items-center justify-center`}
                          >
                            <Dot
                              size={40}
                              className="inline-block"
                            />
                            <span className="w-fit text-center text-[12px]">
                              {staff.status}
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
            {/* Staff Display Card  */}
            <div className="scrollbar-thin flex h-full w-full items-center justify-center overflow-y-auto md:hidden">
              {!dummyStaffs.length ? (
                <NoDataFoundTableMobileComponent
                  title="No Admin staffs Yet!"
                  subtitle="Add a Staff and see the list here."
                />
              ) : (
                <div className="h-full w-full">
                  <div className="flex h-14 w-full items-center justify-center bg-[#F5F5F5]">
                    <h1 className="text-custom-green font-semibold">
                      Staff Lists
                    </h1>
                  </div>
                  <div className="flex w-full flex-col gap-3">
                    {/* Staff Cards  */}
                    {dummyStaffs.map((staff, _i) => (
                      <div
                        className="flex h-[294px] w-full flex-col gap-2 border border-[#E2E5E9] p-2"
                        key={_i}
                      >
                        <div className="flex h-[250px] w-full flex-col gap-5 p-4">
                          <span className="flex items-center justify-between">
                            <h1 className="text-[18px] font-medium">
                              Staff Name
                            </h1>
                            <p className="text-[14px] font-medium text-[#5C5C5C]">
                              {staff.staffName}
                            </p>
                          </span>
                          <span className="flex items-center justify-between">
                            <h1 className="text-[18px] font-medium">
                              No of Bookings
                            </h1>
                            <p className="text-[14px] font-medium text-[#5C5C5C]">
                              {staff.numberOfBookings}
                            </p>
                          </span>
                          <span className="flex items-center justify-between">
                            <h1 className="text-[18px] font-medium">
                              Joined Date
                            </h1>
                            <p className="text-[14px] font-medium text-[#5C5C5C]">
                              {staff.joinedDate}
                            </p>
                          </span>
                          <span className="flex items-center justify-between">
                            <h1 className="text-[18px] font-medium">Status</h1>
                            <span
                              className={`rounded-[42.58px] bg-[#EDF5FE] pt-[4.73px] pr-[9.46px] pb-[4.73px] pl-[9.46px] ${staff.status === "Active" ? "text-[#00C247]" : staff.status === "Inactive" ? "text-[#004CE8]" : staff.status === "Suspended" && "text-[#FF3333]"} flex w-[130px] items-center justify-center text-[14px]`}
                            >
                              <Dot size={40} />
                              <span>{staff.status}</span>
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
          {dummyStaffs.length > 0 && (
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
