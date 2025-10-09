export type TBookingDetails = {
  customer: string;
  package: string;
  date: string;
  status: "In Progress" | "Done" | "Cancelled" | "";
};
