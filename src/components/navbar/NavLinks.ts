import { BookText, Logs, Menu, Settings, User } from "lucide-react";
export const NavLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    Icon: Menu,
  },
  {
    title: "Booking",
    href: "/booking",
    Icon: BookText,
  },
  {
    title: "Services",
    href: "/services",
    Icon: Logs,
  },
  { title: "Customers", href: "/customers", Icon: User },
  { title: "Settings", href: "/settings", Icon: Settings },
];

// : {
//   title: string;
//   href: string;
//   Icon: React.SVGElementType;
// }[]
