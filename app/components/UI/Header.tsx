"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import HamburgerMenu from "./HamburgerMenu";
import { useAudioStore } from "../../store/useAudioStore";
import { usePathname } from "next/navigation";
import HomeNavigation from "./HomeNavigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const resetActiveSection = useAudioStore((state) => state.resetActiveSection);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    // Set initial position immediately on load before building timeline
    gsap.set(menuRef.current, { yPercent: -100 });
    if (linksRef.current) {
      gsap.set(linksRef.current.children, { y: 50, opacity: 0 });
    }

    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true })
        // 1. Slide menu panel down
        .to(menuRef.current, {
          yPercent: 0,
          duration: 0.6,
          ease: "power4.inOut"
        })
        // 2. Animate links up (staggered)
        .to(
          linksRef.current ? linksRef.current.children : [],
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.inOut",
            stagger: 0.1
          },
          "-=0.3" // Starts slightly before panel finishes
        );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (tl.current) {
      if (isMenuOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [isMenuOpen]);

  const handleOnLinkClick = () => {
    setIsMenuOpen(false);
    resetActiveSection();
  };

  const isNotHomePage = pathname !== "/";

  return (
    <>
      {/* Header Bar */}
      <div
        className={`fixed top-0 z-50 flex  items-center justify-between  left-0 w-full p-2 lg:p-8 bg-linear-to-b from-black via-black/50 to-transparent`}
      >
        <div className="flex items-center gap-4 lg:gap-8">
          <Link href="/">
            <Image
              src="/grammz_logo.webp"
              alt="logo"
              width={160}
              height={40}
              className="w-24 h-auto lg:w-40"
            />
          </Link>
          <div className="w-px h-8 bg-gray-600"></div>
          <HamburgerMenu
            isOpen={isMenuOpen}
            setIsMenuOpen={() => setIsMenuOpen((prev) => !prev)}
          />
        </div>
        {/* {!isNotHomePage && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <HomeNavigation />
          </div>
        )} */}
        <div></div>
      </div>

      {/* Overlay Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-45  bg-[#EFEBDC] text-5xl lg:text-6xl text-[#184241] p-4 lg:p-20 flex flex-col justify-between items-center lg:items-start text-center lg:text-left"
      >
        <div></div>

        {/* Links Wrapper */}
        <div
          ref={linksRef}
          className="flex flex-col gap-6 lg:gap-12  overflow-hidden"
        >
          <Link
            href="/"
            className="font-bold block w-full hover:text-[#bf9473]   transition-colors"
            onClick={handleOnLinkClick}
          >
            Главная
          </Link>
          <Link
            href="/catalog"
            className="font-bold block w-full hover:text-[#bf9473] transition-colors"
            onClick={handleOnLinkClick}
          >
            Каталог
          </Link>
          <Link
            href="/contacts"
            className="font-bold block w-full hover:text-[#bf9473] transition-colors"
            onClick={handleOnLinkClick}
          >
            О компании
          </Link>
        </div>

        <div className="text-xs font-medium">
          © GRAMMZ 2026-2027 All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Header;
