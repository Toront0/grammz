// /components/CustomModel.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useGLTF, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { MeshSurfaceSampler } from "three/examples/jsm/Addons.js";

import { useAudioStore } from "../store/useAudioStore";
import { useCustomModelTextures } from "../hooks/useCustomModelTextures";
import {
  coffeeFragmentShader,
  coffeeVertexShader
} from "../shaders/CoffeeSmokeShader";
import {
  godRayVertexShader,
  godRayFragmentShader,
  particleVertexShader,
  particleFragmentShader
} from "../shaders/GodRayShaders";

interface CustomModelProps {
  isMobile: boolean;
}

export default function CustomModel({ isMobile }: CustomModelProps) {
  const gltf = useGLTF("/models/final.glb");
  const pathname = usePathname();
  const isNotHomePage = pathname !== "/";
  const isInitialized = useRef(false);

  const { setOverlayOpen, isOverlayOpen } = useAudioStore();
  const { bakedTextures, perlinTexture } = useCustomModelTextures(isMobile);

  const dustParticlesRef = useRef<THREE.Points | null>(null);
  const smokeMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [smokePosition, setSmokePosition] = useState<THREE.Vector3 | null>(
    null
  );

  const godRayUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: perlinTexture },
      uColor: { value: new THREE.Color("#fffaed") },
      uOpacity: { value: 0.5 }
    }),
    [perlinTexture]
  );

  // Setup unlit textures matrix and map special shaders
  useEffect(() => {
    if (!gltf || isInitialized.current) return;

    gltf.scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const meshName = child.name.toLowerCase();
      const nameParts = child.name.split("_");
      let prefix = nameParts[0] ? nameParts[0].toLowerCase() : "gen";

      if (meshName === "gen_floor") prefix = "floor";
      if (meshName === "fur_cornice_-_74_v2003") prefix = "carnice";
      if (meshName === "coffee" || meshName === "mug") prefix = "coffee";

      const currentTexture =
        bakedTextures[prefix as keyof typeof bakedTextures] ||
        bakedTextures.gen;

      // Handle GodRay Shader attachment
      if (meshName === "godray_mesh") {
        child.material = new THREE.ShaderMaterial({
          vertexShader: godRayVertexShader,
          fragmentShader: godRayFragmentShader,
          uniforms: godRayUniforms,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide
        });
        return;
      }

      // Handle GodRay Particles Surface Sampling
      if (meshName === "godray_particles_mesh") {
        const canvas = document.createElement("canvas");
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext("2d");
        let pTexture = null;

        if (ctx) {
          const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
          gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 16, 16);
          pTexture = new THREE.CanvasTexture(canvas);
        }

        const particleMaterial = new THREE.ShaderMaterial({
          vertexShader: particleVertexShader,
          fragmentShader: particleFragmentShader,
          uniforms: {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color("#fffaed") },
            uOpacity: { value: 0.7 },
            uPointTexture: { value: pTexture }
          },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        });

        const particleCount = 70;
        const pGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const randomSpeeds = new Float32Array(particleCount);

        const sampler = new MeshSurfaceSampler(child).build();
        const tempPosition = new THREE.Vector3();

        for (let i = 0; i < particleCount; i++) {
          sampler.sample(tempPosition);
          positions[i * 3] = tempPosition.x;
          positions[i * 3 + 1] = tempPosition.y;
          positions[i * 3 + 2] = tempPosition.z;
          randomSpeeds[i] = 0.1 + Math.random() * 0.4;
        }

        pGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );
        pGeometry.setAttribute(
          "aSpeed",
          new THREE.BufferAttribute(randomSpeeds, 1)
        );

        const particlePoints = new THREE.Points(pGeometry, particleMaterial);
        child.material = new THREE.MeshBasicMaterial({ visible: false });

        particlePoints.position.copy(child.position);
        particlePoints.rotation.copy(child.rotation);
        particlePoints.scale.copy(child.scale);

        gltf.scene.add(particlePoints);
        dustParticlesRef.current = particlePoints;
        return;
      }

      // Handle Coffee Mug world calculation
      if (prefix === "coffee" || meshName === "mug") {
        child.geometry.computeBoundingBox();
        const bbox = child.geometry.boundingBox || new THREE.Box3();
        child.updateMatrixWorld(true);

        const worldPos = new THREE.Vector3();
        child.getWorldPosition(worldPos);
        const worldScale = new THREE.Vector3();
        child.getWorldScale(worldScale);
        const worldQuat = new THREE.Quaternion();
        child.getWorldQuaternion(worldQuat);

        const localTopCenter = new THREE.Vector3(
          (bbox.max.x + bbox.min.x) * 0.5,
          bbox.max.y,
          (bbox.max.z + bbox.min.z) * 0.5
        );
        localTopCenter.applyQuaternion(worldQuat).multiply(worldScale);

        setSmokePosition(worldPos.add(localTopCenter));

        const bakedCupTex = currentTexture.clone();
        bakedCupTex.channel = 1;
        child.material = new THREE.MeshBasicMaterial({ map: bakedCupTex });
        return;
      }

      // Standard Unlit Fallback Assignment Pass
      const doubleSidePass = meshName === "gen_outdoor";
      const finalTexture = currentTexture.clone();
      if (
        meshName.includes("book") ||
        meshName === "fur_tv" ||
        meshName === "fur_macbook_top" ||
        doubleSidePass
      ) {
        finalTexture.channel = 1;
      }

      child.material = new THREE.MeshBasicMaterial({
        map: finalTexture,
        side: doubleSidePass ? THREE.DoubleSide : THREE.FrontSide,
        transparent: meshName === "fur_tv"
      });

      if (child.geometry.attributes.color)
        child.geometry.deleteAttribute("color");
      child.geometry.computeVertexNormals();
    });

    isInitialized.current = true;
  }, [gltf.scene, bakedTextures, godRayUniforms]);

  // Synchronous animation loops inside dynamic frame passes
  useFrame((state) => {
    if (isNotHomePage) return;
    const elapsed = state.clock.getElapsedTime();

    if (godRayUniforms) godRayUniforms.uTime.value = elapsed;

    if (dustParticlesRef.current) {
      const mat = dustParticlesRef.current.material as THREE.ShaderMaterial;
      if (mat.uniforms?.uTime) mat.uniforms.uTime.value = elapsed;
    }

    if (smokeMaterialRef.current?.uniforms?.uTime) {
      smokeMaterialRef.current.uniforms.uTime.value = elapsed;
    }
  });

  const smokeGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1, 1, 16, 64);
    geo.translate(0, 0.5, 0);
    geo.scale(0.03, 0.1, 0.03);
    return geo;
  }, []);

  return (
    <group>
      <Center>
        <primitive
          object={gltf.scene}
          scale={1}
          onClick={(e: any) => {
            e.stopPropagation();
            if (!isOverlayOpen) setOverlayOpen(true);
          }}
        />
      </Center>
      {smokePosition && (
        <mesh geometry={smokeGeometry} position={smokePosition}>
          <shaderMaterial
            ref={smokeMaterialRef}
            vertexShader={coffeeVertexShader}
            fragmentShader={coffeeFragmentShader}
            uniforms={{
              uTime: { value: 0 },
              uPerlinTexture: { value: perlinTexture }
            }}
            side={THREE.DoubleSide}
            transparent={true}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("/models/final.glb");
