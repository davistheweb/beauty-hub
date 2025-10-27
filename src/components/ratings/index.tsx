"use client";
import { CaretDownIcon } from "@/components/icons";
import { Label } from "@/components/ui/label";
import SearchInput from "@/components/ui/SearchInput";
import { useDebounce, useRatings } from "@/hooks";
import { IRating } from "@/types/IRatings";
import getErrorMessage from "@/utils/getErrorMessage";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { NoDataFoundElement } from "../no-data";
import { CardSkeleton } from "../ui/CardSkeleton";
import { ErrorElement } from "../ui/ErrorElement";
import RatingsCard from "./RatingsCard";

export default function Ratings() {
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<IRating[] | []>([]);
  const {
    ratings,
    searchRating,
    isLoading,
    deleteRating,
    isFetchRatingsError,
    fetchRatingsErrMessage,
  } = useRatings();
  const debouncedValue = useDebounce(search, 600);

  useEffect(() => {
    const toastId = toast.loading("Searching ratings...");
    if (!debouncedValue?.trim()) {
      toast.dismiss(toastId);
      return;
    }

    setSearchData([]);

    searchRating.mutate(debouncedValue, {
      onSuccess: (data) => {
        console.log(data.data.data.data);
        setSearchData(data.data.data.data);
        toast.dismiss(toastId);
      },
      onError: (err) => {
        toast.dismiss(toastId);
        setSearchData([]);
        const error = getErrorMessage(err);
        toast.error(error.message);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    if (search.trim().length === 0) setSearchData([]);
  }, [search]);

  const handleDeleteRating = (id: number) => {
    const toastId = toast.loading("Deleting review....");

    deleteRating.mutate(id, {
      onSuccess: (data) => {
        toast.dismiss(toastId);
        toast.success(data.message);
      },
      onError: (err) => {
        toast.dismiss(toastId);
        const error = getErrorMessage(err);
        toast.error(error.message);
      },
    });
  };

  const allRatings =
    searchData.length > 0 && search.length > 0 ? searchData : ratings;

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
          className={`scrollbar-thin ${isLoading ? "" : "h-full py-3"} w-full p-1 lg:overflow-y-auto`}
        >
          {!isLoading && !allRatings.length ? (
            <div className="h-full w-full items-center justify-center">
              <NoDataFoundElement
                title="No customer ratings Yet!"
                subtitle="When a customer dropped ratings on the app, all reviews and ratings will show here."
              />
            </div>
          ) : isLoading ? (
            <div className="flex w-full flex-col gap-4">
              <CardSkeleton
                length={8}
                className="h-[150px] w-full"
              />
            </div>
          ) : (
            <div className="mt-4 flex w-full flex-col gap-4">
              {/* Ratings Card */}
              {allRatings.map((ratingsInfo, i) => (
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
