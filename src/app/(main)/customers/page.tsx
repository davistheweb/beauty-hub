import Customers from "@/components/customers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty - Customers",
};

export default function CustomersPage() {
  return (
    <div className="flex h-full flex-1 flex-col md:p-2">
      <h1 className="inline-block text-2xl font-bold">All Customers</h1>
      <Customers />
    </div>
  );
}
