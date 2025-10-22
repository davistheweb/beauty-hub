import { Settings, type LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { CiUser } from "react-icons/ci";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CustomGrayBookICon, GrayStylistIcon, RatingsIcon } from "../icons";
export const NavLinks: {
  title: string;
  href: string;
  Icon: LucideIcon | IconType;
}[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    Icon: MdOutlineDashboardCustomize,
  },
  {
    title: "Booking",
    href: "/booking",
    Icon: CustomGrayBookICon,
  },
  {
    title: "Packages",
    href: "/packages",
    Icon: MdOutlineDashboardCustomize,
  },
  { title: "Staff", href: "/staffs", Icon: GrayStylistIcon },

  { title: "Customers", href: "/customers", Icon: CiUser },
  { title: "Ratings", href: "/ratings", Icon: RatingsIcon },

  { title: "Settings", href: "/settings", Icon: Settings },
] as const;
