"use client";
import { CaretDownIcon } from "@/components/icons";
import {
  NoDataFoundTableDesktopComponent,
  NoDataFoundTableMobileComponent,
} from "@/components/no-data";
import { Label } from "@/components/ui/label";
import SearchInput from "@/components/ui/SearchInput";
import { customersTableHeaders } from "@/data";
import { useCustomers } from "@/hooks";
import { Dot, Eye } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import AppPagination from "../ui/AppPagination";
import { CardSkeleton } from "../ui/CardSkeleton";
import { ErrorElement } from "../ui/ErrorElement";
import { TableSkeleton } from "../ui/TableSkeleton";

const FILTER_OPTIONS = ["All", "Active", "Inactive", "Suspended"] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];

export default function Customers() {
  const [selectedRowCount, setSelectedRowCount] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    allCustomersData,
    customers,
    isAllCustomersDataPending,
    isAllCustomersDataFetching,
    isFetchCustomersError,
    fetchCustomersErrorMessage,
  } = useCustomers(currentPage);

  // client side filtering
  const filteredCustomers = useMemo(() => {
    if (selectedFilter === "All") return customers;

    const lower = selectedFilter.toLowerCase() as
      | "active"
      | "inactive"
      | "suspended"
      | "archived";

    return customers.filter((c) => c.status === lower);
  }, [customers, selectedFilter]);

  // Data state helpers
  const hasApiData = customers.length > 0;
  const hasFilteredData = filteredCustomers.length > 0;
  const isFilteredEmpty =
    selectedFilter !== "All" && hasApiData && !hasFilteredData;
  const isApiEmpty = !hasApiData;

  if (isFetchCustomersError)
    return (
      <div className="mt-3 flex h-[598px] w-full flex-col rounded-md bg-white p-1">
        <ErrorElement
          title="Something went wrong"
          subtitle={fetchCustomersErrorMessage.message}
          errorType={fetchCustomersErrorMessage.type}
        />
      </div>
    );

  return (
    <div className="mt-3 flex w-full flex-col gap-3 p-2">
      {/* Customers Table */}
      <div className="flex w-full flex-col rounded-md bg-white p-1 md:h-[598px]">
        {customers.length > 0 && (
          <div className="flex w-full items-start justify-center self-start">
            <div className="flex w-full flex-col gap-2 p-2 md:flex-row md:items-center md:justify-between md:gap-0">
              {/* Search */}
              <SearchInput />

              {/* CUSTOM FILTER BUTTON */}
              <div
                className="relative flex max-w-fit cursor-pointer items-center gap-4 rounded-md border border-[#C2C2C2] px-[10px] py-[5px] md:gap-2"
                onClick={() => setIsDropdownOpen((v) => !v)}
              >
                <Label className="cursor-pointer font-semibold">Status:</Label>
                <button className="text-custom-green relative flex cursor-pointer items-center gap-1 pr-5 font-semibold outline-none">
                  <span>{selectedFilter}</span>
                  <CaretDownIcon
                    size={15}
                    color="#1AB65C"
                    className="pointer-events-none absolute right-0"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-1/2 z-10 mt-1 w-fit min-w-[120px] -translate-x-1/2 rounded-md border border-[#C2C2C2] bg-white py-1 shadow-lg">
                    {FILTER_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSelectedFilter(opt);
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full cursor-pointer px-3 py-1.5 text-left text-sm hover:bg-gray-50"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* DESKTOP TABLE */}
        <div
          className={`table-parent-scrollbar ${
            isAllCustomersDataPending || isApiEmpty || isFilteredEmpty
              ? "h-full"
              : ""
          } hidden w-full overflow-x-auto p-1 md:flex`}
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
                    className={`${
                      header === "Action" ? "w-[50px]" : "w-[200px]"
                    } border-b border-gray-200 px-4 py-2 text-start text-[14px] font-medium tracking-wide`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* EMPTY STATES */}
            {!isAllCustomersDataPending && isApiEmpty ? (
              // API has no data original message
              <NoDataFoundTableDesktopComponent
                title="No Customer Yet!"
                subtitle="All customer details will be displayed here once they begin signing up and making bookings."
                colSpan={customersTableHeaders.length}
              />
            ) : !isAllCustomersDataPending && isFilteredEmpty ? (
              // Filter applied no match
              <NoDataFoundTableDesktopComponent
                title="No Customer Found!"
                subtitle={`No customers match the selected status: **${selectedFilter}**.`}
                colSpan={customersTableHeaders.length}
              />
            ) : (
              <tbody className="w-full divide-y divide-gray-100">
                {isAllCustomersDataPending ? (
                  <TableSkeleton length={customersTableHeaders.length} />
                ) : (
                  filteredCustomers
                    .slice(0, selectedRowCount)
                    .map((customer, index) => (
                      <tr
                        key={index}
                        className="h-[48px] w-full hover:bg-gray-50"
                      >
                        <td className="px-4 py-2 text-[14px] font-normal">
                          {customer.name}
                        </td>
                        <td className="px-4 py-2 text-[14px] text-[#727272]">
                          {customer.email}
                        </td>
                        <td className="px-4 py-2 text-[14px] font-normal text-[#727272]">
                          {customer.phone || "no-number"}
                        </td>
                        <td className="px-4 py-2 text-[14px] font-normal text-[#727272]">
                          {new Date(customer.created_at)
                            .toLocaleDateString()
                            .split("/")
                            .join("-")}
                        </td>

                        <td className="flex h-full place-items-center justify-start py-1">
                          <span
                            className={`rounded-[38.32px] bg-[#EDF5FE] ${
                              customer.status === "active"
                                ? "text-[#00C247]"
                                : customer.status === "archived"
                                  ? "text-stone-700"
                                  : customer.status === "inactive"
                                    ? "text-[#004CE8]"
                                    : "text-[#FF3333]"
                            } flex w-fit items-center justify-center gap-2 px-5 py-2`}
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

                        <td>
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

        {/* MOBILE CARD VIEW */}
        <div className="scrollbar-thin flex h-full w-full items-center justify-center overflow-y-auto md:hidden">
          {!isAllCustomersDataPending && isApiEmpty ? (
            // Customers empty
            <NoDataFoundTableMobileComponent
              title="No Customer Yet!"
              subtitle="All customer details will be displayed here once they begin signing up and making bookings."
            />
          ) : !isAllCustomersDataPending && isFilteredEmpty ? (
            // Customers Filter empty
            <NoDataFoundTableMobileComponent
              title="No Customer Found!"
              subtitle={`No customers match the selected status: **${selectedFilter}**.`}
            />
          ) : (
            <div className="h-full w-full">
              <div className="flex h-14 w-full items-center justify-center bg-[#F5F5F5]">
                <h1 className="text-custom-green font-semibold">
                  Customer Details
                </h1>
              </div>

              <div className="flex w-full flex-col gap-3">
                {isAllCustomersDataPending ? (
                  <CardSkeleton className="flex h-[294px] w-full flex-col gap-2 border border-[#E2E5E9] p-2" />
                ) : (
                  filteredCustomers
                    .slice(0, selectedRowCount)
                    .map((customer, _i) => (
                      <div
                        className="flex h-[314px] w-full flex-col gap-2 border border-[#E2E5E9] p-2"
                        key={_i}
                      >
                        <div className="flex h-[250px] w-full flex-col gap-3 p-4">
                          <span className="flex items-center justify-between">
                            <h1 className="text-[18px] font-medium">
                              Customer
                            </h1>
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
                              {customer.phone || "no_number"}
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
                              className={`rounded-[42.58px] bg-[#EDF5FE] pt-[4.73px] pr-[9.46px] pb-[4.73px] pl-[9.46px] ${
                                customer.status === "active"
                                  ? "text-[#00C247]"
                                  : customer.status === "archived"
                                    ? "text-stone-700"
                                    : customer.status === "inactive"
                                      ? "text-[#004CE8]"
                                      : "text-[#FF3333]"
                              } flex items-center justify-center gap-2 px-2 text-[14px]`}
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
                            className="text-custom-green cursor-pointer rounded-full border border-[#1AB65C] bg-[#F9FFFB] px-2 py-1 text-sm font-semibold hover:bg-[#f1faf4]"
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

      {/* PAGINATION */}
      {hasApiData && (
        <AppPagination
          rowCountValue={selectedRowCount}
          onChange={(e) => setSelectedRowCount(Number(e.target.value))}
          totalPaginationPage={Number(allCustomersData?.data.data.last_page)}
          paginationValue={Number(allCustomersData?.data.data.current_page)}
          onPaginationChange={setCurrentPage}
          isDataFetching={isAllCustomersDataFetching}
        />
      )}
    </div>
  );
}
