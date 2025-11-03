const tableHeaders: string[] = [
  "Customer",
  "Packages",
  "Time and Date",
  "Status",
];
const customersTableHeaders: string[] = [
  "Customer's Name",
  "Email Address",
  "Phone Number",
  "Date Created",
  "Status",
  "Action",
];
const bookingTableHeaders: string[] = [...tableHeaders, "Action"];

const staffTableHeaders: string[] = [
  "Staff Name",
  // "No of Bookings",
  "Joined Date",
  "Status",
  "Action",
];

export {
  bookingTableHeaders,
  customersTableHeaders,
  staffTableHeaders,
  tableHeaders,
};
