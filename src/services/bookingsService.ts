import { IBookingsResponse } from "@/types/IBookings";
import { API } from "./axios";
import { getApiResponse } from "./helpers";

const fetchAllBookings = async (): Promise<IBookingsResponse> => {
  const res = await API.post("/admin/booking/fetch_all_booking");

  return getApiResponse(res);
};

const fetchBookingDetails = async (id: number) => {
  const res = await API.post("/admin/booking/fetch_booking_details", { id });

  return getApiResponse(res);
};

const updateBookingsStatus = async (
  id: number,
  status: "pending" | "confirmed" | "completed" | "cancelled",
) => {
  const res = await API.post("/admin/booking/update_booking_status", {
    id,
    status,
  });

  return getApiResponse(res);
};

export { fetchAllBookings, fetchBookingDetails, updateBookingsStatus };
