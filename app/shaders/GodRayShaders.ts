// /shaders/GodRayShaders.ts
export const godRayVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const godRayFragmentShader = `
  uniform sampler2D uTexture;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    float transitionProgress = smoothstep(0.4, 0.9, vUv.y);
    float dynamicYScale1 = mix(2.0, 4.0, transitionProgress);
    vec2 softUv = vec2(vUv.x * 0.15, vUv.y * dynamicYScale1);
    softUv.x -= uTime * 0.005;
    softUv.y += uTime * 0.005;
    float softNoise = texture2D(uTexture, softUv).r;

    float dynamicYScale2 = mix(4.5, 12.0, transitionProgress);
    vec2 sharpUv = vec2(vUv.x * 0.15, vUv.y * dynamicYScale2);
    sharpUv.x -= uTime * 0.005;
    sharpUv.y += uTime * 0.005;
    float sharpNoise = texture2D(uTexture, sharpUv).r;
    float rareSharpNoise = pow(sharpNoise, 4.0);

    float combinedNoise = softNoise + (rareSharpNoise * 0.01);

    float verticalFade   = smoothstep(0.0, 0.05, vUv.y) * (1.0 - smoothstep(0.05, 0.9, vUv.y));
    float horizontalFade = smoothstep(0.0, 0.22, vUv.x) * (1.0 - smoothstep(0.78, 1.0, vUv.x));
    float edgeMask = verticalFade * horizontalFade;

    gl_FragColor = vec4(uColor, combinedNoise * edgeMask * uOpacity);
  }
`;

export const particleVertexShader = `
  uniform float uTime;
  attribute float aSpeed; 
  varying float vAlphaFade;
  varying float vOpacityVariation;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    vec3 pos = position;
    float uniqueId = position.x + position.y + position.z;
    float pPhase = hash(uniqueId + 2.0) * 100.0;
    float timeScale = (uTime * 0.4) * aSpeed + pPhase;

    pos.y += sin(timeScale) * 0.2; 
    pos.x += cos(timeScale * 1.4 + 1.0) * 0.08; 
    pos.z += sin(timeScale * 1.1 + 2.0) * 0.08;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vAlphaFade = 1.0; 
    gl_PointSize = 2.0 + hash(uniqueId + 3.0) * 3.0; 
    vOpacityVariation = 0.4 + hash(uniqueId + 4.0) * 0.5;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const particleFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform sampler2D uPointTexture;
  varying float vAlphaFade;
  varying float vOpacityVariation;

  void main() {
    vec4 texColor = texture2D(uPointTexture, gl_PointCoord);
    float finalAlpha = texColor.a * vAlphaFade * uOpacity * vOpacityVariation;
    gl_FragColor = vec4(uColor, finalAlpha);
  }
`;
