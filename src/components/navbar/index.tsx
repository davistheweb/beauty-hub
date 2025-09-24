"use client";

import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

export default function Navbar() {
  return (
    <>
      <MobileNavigation />
      <DesktopNavigation />
    </>
  );
}
