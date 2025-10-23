import AppLayout from "@/components/layouts/AppLayout";
import Ratings from "@/components/ratings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Ratings",
};

export default function RatingsPage() {
  return (
    <AppLayout>
      <div className="flex h-full flex-1 flex-col md:p-2">
        <h1 className="inline-block text-2xl font-bold">Ratings</h1>
        <Ratings />
      </div>
    </AppLayout>
  );
}
