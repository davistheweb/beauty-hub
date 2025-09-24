import AppLayout from "@/components/layouts/AppLayout";
import { tableHeaders, tbodyData } from "@/data";
import { BookText, Dot, User, Wallet } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Dashboard",
};

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="flex h-full flex-1 flex-col p-2">
        <h1 className="inline-block text-2xl font-bold">Dashboard</h1>
        {/* Cards  */}
        <div className="mt-2 grid w-full grid-cols-1 justify-items-center gap-3 p-2 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="TotalBookings"
            subtitle={0}
            icon={<BookText className="text-custom-green" />}
          />
          <DashboardCard
            title="AllBarbers"
            subtitle={0}
            icon={<User className="text-custom-green" />}
          />
          <DashboardCard
            title="TotalRevenue"
            subtitle={0}
            icon={<Wallet className="text-custom-green" />}
          />
        </div>

        {/* Table and Statics Container */}
        <div className="mt-3 flex w-full flex-col items-center justify-center gap-3 p-2 lg:flex-row">
          {/* Customers Display*/}
          <div className="flex h-[500px] w-full flex-col rounded-md bg-white p-1">
            <div className="flex h-12 w-full items-center justify-center">
              <div className="flex h-[30px] w-full items-center justify-end p-4">
                <div className="flex gap-2">
                  <button className="text-custom-green cursor-pointer rounded-xs bg-[#E6E6E6] p-1 pr-2 pl-2 text-center text-[14px] font-medium">
                    Day
                  </button>
                  <button className="cursor-pointer rounded-xs p-1 pr-2 pl-2 text-[14px] font-medium text-[#898A8C] duration-300 hover:bg-[#E6E6E6] hover:text-[#1AB65C]">
                    Month
                  </button>
                  <button className="cursor-pointer rounded-xs p-1 pr-2 pl-2 text-[14px] font-medium text-[#898A8C] duration-300 hover:bg-[#E6E6E6] hover:text-[#1AB65C]">
                    Year
                  </button>
                </div>
              </div>
            </div>
            {/* Customers Display Table  */}
            <div className="table-parent-scrollbar hidden w-full overflow-x-auto p-1 lg:flex">
              <table className="w-full overflow-x-auto bg-white">
                <thead className="w-full bg-[#F9F9F9] text-[#5C5A55]">
                  <tr className="w-full">
                    {tableHeaders.map((header, _i) => (
                      <th
                        key={_i}
                        className="border-b border-gray-200 px-4 py-2 text-center text-[14px] font-medium tracking-wide"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
               <tbody>ops</tbody>
                {/* <tbody className="divide-y divide-gray-100">
                  {tbodyData.map((row, index) => (
                    <tr
                      key={index}
                      className="h-[48px] hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 text-center text-[14px] font-normal">
                        {row.customer}
                      </td>
                      <td className="px-4 py-2 text-center text-[14px] text-[#727272]">
                        {row.package}
                      </td>
                      <td className="px-4 py-2 text-center text-[14px] font-normal text-[#727272]">
                        {row.date}
                      </td>
                      <td
                        className={`flex items-center justify-center px-4 py-2`}
                      >
                        <span
                          className={`rounded-md bg-[#EDF5FE] pt-[4.26px] pr-[8.52px] pb-[4.26px] pl-[8.52px] ${row.status === "In Progress" ? "text-[#004CE8]" : row.status === "Done" ? "text-[#00C247]" : "text-[#FF3333]"} flex w-[120px] items-center text-[14px]`}
                        >
                          <Dot size={30} />
                          <span>{row.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
            </div>
            {/* Customers Display Card  */}
            <div className="h-full w-full bg-cyan-500 lg:hidden"></div>
          </div>
          <div className="h-[500px] w-full rounded-md bg-pink-500 lg:w-[292px]"></div>
        </div>
      </div>
    </AppLayout>
  );
}
interface IDashboardCardProps {
  title: string;
  subtitle: string | number;
  icon: React.ReactNode;
}
const DashboardCard = ({ title, subtitle, icon }: IDashboardCardProps) => (
  <div className="flex h-24 max-h-28 w-full items-center justify-between gap-3 rounded-sm bg-white p-4 duration-300 hover:-mt-2">
    <div className="flex h-[80px] w-[230px] flex-col gap-1 p-2">
      <p className="text-[14px] text-[#898A8C]">{title}</p>
      <h1 className="text-xl font-semibold">{subtitle}</h1>
    </div>
    {icon}
  </div>
);
