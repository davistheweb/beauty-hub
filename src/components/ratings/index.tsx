import { dummyRatings } from "@/data";
import { NoDataFoundElement } from "../no-data";
import RatingsCard from "./RatingsCard";

export default function Ratings() {
  return (
    <>
      <div className="scrollbar-thin h-full w-full overflow-x-auto p-1">
        {!dummyRatings.length ? (
          <div className="h-full w-full items-center justify-center">
            <NoDataFoundElement
              title="No customer ratings Yet!"
              subtitle="When a customer dropped ratings on the app, all reviews and ratings will show here."
            />
          </div>
        ) : (
          <div className="mt-4 flex w-full flex-col gap-8">
            {/* Ratings Card */}
            {dummyRatings.map((ratingsInfo, i) => (
              <RatingsCard
                ratingDate={ratingsInfo.ratingDate}
                starsCount={ratingsInfo.starsCount}
                abbrev={ratingsInfo.userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 3)}
                userName={ratingsInfo.userName}
                title={ratingsInfo.title}
                comment={ratingsInfo.comment}
                key={i}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
