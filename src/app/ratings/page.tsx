import AppLayout from "@/components/layouts/AppLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Ratings",
};

export default function RatingsPage() {
  return (
    <AppLayout>
      <div className="flex-1">
        <p>Ratings</p>
      </div>
    </AppLayout>
  );
}
