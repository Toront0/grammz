"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimateContainerProps {
  children: React.ReactNode;
  scrollerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const ScrollAnimateContainer: React.FC<ScrollAnimateContainerProps> = ({
  children,
  scrollerRef,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      console.log(
        "Tracking elements:",
        scrollerRef.current,
        containerRef.current
      );

      if (!scrollerRef.current || !containerRef.current) return;

      // ScrollTrigger.refresh();

      // 🚀 ONE single timeline to manage everything inside this block
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: scrollerRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      // Find all children matching our custom class tags inside this container
      const revealHeadings = containerRef.current.querySelectorAll(
        ".reveal-heading-inner"
      );
      const glideElements =
        containerRef.current.querySelectorAll(".reveal-glide-item");

      // Animate all masked headers together (or staggered)
      if (revealHeadings.length > 0) {
        tl.fromTo(
          revealHeadings,
          { opacity: 0, yPercent: 100 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15, // Smooth 0.15s delay between multiple headers
            immediateRender: false,
            onComplete: () => console.log("animations completed")
          }
        );
      }

      // Animate all descriptions and images in the same performance pool
      if (glideElements.length > 0) {
        tl.fromTo(
          glideElements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            immediateRender: false
          },
          "-=0.4" // Seamlessly overlap with the headers
        );
      }
    },
    { scope: containerRef, dependencies: [scrollerRef.current] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
