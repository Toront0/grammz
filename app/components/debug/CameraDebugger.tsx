"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export default function CameraDebugger() {
  // Capture the raw state stream directly from the Three.js provider core
  const state = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();

        // Safe Fallback: Extract the active camera target directly from the state context
        const activeCamera = state.camera;
        if (!activeCamera) return;

        // Parse coordinates safely, defaulting to 0 if an empty frame drops
        const posX = Number((activeCamera.position.x || 0).toFixed(3));
        const posY = Number((activeCamera.position.y || 0).toFixed(3));
        const posZ = Number((activeCamera.position.z || 0).toFixed(3));

        let targetX = 0;
        let targetY = 0;
        let targetZ = 0;

        if (controlsRef.current) {
          targetX = Number((controlsRef.current.target.x || 0).toFixed(3));
          targetY = Number((controlsRef.current.target.y || 0).toFixed(3));
          targetZ = Number((controlsRef.current.target.z || 0).toFixed(3));
        }

        console.log(
          `%c 🎥 CAPTURED WAYPOINT:`,
          "background: #6366f1; color: #fff; font-weight: bold; padding: 4px; border-radius: 4px;"
        );
        console.log(
          `{ posX: ${posX}, posY: ${posY}, posZ: ${posZ}, targetX: ${targetX}, targetY: ${targetY}, targetZ: ${targetZ} },`
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state]); // Tracks the root Three.js state reference instantly

  return <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.05} />;
}
