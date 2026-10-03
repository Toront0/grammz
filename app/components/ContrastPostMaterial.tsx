import * as THREE from "three";

export const ContrastPostMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uGlobalBlackout: { value: 1.0 },
    uTexture: { value: null }, // Points to our high-fidelity FBO scene texture
    uAspect: { value: 1.0 }, // Dynamic viewport aspect ratio
    uIntroDarkness: { value: 1.0 }, // 🚀 YOUR MAGIC FACTOR: 0.0 is black, 1.0 is full brightness
    uContrast: { value: 1.1 } // Slight contrast crunch for premium depth
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uAspect; 
    uniform float uIntroDarkness;
    uniform float uContrast;
    varying vec2 vUv;

    void main() {
      // 1. YOUR ORIGINAL GEOMETRIC SLANT LOGIC
      // Keeps the underlying layout composition styling completely intact
      float slantAngle = 0.5;
      float slantedUv = vUv.y + (vUv.x * slantAngle / uAspect);
      
      // 2. Sample the raw texture pixel from your baked unlit FBO buffer
      vec4 sceneColor = texture2D(uTexture, vUv);
      vec3 finalColor = sceneColor.rgb;

      // 3. Apply a subtle contrast curve to make sure blacks look deep and luxury
      finalColor = pow(max(finalColor, vec3(0.0)), vec3(uContrast));

      // 4. YOUR ORIGINAL LIGHT INTEGRATION MULTIPLIER
      // Multiplies RGB channels by your darkness factor for beautiful fades
      finalColor = finalColor * uIntroDarkness;
      
      gl_FragColor = vec4(finalColor, sceneColor.a);
    }
  `
});
