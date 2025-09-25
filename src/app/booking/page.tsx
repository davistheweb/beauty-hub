import AppLayout from "@/components/layouts/AppLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Booking",
};

export default function Booking() {
  return (
    <AppLayout>
      <div className="flex h-full flex-1 flex-col md:p-2">
        <h1 className="inline-block text-2xl font-bold">Bookings</h1>
        <div className="mt-3 flex w-full flex-col items-center justify-center gap-3 p-2">
          {/* Bookins Table  */}
          <div className="flex h-[598px] w-full flex-col rounded-md bg-white p-1"></div>
          {/* Pagination  */}
          <div className="hidden h-[40px] w-full flex-col rounded-md bg-white p-1 lg:flex"></div>
        </div>
      </div>
    </AppLayout>
  );
}
