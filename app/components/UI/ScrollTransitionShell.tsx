"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

interface ScrollTransitionShellProps {
  children: React.ReactNode;
}

export function ScrollTransitionShell({
  children
}: ScrollTransitionShellProps) {
  const destinationVeilRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      destinationVeilRef.current,
      { opacity: 1 },
      {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          window.history.replaceState(
            { ...window.history.state, fromTransition: false },
            ""
          );
        }
      }
    );
  }, []);

  useScrollAnimation({ scrollerRef, containerRef });

  // Distribute children arrays into designated DOM scroll elements cleanly
  const childrenArray = React.Children.toArray(children);
  const heroHeaderContent = childrenArray[0];
  const bodyContent = childrenArray.slice(1);

  return (
    <div
      ref={scrollerRef}
      className="w-full h-screen z-40 bg-[#050505] "
      style={{ willChange: "transform" }}
    >
      {/* Route Transition Veil */}
      <div
        ref={destinationVeilRef}
        className="fixed inset-0 bg-black w-full h-full z-50 pointer-events-none"
        style={{ opacity: 1 }}
      />

      {/* Render the Hero Content element directly */}
      {heroHeaderContent}

      {/* Render body content with the target tracking reference container wrapper */}
      <div
        ref={containerRef}
        className="px-[calc(5vw*1.5)] bg-[#050505] py-10 lg:py-32"
      >
        {bodyContent}
      </div>
    </div>
  );
}
