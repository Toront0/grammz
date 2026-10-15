"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import HamburgerMenu from "./HamburgerMenu";
import { useAudioStore } from "../../store/useAudioStore";
import { usePathname } from "next/navigation";
import HomeNavigation from "./HomeNavigation";
import NavigationMenu from "./NavigationMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      // 1. Prevent breaking on iOS rubber-band/bounce scrolling top
      if (currentScrollY < 0) return;

      // 2. Adjust visibility based on direction
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling DOWN and passed the header height threshold
        setIsVisible(false);
      } else {
        // Scrolling UP
        setIsVisible(true);
      }

      // 3. Update the tracking anchor position
      setLastScrollY(currentScrollY);
    };

    // Use passive listener to boost mobile scroll performance
    window.addEventListener("scroll", controlHeader, { passive: true });

    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  return (
    <>
      {/* Header Bar */}
      <div
        className={`fixed top-0 z-50 flex  items-center justify-between  left-0 w-full p-2 lg:p-8 bg-linear-to-b from-black via-black/50 to-transparent transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center gap-4 lg:gap-8">
          <Link href="/">
            <Image
              src="/grammz_logo.png"
              alt="logo"
              width={120}
              height={30}
              className="w-24 h-auto lg:w-30"
            />
          </Link>
          <div className="w-px h-8 bg-gray-600"></div>
          <HamburgerMenu
            isOpen={isMenuOpen}
            setIsMenuOpen={() => setIsMenuOpen((prev) => !prev)}
          />
        </div>
        <div></div>
      </div>

      {/* Overlay Menu */}
      <NavigationMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};

export default Header;
