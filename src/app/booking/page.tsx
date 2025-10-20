import Bookings from "@/components/bookings";
import AppLayout from "@/components/layouts/AppLayout";
import {
  NoDataFoundTableDesktopComponent,
  NoDataFoundTableMobileComponent,
} from "@/components/no-data";
import SearchInput from "@/components/ui/SearchInput";
import { bookingDetails, bookingTableHeaders } from "@/data";
import { ChevronDown, Dot, EllipsisVertical } from "lucide-react";
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
