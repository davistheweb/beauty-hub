import { tableHeaders } from "@/data";
import { CardSkeleton } from "../ui/CardSkeleton";
import { TabkeSkeleton } from "../ui/TabkeSkeleton";

export default function DashboardSkeleton() {
  return (
    <>
      <div className="mt-2 grid w-full grid-cols-1 justify-items-center gap-3 p-2 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => i).map((_i) => (
          <div
            key={_i}
            className="flex h-24 max-h-28 w-full items-center justify-between rounded-sm bg-white duration-300 hover:-translate-y-3"
          >
            <div className="flex h-full w-full flex-col gap-1 p-2">
              <CardSkeleton
                length={1}
                className="h-full w-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Table and Statistics Container */}
      <div className="mt-3 flex w-full flex-col justify-center gap-3 p-2 lg:flex-row">
        {/* Customers Display*/}
        <div className="flex h-[598px] w-full flex-col rounded-md bg-white p-1">
          <div className="flex h-12 w-full items-center justify-center">
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
          </div>
          {/* Dashboard Display Table Skeleton  */}
          <div className="table-parent-scrollbar hidden h-full w-full overflow-x-auto p-1 md:flex">
            <table
              className="h-full w-full overflow-x-auto bg-white"
              suppressHydrationWarning={true}
            >
              <thead className="w-full bg-[#F9F9F9] text-[#5C5A55]">
                <tr className="w-full">
                  {tableHeaders.map((header, _i) => (
                    <th
                      key={_i}
                      className={`${header === "Status" ? "w-[150px]" : "w-[200px]"} border-b border-gray-200 px-4 py-2 text-center text-[14px] font-medium tracking-wide`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="w-full divide-y divide-gray-100">
                <TabkeSkeleton length={tableHeaders.length} />
              </tbody>
            </table>
          </div>
          <div className="flex h-full w-full items-center justify-center overflow-y-auto md:hidden">
            <div className="h-full w-full">
              <div className="flex w-full flex-col items-center justify-center gap-3">
                <CardSkeleton className="h-[294px] w-full" />
              </div>
            </div>
          </div>
        </div>
        {/* Statistics Skeleton */}
        <div className="flex h-[598px] w-full flex-col items-center justify-center gap-2 rounded-md bg-white p-1 lg:w-[292px]">
          <CardSkeleton
            length={1}
            className="h-full w-full lg:w-[292px]"
          />
        </div>
      </div>
    </>
  );
}
