export const coffeeVertexShader = `
vec2 rotate2D(vec2 value, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, s, -s, c) * value;
}

uniform float uTime;
uniform sampler2D uPerlinTexture;
varying vec2 vUv;

void main() {
  vec3 newPosition = position;

  // Twist
  float twistPerlin = texture2D(uPerlinTexture, vec2(0.5, uv.y * 0.2 - uTime * 0.05)).r;
  float angle = twistPerlin * 0.0; // Slightly lowered twist angle for stability
  newPosition.xz = rotate2D(newPosition.xz, angle);

  // Wind
  vec2 windOffset = vec2(
    texture2D(uPerlinTexture, vec2(0.25, uTime * 0.01)).r - 0.5,
    texture2D(uPerlinTexture, vec2(0.75, uTime * 0.01)).r - 0.5
  );
  windOffset *= pow(uv.y, 2.0) * 0.07;
  newPosition.xz += windOffset;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  vUv = uv;
}
`;

export const coffeeFragmentShader = `
uniform sampler2D uPerlinTexture;
uniform float uTime;
varying vec2 vUv;

void main() {
  // Smoke
  vec2 smokeUv = vUv;
  smokeUv.x *= 0.5;
  smokeUv.y *= 0.3;
  smokeUv.y -= uTime * 0.09; // Sped up smoke rise rate so it moves visibly
  
  float smoke = texture2D(uPerlinTexture, smokeUv).r;
  smoke = smoothstep(0.3, 1.0, smoke); // Relaxed threshold constraints
  
  smoke *= smoothstep(0.0, 0.1, vUv.x);
  smoke *= smoothstep(1.0, 0.9, vUv.x);
  smoke *= smoothstep(0.0, 0.1, vUv.y);
  smoke *= smoothstep(1.0, 0.4, vUv.y);

  // Final smoke transparency output configuration
  vec3 smokeColor = vec3(0.95, 0.95, 0.95); 
  gl_FragColor = vec4(smokeColor, smoke * 0.3); // Slightly boosted baseline opacity

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;
