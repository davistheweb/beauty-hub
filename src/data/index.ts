const tableHeaders: string[] = [
  "Customer",
  "Packages",
  "Time and Date",
  "Status",
];

type TtbodyData = {
  customer: string;
  package: string;
  date: string;
  status: "In Progress" | "Done" | "Cancelled";
};

const tbodyData: TtbodyData[] = [
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
  {
    customer: "John Smith",
    package: "Regular Package",
    date: "2024-03-15 2:00 PM",
    status: "Cancelled",
  },
  
];

export { tableHeaders, tbodyData };
