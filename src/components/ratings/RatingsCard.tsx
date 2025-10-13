import { Star } from "lucide-react";
import CustomTrashIcon from "../icons/CustomTrashIcon";

interface RatingsCardProp {
  ratingDate: string;
  starsCount: number;
  abbrev: string;
  userName: string;
  title?: string;
  comment: string;
}
const RatingsCard = ({
  ratingDate,
  starsCount,
  abbrev,
  userName,
  title = "",
  comment,
}: RatingsCardProp) => (
  <div className="flex h-max w-full flex-col gap-2 rounded-sm border border-[#E4E4E4] px-[10px] py-[15px]">
    <div className="flex w-full justify-between">
      <span className="text-[12px] font-medium text-[#858585]">
        {ratingDate}
      </span>
      <span className="cursor-pointer">
        <CustomTrashIcon
          color="#FF3333"
          size={15}
        />
      </span>
    </div>
    <div className="flex gap-2">
      {Array.from({ length: starsCount }, (_, i) => i).map((i) => (
        <Star
          key={i}
          fill="#FC9A27"
          color="#FC9A27"
          size={15}
        />
      ))}
    </div>
    <div className="flex w-full items-center gap-2">
      <span className="flex h-[36] w-[36] items-center justify-center rounded-full bg-[#D1F0DE] text-sm font-semibold text-[#5465FF] select-none">
        {abbrev}
      </span>
      <span className="text-sm font-medium text-[#0D0C22]">{userName}</span>
    </div>
    <div className="flex flex-col gap-1">
      {title.length > 0 && (
        <span className="font-medium text-[#5C5A55]">{title}</span>
      )}
      <span className="text-sm font-normal text-[#5C5A55]">{comment}</span>
    </div>
  </div>
);

export default RatingsCard;
