import getErrorResponse from "@/services/helpers";
import {
  deleteRatingsService,
  fetchRatingsService,
} from "@/services/ratingsService";
import { IErrorInfo } from "@/types/Error";
import { IRating } from "@/types/IRatings";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";

export default function useRatings(page: number) {
  const queryClient = useQueryClient();

  const ratingsQueryOptions = (pageNumber: number) =>
    queryOptions({
      queryFn: () => fetchRatingsService({ page: pageNumber }),
      queryKey: ["ratings", pageNumber],
      placeholderData: (prevData) => prevData,
      retry: false,
      networkMode: "always",
      refetchOnReconnect: true,
      staleTime: 120_000,
      // gcTime: 1000 * 60 * 5,
    });

  const {
    data: allRatingsData,
    isPending: isRatingsDataPending,
    isFetching: isRatingsDataFetching,
    error,
    isError: isFetchRatingsError,
  } = useQuery(ratingsQueryOptions(page));

  useEffect(() => {
    if (
      allRatingsData?.data.data.current_page !==
      allRatingsData?.data.data.last_page
    )
      queryClient.prefetchQuery(ratingsQueryOptions(page + 1));
  }, [
    page,
    queryClient,
    allRatingsData?.data.data.current_page,
    allRatingsData?.data.data.last_page,
  ]);

  const searchRating = useMutation({
    retry: false,
    networkMode: "always",
    mutationFn: fetchRatingsService,
  });

  const deleteRating = useMutation({
    retry: false,
    networkMode: "always",
    mutationFn: deleteRatingsService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ratings"] }),
  });

  const ratingsResponse = allRatingsData?.data?.data?.data || [];

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

  // console.log(ratings);

  const fetchRatingsErrMessage = isFetchRatingsError
    ? getErrorResponse(error)
    : ({ type: "unknown", message: "" } as IErrorInfo);

  return {
    allRatingsData,
    ratings,
    isRatingsDataPending,
    isRatingsDataFetching,
    searchRating,
    isFetchRatingsError,
    fetchRatingsErrMessage,
    deleteRating,
  };
}
