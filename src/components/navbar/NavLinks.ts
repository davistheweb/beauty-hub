import {
  BookText,
  Logs,
  Menu,
  Settings,
  User,
  type LucideIcon,
} from "lucide-react";
export const NavLinks: {
  title: string;
  href: string;
  Icon: LucideIcon;
}[] = [
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
] as const;
