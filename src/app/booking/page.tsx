import Bookings from "@/components/bookings";
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
        <Bookings />
      </div>
    </AppLayout>
  );
}
