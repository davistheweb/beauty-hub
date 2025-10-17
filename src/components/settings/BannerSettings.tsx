"use client";
import {
  deleteBannerService,
  fetchBannersService,
} from "@/services/BannerSettings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { NoDataFoundElement } from "../no-data";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import BannerCard from "./BannerCard";

export default function BannerSettings() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: fetchBannersService,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  console.log(data);

  const banners = data?.data.data.data || [];

  const deleteBanner = useMutation({
    mutationFn: deleteBannerService,
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div className="mt-5 flex h-full w-full items-center justify-center rounded-2xl">
      {!isLoading && !banners.length ? (
        <div className="flex h-[500px] w-full flex-col items-center justify-center">
          <NoDataFoundElement
            title="No Banner Settings Yet!"
            subtitle="Add A new One"
          >
            <Button className="bg-custom-green cursor-pointer rounded-full hover:bg-[#169B4E]">
              <span>
                <Plus />
              </span>
              Add New Banner
            </Button>
          </NoDataFoundElement>
        </div>
      ) : (
        <div className="mt-2 h-full w-full px-1">
          <div className="flex items-center justify-center lg:justify-end">
            <Button className="bg-custom-green w-full cursor-pointer rounded-full px-[50px] font-semibold transition-all duration-500 ease-in-out hover:-translate-y-0.5 hover:bg-[#169B4E] hover:shadow-lg lg:w-fit">
              <span>
                <Plus />
              </span>
              Add New Banner
            </Button>
          </div>
          <div className="scrollbar-thin mt-2 grid h-full grid-cols-1 justify-center gap-15 overflow-x-hidden px-8 py-3 sm:grid-cols-2 md:gap-15 lg:h-[598px] lg:gap-24 lg:overflow-y-auto xl:gap-25">
            {isLoading
              ? Array.from({ length: 6 }, (_, i) => i).map((i) => (
                  <Skeleton
                    key={i}
                    className="h-[340px] w-[330px] bg-[#E6E6E6] sm:w-[300px] md:w-[360px] xl:w-[450px]"
                  />
                ))
              : banners.map((data, _i: number) => (
                  <BannerCard
                    key={_i}
                    imgSrc={data.image}
                    title={data.title}
                    message={data.subtitle}
                    status={data.status}
                    onClick={() => deleteBanner.mutate(data.id)}
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
}
