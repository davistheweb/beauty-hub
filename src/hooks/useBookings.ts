import { fetchAllBookings } from "@/services/bookingsService";
import { IBookings } from "@/types/IBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useBookings() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchAllBookings,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const bookings: IBookings[] | [] = data?.data.data.data || [];

  console.log("Bookings are: ", bookings);

  return { bookings, isLoading };
}
