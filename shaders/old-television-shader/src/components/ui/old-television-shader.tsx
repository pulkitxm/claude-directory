"use client";

/**
 * old-television-shader.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * The component the brief asked to integrate, dropped into shadcn's
 * `@/components/ui`. The original `WaveShaderMaterial` (a flowing-sine + value/
 * fractal-noise field that mixes `uColorA` → `uColorB`) is preserved VERBATIM in
 * its GLSL — what reads as bright/dark static is exactly an analog TV picture
 * tube, which is why the file is named the way it is.
 *
 * Around that fixed shader this adds a typed, controllable surface so it can be
 * driven as a real product component instead of a hard-coded full-screen demo:
 *
 *   • props for the two mix colors, wave amplitude, grain, brightness pulse,
 *     mouse reactivity and a `paused` switch (the brief: "what props will be
 *     passed to this component?" / "state-management requirements?")
 *   • an `onSample(luminance)` callback that reads the centre pixel straight off
 *     the GPU each frame, so the surrounding UI can show *real* signal state
 *     rather than faked numbers
 *   • a `<PolishedShader />` default export that is the brief's original
 *     drop-in, now just a thin preset over `<OldTelevisionShader />`
 *
 * Zero assets, fully procedural; renders on a single full-screen R3F quad.
 */

import { useEffect, useMemo, useRef } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  type MaterialNode,
} from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/* ── Custom shader material with smooth animations ──────────────────────────
   Uniforms and the vertex/fragment program below are the brief's component,
   kept byte-for-byte except for three additive uniforms (uWave / uGrain /
   uBright) that promote the previously hard-coded constants to props. The
   original behaviour is the default (uWave 1, uGrain 1, uBright 1). */
const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorA: new THREE.Color("#ffffff"),
    uColorB: new THREE.Color("#000000"),
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
    uWave: 1,
    uGrain: 1,
    uBright: 1,
  },
  // Vertex shader
  /* glsl */ `
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  /* glsl */ `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform float uWave;
    uniform float uGrain;
    uniform float uBright;

    varying vec2 vUv;
    varying vec3 vPosition;

    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    // Fractal noise for more complex texture
    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;

      for (int i = 0; i < 4; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    // Smooth interpolation
    float smoothNoise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 st = vUv;

      // Create flowing waves (amplitude scaled by uWave)
      float wave1 = sin(st.x * 8.0 + uTime * 2.0) * 0.1 * uWave;
      float wave2 = sin(st.y * 6.0 + uTime * 1.5) * 0.1 * uWave;
      float wave3 = sin((st.x + st.y) * 4.0 + uTime * 3.0) * 0.05 * uWave;

      // Add mouse interaction
      vec2 mouseInfluence = (uMouse - 0.5) * 0.3;
      st += mouseInfluence;

      // Combine waves
      float waves = wave1 + wave2 + wave3;

      float noiseValue = smoothNoise(st * 3.0 + uTime * 0.5);
      float fbmNoise = fbm(st * 2.0 + uTime * 0.3);
      float combinedNoise = mix(noiseValue, fbmNoise, 0.6) * uGrain;

      // Mix colors based on waves and noise
      float mixFactor = (waves + combinedNoise + 1.0) * 0.5;
      mixFactor = smoothstep(0.2, 0.8, mixFactor);

      vec3 color = mix(uColorA, uColorB, mixFactor);

      float glow = 1.0 - distance(st, vec2(0.5)) * 1.2;
      glow = smoothstep(0.0, 1.0, glow);
      glow += combinedNoise * 0.2;

      color += glow * 0.15;

      // Add time-based brightness variation
      float brightness = 0.9 + sin(uTime * 0.8) * 0.1 * uBright;
      color *= brightness;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
);

// Extend Three.js with our custom material
extend({ WaveShaderMaterial });

/* R3F v8 JSX typing for the custom element. (Replaces the brief's
   `declare global { namespace JSX … any }` with a fully-typed fiber-native
   augmentation: JSX.IntrinsicElements already extends ThreeElements, so adding
   the element here makes <waveShaderMaterial /> type-checked, ref-typed, and
   aware of every uniform prop.) */
type WaveShaderUniforms = {
  uTime: number;
  uColorA: THREE.Color;
  uColorB: THREE.Color;
  uMouse: THREE.Vector2;
  uResolution: THREE.Vector2;
  uWave: number;
  uGrain: number;
  uBright: number;
};

type WaveShaderMaterialImpl = THREE.ShaderMaterial & WaveShaderUniforms;

declare module "@react-three/fiber" {
  interface ThreeElements {
    waveShaderMaterial: MaterialNode<
      WaveShaderMaterialImpl,
      Partial<WaveShaderUniforms>
    >;
  }
}

export interface OldTelevisionShaderProps {
  /** Bright phosphor color the static mixes toward. Default `#ffffff`. */
  colorA?: string;
  /** Dark color of the tube between scanlines. Default `#000000`. */
  colorB?: string;
  /** Wave-displacement amplitude (the rolling picture). `0` = flat. Default `1`. */
  waveIntensity?: number;
  /** Procedural grain / snow strength. Default `1`. */
  grainIntensity?: number;
  /** Strength of the slow brightness breathing. Default `1`. */
  brightnessPulse?: number;
  /** How strongly the cursor tugs the field (0–1 lerp factor). Default `0.05`. */
  mouseInfluence?: number;
  /** Freeze the animation clock (a held frame). Default `false`. */
  paused?: boolean;
  /**
   * Per-frame readback of the tube's centre-pixel luminance (0–1), throttled by
   * `sampleEveryMs`. Lets a parent HUD show genuine signal strength.
   */
  onSample?: (luminance: number) => void;
  /** Throttle for `onSample`, in ms. Default `120`. */
  sampleEveryMs?: number;
  className?: string;
}

interface ShaderPlaneProps {
  colorA: string;
  colorB: string;
  waveIntensity: number;
  grainIntensity: number;
  brightnessPulse: number;
  mouseInfluence: number;
  paused: boolean;
  onSample?: (luminance: number) => void;
  sampleEveryMs: number;
}

function ShaderPlane({
  colorA,
  colorB,
  waveIntensity,
  grainIntensity,
  brightnessPulse,
  mouseInfluence,
  paused,
  onSample,
  sampleEveryMs,
}: ShaderPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<WaveShaderMaterialImpl>(null);
  const { gl } = useThree();

  // Mouse position state (normalized 0–1, y-up to match the brief).
  const mouse = useRef({ x: 0.5, y: 0.5 });

  // Frozen-clock support: track elapsed time ourselves so `paused` can hold it.
  const clockRef = useRef(0);
  const lastSample = useRef(0);
  const readPixel = useMemo(() => new Uint8Array(4), []);

  // Set up mouse listener. (The brief wired this through `useMemo`, which never
  // actually runs a cleanup; an effect is the correct lifecycle for it.)
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX / window.innerWidth;
      mouse.current.y = 1 - event.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Keep the color uniforms in sync with props without rebuilding the material.
  useEffect(() => {
    if (materialRef.current) materialRef.current.uColorA.set(colorA);
  }, [colorA]);
  useEffect(() => {
    if (materialRef.current) materialRef.current.uColorB.set(colorB);
  }, [colorB]);

  useFrame((state, delta) => {
    const m = materialRef.current;
    if (!m) return;

    if (!paused) clockRef.current += delta;

    // Update time uniform for animation
    m.uTime = clockRef.current;

    // Scalar prop uniforms
    m.uWave = waveIntensity;
    m.uGrain = grainIntensity;
    m.uBright = brightnessPulse;

    // Smooth mouse interpolation
    m.uMouse.lerp(
      new THREE.Vector2(mouse.current.x, mouse.current.y),
      mouseInfluence,
    );

    // Update resolution
    m.uResolution.set(window.innerWidth, window.innerHeight);

    // Read the tube's centre pixel straight off the framebuffer so the host UI
    // can report true signal luminance. Throttled to keep it cheap.
    if (onSample) {
      const now = state.clock.elapsedTime * 1000;
      if (now - lastSample.current >= sampleEveryMs) {
        lastSample.current = now;
        const ctx = gl.getContext();
        const cx = Math.floor(ctx.drawingBufferWidth / 2);
        const cy = Math.floor(ctx.drawingBufferHeight / 2);
        ctx.readPixels(
          cx,
          cy,
          1,
          1,
          ctx.RGBA,
          ctx.UNSIGNED_BYTE,
          readPixel,
        );
        const lum =
          (0.2126 * readPixel[0] +
            0.7152 * readPixel[1] +
            0.0722 * readPixel[2]) /
          255;
        onSample(lum);
      }
    }
  });

  return (
    <mesh ref={meshRef} scale={[4, 4, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <waveShaderMaterial ref={materialRef} key={WaveShaderMaterial.key} />
    </mesh>
  );
}

/**
 * OldTelevisionShader — the configurable component. Renders the brief's shader
 * full-bleed inside its container with the original procedural film-grain
 * overlay on top.
 */
export function OldTelevisionShader({
  colorA = "#ffffff",
  colorB = "#000000",
  waveIntensity = 1,
  grainIntensity = 1,
  brightnessPulse = 1,
  mouseInfluence = 0.05,
  paused = false,
  onSample,
  sampleEveryMs = 120,
  className,
}: OldTelevisionShaderProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-background",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        className="absolute inset-0"
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <ShaderPlane
          colorA={colorA}
          colorB={colorB}
          waveIntensity={waveIntensity}
          grainIntensity={grainIntensity}
          brightnessPulse={brightnessPulse}
          mouseInfluence={mouseInfluence}
          paused={paused}
          onSample={onSample}
          sampleEveryMs={sampleEveryMs}
        />
      </Canvas>
    </div>
  );
}

/**
 * PolishedShader — the brief's original default export, preserved as a drop-in.
 * It is now a thin, full-screen preset over <OldTelevisionShader />, so the
 * exact `import PolishedShader from "@/components/ui/old-television-shader"`
 * usage from the brief's `demo.tsx` still works unchanged.
 */
export default function PolishedShader() {
  return <OldTelevisionShader className="h-screen" />;
}
