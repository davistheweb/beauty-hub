import { fetchRatningsService } from "@/services/ratingsService";
import { IErrorInfo } from "@/types/Error";
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
    retry: false,
    networkMode: "always",
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });

  const ratingsResponse = data?.data?.data?.data || [];

  const ratings: IRating[] | [] = ratingsResponse?.map((rating) => ({
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

  const fetchRatingsErrMessage = isFetchRatingsError
    ? getErrorMessage(error)
    : ({ type: "unknown", message: "" } as IErrorInfo);

  return { ratings, isLoading, isFetchRatingsError, fetchRatingsErrMessage };
}
