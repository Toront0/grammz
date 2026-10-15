import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import Link from "next/link";
import { useAudioStore } from "@/app/store/useAudioStore";

interface INavigationMenu {
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
}

const NavigationMenu = ({ isMenuOpen, setIsMenuOpen }: INavigationMenu) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const resetActiveSection = useAudioStore((state) => state.resetActiveSection);

  const handleOnLinkClick = () => {
    setIsMenuOpen(false);
    resetActiveSection();
  };

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

        document.body.style.overflow = "hidden";
      } else {
        tl.current.reverse();

        document.body.style.overflow = "";
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-45  bg-[#050505] text-5xl lg:text-6xl text-[#fff] p-4 lg:p-20 flex flex-col justify-between items-center lg:items-start text-center lg:text-left"
    >
      <div></div>

      {/* Links Wrapper */}
      <div
        ref={linksRef}
        className="flex flex-col gap-6 lg:gap-12  overflow-hidden"
      >
        <Link
          href="/"
          className="font-bold w-fit font-sansClean w-full hover:text-[#bf9473]   transition-colors"
          onClick={handleOnLinkClick}
        >
          Главная
        </Link>

        <Link
          href="/contacts"
          className="font-bold w-fit font-sansClean w-full hover:text-[#bf9473] transition-colors"
          onClick={handleOnLinkClick}
        >
          Контакты
        </Link>
        <Link
          href="/promotion"
          className="font-bold w-fit font-sansClean w-full hover:text-[#bf9473] transition-colors"
          onClick={handleOnLinkClick}
        >
          Спецпредложения
        </Link>
      </div>

      <div className="w-full flex items-center justify-between">
        <div className="text-xs font-medium">
          © GRAMMZ 2026-2027 All rights reserved.
        </div>
        <div className="text-base text-gray-400 flex justify-end text-right font-sansClean">
          <h5 className="w-3/5">
            Grammz — место, где ваши идеи встречаются с идеальным воплощением.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
