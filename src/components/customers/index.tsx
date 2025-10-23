"use client";
import { CaretDownIcon } from "@/components/icons";
import {
  NoDataFoundElement,
  NoDataFoundTableDesktopComponent,
  NoDataFoundTableMobileComponent,
} from "@/components/no-data";
import { Label } from "@/components/ui/label";
import SearchInput from "@/components/ui/SearchInput";
import { customersTableHeaders } from "@/data";
import { useCustomers } from "@/hooks";
import { ChevronDown, Dot, Eye } from "lucide-react";
import Link from "next/link";
import { CardSkeleton } from "../ui/CardSkeleton";
import { TabkeSkeleton } from "../ui/TabkeSkeleton";

export default function Customers() {
  const {
    customers,
    isAllCustomersDataLoading,
    isFetchCustomersError,
    fetchCustomersErrorMessage,
  } = useCustomers();

  if (isFetchCustomersError)
    return (
      <div className="mt-3 flex h-[598px] w-full flex-col rounded-md bg-white p-1">
        <NoDataFoundElement
          title="Something went wrong"
          subtitle={fetchCustomersErrorMessage}
        />
      </div>
    );

  return (
    <div className="mt-3 flex w-full flex-col gap-3 p-2">
      {/* Customers Table*/}
      <div className="flex h-[598px] w-full flex-col rounded-md bg-white p-1">
        <div className="flex h-12 w-full items-center justify-center">
          <div className="flex h-[30px] w-full items-center justify-between p-2 md:p-4">
            {/* Search  */}
            <SearchInput />
            <div className="flex max-w-fit gap-4 rounded-md border border-[#C2C2C2] px-[10px] py-[5px] md:gap-2">
              <Label className="font-semibold">Status:</Label>

              <div className="relative flex items-center">
                <select className="text-custom-green cursor-pointer appearance-none pr-5 font-semibold outline-none">
                  {["All", "Active", "Inactive"].map((option, i) => (
                    <option
                      key={i}
                      value={option}
                      className="text-black"
                    >
                      {option}
                    </option>
                  ))}
                </select>
                <CaretDownIcon
                  size={15}
                  color="#1AB65C"
                  className="pointer-events-none absolute right-0"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Customers Display Table  */}
        <div
          className={`table-parent-scrollbar ${isAllCustomersDataLoading ? "h-full" : ""} hidden w-full overflow-x-auto p-1 md:flex`}
        >
          <table
            className="h-full w-full overflow-x-auto bg-white"
            suppressHydrationWarning={true}
          >
            <thead className="w-full bg-[#F9F9F9] text-[#5C5A55]">
              <tr className="w-full">
                {customersTableHeaders.map((header, _i) => (
                  <th
                    key={_i}
                    className={`${header === "Action" ? "w-[50px]" : "w-[200px]"} border-b border-gray-200 px-4 py-2 text-center text-[14px] font-medium tracking-wide`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            {!isAllCustomersDataLoading && !customers.length ? (
              <NoDataFoundTableDesktopComponent
                title="No Customer Yet!"
                subtitle="All customer details will be displayed here once they begin signing up and making bookings."
                colSpan={customersTableHeaders.length}
              />
            ) : (
              <tbody className="w-full divide-y divide-gray-100">
                {isAllCustomersDataLoading ? (
                  <TabkeSkeleton length={customersTableHeaders.length} />
                ) : (
                  customers.map((customer, index) => (
                    <tr
                      key={index}
                      className="h-[48px] w-full hover:bg-gray-50"
                    >
                      <td className="px-8 py-2 text-center text-[14px] font-normal">
                        {customer.name}
                      </td>
                      <td className="px-4 py-2 text-center text-[14px] text-[#727272]">
                        {customer.email}
                      </td>
                      <td className="px-4 py-2 text-center text-[14px] font-normal text-[#727272]">
                        {customer.phone || "no-number"}
                      </td>
                      <td className="px-4 py-2 text-center text-[14px] font-normal text-[#727272]">
                        {new Date(customer.created_at)
                          .toLocaleDateString()
                          .split("/")
                          .join("-")}
                      </td>

                      <td
                        className={`flex h-full place-items-center justify-center px-10 py-1`}
                      >
                        <span
                          className={`rounded-[38.32px] bg-[#EDF5FE] ${customer.status === "active" ? "text-[#00C247]" : customer.status === "archived" ? "text-stone-700" : customer.status === "inactive" && "text-[#004CE8]"} flex w-fit items-center justify-center gap-2 px-5 py-2`}
                        >
                          <span className="flex h-3 w-3 items-center justify-center">
                            <Dot
                              size={40}
                              className="shrink-0"
                            />
                          </span>
                          <span className="w-fit text-center text-[12px] capitalize">
                            {customer.status}
                          </span>
                        </span>
                      </td>
                      <td className="">
                        <Link
                          href={`/customers/${customer.id}`}
                          className="flex cursor-pointer items-center justify-center rounded-xs text-center text-[14px] font-medium"
                        >
                          <Eye
                            size={18}
                            className="text-[#737375] hover:bg-[#EDF5FE]"
                          />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>
        {/* Customers Display Card  */}
        <div className="scrollbar-thin flex h-full w-full items-center justify-center overflow-y-auto md:hidden">
          {!isAllCustomersDataLoading && !customers.length ? (
            <NoDataFoundTableMobileComponent
              title="No Customer Yet!"
              subtitle="All customer details will be displayed here once they begin signing up and making bookings."
            />
          ) : (
            <div className="h-full w-full">
              <div className="flex h-14 w-full items-center justify-center bg-[#F5F5F5]">
                <h1 className="text-custom-green font-semibold">
                  Customer Details
                </h1>
              </div>
              <div className="flex w-full flex-col gap-3">
                {/* Customer Cards  */}
                {isAllCustomersDataLoading ? (
                  <CardSkeleton className="flex h-[294px] w-full flex-col gap-2 border border-[#E2E5E9] p-2" />
                ) : (
                  customers.map((customer, _i) => (
                    <div
                      className="flex h-[294px] w-full flex-col gap-2 border border-[#E2E5E9] p-2"
                      key={_i}
                    >
                      <div className="flex h-[250px] w-full flex-col gap-5 p-4">
                        <span className="flex items-center justify-between">
                          <h1 className="text-[18px] font-medium">Customer</h1>
                          <p className="text-[14px] font-medium text-[#5C5C5C]">
                            {customer.name}
                          </p>
                        </span>
                        <span className="flex items-center justify-between">
                          <h1 className="text-[18px] font-medium">
                            Email Address
                          </h1>
                          <p className="text-[14px] font-medium text-[#5C5C5C]">
                            {customer.email}
                          </p>
                        </span>
                        <span className="flex items-center justify-between">
                          <h1 className="text-[18px] font-medium">
                            Phone Number
                          </h1>
                          <p className="text-[14px] font-medium text-[#5C5C5C]">
                            {customer.phone}
                          </p>
                        </span>
                        <span className="flex items-center justify-between">
                          <h1 className="text-[18px] font-medium">
                            Date Created
                          </h1>
                          <p className="text-[14px] font-medium text-[#5C5C5C]">
                            {new Date(customer.created_at)
                              .toLocaleDateString()
                              .split("/")
                              .join("-")}
                          </p>
                        </span>

                        <span className="flex items-center justify-between">
                          <h1 className="text-[18px] font-medium">Status</h1>
                          <span
                            className={`rounded-[42.58px] bg-[#EDF5FE] pt-[4.73px] pr-[9.46px] pb-[4.73px] pl-[9.46px] ${customer.status === "active" ? "text-[#00C247]" : customer.status === "archived" ? "text-stone-700" : customer.status === "inactive" && "text-[#004CE8]"} flex items-center justify-center gap-2 px-2 text-[14px]`}
                          >
                            <span className="flex h-3 w-3 items-center justify-center">
                              <Dot
                                size={40}
                                className="shrink-0"
                              />
                            </span>
                            <span className="capitalize">
                              {customer.status}
                            </span>
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-end pr-4">
                        <Link
                          href={`/customers/${customer.id}`}
                          className="text-custom-green text-[14px] font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Pagination  */}
      {customers.length > 0 && (
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
