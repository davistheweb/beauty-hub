import CaretDownIcon from "@/components/icons/CaretDownIcon";
import AppLayout from "@/components/layouts/AppLayout";
import Ratings from "@/components/ratings";
import { Label } from "@/components/ui/label";
import SearchInput from "@/components/ui/SearchInput";
import { dummyRatings } from "@/data";
import { ChevronDown } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Ratings",
};

export default function RatingsPage() {
  return (
    <AppLayout>
      <div className="flex h-full flex-1 flex-col md:p-2">
        <h1 className="inline-block text-2xl font-bold">Ratings</h1>
        <div className="mt-3 flex w-full flex-col gap-3 p-2">
          {/* Customers Table*/}
          <div className="flex h-[598px] w-full flex-col rounded-md bg-white p-1">
            <div className="flex h-12 w-full items-center justify-center">
              {dummyRatings.length > 0 && (
                <div className="flex h-[30px] w-full items-center justify-between p-2 md:p-4">
                  {/* Search  */}
                  <SearchInput />

                  <div className="flex max-w-fit gap-4 rounded-md border border-[#C2C2C2] px-[10px] py-[5px] md:gap-2">
                    <Label className="font-semibold">Filter:</Label>

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
              )}
            </div>
            {/* Ratings Display */}
            <Ratings />
          </div>
          {/* Pagination  */}
          {dummyRatings.length > 0 && (
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
