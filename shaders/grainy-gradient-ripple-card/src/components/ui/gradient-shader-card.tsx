"use client"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef, useMemo, useImperativeHandle, forwardRef } from "react"
import * as THREE from "three"

interface Ripple {
  id: number;
  x: number;
  y: number;
  startTime: number;
}

interface GrainyGradientProps {
  ripples?: Ripple[];
  onTimeUpdate?: (time: number) => void;
}

const GrainyGradient = forwardRef<any, GrainyGradientProps>(({ ripples = [], onTimeUpdate }, ref) => {
  const mesh = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0.0 },
      iResolution: { value: new THREE.Vector3() },
      // Simplex noise uniforms
      noiseIntensity: { value: 1.55 },
      noiseScale: { value: 2.0 },
      noiseSpeed: { value: 0.15 },
      // Wave/domain warping noise uniforms
      waveNoiseIntensity: { value: 1.2 },
      waveNoiseScale1: { value: 0.5 },
      waveNoiseScale2: { value: 0.8 },
      waveNoiseScale3: { value: 1.2 },
      waveNoiseSpeed1: { value: 0.24 },
      waveNoiseSpeed2: { value: 0.2 },
      waveNoiseSpeed3: { value: 0.3 },
      // Ripple uniforms
      ripplePositions: { value: [] as number[] },
      rippleTimes: { value: [] as number[] },
      rippleCount: { value: 0 },
    }),
    [],
  )

  useFrame((state) => {
    if (mesh.current) {
      const currentTime = state.clock.getElapsedTime()
      uniforms.iTime.value = currentTime
      uniforms.iResolution.value.set(window.innerWidth, window.innerHeight, 1)

      // Call the time update callback
      if (onTimeUpdate) {
        onTimeUpdate(currentTime)
      }

      // Update ripple uniforms
      const activeRipples = ripples.filter(ripple => currentTime - ripple.startTime < 2.0) // 2 second duration
      const positions = []
      const times = []

      for (let i = 0; i < Math.min(activeRipples.length, 10); i++) { // Max 10 ripples
        const ripple = activeRipples[i]
        // Convert to normalized coordinates (-1 to 1)
        const normalizedX = (ripple.x / 800) * 2 - 1 // 800 is card width
        const normalizedY = 1 - (ripple.y / 600) * 2 // 600 is card height, flip Y
        positions.push(normalizedX, normalizedY)
        times.push(currentTime - ripple.startTime)
      }

      uniforms.ripplePositions.value = positions
      uniforms.rippleTimes.value = times
      uniforms.rippleCount.value = activeRipples.length
    }
  })

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms,
    })
  }, [uniforms])

  useImperativeHandle(ref, () => ({
    material,
    uniforms,
    getCurrentTime: () => uniforms.iTime.value
  }))

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      {material && <primitive object={material} attach="material" />}
    </mesh>
  )
})

GrainyGradient.displayName = "GrainyGradient"

export default GrainyGradient

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform vec3 iResolution;
  uniform float iTime;
  // Simplex noise uniforms
  uniform float noiseIntensity;
  uniform float noiseScale;
  uniform float noiseSpeed;
  // Wave/domain warping noise uniforms
  uniform float waveNoiseIntensity;
  uniform float waveNoiseScale1;
  uniform float waveNoiseScale2;
  uniform float waveNoiseScale3;
  uniform float waveNoiseSpeed1;
  uniform float waveNoiseSpeed2;
  uniform float waveNoiseSpeed3;
  // Ripple uniforms
  uniform float ripplePositions[20]; // Max 10 ripples * 2 coordinates
  uniform float rippleTimes[10]; // Max 10 ripples
  uniform int rippleCount;
  varying vec2 vUv;

  // Grain settings
  #define BLEND_MODE 2
  #define SPEED 2.0
  #define INTENSITY 0.075
  #define MEAN 0.0
  #define VARIANCE 0.5

  // Simple 2D noise function
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  // Gradient noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // 3D Simplex noise
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 permute(vec4 x) {
       return mod289(((x*34.0)+1.0)*x);
  }

  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  // Domain warping function with uniforms
  vec2 warp(vec2 p) {
    float n1 = noise(p * waveNoiseScale1 + vec2(iTime * waveNoiseSpeed1, 0.0));
    float n2 = noise(p * waveNoiseScale1 + vec2(0.0, iTime * waveNoiseSpeed2));

    float n3 = noise(p * waveNoiseScale2 + vec2(iTime * -waveNoiseSpeed3, iTime * waveNoiseSpeed3)) * 0.5;
    float n4 = noise(p * waveNoiseScale3 + vec2(iTime * waveNoiseSpeed3, -iTime * waveNoiseSpeed3)) * 0.3;

    return p + vec2(n1 + n3, n2 + n4) * waveNoiseIntensity;
  }

  // Simplified ripple function - single clean expanding ring
  float calculateRipples(vec2 uv) {
    float rippleEffect = 0.0;

    for (int i = 0; i < rippleCount && i < 10; i++) {
      vec2 ripplePos = vec2(ripplePositions[i * 2], ripplePositions[i * 2 + 1]);
      float rippleTime = rippleTimes[i];

      // Calculate distance from ripple center
      float dist = distance(uv, ripplePos);

      // Create single expanding ring
      float rippleRadius = rippleTime * 1.0; // Speed of expansion
      float rippleWidth = 0.05; // Thinner ring for cleaner look

      // Create a single ring using smoothstep for soft edges
      float ring = smoothstep(rippleRadius + rippleWidth, rippleRadius, dist) *
                   smoothstep(rippleRadius - rippleWidth, rippleRadius, dist);

      // Fade out over time
      float fadeOut = 1.0 - smoothstep(0.0, 2.0, rippleTime);

      // Single clean wave pattern
      float wave = sin(dist * 15.0 - rippleTime * 8.0) * 0.5 + 0.5;

      rippleEffect += ring * fadeOut * wave * 0.3;
    }

    return rippleEffect;
  }

  // Grain functions
  vec3 channel_mix(vec3 a, vec3 b, vec3 w) {
    return vec3(mix(a.r, b.r, w.r), mix(a.g, b.g, w.g), mix(a.b, b.b, w.b));
  }

  float gaussian(float z, float u, float o) {
    return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
  }

  vec3 screen(vec3 a, vec3 b, float w) {
    return mix(a, vec3(1.0) - (vec3(1.0) - a) * (vec3(1.0) - b), w);
  }

  vec3 overlay(vec3 a, vec3 b, float w) {
    return mix(a, channel_mix(
      2.0 * a * b,
      vec3(1.0) - 2.0 * (vec3(1.0) - a) * (vec3(1.0) - b),
      step(vec3(0.5), a)
    ), w);
  }

  vec3 soft_light(vec3 a, vec3 b, float w) {
    return mix(a, pow(a, pow(vec3(2.0), 2.0 * (vec3(0.5) - b))), w);
  }

  // Convert hex colors to RGB
  vec3 hexToRgb(float r, float g, float b) {
    return vec3(r / 255.0, g / 255.0, b / 255.0);
  }

  // Multi-color gradient function
  vec3 multiColorGradient(float t) {
    // Define your color palette
    vec3 colors[7];
    colors[0] = hexToRgb(250.0, 212.0, 251.0); // FAD4FB - light purple/pink
    colors[1] = hexToRgb(250.0, 200.0, 225.0); // FAC8E1 - pink
    colors[2] = hexToRgb(250.0, 182.0, 21.0);  // FAB615 - yellow/gold
    colors[3] = hexToRgb(252.0, 104.0, 30.0);  // FC681E - orange
    colors[4] = hexToRgb(13.0, 93.0, 244.0);   // 0D5DF4 - blue
    colors[5] = hexToRgb(11.0, 74.0, 187.0);   // 0B4ABB - darker blue
    colors[6] = hexToRgb(23.0, 14.0, 7.0);     // 170E07 - very dark brown/black

    // Clamp t to [0, 1]
    t = clamp(t, 0.0, 1.0);

    // Calculate which segment we're in
    float scaledT = t * 6.0; // 6 segments between 7 colors
    int index = int(floor(scaledT));
    float localT = fract(scaledT);

    // Handle edge case
    if (index >= 6) {
      return colors[6];
    }

    // Interpolate between adjacent colors
    float smoothT = smoothstep(0.0, 1.0, localT);
    return mix(colors[index], colors[index + 1], smoothT);
  }

  // Apply grain to color
  vec3 applyGrain(vec3 color, vec2 uv) {
    float t = iTime * SPEED;
    float seed = dot(uv, vec2(12.9898, 78.233));
    float grainNoise = fract(sin(seed) * 43758.5453 + t);
    grainNoise = gaussian(grainNoise, MEAN, VARIANCE * VARIANCE);

    vec3 grain = vec3(grainNoise) * (1.0 - color);
    float w = INTENSITY;

    #if BLEND_MODE == 0
    color += grain * w;
    #elif BLEND_MODE == 1
    color = screen(color, grain, w);
    #elif BLEND_MODE == 2
    color = overlay(color, grain, w);
    #elif BLEND_MODE == 3
    color = soft_light(color, grain, w);
    #elif BLEND_MODE == 4
    color = max(color, grain * w);
    #endif

    return color;
  }

  void mainImage(out vec4 O, in vec2 I) {
    vec2 uv = (I - 0.5 * iResolution.xy) / iResolution.y;

    // Apply domain warping to the UV coordinates using uniforms
    vec2 warpedUv = warp(uv);

    // Add subtle simplex noise using uniforms
    float simplexNoise = snoise(vec3(warpedUv * noiseScale, iTime * noiseSpeed)) * noiseIntensity;
    warpedUv += simplexNoise;

    // Create multiple wave patterns with different frequencies
    float phase1 = iTime * 0.6;
    float phase2 = iTime * 0.4;

    // Create arched wave by using both x and y coordinates
    float distanceFromCenter = length(warpedUv - vec2(0.0, 0.0));
    float archFactor = 1.0 - distanceFromCenter * 0.5;

    // Primary wave with arch
    float wave1 = sin(warpedUv.x * 3.0 + phase1) * 0.5 * archFactor;
    // Secondary wave with different frequency and arch
    float wave2 = sin(warpedUv.x * 5.0 - phase2) * 0.3 * archFactor;
    // Tertiary wave that creates vertical arching
    float wave3 = sin(warpedUv.y * 4.0 + phase1 * 0.7) * 0.15;

    // Add a parabolic arch effect
    float parabolicArch = -pow(warpedUv.x, 2.0) * 0.2;

    // Combine waves with breathing effect and arch
    float breathing = sin(iTime * 0.5) * 0.1 + 0.9;
    float combinedWave = (wave1 + wave2 + wave3 + parabolicArch) * breathing * 0.3;

    // Calculate ripple effects (now simplified to single clean rings)
    float ripples = calculateRipples(uv);

    // Adjust UV for vertical gradient with centered ridge and ripples
    float gradientPos = (vUv.y + combinedWave * 0.3 + ripples * 0.2);

    // Use the multi-color gradient
    float smoothGradientPos = smoothstep(0.0, 1.0, clamp(1.0 - gradientPos, 0.0, 1.0));
    vec3 color = multiColorGradient(smoothGradientPos);

    // Add subtle ripple brightness effect
    color += vec3(ripples * 0.3);

    // Apply grain effect
    O = vec4(applyGrain(color, vUv), 1.0);
  }

  void main() {
    vec2 fragCoord = vUv * iResolution.xy;
    mainImage(gl_FragColor, fragCoord);
  }
`
