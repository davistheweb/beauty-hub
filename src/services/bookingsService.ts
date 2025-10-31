import { IBookingsResponse } from "@/types/IBookings";
import { API } from "./API";
import { getApiResponse } from "./helpers";

const fetchAllBookings = async (page: number = 1): Promise<IBookingsResponse> =>
  getApiResponse(
    await API.post(`/admin/booking/fetch_all_booking?page=${page}`),
  );

const fetchBookingDetails = async (id: number) =>
  getApiResponse(
    await API.post("/admin/booking/fetch_booking_details", { id }),
  );

const updateBookingsStatus = async ({
  id,
  status,
}: {
  id: number;
  status: string;
}) =>
  getApiResponse(
    await API.post("/admin/booking/update_booking_status", {
      id,
      status,
    }),
  );

export { fetchAllBookings, fetchBookingDetails, updateBookingsStatus };
