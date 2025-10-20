import {
  fetchAllBookings,
  fetchBookingDetails,
  updateBookingsStatus,
} from "@/services/bookingsService";
import { IBookings } from "@/types/IBookings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useBookings = () => {
  const { data: allBookingsData, isLoading: isAllBookingsDataLoading } =
    useQuery({
      queryKey: ["bookings"],
      queryFn: fetchAllBookings,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });

  const bookings: IBookings[] | [] = allBookingsData?.data.data.data || [];
  console.log("Bookings are: ", bookings);

  return {
    bookings,
    isAllBookingsDataLoading,
  };
};

const useBookingDetailsByID = (bookingId?: number) => {
  const queryClient = useQueryClient();
  const { data: bookingDetailsData, isLoading: bookingDetailsDataIsLoading } =
    useQuery({
      queryKey: ["bookingDetailsData", bookingId],
      queryFn: () => fetchBookingDetails(bookingId!),
      enabled: !!bookingId,
      staleTime: 1000 * 60 * 2,
    });

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

  console.log("Booking detail is", bookingDetails);

  return {
    updateBookingStatus,
    bookingDetails,
    bookingDetailsDataIsLoading,
  };
};

export { useBookingDetailsByID, useBookings };
