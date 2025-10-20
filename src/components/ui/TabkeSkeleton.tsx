import { Skeleton } from "./skeleton";

export const TabkeSkeleton = ({ length }: { length: number }) =>
  Array.from({ length: length }, (_, i) => i).map((i) => (
    <tr
      key={i}
      className="h-[4px] w-full hover:bg-gray-50"
    >
      {Array.from({ length: length }, (_, i) => i).map((i) => (
        <td
          key={i}
          className="h-[10px] px-8 py-2 text-center text-[14px] font-normal"
        >
          <Skeleton className="z-10 h-[10px] bg-[#E6E6E6]" />
        </td>
      ))}
    </tr>
  ));
