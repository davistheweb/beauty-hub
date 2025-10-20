import { Skeleton } from "./skeleton";

export const CardSkeleton = ({ length = 6 }) =>
  Array.from({ length: length }, (_, i) => i).map((i) => (
    <Skeleton
      key={i}
      className="h-[340px] w-[330px] bg-[#E6E6E6] sm:w-[300px] md:w-[330px] lg:w-[300px] xl:w-[450px]"
    />
  ));
