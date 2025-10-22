import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

export const CardSkeleton = ({
  length = 6,
  className = "h-[340px] w-[330px] sm:w-[300px] md:w-[330px] lg:w-[300px] xl:w-[450px]",
}) =>
  Array.from({ length: length }, (_, i) => i).map((i) => (
    <Skeleton
      key={i}
      className={cn("bg-[#E6E6E6]", className)}
    />
  ));
