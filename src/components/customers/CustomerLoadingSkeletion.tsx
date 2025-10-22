import { CardSkeleton } from "../ui/CardSkeleton";
import { Skeleton } from "../ui/skeleton";

const CustomerLoadingSkeletion = () => (
  <div className="flex w-full flex-col gap-3">
    <Skeleton className="h-[100px] bg-[#E6E6E6]" />
    <Skeleton className="h-[10px] w-[200px] bg-[#E6E6E6]" />

    <div className="grid place-items-center gap-2 sm:grid-cols-2">
      <CardSkeleton
        className="sm:w[320px] h-[200px] w-full lg:w-[370px] xl:w-[490px]"
        length={4}
      />
    </div>
  </div>
);

export default CustomerLoadingSkeletion;
