// /hooks/useCustomModelTextures.ts
import { useKTX2, useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

export function useCustomModelTextures(isMobile: boolean) {
  const res = isMobile ? "1k" : "2k";

  const ktxTextures = useKTX2(
    [
      `/textures_ktx2/general_textures_1k.ktx2`,
      `/textures_ktx2/sofa_textures_1k.ktx2`,
      `/textures_ktx2/furniture_textures_${res}.ktx2`,
      `/textures_ktx2/floor_textures_1k.ktx2`,
      `/textures_ktx2/coffee_cup_textures_1k.ktx2`,
      `/textures_ktx2/perlin.ktx2`
    ],
    "/basis/"
  );

  // const perlinTexture = useTexture("/textures/perlin.png");

  const bakedTextures = useMemo(() => {
    const [genTex, sofaTex, furTex, floorTex, coffeeTex, perlinTex] =
      ktxTextures;
    const anisotropyValue = isMobile ? 4 : 16;

    return {
      gen: Object.assign(genTex, {
        flipY: false,
        anisotropy: anisotropyValue,
        colorSpace: THREE.SRGBColorSpace
      }),
      sofa: Object.assign(sofaTex, {
        flipY: false,
        anisotropy: anisotropyValue,
        colorSpace: THREE.SRGBColorSpace
      }),
      fur: Object.assign(furTex, {
        flipY: false,
        anisotropy: anisotropyValue,
        colorSpace: THREE.SRGBColorSpace
      }),
      floor: Object.assign(floorTex, {
        flipY: false,
        anisotropy: anisotropyValue,
        colorSpace: THREE.SRGBColorSpace,
        wrapS: THREE.RepeatWrapping,
        wrapT: THREE.RepeatWrapping
      }),
      coffee: Object.assign(coffeeTex, {
        flipY: false,
        anisotropy: anisotropyValue,
        colorSpace: THREE.SRGBColorSpace,
        wrapS: THREE.RepeatWrapping,
        wrapT: THREE.RepeatWrapping
      }),
      perlin: Object.assign(perlinTex, {
        flipY: false,
        anisotropy: 4,
        colorSpace: THREE.NoColorSpace,
        wrapS: THREE.RepeatWrapping,
        wrapT: THREE.RepeatWrapping
      })
    };
  }, [ktxTextures, isMobile]);

  useEffect(() => {
    if (bakedTextures.perlin) {
      bakedTextures.perlin.wrapS = THREE.RepeatWrapping;
      bakedTextures.perlin.wrapT = THREE.RepeatWrapping;
      bakedTextures.perlin.anisotropy = 8;
      bakedTextures.perlin.needsUpdate = true;
    }
  }, [bakedTextures.perlin]);

  return { bakedTextures };
}
