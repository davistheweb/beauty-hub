import { CustomerDetails } from "@/components/customers/CustomerDetails";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Beauty - Customer Details",
};

export default async function CustomerDetailsPage({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) {
  const customerId = (await params).customerId;
  return (
    <div className="flex h-full flex-1 flex-col md:p-2">
      <span className="flex gap-2">
        <Link
          href="/customers"
          className="text-[18px] font-normal text-[#898A8C]"
        >
          Customers
        </Link>
        <span className="text-[18px] font-normal text-[#898A8C]"> &gt; </span>
        <span className="text-custom-green text-[18px] font-semibold">
          Customer&apos;s Information
        </span>
      </span>

      <CustomerDetails customerId={customerId} />
    </div>
  );
}
