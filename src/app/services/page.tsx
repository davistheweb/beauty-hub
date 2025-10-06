import AppLayout from "@/components/layouts/AppLayout";
import { NoDataFoundElement } from "@/components/no-data";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/SearchInput";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Services",
};

export default function Services() {
  return (
    <AppLayout>
      <div className="flex h-full flex-1 flex-col md:p-2">
        <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
          <h1 className="inline-block text-2xl font-bold">
            Service Management
          </h1>
          <div className="px-4 lg:px-0">
            <Button className="bg-custom-green w-full cursor-pointer rounded-full px-[50px] font-semibold transition-all duration-500 ease-in-out hover:-translate-y-0.5 hover:bg-[#169B4E] hover:shadow-lg">
              Add New Service
            </Button>
          </div>
        </div>

        {/* Customers Layout  */}

        <div className="mt-5 flex h-[598px] w-full flex-col rounded-md bg-white p-1">
          <div className="flex h-12 w-full items-center justify-center">
            <div className="flex h-[30px] w-full items-center p-2 md:p-4">
              {/* Search  */}
              <SearchInput />
            </div>
          </div>
          {/* No Data Found Element  */}
          <div className="flex h-full w-full items-center justify-center">
            <div className="w-[506px]">
              <NoDataFoundElement
                title="No Services Yet!"
                subtitle="You haven’t added any services yet. Start by creating your first service so users can discover what your barbershop offers. Adding services helps customers book appointments and explore your platform with ease."
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
