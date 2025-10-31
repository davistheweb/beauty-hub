import { Pagination } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import React from "react";

interface IAppPaginationProps {
  rowCountValue: number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  totalPaginationPage: number;
  paginationValue: number;
  onPaginationChange: React.Dispatch<React.SetStateAction<number>>;
  isDataFetching: boolean;
}

const AppPagination = ({
  rowCountValue,
  onChange,
  totalPaginationPage,
  paginationValue,
  onPaginationChange,
  isDataFetching,
}: IAppPaginationProps) => {
  return (
    <div className="flex w-[900px] flex-col rounded-md">
      <div className="flex h-full flex-col-reverse gap-4 md:flex-row md:items-center md:gap-10">
        <div className="flex h-[35px] w-[140px] items-center justify-center gap-2">
          <span className="text-[12px] text-[#5C5A55]">Show</span>
          <div className="relative inline-block">
            <select
              value={rowCountValue}
              onChange={onChange}
              className="scrollbar-thin h-[35px] w-[64px] cursor-pointer appearance-none rounded-sm border border-[#C2C2C2] px-3"
            >
              {Array.from({ length: 11 }, (arr, i) => i + 10).map((arr) => (
                <option
                  key={` :: ${arr}`}
                  value={arr}
                  className=""
                >
                  {arr}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-gray-500">
              <ChevronDown />
            </span>
          </div>
          <span className="text-[12px] text-[#5C5A55]">Row</span>
        </div>
        <div className="flex h-[35px] flex-col gap-5 md:flex-row md:gap-2">
          <Pagination
            total={totalPaginationPage}
            value={paginationValue}
            onChange={onPaginationChange}
            color="beautyGreen"
            disabled={isDataFetching}
          />
          {isDataFetching && (
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <div className="absolute h-full w-full animate-spin rounded-full border-[2px] border-gray-200 border-t-[#1AB65C]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppPagination;
