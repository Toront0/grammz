"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react"; // 🚀 Grabs active scroller variables
import React from "react";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const useScrollAnimation = ({
  scrollerRef,
  containerRef
}: UseScrollAnimationProps) => {
  useGSAP(
    () => {
      if (!scrollerRef.current || !containerRef.current) return;

      ScrollTrigger.refresh();

      // --- 1. HEADINGS LOOP ---
      const headings = containerRef.current.querySelectorAll(
        ".reveal-heading-inner"
      );
      headings.forEach((heading) => {
        gsap.fromTo(
          heading,
          { opacity: 0, yPercent: 100 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.8,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: heading,
              // scroller: scrollerRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      const glideItems =
        containerRef.current.querySelectorAll(".reveal-glide-item");

      // 🚀 Loop through each glide item for separate viewport tracking
      glideItems.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: item, // 🎯 Triggers exactly when this item rolls into view
              // scroller: scrollerRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // --- 2. SUBTLE IMAGE PARALLAX LOOP ---
      const parallaxImages = containerRef.current.querySelectorAll(
        ".reveal-parallax-img"
      );
      parallaxImages.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              // scroller: scrollerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5 // Adds an elegant inertial lag matching the slow scroller
            }
          }
        );
      });
    },
    { scope: containerRef, dependencies: [scrollerRef] }
  );
};

// "use client";

// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useLenis } from "lenis/react";
// import React from "react";

// ScrollTrigger.config({ ignoreMobileResize: true });

// gsap.registerPlugin(ScrollTrigger);

// // if (typeof window !== "undefined" && "ontouchstart" in window) {
// //   ScrollTrigger.normalizeScroll(true);
// // }

// interface UseScrollAnimationProps {
//   scrollerRef: React.RefObject<HTMLDivElement | null>;
//   containerRef: React.RefObject<HTMLDivElement | null>;
// }

// export const useScrollAnimation = ({
//   scrollerRef,
//   containerRef
// }: UseScrollAnimationProps) => {
//   const lenis = useLenis();

//   useGSAP(
//     () => {
//       if (!containerRef.current) return;

//       ScrollTrigger.refresh();

//       // Query elements inside the container scope
//       const headings = containerRef.current.querySelectorAll(
//         ".reveal-heading-inner"
//       );

//       // 🚀 Loop through each heading and give it its OWN independent viewport trigger
//       headings.forEach((heading) => {
//         gsap.fromTo(
//           heading,
//           { opacity: 0, yPercent: 100 },
//           {
//             opacity: 1,
//             yPercent: 0,
//             duration: 1.2,
//             ease: "power3.out",
//             immediateRender: false,
//             scrollTrigger: {
//               trigger: heading,

//               // 🛠️ FIXED: Removed scroller assignment! GSAP now monitors the primary window scroll natively
//               start: "top 85%",
//               toggleActions: "play none none none"
//             }
//             // scrollTrigger: {
//             //   trigger: heading, // 🎯 The trigger is now the individual element itself!
//             //   scroller: scrollerRef.current,
//             //   start: "top 85%", // Fires when this specific text hits 85% depth
//             //   toggleActions: "play none none none"
//             // }
//           }
//         );
//       });

//       const glideItems =
//         containerRef.current.querySelectorAll(".reveal-glide-item");

//       // 🚀 Loop through each glide item for separate viewport tracking
//       glideItems.forEach((item) => {
//         gsap.fromTo(
//           item,
//           { opacity: 0, y: 40 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.8,
//             ease: "power2.out",
//             immediateRender: false,
//             scrollTrigger: {
//               trigger: item, // 🎯 Triggers exactly when this item rolls into view

//               start: "top 85%",
//               toggleActions: "play none none none"
//             }
//           }
//         );
//       });

//       const parallaxImages = containerRef.current.querySelectorAll(
//         ".reveal-parallax-img"
//       );
//       parallaxImages.forEach((img) => {
//         gsap.fromTo(
//           img,
//           {
//             yPercent: -10 // Starts shifted upward inside its hidden crop box
//           },
//           {
//             yPercent: 10, // Smoothly glides down as you scroll past
//             ease: "none", // 🛑 Linear 'none' ease is vital for smooth parallax syncing
//             scrollTrigger: {
//               trigger: img.parentElement, // Tracks the outer masked container box bounds

//               start: "top bottom", // Starts moving the second the frame peaks from the bottom
//               end: "bottom top", // Finishes moving when the frame leaves through the top
//               scrub: true // 🔄 CRITICAL: Syncs the animation directly to the user's thumb/mouse scroll speed!
//             }
//           }
//         );
//       });

//       return () => {
//         ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//       };
//     },
//     { scope: containerRef }
//   ); // Scopes animations to this container to optimize performance
// };
