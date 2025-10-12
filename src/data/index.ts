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
      "Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge, and being a part of a team that's revolutionizing how people achieve their goals is immensely fulfilling.",
  },
  {
    ratingDate: "Jan 20 2025",
    starsCount: 5,
    userName: "Josiah Davis",
    title: "Software Engineer",
    comment:
      "Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge, and being a part of a team that's revolutionizing how people achieve their goals is immensely fulfilling.",
  },
  {
    ratingDate: "Jan 22 2025",
    starsCount: 2,
    userName: "Grace Lee",
    title: "Frontend Developer",
    comment:
      "Some features still feel rough around the edges, but I can see the potential. Excited to see where this goes in the next update.",
  },
  {
    ratingDate: "Jan 25 2025",
    starsCount: 3,
    userName: "Michael Carter",
    title: "UI/UX Designer",
    comment:
      "The platform is decent, though the interface could use some polishing. Still, I appreciate the progress being made.",
  },
  {
    ratingDate: "Feb 02 2025",
    starsCount: 4,
    userName: "Olivia Bennett",
    title: "Project Manager",
    comment:
      "The team collaboration tools are fantastic. Makes communication and progress tracking so much easier for my projects.",
  },
  {
    ratingDate: "Feb 05 2025",
    starsCount: 1,
    userName: "Daniel Moore",
    title: "QA Tester",
    comment:
      "I ran into several bugs that made it hard to complete my tasks. Hoping future updates address these issues quickly.",
  },
  {
    ratingDate: "Feb 10 2025",
    starsCount: 5,
    userName: "Sophia Martinez",
    title: "AI Researcher",
    comment:
      "Absolutely love how intuitive the AI tools are. It’s refreshing to see such innovation paired with simplicity.",
  },
  {
    ratingDate: "Feb 14 2025",
    starsCount: 4,
    userName: "Liam Johnson",
    title: "Backend Developer",
    comment:
      "Stable performance and well-documented APIs. Integration was smooth, though response times could be improved slightly.",
  },
  {
    ratingDate: "Feb 17 2025",
    starsCount: 3,
    userName: "Emma Wilson",
    title: "Data Analyst",
    comment:
      "Good overall experience, but I’d appreciate more data visualization options. The analytics dashboard is promising though.",
  },
  {
    ratingDate: "Feb 22 2025",
    starsCount: 5,
    userName: "Noah Brown",
    title: "Tech Lead",
    comment:
      "The product direction is spot-on. Our productivity has increased significantly since we adopted Sam.AI internally.",
  },
  {
    ratingDate: "Mar 01 2025",
    starsCount: 2,
    userName: "Ava Thompson",
    title: "Intern",
    comment:
      "Learning curve is a bit steep for beginners. Some onboarding materials would help a lot.",
  },
  {
    ratingDate: "Mar 06 2025",
    starsCount: 5,
    userName: "William Harris",
    title: "System Architect",
    comment:
      "Everything about this ecosystem feels modern and efficient. Kudos to the dev team for their attention to detail.",
  },
  {
    ratingDate: "Mar 09 2025",
    starsCount: 4,
    userName: "Mia Robinson",
    title: "Marketing Strategist",
    comment:
      "Great experience! The insights we’re getting from Sam.AI are helping us make smarter campaign decisions.",
  },
  {
    ratingDate: "Mar 12 2025",
    starsCount: 3,
    userName: "Ethan Walker",
    title: "Support Engineer",
    comment:
      "Some processes feel slow, but customer support was quick to respond and helped resolve my issues efficiently.",
  },
  {
    ratingDate: "Mar 15 2025",
    starsCount: 5,
    userName: "Isabella Clark",
    title: "Team Lead",
    comment:
      "Excellent platform with an inspiring company culture. I’m proud to be part of a vision that’s reshaping AI productivity.",
  },
  {
    ratingDate: "Mar 19 2025",
    starsCount: 4,
    userName: "James Adams",
    title: "DevOps Engineer",
    comment:
      "Deployment pipelines are smooth and reliable. I’d love to see more customization options for CI/CD soon.",
  },
  {
    ratingDate: "Mar 22 2025",
    starsCount: 2,
    userName: "Harper Lewis",
    title: "Freelancer",
    comment:
      "Not bad, but I encountered a few glitches using it on mobile. Needs better optimization for smaller screens.",
  },
  {
    ratingDate: "Mar 26 2025",
    starsCount: 1,
    userName: "Benjamin Scott",
    title: "Content Writer",
    comment:
      "The interface feels confusing at first, and it took me a while to understand how to navigate between features.",
  },
  {
    ratingDate: "Apr 01 2025",
    starsCount: 5,
    userName: "Ella Perez",
    title: "AI Trainer",
    comment:
      "Love how powerful yet user-friendly it is. Makes my day-to-day work much more efficient and enjoyable.",
  },
  {
    ratingDate: "Apr 04 2025",
    starsCount: 4,
    userName: "Henry Nguyen",
    title: "Product Manager",
    comment:
      "Well thought-out product. It keeps improving with every release, which shows how much the team cares about feedback.",
  },
  {
    ratingDate: "Apr 07 2025",
    starsCount: 3,
    userName: "Amelia Rodriguez",
    title: "Business Analyst",
    comment:
      "There’s room for improvement in user analytics, but overall, the features are solid and helpful.",
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
