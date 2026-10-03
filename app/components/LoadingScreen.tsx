"use client";
import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { gsap } from "gsap";
import BrandLogo from "./UI/BrandLogo";
import { useAudioStore } from "../store/useAudioStore";
import GlintText from "./UI/GlintText";

interface LoaderProps {
  appState: "loading" | "ready" | "entered";
  onReady: () => void;
  onEnter: () => void;
}

export default function LoaderScreen({
  appState,
  onReady,
  onEnter
}: LoaderProps) {
  // 1. Get automatic asset loading updates from React Three Fiber
  const { progress } = useProgress();
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const [logoStatus, setLogoStatus] = useState<"loading" | "ready">("loading");

  // Trigger ready state when asset progress hits 100%
  // useEffect(() => {
  //   if (progress === 100 && appState === "loading") {
  //     // 💡 SHADER WARM-UP INTERMISSION
  //     // This gives the custom post-processing pipeline a few frames to finish
  //     // compiling its GLSL programs on the GPU before displaying the interactive UI layer.
  //     const warmUpTimer = setTimeout(() => {
  //       onReady();
  //     }, 350);

  //     return () => clearTimeout(warmUpTimer);
  //   }
  // }, [progress, appState, onReady]);

  useEffect(() => {
    if (progress === 100 && appState === "loading") {
      // Phase 1: Wait 350ms for shaders to compile
      const warmUpTimer = setTimeout(() => {
        // 1. Wake up the 3D canvas rendering engine first
        onReady();

        // Phase 2: Wait an extra 100ms for the 3D scene to safely render its first frames
        const uiTimer = setTimeout(() => {
          // 2. ONLY now do we trigger the BrandLogo shape animation!
          setLogoStatus("ready");
        }, 100);
      }, 350);

      return () => clearTimeout(warmUpTimer);
    }
  }, [progress, appState, onReady]);

  // Animate numbers smoothly on the UI layer using GSAP
  useEffect(() => {
    if (counterRef.current) {
      gsap.to(counterRef.current, {
        innerText: Math.floor(progress),
        duration: 0.3,
        snap: { innerText: 1 }, // Forces whole numbers
        ease: "power1.out"
      });
    }
  }, [progress]);

  // Handle the cinematic fade out of the loader overlay container
  const handleEntryClick = () => {
    if (appState !== "ready") return;

    // A. Start your audio initialization code here safely (guaranteed browser approval!)
    initializeAudio();

    // B. Animate the screen overlay slide/fade away cleanly
    gsap.to(overlayRef.current, {
      opacity: 0,
      // y: -30,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        onEnter(); // Mounts the rest of your app & starts look-up camera animation
      }
    });
  };

  const initializeAudio = () => {
    const audio = new Audio("/audio/ambient-drone.webm");
    audio.loop = true;
    audio.volume = 0.25;
    audio.play().catch((err) => console.log("Audio play error:", err));

    // Attach audio instance to window so your mute button can access it later if needed
    (window as any).bgMusic = audio;
  };

  return (
    <div
      onClick={handleEntryClick}
      ref={overlayRef}
      className="fixed inset-0 w-screen p-4 h-dvh  bg-black z-50 flex flex-col items-center justify-end text-white select-none font-mono"
    >
      <div className="text-center flex w-full h-full  justify-between flex-col items-center">
        {/* Subtle decorative spinning ring */}
        {/* <GlintText>Используйте наушники для полного погружения</GlintText> */}
        <div></div>
        <BrandLogo
          status={logoStatus}
          counterRef={counterRef}
          progress={progress}
        />
        {/* <div className="absolute top-[90%] left-0">123</div> */}
        <div className="flex items-center shrink-0 min-h-10  py-2">
          {appState === "ready" && (
            <GlintText>Нажмите в любом месте, чтобы начать</GlintText>
          )}
        </div>
      </div>
    </div>
  );
}
