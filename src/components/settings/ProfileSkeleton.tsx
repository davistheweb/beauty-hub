import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton = () => (
  <div className="mt-5 w-full rounded-2xl border border-[#E2E8F0] p-4">
    {/* Upload Image Section */}
    <div className="flex h-[100px] w-full items-center justify-center rounded-xl border-[2px] border-dashed border-[#898A8C] bg-[#7E7E7E0D] xl:h-[132px]">
      <Skeleton className="h-[40px] w-[200px] rounded-full bg-[#E6E6E6]" />
    </div>

    {/* Form Fields */}
    <div className="mt-5 flex w-full flex-col gap-4 xl:gap-4">
      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[120px] bg-[#E6E6E6]" />
        <Skeleton className="h-12 w-full rounded-lg bg-[#E6E6E6]" />
      </div>

      {/* Email & Phone */}
      <div className="flex w-full flex-col gap-4 py-3 xl:h-[110px] xl:flex-row xl:items-center xl:justify-between xl:gap-[24px]">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-[120px] bg-[#E6E6E6]" />
          <Skeleton className="h-12 w-full rounded-lg bg-[#E6E6E6] xl:w-[450px]" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-[120px] bg-[#E6E6E6]" />
          <Skeleton className="h-12 w-full rounded-lg bg-[#E6E6E6] xl:w-[450px]" />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex w-full items-center justify-center xl:justify-start">
        <Skeleton className="h-[55px] w-full rounded-full bg-[#E6E6E6] xl:w-[365px]" />
      </div>
    </div>
  </div>
);
