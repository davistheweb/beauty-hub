import { TBookingDetails } from "@/types/TBookingDetails";
import { TDummyServices } from "@/types/TDummyServices";

const tableHeaders: string[] = [
  "Customer",
  "Packages",
  "Time and Date",
  "Status",
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

// bookingDetails.length = 0;

const bookingTableHeaders: string[] = [...tableHeaders, "Action"];

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

export { bookingDetails, bookingTableHeaders, dummyServices, tableHeaders };
