"use client";

import {
  useGLTF,
  useTexture,
  Center,
  useKTX2,
  Html,
  RenderTexture,
  OrthographicCamera,
  Text
} from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

import { useAudioStore } from "../store/useAudioStore";
import { useFrame } from "@react-three/fiber";
import {
  CurtainFragmentShader,
  CurtainVertexShader
} from "../shaders/CurtainsShader";
import {
  coffeeFragmentShader,
  coffeeVertexShader
} from "../shaders/CoffeeSmokeShader";
import { MeshSurfaceSampler } from "three/examples/jsm/Addons.js";
import BrandLogo from "./UI/BrandLogo";
import StaticBrandLogo from "./StaticBrandLogo";

// const vertexShader = `
//   varying vec2 vUv;
//   void main() {
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// const fragmentShader = `
//   uniform sampler2D uTexture;
//   uniform vec3 uColor;
//   uniform float uOpacity;
//   uniform float uTime;
//   varying vec2 vUv;

//   void main() {
//      vec2 softUv = vec2(vUv.x * 0.15, vUv.y * 4.0);
//     // Swap scrolling: light now drifts down the length of the shaft
//     softUv.x -= uTime * 0.001;
//     softUv.y += uTime * 0.001;
//     float softNoise = texture2D(uTexture, softUv).r;

//     // 🌟 AXIS FLIPPED FOR LAYER 2 (Sharp streaks)
//     // We multiply Y by 12.0 to stack many individual needle beams across the width.
//     vec2 sharpUv = vec2(vUv.x * 0.15, vUv.y * 12.0);
//     sharpUv.x -= uTime * 0.001;
//     sharpUv.y += uTime * 0.001;
//     float sharpNoise = texture2D(uTexture, sharpUv).r;
//     float rareSharpNoise = pow(sharpNoise, 4.0);

//     // Combine them with increased glint weight so they pop cleanly
//     float combinedNoise = softNoise + (rareSharpNoise * 0.01);

//     // Correct smoothstep edge masks (Kept exactly as your preferred version)
//     // float verticalFade   = smoothstep(0.0, 0.15, vUv.y)
//     //                      * (1.0 - smoothstep(0.85, 1.0, vUv.y));
//     float verticalFade   = smoothstep(0.0, 0.05, vUv.y) * (1.0 - smoothstep(0.05, 0.8, vUv.y));
//     float horizontalFade = smoothstep(0.0, 0.22, vUv.x)
//                          * (1.0 - smoothstep(0.78, 1.0, vUv.x));
//     float edgeMask = verticalFade * horizontalFade;

//     gl_FragColor = vec4(uColor, combinedNoise * edgeMask * uOpacity);
//   }
// `;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    // Keeps the wide top scale across the upper 40-60% of the mesh
    float transitionProgress = smoothstep(0.4, 0.9, vUv.y);
    
    // 🌟 FIXED LAYER 1: Increased starting scale from 1.0 to 2.5
    // This splits the top into roughly 2 or 3 distinct wide columns!
    float dynamicYScale1 = mix(2.0, 4.0, transitionProgress);
    vec2 softUv = vec2(vUv.x * 0.15, vUv.y * dynamicYScale1);
    softUv.x -= uTime * 0.005;
    softUv.y += uTime * 0.005;
    float softNoise = texture2D(uTexture, softUv).r;

    // 🌟 FIXED LAYER 2: Increased starting scale from 2.0 to 4.5
    // Gives the sharp glint streaks 2-3 wider anchor rays at the top entry
    float dynamicYScale2 = mix(4.5, 12.0, transitionProgress);
    vec2 sharpUv = vec2(vUv.x * 0.15, vUv.y * dynamicYScale2);
    sharpUv.x -= uTime * 0.005;
    sharpUv.y += uTime * 0.005;
    float sharpNoise = texture2D(uTexture, sharpUv).r;
    float rareSharpNoise = pow(sharpNoise, 4.0);

    // Combine them with your preferred weights
    float combinedNoise = softNoise + (rareSharpNoise * 0.01);

    // Your working capsule mask logic (Preserves top edge blur and extended fade range)
    float verticalFade   = smoothstep(0.0, 0.05, vUv.y) * (1.0 - smoothstep(0.05, 0.9, vUv.y));
    float horizontalFade = smoothstep(0.0, 0.22, vUv.x) * (1.0 - smoothstep(0.78, 1.0, vUv.x));
    float edgeMask = verticalFade * horizontalFade;

    gl_FragColor = vec4(uColor, combinedNoise * edgeMask * uOpacity);
  }
`;

const particleVertexShader = `
  uniform float uTime;
  attribute float aSpeed; 
  varying float vAlphaFade;
  varying float vOpacityVariation; // 🌟 1. Create a varying to pass opacity to fragment shader

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    vec3 pos = position;

    float uniqueId = position.x + position.y + position.z;
    float pPhase = hash(uniqueId + 2.0) * 100.0;
float timeScale = (uTime * 0.4) * aSpeed + pPhase;

// 1. VERTICAL MOVEMENT (Uses normal random speed cycle)
pos.y += sin(timeScale) * 0.2; 

// 2. HORIZONTAL MOVEMENT (Multiply time slightly differently so speed changes apply everywhere)
pos.x += cos(timeScale * 1.4 + 1.0) * 0.08; 

// 3. DEPTH MOVEMENT
pos.z += sin(timeScale * 1.1 + 2.0) * 0.08;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    vAlphaFade = 1.0; 

    // Randomize particle sizes (from previous step)
    gl_PointSize = 2.0 + hash(uniqueId + 3.0) * 4.0; 

    // 🌟 2. RANDOMIZE OPACITY HERE
    // hash(uniqueId + 4.0) gives a unique value between 0.0 and 1.0 per particle.
    // This scales the individual opacity multiplier between 0.4 (soft) and 1.0 (fully crisp/bright).
    vOpacityVariation = 0.4 + hash(uniqueId + 4.0) * 0.5;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform sampler2D uPointTexture;
  varying float vAlphaFade;
  varying float vOpacityVariation; // 🌟 1. Receive the unique opacity from vertex shader

  void main() {
    vec4 texColor = texture2D(uPointTexture, gl_PointCoord);
    
    // 🌟 2. Combine the base texture alpha, edge fades, master uniform opacity, 
    // AND our new randomized opacity variation together.
    float finalAlpha = texColor.a * vAlphaFade * uOpacity * vOpacityVariation;
    
    gl_FragColor = vec4(uColor, finalAlpha);
  }
`;

interface CustomModelProps {
  isMobile: boolean;
}

export default function CustomModel({ isMobile }: CustomModelProps) {
  const gltf = useGLTF("/models/final.glb");

  const setTvPosition = useAudioStore((state) => state.setTvPosition);

  const [tvTransform, setTvTransform] = useState<{
    position: THREE.Vector3;
    quaternion: THREE.Quaternion;
    scale: THREE.Vector3;
  } | null>(null);

  // const [isMobile, setIsMobile] = useState(false);
  const [hasCheckedDevice, setHasCheckedDevice] = useState(false);

  useEffect(() => {
    // Check screen size safely on mount
    const media = window.matchMedia("(max-width: 768px)");
    // setIsMobile(media.matches);
    setHasCheckedDevice(true);
  }, []);

  const res = isMobile ? "1k" : "2k";

  const [genTex, sofaTex, furTex, floorTex, coffeeTex, perlinTex] = useKTX2(
    // [
    //   `/textures_ktx2/general_textures_2k.ktx2`,
    //   `/textures_ktx2/sofa_textures_2k.ktx2`,
    //   `/textures_ktx2/furniture_textures_2k.ktx2`,
    //   `/textures_ktx2/floor_textures_2k.ktx2`,
    //   `/textures_ktx2/coffee_cup_tex_2k.ktx2`, // (Assuming carnice map name maps here or update accordingly)
    //   `/textures_ktx2/perlin.ktx2`
    // ],
    [
      `/textures_ktx2/general_textures_${res}.ktx2`,
      `/textures_ktx2/sofa_textures_${res}.ktx2`,
      `/textures_ktx2/furniture_textures_${res}.ktx2`,
      `/textures_ktx2/floor_textures_${res}.ktx2`,
      `/textures_ktx2/coffee_cup_textures_1k.ktx2`, // (Assuming carnice map name maps here or update accordingly)
      `/textures_ktx2/perlin.ktx2`
    ],

    "/basis/"
  );

  // 2. Build your record mapping block exactly like before, applying your custom rules
  const bakedTextures: Record<string, THREE.Texture> = {
    gen: Object.assign(genTex, {
      flipY: false,
      anisotropy: isMobile ? 4 : 16,
      colorSpace: THREE.SRGBColorSpace
    }),
    sofa: Object.assign(sofaTex, {
      flipY: false,
      anisotropy: isMobile ? 4 : 16,
      colorSpace: THREE.SRGBColorSpace
    }),
    fur: Object.assign(furTex, {
      flipY: false,
      anisotropy: isMobile ? 4 : 16,
      colorSpace: THREE.SRGBColorSpace
    }),
    floor: Object.assign(floorTex, {
      flipY: false,
      anisotropy: isMobile ? 4 : 16,
      colorSpace: THREE.SRGBColorSpace,
      wrapS: THREE.RepeatWrapping,
      wrapT: THREE.RepeatWrapping
    }),
    coffee: Object.assign(coffeeTex, {
      flipY: false,
      anisotropy: isMobile ? 4 : 16,
      colorSpace: THREE.SRGBColorSpace,
      wrapS: THREE.RepeatWrapping,
      wrapT: THREE.RepeatWrapping
    }),
    perlin: Object.assign(perlinTex, {
      flipY: false,
      anisotropy: 4,
      colorSpace: THREE.NoColorSpace, // Keeps roughness/noise linear!
      wrapS: THREE.RepeatWrapping,
      wrapT: THREE.RepeatWrapping
    })
  };

  // const bakedTextures: Record<string, THREE.Texture> = {
  //   gen: useTexture("/textures/general_textures_2k.png", (tex) => {
  //     tex.flipY = false;
  //     tex.anisotropy = 16;
  //     tex.minFilter = THREE.LinearMipmapLinearFilter; // For crisp scaling far away
  //     tex.magFilter = THREE.LinearFilter; // For smooth rendering close up
  //     tex.generateMipmaps = true;
  //   }),
  //   sofa: useTexture("/textures/sofa_textures_2k.png", (tex) => {
  //     tex.flipY = false;
  //     tex.anisotropy = 16;
  //     tex.minFilter = THREE.LinearMipmapLinearFilter; // For crisp scaling far away
  //     tex.magFilter = THREE.LinearFilter; // For smooth rendering close up
  //     tex.generateMipmaps = true;
  //   }),
  //   fur: useTexture("/textures/furniture_textures_2k.png", (tex) => {
  //     tex.flipY = false;
  //     tex.anisotropy = 16;
  //     tex.minFilter = THREE.LinearMipmapLinearFilter; // For crisp scaling far away
  //     tex.magFilter = THREE.LinearFilter; // For smooth rendering close up
  //     tex.generateMipmaps = true;
  //   }),
  //   floor: useTexture("/textures/floor_textures_2k.png", (tex) => {
  //     tex.flipY = false;
  //     tex.anisotropy = 16;
  //     tex.wrapS = THREE.RepeatWrapping;
  //     tex.wrapT = THREE.RepeatWrapping;
  //   }),
  //   coffee: useTexture("/textures/coffee_cup_texture_1k.png", (tex) => {
  //     tex.flipY = false;
  //     tex.anisotropy = 16;
  //   })
  // };

  // const curtainMeshRef = useRef<THREE.Mesh | null>(null);
  // const curtainMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  const setOverlayOpen = useAudioStore((state) => state.setOverlayOpen);
  const isOverlayOpen = useAudioStore((state) => state.isOverlayOpen);

  const isInitialized = useRef(false);

  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const coffeeMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const smokeMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [smokePosition, setSmokePosition] = useState<THREE.Vector3 | null>(
    null
  );

  const dustParticlesRef = useRef<THREE.Points | null>(null);

  // 1. Extract and compute the physical boundaries of the curtain mesh geometry dynamically
  const bounds = useMemo(() => {
    // Look up your curtain node name safely
    const curtainNode = Object.values(gltf.nodes).find(
      (node: any) =>
        node.isMesh &&
        (node.name.toLowerCase() === "fur_curtains" ||
          node.name.toLowerCase().includes("curtain"))
    ) as THREE.Mesh | undefined;

    if (curtainNode && curtainNode.geometry) {
      curtainNode.geometry.computeBoundingBox();
      const bbox = curtainNode.geometry.boundingBox;
      if (bbox) {
        return {
          minY: bbox.min.y,
          maxY: bbox.max.y,
          minZ: bbox.min.z,
          maxZ: bbox.max.z
        };
      }
    }
    // Safe fallbacks if bounding box data is not evaluated instantly
    return { minY: 0.0, maxY: 2.5, minZ: -1.0, maxZ: 1.0 };
  }, [gltf.nodes]);

  // 2. Build the unified stable reference matrix for uniforms
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uWindSpeed: { value: 1.8 },
    uWindStrength: { value: 0.25 }, // Tweak this if displacement is too aggressive/subtle
    uTexture: { value: null as THREE.Texture | null }, // Will assign conditionally per mesh during map sequence
    uMinY: { value: bounds.minY },
    uMaxY: { value: bounds.maxY },
    uMinZ: { value: bounds.minZ },
    uMaxZ: { value: bounds.maxZ }
  });

  const perlinTexture = useTexture("/textures/perlin.png");

  useMemo(() => {
    perlinTexture.wrapS = THREE.RepeatWrapping;
    perlinTexture.wrapT = THREE.RepeatWrapping;
    perlinTexture.anisotropy = 8;
  }, [perlinTexture]);

  useEffect(() => {
    if (perlinTexture) {
      perlinTexture.wrapS = THREE.RepeatWrapping;
      perlinTexture.wrapT = THREE.RepeatWrapping;
      perlinTexture.anisotropy = 8;
      perlinTexture.needsUpdate = true; // Signals the GPU to re-upload the updated wrap states
    }
  }, [perlinTexture]);

  const godRayUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: perlinTexture },
      uColor: { value: new THREE.Color("#fffaed") },
      uOpacity: { value: 0.5 }
    }),
    [perlinTexture]
  );

  const particleUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#fffaed") },
      uOpacity: { value: 0.5 },
      uPointTexture: { value: null as THREE.CanvasTexture | null }
    }),
    []
  );

  const tvMesh = useRef<THREE.Mesh<any, any, any>>(null);

  useEffect(() => {
    if (!gltf || isInitialized.current) return;

    Object.entries(bakedTextures).forEach(([key, texture]) => {
      if (key === "gen" || key === "fur" || key === "floor") {
        texture.colorSpace = THREE.SRGBColorSpace;
      } else {
        texture.colorSpace = THREE.NoColorSpace;
      }
      texture.needsUpdate = true;
    });

    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const geometry = child.geometry;

        if (!geometry.attributes.uv && !geometry.attributes.uv2) {
          child.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
          return;
        }

        const meshName = child.name.toLowerCase();

        console.log("meshName", meshName);

        const nameParts = child.name.split("_");
        let prefix = nameParts[0] ? nameParts[0].toLowerCase() : "gen";

        if (child.name.toLowerCase() === "gen_floor") {
          prefix = "floor";
        }
        if (child.name.toLowerCase() === "fur_cornice_-_74_v2003") {
          prefix = "carnice";
        }

        if (
          child.name.toLowerCase() === "coffee" ||
          child.name.toLowerCase() === "mug"
        ) {
          prefix = "coffee";
        }

        const currentBakedTexture = bakedTextures[prefix];
        const textureToApply = currentBakedTexture || bakedTextures.gen;

        if (meshName === "godray_mesh") {
          child.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: godRayUniforms, // All duplicate meshes safely share these instructions
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide
          });
          child.material.needsUpdate = true;
          return;
        }

        if (meshName === "godray_particles_mesh") {
          // 1. Build the safe procedural dot canvas texture
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

          // 2. Map the shader uniforms
          const particleMaterial = new THREE.ShaderMaterial({
            vertexShader: particleVertexShader,
            fragmentShader: particleFragmentShader,
            uniforms: {
              uTime: { value: 0 },
              uColor: { value: new THREE.Color("#fffaed") },
              uOpacity: { value: 0.7 }, // Boost opacity slightly for crisp viewing
              uPointTexture: { value: pTexture }
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
          });

          // 3. Sample coordinates in CLEAN Local Mesh Space
          const particleCount = 70;
          const pGeometry = new THREE.BufferGeometry();
          const positions = new Float32Array(particleCount * 3);

          // 1. Create a brand new array to hold unique, random speeds for each speck
          const randomSpeeds = new Float32Array(particleCount);

          const sampler = new MeshSurfaceSampler(child).build();
          const tempLocalPosition = new THREE.Vector3();

          for (let i = 0; i < particleCount; i++) {
            sampler.sample(tempLocalPosition);
            positions[i * 3] = tempLocalPosition.x;
            positions[i * 3 + 1] = tempLocalPosition.y;
            positions[i * 3 + 2] = tempLocalPosition.z;

            // 2. Generate a highly randomized speed variation factor (e.g., between 0.3 and 1.3)
            randomSpeeds[i] = 0.1 + Math.random() * 0.4;
          }

          pGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
          );

          // 3. Bind the random speeds array as a custom shader attribute named 'aSpeed'
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

        if (prefix === "coffee" || meshName === "mug") {
          // Calculate the true global boundary metrics of the cup mesh
          child.geometry.computeBoundingBox();
          const bbox = child.geometry.boundingBox || new THREE.Box3();

          // Force world coordinates
          child.updateMatrixWorld(true);

          // Get the world position of the mug
          const worldPosition = new THREE.Vector3();
          child.getWorldPosition(worldPosition);

          // Get the world scale
          const worldScale = new THREE.Vector3();
          child.getWorldScale(worldScale);

          // Calculate local top center relative to the mug's pivot
          const localTopCenter = new THREE.Vector3(
            (bbox.max.x + bbox.min.x) * 0.5,
            bbox.max.y,
            (bbox.max.z + bbox.min.z) * 0.5
          );

          // Apply only rotation (not scale or position) to the local top center
          const worldQuaternion = new THREE.Quaternion();
          child.getWorldQuaternion(worldQuaternion);
          localTopCenter.applyQuaternion(worldQuaternion);

          // Scale the offset by the world scale
          localTopCenter.multiply(worldScale);

          // Add to world position
          const finalPosition = worldPosition.clone().add(localTopCenter);

          setSmokePosition(finalPosition);

          // Apply standard unlit texture layout
          const bakedCupTexture = textureToApply.clone();
          bakedCupTexture.channel = 1;
          child.material = new THREE.MeshBasicMaterial({
            map: bakedCupTexture
          });
          return;
        }

        // if (meshName === "")

        // --- UNLIT BAKED TEXTURE ASSIGNMENT MATRIX ---
        if (prefix === "sofa") {
          child.material = new THREE.MeshBasicMaterial({ map: textureToApply });
        } else if (prefix === "floor") {
          child.material = new THREE.MeshBasicMaterial({ map: textureToApply });
        } else if (prefix === "carnice") {
          child.material = new THREE.MeshBasicMaterial({ map: textureToApply });
        }
        //   else if (prefix === "coffee") {
        //   const bakedCupTexture = textureToApply.clone();
        //   bakedCupTexture.channel = 1;
        //   child.material = new THREE.MeshBasicMaterial({
        //     map: bakedCupTexture
        //   });
        // }
        else if (meshName === "fur_book-1" || meshName === "fur_book-2") {
          const bakedCupTexture = textureToApply.clone();

          bakedCupTexture.channel = 1;
          child.material = new THREE.MeshBasicMaterial({
            map: bakedCupTexture
          });
        } else if (meshName === "gen_outdoor") {
          const bakedCupTexture = textureToApply.clone();

          bakedCupTexture.channel = 1;
          child.material = new THREE.MeshBasicMaterial({
            map: bakedCupTexture,
            side: THREE.DoubleSide
          });
        } else if (meshName === "fur_tv") {
          const bakedCupTexture = textureToApply.clone();
          bakedCupTexture.channel = 1;
          child.material = new THREE.MeshBasicMaterial({
            map: bakedCupTexture,
            transparent: true,
            opacity: 1,
            depthWrite: true
          });

          tvMesh.current = child;
        } else if (meshName === "fur_macbook_top") {
          const bakedCupTexture = textureToApply.clone();
          bakedCupTexture.channel = 1;
          child.material = new THREE.MeshBasicMaterial({
            map: bakedCupTexture
          });
        } else if (child.name.toLowerCase() === "fur_table") {
          child.material = new THREE.MeshBasicMaterial({ map: textureToApply });
        } else if (child.name.toLowerCase() === "gen_balcony") {
          child.material = new THREE.MeshBasicMaterial({ map: textureToApply });
        } else if (child.name.toLowerCase() === "fur_liquid_marble") {
          child.material = new THREE.MeshBasicMaterial({ map: textureToApply });
        } else {
          // 🔴 FIXED: Default fallback now uses MeshBasicMaterial to completely bypass lighting engines
          child.material = new THREE.MeshBasicMaterial({
            map: textureToApply
          });
        }

        if (geometry.attributes.color) geometry.deleteAttribute("color");
        geometry.computeVertexNormals();

        // 🔴 SHADOW MAP ATTACHMENTS REMOVED FOR MAXIMUM PERFORMANCE
        child.material.needsUpdate = true;
      }
    });

    isInitialized.current = true;
    console.log(
      "%c 🚀 PURE UNLIT BAKED PERFORMANCE LAYER CONFIGURED!",
      "background: #10b981; color: #fff; font-weight: bold; padding: 4px;"
    );
  }, [gltf.scene, bakedTextures]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // Sync continuous timeline parameters into your visible shader uniforms
    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.uTime.value = elapsed;
    }

    // if (curtainMeshRef.current) {
    //   curtainMeshRef.current.updateMatrix();
    //   curtainMeshRef.current.updateMatrixWorld(true);
    // }

    if (godRayUniforms) {
      godRayUniforms.uTime.value = elapsed;
    }

    if (dustParticlesRef.current) {
      const pointsMesh = dustParticlesRef.current;

      // Cast the material to a ShaderMaterial to access uniforms safely
      const particleMaterial = pointsMesh.material as THREE.ShaderMaterial;

      if (particleMaterial.uniforms && particleMaterial.uniforms.uTime) {
        // Feed the active clock runtime directly into the GPU shader math
        particleMaterial.uniforms.uTime.value = elapsed;
      }
    }

    if (coffeeMaterialRef.current) {
      coffeeMaterialRef.current.uniforms.uTime.value = elapsed;
    }
    if (smokeMaterialRef.current && smokeMaterialRef.current.uniforms.uTime) {
      smokeMaterialRef.current.uniforms.uTime.value = elapsed;
    }
  });

  const smokeGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1, 1, 16, 64);
    geo.translate(0, 0.5, 0); // Pin origin to the bottom center
    geo.scale(0.03, 0.1, 0.03);
    return geo;
    // const geo = new THREE.PlaneGeometry(0.02, 0.1);
    // geo.translate(0, 0.07, 0); // Pin origin coordinates to the bottom edge
    // return geo;
  }, []);

  return (
    <group>
      {/* Centering primitive handles the model placement layout safely */}
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
      {/* ☕ REACTIVE COFFEE SMOKE CARD MESH */}
      {smokePosition && (
        <mesh geometry={smokeGeometry} position={smokePosition}>
          <shaderMaterial
            ref={smokeMaterialRef}
            vertexShader={coffeeVertexShader}
            fragmentShader={coffeeFragmentShader}
            uniforms={{
              uTime: { value: 0 },
              uPerlinTexture: { value: perlinTexture } // ← MISSING THIS
            }}
            side={THREE.DoubleSide}
            transparent={true} // Force solid rendering to stay visible in FBO pass
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("/models/final.glb");
