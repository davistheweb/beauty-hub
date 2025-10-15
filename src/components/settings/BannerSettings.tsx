import { dummyBannerSettings } from "@/data";
import { Plus } from "lucide-react";
import { NoDataFoundElement } from "../no-data";
import { Button } from "../ui/button";
import BannerCard from "./BannerCard";

export default function BannerSettings() {
  return (
    <div className="mt-5 flex h-full w-full items-center justify-center rounded-2xl">
      {!dummyBannerSettings.length ? (
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
          <div className="scrollbar-thin mt-2 grid h-full grid-cols-1 justify-items-center gap-15 overflow-x-hidden px-8 py-3 sm:grid-cols-2 md:gap-15 lg:h-[598px] lg:gap-24 lg:overflow-y-auto xl:gap-25">
            {dummyBannerSettings.map(
              ({ imgSrc, title, message, status }, _i) => (
                <BannerCard
                  key={_i}
                  imgSrc={imgSrc}
                  title={title}
                  message={message}
                  status={status}
                />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
