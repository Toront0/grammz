"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import CameraDebugger from "./CameraDebugger";
import CustomModel from "../CustomModel";

interface SceneProps {
  activeSection: number;
}

export default function DebugScene({ activeSection }: SceneProps) {
  return (
    <div className="w-screen h-screen bg-slate-900 relative">
      {/* Dev HUD Banner */}
      <div className="absolute top-6 left-6 z-50 bg-slate-950/80 backdrop-blur border border-slate-800 p-4 rounded-xl text-sm font-mono text-slate-300 max-w-sm pointer-events-none shadow-2xl">
        <p className="text-indigo-400 font-bold mb-2">
          🛠️ WAYPOINT INSPECTOR MODE
        </p>
        <p className="mb-1">
          🖱️ <span className="text-white">Left Click + Drag</span> to orbit
        </p>
        <p className="mb-1">
          🖐️ <span className="text-white">Right Click + Drag</span> to pan
        </p>
        <p className="mb-3">
          📜 <span className="text-white">Scroll Wheel</span> to zoom
        </p>
        <div className="bg-indigo-950 border border-indigo-800 p-2 rounded text-center text-indigo-300 font-sans font-semibold animate-pulse">
          Press [ SPACEBAR ] to save angle
        </div>
      </div>

      {/* CRITICAL FIX: Declare default camera options directly on the Canvas engine */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true }}
      >
        {/* Generous studio light settings to ensure the model isn't pitch black */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[0, 1, 2]} intensity={2.0} castShadow />
        <pointLight position={[2, 1, 2]} intensity={1.0} />

        <Suspense fallback={null}>
          <CustomModel isMobile />
        </Suspense>

        {/* Freely navigate using your mouse wheel and drag actions */}
        <CameraDebugger />
      </Canvas>
    </div>
  );
}
