"use client";
import { tableHeaders } from "@/data";
import { useStats } from "@/hooks";
import { Dot } from "lucide-react";
import { CustomGreenBookICon, CustomWalletICon, StylistIcon } from "../icons";
import {
  NoDataFoundTableDesktopComponent,
  NoDataFoundTableMobileComponent,
} from "../no-data";
import { ErrorElement } from "../ui/ErrorElement";
import { DashboardCard } from "./DashboardCard";
import DashboardChart from "./DashboardChart";
import DashboardSkeleton from "./DashboardSkeleton";

export default function Dashboard() {
  const { stats, isLoading, isError, statsErrorMessage } = useStats();

  const series = stats.top_packages.map((top_package) =>
    Number(top_package.total),
  );

  const labels = stats.top_packages.map(
    (top_package) => top_package.package.name,
  );

  console.log(series);

  console.log(labels);

  if (isError)
    return (
      <div className="mt-3 flex h-[598px] w-full flex-col rounded-md bg-white p-1">
        <ErrorElement
          title="Something went wrong"
          subtitle={statsErrorMessage.message}
          errorType={statsErrorMessage.type}
        />
      </div>
    );

  return (
    <div className="flex h-full flex-1 flex-col md:p-2">
      <h1 className="inline-block text-2xl font-bold">Dashboard</h1>
      {/* Cards  */}
      <>
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <div className="mt-2 grid w-full grid-cols-1 justify-items-center gap-3 p-2 md:grid-cols-2 lg:grid-cols-3">
              <DashboardCard
                title="TotalBookings"
                subtitle={Number(stats?.total_bookings)}
                icon={<CustomGreenBookICon />}
              />
              <DashboardCard
                title="All Staffs"
                subtitle={Number(stats?.total_staff)}
                icon={<StylistIcon />}
              />
              <DashboardCard
                title="Total Users"
                subtitle={Number(stats?.total_users)}
                icon={<CustomWalletICon />}
              />
            </div>

            {/* Table and Statistics Container */}
            <div className="mt-3 flex w-full flex-col justify-center gap-3 p-2 lg:flex-row">
              {/* Bookings Display*/}
              <div className="flex w-full flex-col rounded-md bg-white p-1 md:h-[598px]">
                {/* <div className="flex h-12 w-full items-center justify-center">
                  <div className="flex h-[30px] w-full items-center justify-end p-4">
                    <div className="flex gap-2">
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
                </div> */}
                {/* Customers Display Table  */}
                <div
                  className={`table-parent-scrollbar ${!stats?.latest_bookings?.length ? "h-full" : ""} hidden w-full overflow-x-auto p-1 md:flex`}
                >
                  <table
                    className="h-full w-full overflow-x-auto bg-white"
                    suppressHydrationWarning={true}
                  >
                    <thead className="w-full bg-[#F9F9F9] text-[#5C5A55]">
                      <tr className="w-full">
                        {tableHeaders.map((header, _i) => (
                          <th
                            key={_i}
                            className={`${header === "Status" ? "w-[150px]" : "w-[200px]"} border-b border-gray-200 px-4 py-2 text-start text-[14px] font-medium tracking-wide`}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    {!stats?.latest_bookings?.length ? (
                      <NoDataFoundTableDesktopComponent
                        title="No Information Yet!"
                        subtitle="Once your users start booking an appointment, all informations will be
        displayed here"
                        colSpan={tableHeaders.length}
                      />
                    ) : (
                      <tbody className="w-full divide-y divide-gray-100">
                        {stats?.latest_bookings.map((bookingDetail, index) => (
                          <tr
                            key={index}
                            className="h-[48px] w-full hover:bg-gray-50"
                          >
                            <td className="px-4 py-2 text-[14px] font-normal">
                              {bookingDetail.user.name}
                            </td>
                            <td className="px-4 py-2 text-[14px] text-[#727272]">
                              {bookingDetail.package.name}
                            </td>
                            <td className="px-4 py-2 text-[13px] font-normal text-[#727272]">
                              {bookingDetail.booking_date}
                            </td>
                            <td
                              className={`flex h-full justify-start px-1 py-2`}
                            >
                              <span
                                className={`rounded-[38.32px] bg-[#EDF5FE] select-none ${bookingDetail.status === "pending" ? "text-[#004CE8]" : bookingDetail.status === "completed" ? "text-[#00C247]" : bookingDetail.status === "confirmed" ? "text-[#333]" : bookingDetail.status === "cancelled" && "text-[#FF3333]"} flex h-[25px] items-center justify-center gap-2 px-2`}
                              >
                                <span className="flex h-3 w-3 items-center justify-center">
                                  <Dot
                                    size={40}
                                    className="shrink-0"
                                  />
                                </span>

                                <span className="w-fit text-center text-[12px]">
                                  {bookingDetail.status === "pending"
                                    ? "In Progress"
                                    : bookingDetail.status === "completed"
                                      ? "Completed"
                                      : bookingDetail.status === "confirmed"
                                        ? "Confirmed"
                                        : bookingDetail.status ===
                                            "cancelled" && "Canceled"}
                                </span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
                {/* Customers Display Card  */}
                <div className="flex h-full w-full items-center justify-center overflow-y-auto md:hidden">
                  {!stats?.latest_bookings.length ? (
                    <NoDataFoundTableMobileComponent
                      title="No Information Yet!"
                      subtitle="Once your users start booking an appointment, all informations will be
        displayed here"
                    />
                  ) : (
                    <div className="h-full w-full">
                      <div className="flex h-14 w-full items-center justify-center bg-[#F5F5F5]">
                        <h1 className="text-custom-green font-semibold">
                          Team Members Details
                        </h1>
                      </div>
                      <div className="flex w-full flex-col gap-3">
                        {/* Customer Cards  */}
                        {stats?.latest_bookings.map((bookingDetail, _i) => (
                          <div
                            className="flex h-[294px] w-full flex-col gap-2 border border-[#E2E5E9] p-2"
                            key={_i}
                          >
                            <div className="flex h-[250px] w-full flex-col gap-5 p-4">
                              <span className="flex items-center justify-between">
                                <h1 className="font-medium">Customer</h1>
                                <p className="text-[14px] font-medium text-[#5C5C5C]">
                                  {bookingDetail.user.name}
                                </p>
                              </span>
                              <span className="flex items-center justify-between">
                                <h1 className="font-medium">Packages</h1>
                                <p className="text-[14px] font-medium text-[#5C5C5C]">
                                  {bookingDetail.package.name}
                                </p>
                              </span>
                              <span className="flex items-center justify-between">
                                <h1 className="font-medium">Time and Date</h1>
                                <p className="text-[14px] font-medium text-[#5C5C5C]">
                                  {bookingDetail.booking_date}
                                </p>
                              </span>
                              <span className="flex items-center justify-between">
                                <h1 className="font-medium">Status</h1>
                                <span
                                  className={`rounded-[38.32px] bg-[#EDF5FE] select-none ${bookingDetail.status === "pending" ? "text-[#004CE8]" : bookingDetail.status === "completed" ? "text-[#00C247]" : bookingDetail.status === "confirmed" ? "text-[#333]" : bookingDetail.status === "cancelled" && "text-[#FF3333]"} flex h-[25px] items-center justify-center gap-2 px-2`}
                                >
                                  <span className="flex h-3 w-3 items-center justify-center">
                                    <Dot
                                      size={40}
                                      className="shrink-0"
                                    />
                                  </span>

                                  <span className="w-fit text-center text-[12px]">
                                    {bookingDetail.status === "pending"
                                      ? "In Progress"
                                      : bookingDetail.status === "completed"
                                        ? "Done"
                                        : bookingDetail.status === "confirmed"
                                          ? "Confirmed"
                                          : bookingDetail.status ===
                                              "cancelled" && "Canceled"}
                                  </span>
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
              {/* Statistics  */}
              <div className="flex h-[598px] w-full flex-col items-center gap-2 rounded-md bg-white lg:w-[292px]">
                <div className="flex w-full items-start justify-start p-4">
                  <h1 className="text-xl font-bold">Top Packages</h1>
                </div>
                {/* DonutChart  */}
                <div className="h-full w-full">
                  <DashboardChart
                    series={series}
                    labels={labels}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
}
