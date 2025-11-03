import {
  fetchAllBookings,
  fetchBookingDetails,
  updateBookingsStatus,
} from "@/services/bookingsService";
import { getErrorResponse } from "@/services/helpers";
import { IErrorInfo } from "@/types/Error";
import { IBookings } from "@/types/IBookings";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";

const useBookings = (page: number) => {
  const queryClient = useQueryClient();

  const bookingsQueryOptions = (pageNumber: number) =>
    queryOptions({
      queryFn: () => fetchAllBookings(pageNumber),
      queryKey: ["bookings", pageNumber],
      placeholderData: (prevData) => prevData,
      retry: false,
      networkMode: "always",
      refetchOnReconnect: true,
      staleTime: 60_000,
      gcTime: 1000 * 60 * 5,
    });

  const {
    data: allBookingsData,
    isPending: isAllBookingsDataPending,
    isFetching: isAllBookingsDataFetching,
    error,
    isError: isFetchBookingsError,
  } = useQuery(bookingsQueryOptions(page));

  useEffect(() => {
    if (
      allBookingsData?.data.data.current_page !==
      allBookingsData?.data.data.last_page
    )
      queryClient.prefetchQuery(bookingsQueryOptions(page + 1));
  }, [
    page,
    queryClient,
    allBookingsData?.data.data.current_page,
    allBookingsData?.data.data.last_page,
  ]);

  const bookings: IBookings[] | [] = allBookingsData?.data?.data?.data || [];
  // console.log("Bookings are: ", bookings);

  const fetchBookingsErrorMessage = isFetchBookingsError
    ? getErrorResponse(error)
    : ({ type: "unknown", message: "" } as IErrorInfo);

  return {
    bookings,
    allBookingsData,
    isAllBookingsDataPending,
    isAllBookingsDataFetching,
    isFetchBookingsError,
    fetchBookingsErrorMessage,
  };
};

const useBookingDetailsByID = (bookingId?: number) => {
  const queryClient = useQueryClient();
  const {
    data: bookingDetailsData,
    isLoading: bookingDetailsDataIsLoading,
    error,
    isError: isFetchBookingDetailsError,
  } = useQuery({
    queryKey: ["bookingDetailsData", bookingId],
    queryFn: () => fetchBookingDetails(bookingId!),
    retry: false,
    networkMode: "always",
    enabled: !!bookingId,
    staleTime: 60_000,
    gcTime: 1000 * 60 * 5,
  });

  // console.log(error?.message);

  const updateBookingStatus = useMutation({
    mutationFn: updateBookingsStatus,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({
        queryKey: ["bookingDetailsData", variables.id],
      });
    },
  });

  const bookingDetails: IBookings = bookingDetailsData?.data.data;

  const fetchBookingDetailsErrorMessage = isFetchBookingDetailsError
    ? getErrorResponse(error)
    : ({ type: "unknown", message: "" } as IErrorInfo);

  // console.log("Booking detail is", bookingDetails);

  return {
    updateBookingStatus,
    bookingDetails,
    bookingDetailsDataIsLoading,
    isFetchBookingDetailsError,
    fetchBookingDetailsErrorMessage,
  };
};

export { useBookingDetailsByID, useBookings };
