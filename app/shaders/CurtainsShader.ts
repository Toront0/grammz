export const curtainShaderGlobals = `
  uniform float uTime;
  uniform float uWindSpeed;
  uniform float uWindStrength;
  uniform float uMinY;
  uniform float uMaxY;
  uniform float uMinZ;
  uniform float uMaxZ;

  float noise(float x) {
    return fract(sin(x * 12.9898) * 43758.5453123);
  }

  float smoothNoise(float x) {
    float i = floor(x);
    float f = fract(x);
    float u = f * f * (3.0 - 2.0 * f); 
    return mix(noise(i), noise(i + 1.0), u);
  }
`;

export const curtainDeformationLogic = `
  // 1. Percentage grid system
  float pctY = (position.y - uMinY) / (uMaxY - uMinY); 
  float pctZ = (position.z - uMinZ) / (uMaxZ - uMinZ); 

  // 2. Vertical Anchor: Both effects only happen on the bottom 50%
  float verticalInfluence = smoothstep(0.8, 0.0, pctY);

  // 3. PROFILE 1: THE WINDOW GUST CORNER (Left 40%)
  float gustHorizontal = smoothstep(0.4, 1.0, pctZ);
  float gustInfluence = verticalInfluence * gustHorizontal;
  
  float slowTime = uTime * (uWindSpeed * 0.4);
  float calmWindProfile = smoothNoise(slowTime) * uWindStrength;
  float fabricSway = sin(position.y * 2.0 + uTime * (uWindSpeed * 0.5)) * 0.02 * uWindStrength;
  
  float totalGustForce = (calmWindProfile + fabricSway) * gustInfluence;

  // 4. PROFILE 2: THE AMBIENT IDLE SWAY (Remaining 60%)
  float ambientHorizontal = smoothstep(0.4, 0.0, pctZ);
  float ambientInfluence = verticalInfluence * ambientHorizontal;
  
  float staticIdleWave = sin(uTime * (uWindSpeed * 0.4) + position.z * 2.0) * (uWindStrength * 0.15);
  float totalAmbientForce = staticIdleWave * ambientInfluence;

  // 5. MODIFY THE INTERNAL TRANSFORMED POSITION VARIABLE
  transformed.x += totalGustForce + totalAmbientForce;
`;

export const CurtainVertexShader = `
  ${curtainShaderGlobals}
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 transformed = position; 

    ${curtainDeformationLogic}
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

export const CurtainFragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  
  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    gl_FragColor = texColor;
  }
`;
