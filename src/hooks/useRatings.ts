import { fetchRatningsService } from "@/services/ratingsService";
import { IRating } from "@/types/IRatings";
import getErrorMessage from "@/utils/getErrorMessage";
import { useQuery } from "@tanstack/react-query";

export default function useRatings() {
  const {
    data,
    isLoading,
    error,
    isError: isFetchRatingsError,
  } = useQuery({
    queryFn: fetchRatningsService,
    queryKey: ["ratings"],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });

  const ratingsResponse = data?.data?.data?.data || [];

  const ratings: IRating[] | [] = ratingsResponse?.map((rating, i) => ({
    id: rating.id,
    user_id: rating.user_id,
    rating: rating.rating,
    comment: rating.comment,
    created_at: rating.created_at,
    user: {
      name: rating.user.name,
      email: rating.user.email,
      avatar: rating.user.avatar,
    },
  }));

  console.log(ratings);

  const fetchRatingsErrMessage: string =
    getErrorMessage(error) || "Something went wrong";

  return { ratings, isLoading, isFetchRatingsError, fetchRatingsErrMessage };
}
