"use client";

import { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber"; // 🟢 Import ThreeEvent here
import * as THREE from "three";

export default function InteractiveNode() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Floating/spinning rotation loop animation logic
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.4;
      meshRef.current.position.y = Math.sin(time * 2) * 0.08;
    }
  });

  // 🟢 FIXED TYPE: Use ThreeEvent<MouseEvent> from R3F instead of THREE.IntersectionEvent
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    // Stop the click from bleeding through to components stacked behind it
    event.stopPropagation();

    console.log(
      `%c 🎯 INTERACTIVE MESH CLICKED:`,
      "background: #ec4899; color: #fff; font-weight: bold; padding: 4px; border-radius: 4px;"
    );
    console.log("Mesh details: Center Crystal Node triggered successfully.");
  };

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      <octahedronGeometry args={[0.3, 0]} />
      <meshBasicMaterial
        color={hovered ? "#f43f5e" : "#ec4899"}
        wireframe={!hovered}
      />
    </mesh>
  );
}
