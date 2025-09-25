"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomLogoutIcon } from "./icons";
import { NavLinks } from "./navbar/NavLinks";
import Logo from "./ui/Logo";

export default function Sidebar() {
  const pathName = usePathname();

  const isActive = (url: string) => pathName === url;

  return (
    <aside className="sticky hidden h-full w-[200px] justify-center border-r-2 border-r-[#D1F0DE] bg-white pt-[5px] pr-[13px] pb-[30px] pl-[13px] lg:flex">
      {/* Sidebar first Layout Cotainer (Outer) */}
      <div className="flex h-[550px] w-[250px] flex-col justify-center gap-10 pt-[10px] pr-[8px] pb-[16px] pl-[8px]">
        {/* Logo and links container */}
        <div className="flex h-[430px] w-full flex-col items-center gap-8">
          {/* Logo  */}
          <div className="flex w-[100px] justify-center">
            <Logo
              width={50}
              height={50}
            />
          </div>
          {/* Links  */}
          <div className="flex w-full items-center justify-center p-2">
            <nav className="flex w-full flex-col items-center justify-center">
              <ul className="flex w-full flex-col gap-5">
                {NavLinks.map(({ title, href, Icon }, i) => (
                  <Link
                    href={href}
                    key={i}
                    className={`flex h-10 w-[170px] cursor-pointer list-none rounded-sm p-2 transition-all duration-300 ease-in-out hover:bg-[#D1F0DE] ${isActive(href) ? "bg-[#D1F0DE]" : ""} sidebar-hover`}
                  >
                    <span
                      className={`${isActive(href) ? "text-custom-green" : "text-[#5C5A55]"} flex items-center gap-3`}
                    >
                      <Icon size={23} />
                      {title}
                    </span>
                  </Link>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        {/* Logout  */}
        <div className="z-10 flex h-[40px] w-full items-center pl-4">
          <button className="flex cursor-pointer gap-4 text-red-500">
            <CustomLogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
