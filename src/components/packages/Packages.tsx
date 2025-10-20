"use client";

import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/SearchInput";
import { usePackages } from "@/hooks";
import { Plus } from "lucide-react";
import { NoDataFoundElement } from "../no-data";
import { CardSkeleton } from "../ui/CardSkeleton";
import PackageCard from "./PackageCard";

const Package = () => {
  const { packages, isLoading } = usePackages();

  return (
    <div className="flex h-full w-full flex-1 flex-col md:p-2">
      <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
        <h1 className="inline-block text-2xl font-bold">Package Management</h1>
        <div className="px-4 lg:px-0">
          <Button className="bg-custom-green w-full cursor-pointer rounded-full px-[50px] font-semibold transition-all duration-500 ease-in-out hover:-translate-y-0.5 hover:bg-[#169B4E] hover:shadow-lg">
            <span>
              <Plus />
            </span>
            Add New Package
          </Button>
        </div>
      </div>

      {/* Customers Layout  */}

      <div className="mt-5 flex w-full flex-col rounded-md bg-white p-1 md:h-[800px]">
        <div className="flex h-12 w-full items-center justify-center">
          <div className="flex h-[30px] w-full items-center p-2 md:p-1">
            {/* Search  */}
            <SearchInput />
          </div>
        </div>

        <>
          {!isLoading && !packages.length ? (
            <div className="flex h-full w-full items-center justify-center">
              <div className="w-[506px]">
                <NoDataFoundElement
                  title="No Services Yet!"
                  subtitle="You haven’t added any services yet. Start by creating your first service so users can discover what your barbershop offers. Adding services helps customers book appointments and explore your platform with ease."
                />
              </div>
            </div>
          ) : (
            <div className="scrollbar-thin mt-2 grid h-full grid-cols-1 justify-items-center gap-5 overflow-x-hidden px-2 py-3 md:grid-cols-2 lg:gap-0 lg:overflow-y-auto xl:grid-cols-3 xl:gap-4">
              {isLoading ? (
                <CardSkeleton
                  length={8}
                  sizes="h-[407px] w-[320px]"
                />
              ) : (
                packages.map((packageItem, i) => (
                  <PackageCard
                    key={i}
                    imgSrc={packageItem.image}
                    packageType={packageItem.name}
                    serviceAmount={packageItem.price.split(".")[0]}
                    allServices={packageItem.services.map(
                      (service) => service.name,
                    )}
                    status={packageItem.status}
                  />
                ))
              )}
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Package;
