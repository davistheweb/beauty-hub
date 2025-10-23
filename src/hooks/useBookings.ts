import {
  fetchAllBookings,
  fetchBookingDetails,
  updateBookingsStatus,
} from "@/services/bookingsService";
import { IErrorInfo } from "@/types/Error";
import { IBookings } from "@/types/IBookings";
import getErrorMessage from "@/utils/getErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useBookings = () => {
  const {
    data: allBookingsData,
    isLoading: isAllBookingsDataLoading,
    error,
    isError: isFetchBookingsError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchAllBookings,
    retry: false,
    networkMode: "always",
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const bookings: IBookings[] | [] = allBookingsData?.data?.data?.data || [];
  console.log("Bookings are: ", bookings);

  const fetchBookingsErrorMessage = isFetchBookingsError
    ? getErrorMessage(error)
    : ({ type: "unknown", message: "" } as IErrorInfo);

  return {
    bookings,
    isAllBookingsDataLoading,
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
    staleTime: 1000 * 60 * 2,
  });

  console.log(error?.message);

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
    ? getErrorMessage(error)
    : ({ type: "unknown", message: "" } as IErrorInfo);

  console.log("Booking detail is", bookingDetails);

  return {
    updateBookingStatus,
    bookingDetails,
    bookingDetailsDataIsLoading,
    isFetchBookingDetailsError,
    fetchBookingDetailsErrorMessage,
  };
};

export { useBookingDetailsByID, useBookings };
