"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useAudioStore } from "../store/useAudioStore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

interface ScrollManagerProps {
  totalSections: number;
  isOverlayOpen: boolean;
}

export function useHomeScrollManager({
  totalSections,
  isOverlayOpen
}: ScrollManagerProps) {
  const appState = useAudioStore((state) => state.appState);
  const activeSection = useAudioStore((state) => state.activeSection);
  const setActiveSection = useAudioStore((state) => state.setActiveSection);

  const currentSectionRef = useRef<number>(activeSection);
  const isAnimating = useRef<boolean>(false);

  useEffect(() => {
    setActiveSection(0);
  }, [setActiveSection]);

  useEffect(() => {
    currentSectionRef.current = activeSection;
  }, [activeSection]);

  useGSAP(() => {
    document.documentElement.style.overscrollBehaviorY = "none";
    document.body.style.overscrollBehaviorY = "none";

    gsap.set('section:not([data-section="0"])', {
      visibility: "hidden",
      opacity: 0
    });
    gsap.set('[data-section="0"]', { visibility: "visible", opacity: 1 });

    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: 1,
      tolerance: 20,
      preventDefault: true,
      onUp: () => handleSectionChange(-1),
      onDown: () => handleSectionChange(1)
    });

    function handleSectionChange(direction: number) {
      if (isAnimating.current || isOverlayOpen || appState !== "entered")
        return;

      const currentIdx = currentSectionRef.current;
      let nextIndex = currentIdx + direction; // Changed to let so we can modify it

      // --- LOOP LOGIC START ---
      // If user scrolls FORWARD from the last section -> loop back to the first section
      if (nextIndex >= totalSections) {
        nextIndex = 0;
      }

      // If user scrolls BACKWARD from the first section -> block it (do nothing)
      if (nextIndex < 0) {
        return;
      }
      // --- LOOP LOGIC END ---

      // Since we already handled the boundaries above, this check remains true
      if (nextIndex >= 0 && nextIndex < totalSections) {
        isAnimating.current = true;

        // 1. Wake up the 3D rendering loop so the camera movement is perfectly smooth

        // 2. Dispatch section index update to the global store
        setActiveSection(nextIndex);

        const currentSectionEl = document.querySelector(
          `[data-section="${currentIdx}"]`
        );
        const currentTextContainer = document.querySelector(
          `[data-section="${currentIdx}"] .animate-box`
        );
        const nextSectionEl = document.querySelector(
          `[data-section="${nextIndex}"]`
        );
        const nextTextContainer = document.querySelector(
          `[data-section="${nextIndex}"] .animate-box`
        );

        const tl = gsap.timeline({
          onComplete: () => {
            if (currentSectionEl && currentIdx !== nextIndex) {
              gsap.set(currentSectionEl, { visibility: "hidden", opacity: 0 });
            }
            isAnimating.current = false;

            // 3. Freeze the 3D frame render loop now that the camera has arrived
          }
        });

        if (currentTextContainer) {
          // Determine if we are wrapping around to create the right text direction animation
          const isWrappingForward =
            currentIdx === totalSections - 1 && nextIndex === 0;

          tl.to(currentTextContainer, {
            y: direction > 0 || isWrappingForward ? -40 : 40,
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut"
          });
        }

        tl.to({}, { duration: 0.6 }); // Camera sync sync-window

        if (nextSectionEl && nextTextContainer) {
          // Determine if we are wrapping around to create the right text direction animation
          const isWrappingForward =
            currentIdx === totalSections - 1 && nextIndex === 0;

          tl.fromTo(
            nextTextContainer,
            { y: direction > 0 || isWrappingForward ? 40 : -40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power2.out",
              onStart: () => {
                gsap.set(nextSectionEl, { visibility: "visible", opacity: 1 });
              }
            }
          );
        } else {
          isAnimating.current = false;
        }
      }
    }

    // function handleSectionChange(direction: number) {
    //   if (isAnimating.current || isOverlayOpen || appState !== "entered")
    //     return;

    //   const currentIdx = currentSectionRef.current;
    //   const nextIndex = currentIdx + direction;

    //   if (nextIndex >= 0 && nextIndex < totalSections) {
    //     isAnimating.current = true;

    //     // 1. Wake up the 3D rendering loop so the camera movement is perfectly smooth

    //     // 2. Dispatch section index update to the global store
    //     setActiveSection(nextIndex);

    //     const currentSectionEl = document.querySelector(
    //       `[data-section="${currentIdx}"]`
    //     );
    //     const currentTextContainer = document.querySelector(
    //       `[data-section="${currentIdx}"] .animate-box`
    //     );
    //     const nextSectionEl = document.querySelector(
    //       `[data-section="${nextIndex}"]`
    //     );
    //     const nextTextContainer = document.querySelector(
    //       `[data-section="${nextIndex}"] .animate-box`
    //     );

    //     const tl = gsap.timeline({
    //       onComplete: () => {
    //         if (currentSectionEl && currentIdx !== nextIndex) {
    //           gsap.set(currentSectionEl, { visibility: "hidden", opacity: 0 });
    //         }
    //         isAnimating.current = false;

    //         // 3. Freeze the 3D frame render loop now that the camera has arrived
    //       }
    //     });

    //     if (currentTextContainer) {
    //       tl.to(currentTextContainer, {
    //         y: direction > 0 ? -40 : 40,
    //         opacity: 0,
    //         duration: 0.5,
    //         ease: "power2.inOut"
    //       });
    //     }

    //     tl.to({}, { duration: 0.6 }); // Camera sync sync-window

    //     if (nextSectionEl && nextTextContainer) {
    //       tl.fromTo(
    //         nextTextContainer,
    //         { y: direction > 0 ? 40 : -40, opacity: 0 },
    //         {
    //           y: 0,
    //           opacity: 1,
    //           duration: 0.9,
    //           ease: "power2.out",
    //           onStart: () => {
    //             gsap.set(nextSectionEl, { visibility: "visible", opacity: 1 });
    //           }
    //         }
    //       );
    //     } else {
    //       isAnimating.current = false;
    //     }
    //   }
    // }

    return () => {
      observer.kill();
      // 💡 Clean up global styles when hook unmounts
      document.documentElement.style.overscrollBehaviorY = "";
      document.body.style.overscrollBehaviorY = "";
    };
  }, [appState, isOverlayOpen, totalSections]);
}
