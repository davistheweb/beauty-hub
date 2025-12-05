"use client";

import { usePackages } from "@/hooks";
import { IPackage } from "@/types/IPackages";
import { useState } from "react";
import { NoDataFoundElement } from "../no-data";
import { CardSkeleton } from "../ui/CardSkeleton";
import { ErrorElement } from "../ui/ErrorElement";
import PackageCard from "./PackageCard";
import PackageForm from "./PackageForm";
import { ServiceDetails } from "./ServiceDetails";

const Package = () => {
  const [showPackageFormModal, setShowPackageFormModal] =
    useState<boolean>(false);

  const [openServiceDetailsModal, setOpenServiceDetailsModal] =
    useState<boolean>(false);

  const [packageFormAction, setPackageFormAction] = useState<
    "addPackage" | "updatePackage"
  >("addPackage");

  const [selectedPackage, setSelectedPackage] = useState<IPackage | null>(null);

  const { packages, isLoading, isError, fetchPackagesErrorMessage } =
    usePackages();

  const handleViewServices = (packageItem: IPackage) => {
    setSelectedPackage(packageItem);
    setOpenServiceDetailsModal((prev) => !prev);
  };

  if (isError && !packages.length)
    return (
      <div className="mt-5 flex w-full flex-col rounded-md bg-white p-1 md:h-[600px]">
        <ErrorElement
          title="Something went wrong"
          subtitle={fetchPackagesErrorMessage.message}
          errorType={fetchPackagesErrorMessage.type}
        />
      </div>
    );

  return (
    <div className="flex h-full w-full flex-1 flex-col md:p-2">
      {openServiceDetailsModal && (
        <ServiceDetails
          openServiceDetailsModal={openServiceDetailsModal}
          setOpenServiceDetailsModal={setOpenServiceDetailsModal}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          handleUpdatePackage={() => {
            setTimeout(() => setOpenServiceDetailsModal((prev) => !prev), 900);
            setSelectedPackage(selectedPackage);
            setShowPackageFormModal((prev) => !prev);
            setPackageFormAction("updatePackage");
          }}
        />
      )}
      <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
        <h1 className="inline-block text-2xl font-bold">Package Management</h1>
        <div className="px-4 lg:px-0">
          <PackageForm
            setShowPackageFormModal={setShowPackageFormModal}
            showPackageFormModal={showPackageFormModal}
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            packageFormAction={packageFormAction}
            setPackageFormAction={setPackageFormAction}
          />
        </div>
      </div>

      {/* Packages Layout  */}

      <div className="mt-5 flex w-full flex-col rounded-md bg-white px-1 md:h-[800px]">
        {/* <div className="flex h-12 w-full items-center justify-center">
          <div className="flex h-[30px] w-full items-center p-2 md:p-1">
            
            <SearchInput />
          </div>
        </div> */}

        <>
          {!isLoading && !packages.length ? (
            <div className="flex h-full w-full items-center justify-center">
              <div className="w-[506px]">
                <NoDataFoundElement
                  title="No Packages Yet!"
                  subtitle="You haven’t added any services yet. Start by creating your first service so users can discover what your barbershop offers. Adding services helps customers book appointments and explore your platform with ease."
                />
              </div>
            </div>
          ) : (
            <div className="scrollbar-thin mt-2 grid h-full grid-cols-1 justify-items-center gap-5 overflow-x-hidden px-2 py-3 md:grid-cols-2 lg:gap-0 lg:overflow-y-auto xl:grid-cols-3 xl:gap-4">
              {isLoading ? (
                <CardSkeleton
                  length={8}
                  className="h-[407px] w-[320px]"
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
                    handleViewServices={() => handleViewServices(packageItem)}
                    handleUpdatePackage={() => {
                      if (packageItem) {
                        setSelectedPackage(packageItem);
                        setShowPackageFormModal((prev) => !prev);
                        setPackageFormAction("updatePackage");
                      }
                    }}
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
