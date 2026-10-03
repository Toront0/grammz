"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, useFBO } from "@react-three/drei";

import { MainRenderPipeline } from "./MainRenderPipeline";

export default function Scene3D() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
      <Canvas
        gl={{
          powerPreference: "high-performance",
          alpha: true,
          antialias: true,
          stencil: false,
          depth: true,
          failIfMajorPerformanceCaveat: true
        }}
        dpr={[1, 1.5]}
        camera={{ fov: 60 }}
      >
        <MainRenderPipeline />

        <Preload all />
      </Canvas>
    </div>
  );
}
