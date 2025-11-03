"use client";
import { CaretDownIcon } from "@/components/icons";
import { Label } from "@/components/ui/label";
import SearchInput from "@/components/ui/SearchInput";
import { useDebounce, useRatings } from "@/hooks";
import getErrorResponse from "@/services/helpers";
import { IRating } from "@/types/IRatings";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { NoDataFoundElement } from "../no-data";
import AppPagination from "../ui/AppPagination";
import { CardSkeleton } from "../ui/CardSkeleton";
import { ErrorElement } from "../ui/ErrorElement";
import RatingsCard from "./RatingsCard";

export default function Ratings() {
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<IRating[] | []>([]);
  const [selectedRowCount, setSelectedRowCount] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    allRatingsData,
    ratings,
    searchRating,
    isRatingsDataPending,
    isRatingsDataFetching,
    deleteRating,
    isFetchRatingsError,
    fetchRatingsErrMessage,
  } = useRatings(currentPage);
  const debouncedValue = useDebounce(search, 600);

  useEffect(() => {
    if (!debouncedValue?.trim()) return;

    toast.dismiss();

    const toastId = toast.loading("Searching ratings...");

    setCurrentPage(1);

    searchRating.mutate(
      { search: debouncedValue },
      {
        onSuccess: (data) => {
          console.log(data.data.data.data);
          setSearchData(data.data.data.data);
        },
        onError: (err) => {
          setSearchData([]);
          const error = getErrorResponse(err);
          toast.error(error.message);
        },
        onSettled: () => toast.dismiss(toastId),
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!search.trim().length) setSearchData([]);
    }, 1500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleDeleteRating = (id: number) => {
    const toastId = toast.loading("Deleting review....");

    deleteRating.mutate(id, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (err) => {
        const error = getErrorResponse(err);
        toast.error(error.message);
      },
      onSettled: () => toast.dismiss(toastId),
    });
  };

  const allRatings =
    searchData.length > 0 && debouncedValue ? searchData : ratings;

  if (isFetchRatingsError)
    return (
      <div className="mt-3 flex h-[598px] w-full flex-col rounded-md bg-white p-1">
        <ErrorElement
          title="Something went wrong"
          subtitle={fetchRatingsErrMessage.message}
          errorType={fetchRatingsErrMessage.type}
        />
      </div>
    );

  return (
    <div className="mt-3 flex w-full flex-col gap-3 p-2">
      {/* Ratings */}
      <div className="flex w-full flex-col rounded-md bg-white p-1 py-5 md:py-1 lg:h-[598px]">
        <div className="flex h-12 w-full items-center justify-center">
          {allRatings.length > 0 && (
            <div className="flex w-full flex-col gap-2 p-2 md:flex-row md:items-center md:justify-between md:gap-0 md:p-4">
              {/* Search  */}
              <SearchInput
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearch(e.target.value);
                }}
              />

              <div className="flex max-w-fit rounded-md border border-[#C2C2C2] px-[10px] py-[5px] md:gap-2">
                <Label className="font-semibold">Filter:</Label>

                <div className="relative flex items-center">
                  <select className="text-custom-green cursor-pointer appearance-none px-2 pr-5 font-semibold outline-none">
                    {["All", "Recent", "Last Month"].map((option, i) => (
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
        <div
          className={`scrollbar-thin ${isRatingsDataPending ? "" : "h-full py-3"} w-full p-1 lg:overflow-y-auto`}
        >
          {!isRatingsDataPending && !allRatings.length ? (
            <div className="h-full w-full items-center justify-center">
              <NoDataFoundElement
                title="No customer ratings Yet!"
                subtitle="When a customer dropped ratings on the app, all reviews and ratings will show here."
              />
            </div>
          ) : isRatingsDataPending ? (
            <div className="flex w-full flex-col gap-4">
              <CardSkeleton
                length={8}
                className="h-[150px] w-full"
              />
            </div>
          ) : (
            <div className="mt-4 flex w-full flex-col gap-4">
              {/* Ratings Card */}
              {allRatings.slice(0, selectedRowCount).map((ratingsInfo, i) => (
                <RatingsCard
                  ratingDate={new Date(ratingsInfo.created_at)
                    .toLocaleDateString()
                    .split("/")
                    .join("-")}
                  starsCount={Number(ratingsInfo.rating)}
                  abbrev={ratingsInfo.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 3)}
                  userName={ratingsInfo.user.name}
                  // title={ratingsInfo?.user.}
                  comment={ratingsInfo.comment}
                  key={i}
                  deleteRating={() => handleDeleteRating(ratingsInfo.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Pagination  */}
      {ratings.length > 0 && (
        <AppPagination
          rowCountValue={selectedRowCount}
          onChange={(e) => setSelectedRowCount(Number(e.target.value))}
          totalPaginationPage={Number(allRatingsData?.data.data.last_page)}
          paginationValue={Number(allRatingsData?.data.data.current_page)}
          onPaginationChange={setCurrentPage}
          isDataFetching={isRatingsDataFetching}
        />
      )}
    </div>
  );
}
