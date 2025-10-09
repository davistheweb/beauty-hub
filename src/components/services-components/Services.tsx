"use client";

import { dummyServices } from "@/data";
import { TDummyServices } from "@/types/TDummyServices";
import { useState } from "react";
import { NoDataFoundElement } from "../no-data";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [serviceLists, 
    // setServiceLists
  ] =
    useState<TDummyServices[]>(dummyServices);

  return (
    <>
      {!serviceLists.length ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-[506px]">
            <NoDataFoundElement
              title="No Services Yet!"
              subtitle="You haven’t added any services yet. Start by creating your first service so users can discover what your barbershop offers. Adding services helps customers book appointments and explore your platform with ease."
            />
          </div>
        </div>
      ) : (
        <div className="scrollbar-thin mt-2 grid h-full grid-cols-1 justify-items-center gap-5 overflow-x-hidden overflow-y-auto px-2 py-3 md:grid-cols-2 lg:gap-0 xl:grid-cols-3 xl:gap-4">
          {serviceLists.map(
            (
              { imgSrc, serviceType, serviceAmount, allServices, status },
              i,
            ) => (
              <ServiceCard
                key={i}
                imgSrc={imgSrc}
                serviceType={serviceType}
                serviceAmount={serviceAmount}
                allServices={allServices}
                status={status}
              />
            ),
          )}
        </div>
      )}
    </>
  );
};

export default Services;
