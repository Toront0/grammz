"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface iHamburgerMenu {
  isOpen: boolean;
  setIsMenuOpen: () => void;
}

export default function HamburgerMenu({
  isOpen,
  setIsMenuOpen
}: iHamburgerMenu) {
  // 💡 Check the active route path
  const pathname = usePathname();

  // 💡 If the menu is open OR we are not on the homepage, the bars should be black. Otherwise, they are gray.
  const isNotHome = pathname !== "/";
  const barColorClass = isOpen || isNotHome ? "bg-black" : "bg-gray-200";

  return (
    <button
      onClick={setIsMenuOpen}
      className="group relative flex h-10 w-10 flex-col items-center justify-center rounded-md transition-colors duration-300 z-50 pointer-events-auto"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {/* Container is exactly 16px high (h-4) */}
      <div className="flex h-4 w-6 flex-col justify-between relative">
        {/* TOP LINE */}
        <span
          className={`h-[2px] w-full rounded-full transition-all duration-300 will-change-transform ease-out origin-center
            ${isOpen ? "rotate-45 translate-y-[7px]" : ""} 
            ${barColorClass}
          `}
        />

        {/* MIDDLE LINE */}
        <span
          className={`h-[2px] rounded-full transition-all duration-300 will-change-transform ease-out origin-right
            ${isOpen ? "w-0 opacity-0 scale-x-0" : "w-full group-hover:w-[80%]"}
            ${barColorClass}
          `}
        />

        {/* BOTTOM LINE */}
        <span
          className={`h-[2px] rounded-full transition-all duration-300 will-change-transform ease-out origin-center
            ${
              isOpen
                ? "-rotate-45 -translate-y-[7px]"
                : "w-full group-hover:w-[55%]"
            }
            ${barColorClass}
          `}
        />
      </div>
    </button>
  );
}
