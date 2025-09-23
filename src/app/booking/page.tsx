import AppLayout from "@/components/layouts/AppLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Booking",
};

export default function Booking() {
  return (
    <AppLayout>
      <div className="flex-1">
        <p>Booking</p>
      </div>
    </AppLayout>
  );
}
