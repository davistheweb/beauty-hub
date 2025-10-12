import {
  TBookingDetails,
  TDummyCustomers,
  TDummyRatings,
  TDummyServices,
  TDummyStaffs,
} from "@/types";

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

const bookingDetails: TBookingDetails[] = [
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "In Progress",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "Done",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "Done",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "Done",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "In Progress",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "In Progress",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "In Progress",
  },
  {
    customer: "Josiah Davis",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "Cancelled",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "Cancelled",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "Cancelled",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "Cancelled",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "Cancelled",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "Cancelled",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "Cancelled",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "Cancelled",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "Cancelled",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "Cancelled",
  },
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "Cancelled",
  },
];

bookingDetails.length = 0;

const bookingTableHeaders: string[] = [...tableHeaders, "Action"];

const staffTableHeaders: string[] = [
  "Staff Name",
  "No of Bookings",
  "Joined Date",
  "Status",
  "Action",
];

const dummyServices: TDummyServices[] = [
  {
    imgSrc: "/images/barbing2.jpeg",
    serviceType: "Regular Service",
    serviceAmount: "₦17,000",
    allServices: [
      "Hair Cut",
      "Hair Dye/Tint",
      "Hair Treatments",
      "Hair Wash",
      "Pedicure & Manicure",
      "Facial",
    ],
    status: "Inactive",
  },
  {
    imgSrc: "/images/barbing2.jpeg",
    serviceType: "VIP Package",
    serviceAmount: "₦17,000",
    allServices: [
      "Hair Cut",
      "Hair Dye/Tint",
      "Hair Treatments",
      "Pedicure & Manicure",
      "Facial",
    ],
    status: "Active",
  },
  {
    imgSrc: "/images/barbingImage.png",
    serviceType: "Family Package",
    serviceAmount: "₦17,000",
    allServices: ["Hair Cut", "Hair Dye/Tint"],
    status: "",
  },
  {
    imgSrc: "/images/barbingImage.png",
    serviceType: "Wedding Package",
    serviceAmount: "₦17,000",
    allServices: [
      "Hair Cut",
      "Pedicure & Manicure",
      "Hair Dye/Tint",
      "Hair Treatments",
      "Facial",
    ],
    status: "",
  },
  {
    imgSrc: "/images/barbingImage.png",
    serviceType: "Dreadlock Package",
    serviceAmount: "₦17,000",
    allServices: ["Hair Cut", "Hair Dye/Tint"],
    status: "",
  },
  {
    imgSrc: "/images/barbingImage.png",
    serviceType: "Family Package",
    serviceAmount: "₦17,000",
    allServices: [
      "Hair Cut",
      "Hair Dye/Tint",
      "Hair Treatments",
      "Hair Wash",
      "Pedicure & Manicure",
      "Facial",
    ],
    status: "",
  },
  {
    imgSrc: "/images/barbingImage.png",
    serviceType: "Regular Service",
    serviceAmount: "₦17,000",
    allServices: ["Hair Cut", "Hair Dye/Tint", "Hair Treatments"],
    status: "Active",
  },
];

// dummyServices.length = 0;

const dummyCustomers: TDummyCustomers[] = [
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Active",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Inactive",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Active",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Inactive",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Active",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Inactive",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Active",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Inactive",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Active",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Inactive",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Active",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Inactive",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Active",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Inactive",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Active",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Inactive",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Active",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Inactive",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Active",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-03-15",
    status: "Inactive",
  },
  // extra entries
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-04-01",
    status: "Active",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-04-01",
    status: "Inactive",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-04-01",
    status: "Active",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-04-01",
    status: "Inactive",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-04-01",
    status: "Active",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-04-01",
    status: "Inactive",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-04-01",
    status: "Active",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-04-01",
    status: "Inactive",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-04-01",
    status: "Active",
  },
  {
    customerName: "Ifedayo Ojo",
    emailAddress: "Ifedayoojo@gmail.com",
    phoneNumber: "09087654321",
    dateCreated: "2024-04-01",
    status: "Inactive",
  },
];

// dummyCustomers.length = 0;

const dummyStaffs: TDummyStaffs[] = [
  {
    staffName: "Ifedeyo Ojo",
    joinedDate: "2024-03-15",
    status: "Active",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "John Deo",
    joinedDate: "2023-11-02",
    status: "Inactive",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Alice Johnson",
    joinedDate: "2022-09-18",
    status: "Active",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Michael Smith",
    joinedDate: "2024-05-27",
    status: "Suspended",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Sophia Williams",
    joinedDate: "2021-12-10",
    status: "Active",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Daniel Brown",
    joinedDate: "2023-07-03",
    status: "Inactive",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Olivia Davis",
    joinedDate: "2022-01-25",
    status: "Active",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "James Miller",
    joinedDate: "2024-02-14",
    status: "Suspended",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Emily Garcia",
    joinedDate: "2023-03-30",
    status: "Active",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "William Martinez",
    joinedDate: "2022-08-19",
    status: "Inactive",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Ava Robinson",
    joinedDate: "2024-06-22",
    status: "Active",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Henry Clark",
    joinedDate: "2023-04-11",
    status: "Suspended",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Isabella Rodriguez",
    joinedDate: "2021-10-05",
    status: "Inactive",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Ethan Lewis",
    joinedDate: "2022-11-09",
    status: "Active",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Charlotte Walker",
    joinedDate: "2023-01-17",
    status: "Suspended",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Mason Hall",
    joinedDate: "2024-07-28",
    status: "Active",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Mia Allen",
    joinedDate: "2023-09-13",
    status: "Inactive",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Benjamin Young",
    joinedDate: "2022-04-21",
    status: "Active",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Harper Hernandez",
    joinedDate: "2024-08-02",
    status: "Suspended",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Lucas King",
    joinedDate: "2023-05-15",
    status: "Inactive",
    numberOfBookings: "Regular Package",
  },
  {
    staffName: "Ella Wright",
    joinedDate: "2021-11-29",
    status: "Active",
    numberOfBookings: "Regular Package",
  },
];

// dummyStaffs.length = 0;

const dummyRatings: TDummyRatings[] = [
  {
    ratingDate: "Jan 20 2025",
    starsCount: 5,
    userName: "Alex K",
    comment:
      "Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge, and being a part of a team that's revolutionizing how people achieve their goals is immensely fulfilling. ",
  },
  {
    ratingDate: "Jan 20 2025",
    starsCount: 5,
    userName: "Josiah Davis",
    title: "Software engineer",
    comment:
      "Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge, and being a part of a team that's revolutionizing how people achieve their goals is immensely fulfilling. ",
  },

  {
    ratingDate: "Jan 20 2025",
    starsCount: 2,
    userName: "Josiah Davis",
    title: "Software engineer",
    comment:
      "Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge, and being a part of a team that's revolutionizing how people achieve their goals is immensely fulfilling. ",
  },
  {
    ratingDate: "Jan 20 2025",
    starsCount: 3,
    userName: "Josiah Davis",
    title: "Software engineer",
    comment:
      "Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge, and being a part of a team that's revolutionizing how people achieve their goals is immensely fulfilling. ",
  },
  {
    ratingDate: "Jan 20 2025",
    starsCount: 4,
    userName: "Josiah Davis",
    title: "Software engineer",
    comment:
      "Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge, and being a part of a team that's revolutionizing how people achieve their goals is immensely fulfilling. ",
  },
  {
    ratingDate: "Jan 20 2025",
    starsCount: 1,
    userName: "Josiah Davis",
    title: "Software engineer",
    comment:
      "Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge, and being a part of a team that's revolutionizing how people achieve their goals is immensely fulfilling. ",
  },
];

// dummyRatings.length = 0;
export {
  bookingDetails,
  bookingTableHeaders,
  customersTableHeaders,
  dummyCustomers,
  dummyRatings,
  dummyServices,
  dummyStaffs,
  staffTableHeaders,
  tableHeaders,
};
