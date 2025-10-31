import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Star } from "lucide-react";
import { CustomTrashIcon } from "../icons";

interface RatingsCardProp {
  ratingDate: string;
  starsCount: number;
  abbrev: string;
  userName: string;
  comment: string;
  deleteRating: () => void;
}
const RatingsCard = ({
  ratingDate,
  starsCount,
  abbrev,
  userName,
  comment,
  deleteRating,
}: RatingsCardProp) => (
  <div className="flex h-max w-full flex-col gap-2 rounded-sm border border-[#E4E4E4] px-[10px] py-[15px]">
    <div className="flex w-full justify-between">
      <span className="text-[12px] font-medium text-[#858585]">
        {ratingDate}
      </span>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <span className="cursor-pointer">
            <CustomTrashIcon
              color="#FF3333"
              size={15}
            />
          </span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this review?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              review from the server
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteRating}
              className="cursor-pointer bg-red-500 hover:bg-red-600"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
      <span className="text-sm font-normal text-[#5C5A55]">{comment}</span>
    </div>
  </div>
);

export default RatingsCard;
