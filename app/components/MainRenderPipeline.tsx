"use client";

import { useEffect, useRef, useMemo, Suspense, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useFBO, Environment } from "@react-three/drei";
import gsap from "gsap";

import { useAudioStore } from "../store/useAudioStore";
import { ContrastPostMaterial } from "./ContrastPostMaterial";
import CustomModel from "./CustomModel";
import CameraController from "./controllers/CameraController";

// Custom props interface matching your pipeline signature

export function MainRenderPipeline() {
  const { gl, scene, camera, size } = useThree();
  const [tablePosition, setTablePosition] = useState<THREE.Vector3 | null>(
    null
  );

  // ─── 1. LISTEN TO GLOBAL BLACKOUT STATE ───────────────────
  const isTransitioningToBlack = useAudioStore(
    (state) => state.isTransitioningToBlack
  );

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  }, []);

  // ─── 2. SETUP EXPLICIT MATERIAL REFERENCES ────────────────
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!materialRef.current) return;

    // Force Three.js to calculate transparency equations for this material
    materialRef.current.transparent = true;

    gsap.killTweensOf(materialRef.current);

    if (isTransitioningToBlack) {
      // 🎥 OVERLAY IS OPENING: Fade the entire 3D frame buffer to 0 (completely invisible)
      // This reveals the solid dark HTML background (#020617 / bg-slate-950) behind the canvas
      gsap.to(materialRef.current, {
        opacity: 0.0,
        duration: 2.0, // Matches your DOM transition time exactly
        ease: "power4.inOut"
      });
    } else {
      // 🗺️ OVERLAY IS CLOSING: Fade the 3D scene back into view smoothly
      gsap.to(materialRef.current, {
        opacity: 1.0,
        duration: 1.5,
        ease: "power3.inOut"
      });
    }
  }, [isTransitioningToBlack]);

  // Off-screen frame buffer caching pipeline
  const renderTarget = useFBO({
    samples: isMobile ? 0 : 4,
    minFilter: THREE.LinearMipmapLinearFilter,
    magFilter: THREE.LinearFilter,
    generateMipmaps: true,
    format: THREE.RGBAFormat,
    colorSpace: THREE.LinearSRGBColorSpace
  });

  // Completely isolated 2D render context scene graph
  const quadScene = useMemo(() => new THREE.Scene(), []);
  const quadCamera = useMemo(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
    []
  );

  // Connect and clone your preferred original material parameters
  const postMaterial = useMemo(() => {
    // Crucial: Use your base custom shader composition
    const mat = ContrastPostMaterial.clone();
    mat.uniforms.uTexture.value = renderTarget.texture;

    // Save reference so GSAP can modify its opacity values directly
    materialRef.current = mat;
    return mat;
  }, [renderTarget]);

  // Anchor full-screen quad mesh strictly to the isolated screen context
  useMemo(() => {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, postMaterial);
    quadScene.add(mesh);
  }, [quadScene, postMaterial]);

  useFrame((state) => {
    // Dynamic Aspect calculation update safeguards
    if (materialRef.current) {
      materialRef.current.uniforms.uAspect.value = size.width / size.height;
    }

    // Pass 1: Draw your unlit baked model into the hidden buffer texture
    gl.setRenderTarget(renderTarget);
    gl.render(scene, camera);

    // Pass 2: Overlay your custom shader texture map directly onto the viewport
    gl.setRenderTarget(null);
    gl.render(quadScene, quadCamera);
  }, 1);

  return (
    <>
      {/* Camera controller stays normal, handling your active section scrolling waypoints */}
      <CameraController />
      {/* <CameraDebugger /> */}
      {/* <DebugScene /> */}

      <Suspense fallback={null}>
        {/* <Environment files="/bg_env.hdr" background blur={0} /> */}

        <CustomModel isMobile={isMobile} />
      </Suspense>
    </>
  );
}

// import { Suspense, useEffect, useMemo, useRef, useState } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import * as THREE from "three";
// import CameraController from "./CameraController";
// import CustomModel from "./CustomModel";
// import ScreenShaderOverlay from "./ScreenOverlay";
// import { Environment, useFBO } from "@react-three/drei";
// import PostProcessingQuad from "./PostProcessingQuad";
// import { ContrastPostMaterial } from "./ContrastPostMaterial";
// import InteractiveNode from "./InteractiveNode";
// import Magazine from "./Magazine";
// import { useAudioStore } from "../store/useAudioStore";
// import gsap from "gsap";

// interface SceneProps {
//   activeSection: number;
// }

// export function MainRenderPipeline({ activeSection }: SceneProps) {
//   const { gl, scene, camera, size } = useThree();

//   const [tablePosition, setTablePosition] = useState<THREE.Vector3 | null>(
//     null
//   );

//   const curtainUniformsRef = useRef<any>(null);

//   // 1. Off-screen frame buffer caching pipeline
//   const renderTarget = useFBO({
//     samples: 4,
//     minFilter: THREE.LinearMipmapLinearFilter,
//     magFilter: THREE.LinearFilter,
//     generateMipmaps: true,
//     format: THREE.RGBAFormat,
//     colorSpace: THREE.LinearSRGBColorSpace
//   });

//   // 2. Completely isolated 2D render context scene graph
//   const quadScene = useMemo(() => new THREE.Scene(), []);
//   const quadCamera = useMemo(
//     () => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
//     []
//   );

//   // 3. Connect and clone your preferred original material parameters
//   const materialRef = useRef<THREE.ShaderMaterial | null>(null);
//   const postMaterial = useMemo(() => {
//     const mat = ContrastPostMaterial.clone();
//     mat.uniforms.uTexture.value = renderTarget.texture;
//     materialRef.current = mat;
//     return mat;
//   }, [renderTarget]);

//   // 4. Anchor full-screen quad mesh strictly to the isolated screen context
//   useMemo(() => {
//     const geometry = new THREE.PlaneGeometry(2, 2);
//     const mesh = new THREE.Mesh(geometry, postMaterial);
//     quadScene.add(mesh);
//   }, [quadScene, postMaterial]);

//   useFrame((state) => {
//     // 🖥️ Dynamic Aspect calculation update safeguards
//     if (materialRef.current) {
//       materialRef.current.uniforms.uAspect.value = size.width / size.height;

//     }

//     if (curtainUniformsRef.current && curtainUniformsRef.current.uTime) {
//       curtainUniformsRef.current.uTime.value = state.clock.getElapsedTime();
//     }

//     // Pass 1: Draw your unlit baked model into the hidden buffer texture
//     gl.setRenderTarget(renderTarget);
//     gl.render(scene, camera);

//     // Pass 2: Overlay your preferred custom shader texture map directly onto the viewport
//     gl.setRenderTarget(null);
//     gl.render(quadScene, quadCamera);
//   }, 1);

//   return (
//     <>
//       <CameraController activeSection={activeSection} />

//       <Suspense fallback={null}>
//         <Environment
//           files="/bg_env.hdr"
//           background
//           blur={0} // Set to 0.1 - 0.4 if you want a soft, out-of-focus background look
//         />

//         <CustomModel
//           onTableFound={setTablePosition}
//           curtainUniformsRef={curtainUniformsRef}
//         />
//       </Suspense>

//       {tablePosition && <Magazine position={tablePosition} />}
//     </>
//   );
// }
