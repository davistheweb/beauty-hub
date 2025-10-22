import { CardSkeleton } from "../ui/CardSkeleton";
import { Skeleton } from "../ui/skeleton";

export default function CustomerLoadingSkeletion() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Skeleton className="h-[100px] bg-[#E6E6E6]" />
      <Skeleton className="h-[10px] w-[200px] bg-[#E6E6E6]" />

      <div className="grid place-items-center gap-2 sm:grid-cols-2">
        <CardSkeleton className="h-[200px] w-full md:w-[490px]" />
      </div>
    </div>
  );
}
