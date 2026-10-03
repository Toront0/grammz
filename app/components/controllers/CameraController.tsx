"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";

import * as THREE from "three";

import { CustomEase } from "gsap/CustomEase"; // 🟢 Import CustomEase
import { useAudioStore } from "@/app/store/useAudioStore";
import { cameraWaypoints } from "@/app/constants/cameraPath";

interface ControllerProps {
  activeSection: number;
}

gsap.registerPlugin(CustomEase);

export default function CameraController() {
  const { camera } = useThree();

  const activeSection = useAudioStore((state) => state.activeSection);
  const tvPosition = useAudioStore((state) => state.tvPosition);

  // Vector target mapping state proxy
  const animState = useRef({
    x: cameraWaypoints[0].posX,
    y: cameraWaypoints[0].posY,
    z: cameraWaypoints[0].posZ,
    tx: cameraWaypoints[0].targetX,
    ty: cameraWaypoints[0].targetY,
    tz: cameraWaypoints[0].targetZ,
    driftMultiplier: 1.0
  });

  const targetVector = new THREE.Vector3();

  // Instantly trigger the camera timeline transition when the index updates
  useEffect(() => {
    const baseWaypoint = cameraWaypoints[activeSection];
    if (!baseWaypoint) return;

    const isMobile = window.innerWidth < 768;

    const targetWaypoint =
      isMobile && baseWaypoint.mobile ? baseWaypoint.mobile : baseWaypoint;

    // Kill any ongoing camera animations to prevent overlapping glitches
    gsap.killTweensOf(animState.current);

    CustomEase.create(
      "luxuryDecelerate",
      "M0,0 C0.25,0 0.05,1 0.4,1 C0.6,1 0.75,1 1,1"
    );

    let targetDrift = 0.6;

    console.log("activeSection", activeSection);

    // if (activeSection === 4 || activeSection === 3) {
    //   targetDrift = 0.4; // 🌟 Slow it down dramatically here!
    // }

    gsap.to(animState.current, {
      x: targetWaypoint.posX,
      y: targetWaypoint.posY,
      z: targetWaypoint.posZ,
      tx: targetWaypoint.targetX,
      ty: targetWaypoint.targetY,
      tz: targetWaypoint.targetZ,
      driftMultiplier: targetDrift,
      duration: 1.7, // Camera flight speed matching HTML section fade window
      ease: "power4.inOut", // Fluid acceleration curves
      onStart: () => {
        useAudioStore.getState().playSFX("/whoosh.mp3", 0.4);
      }
    });
  }, [activeSection]);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    const currentDriftScale = animState.current.driftMultiplier;

    // 🌟 1. CALCULA CINEMATIC IDLE DRIFT (Breathing Effect)
    // Using different speeds (0.5, 0.4) and phase shifts ensures the movement
    // loops organically like floating in physical space, rather than moving in a rigid circle.
    const driftX =
      Math.sin(elapsedTime * (0.5 * currentDriftScale)) *
      (0.04 * currentDriftScale);
    const driftY =
      Math.cos(elapsedTime * (0.4 * currentDriftScale)) *
      (0.03 * currentDriftScale);
    const driftZ =
      Math.sin(elapsedTime * (0.3 * currentDriftScale) + 1.0) *
      (0.02 * currentDriftScale);

    // 🌟 2. APPLY BASE POSITION + THE DRIFT OFFSET
    camera.position.set(
      animState.current.x + driftX,
      animState.current.y + driftY,
      animState.current.z + driftZ
    );

    // 🌟 3. APPLY DRIFT TO THE LOOK-AT TARGET
    // Adding a tiny fraction of the drift to the target coordinates makes the camera lens
    // lag behind slightly as it floats, creating a much more realistic handheld/steadicam illusion.
    targetVector.set(
      animState.current.tx + driftX * 0.5,
      animState.current.ty + driftY * 0.5,
      animState.current.tz + driftZ * 0.5
    );

    camera.lookAt(targetVector);
  });

  // Read position data dynamically on every WebGL frame
  // useFrame(() => {
  //   camera.position.set(
  //     animState.current.x,
  //     animState.current.y,
  //     animState.current.z
  //   );
  //   targetVector.set(
  //     animState.current.tx,
  //     animState.current.ty,
  //     animState.current.tz
  //   );
  //   camera.lookAt(targetVector);
  // });

  return null;
}
