import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

/**
 * AegisShield — the typed, instrument-driven sibling of the brief's verbatim
 * `shield-shader.tsx` drop-in.
 *
 * It runs the EXACT same hex-sphere fragment shader (a 100-step volumetric
 * accumulation that projects a mirrored hex lattice onto a sphere distortion
 * and tanh-tonemaps the result), but every magic constant baked into the
 * original one-liner is promoted to a live uniform and surfaced as a prop:
 *
 *   original literal            ->  prop / uniform
 *   ----------------------------------------------------------------
 *   p /= .2 + sqrt(z) * .3      ->  domeBias / curve     (uDomeBias, uCurve)
 *   p.x = p.x / .9              ->  hexScale             (uHexScale)
 *   p.y += ... + t * .2         ->  drift                (uDrift)
 *   v.x * 1.5                   ->  hexEdge              (uHexEdge)
 *   vec4(2.,3.,5.,1.) / 2e3     ->  tint / gain          (uTint, uGain)
 *   i * .09                     ->  falloff              (uFalloff)
 *
 * Two extras are layered on for the deflector-array framing, both of which
 * default to no-ops so the look matches the brief at default settings:
 *   - uMouse / uImpact: a soft radial brightening that tracks the cursor, so a
 *     pointer over the dome reads as an "impact" lighting the shield where it
 *     is struck.
 *   - uPaused / a frozen clock: the FREEZE control in the console.
 *
 * The component exposes an `onFrame` callback that reports the shield's exact
 * per-frame state (clock, fps, charge, the live impact coordinate) so the
 * surrounding console can read telemetry straight off the GPU loop instead of
 * faking it.
 */

export interface ShieldUniformState {
  /** Sphere projection bias — original `.2`. */
  domeBias: number;
  /** Sphere curvature — original `.3`. */
  curve: number;
  /** Hex cell scale — original `/ .9` (passed as the divisor). */
  hexScale: number;
  /** Lattice drift speed — original `t * .2`. */
  drift: number;
  /** Hex edge anisotropy — original `v.x * 1.5`. */
  hexEdge: number;
  /** Per-step accumulation gain — original `/ 2e3` denominator scale. */
  gain: number;
  /** Outward depth falloff — original `i * .09`. */
  falloff: number;
  /** Arc tint (the `vec4(2,3,5)` weighting, normalized to a colour). */
  tint: [number, number, number];
}

export interface ShieldFrameState extends ShieldUniformState {
  /** Seconds on the shield clock (frozen value while paused). */
  time: number;
  /** Measured frames per second. */
  fps: number;
  /** Cursor impact point in 0..1 viewport space (y up). */
  impact: { x: number; y: number };
  /** 0..1 impact strength (how hard the cursor is "striking" the dome). */
  charge: number;
}

export interface AegisShieldProps extends Partial<ShieldUniformState> {
  /** Freeze the shield clock in place. */
  paused?: boolean;
  /** How strongly the cursor lights the dome on contact (0 = inert). */
  impactStrength?: number;
  /** Per-frame telemetry tap. */
  onFrame?: (s: ShieldFrameState) => void;
  className?: string;
}

const DEFAULTS: ShieldUniformState = {
  domeBias: 0.2,
  curve: 0.3,
  hexScale: 0.9,
  drift: 0.2,
  hexEdge: 1.5,
  gain: 1.0, // multiplies the original 1/2e3
  falloff: 0.09,
  tint: [2.0, 3.0, 5.0],
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Same algorithm as the brief's `mainImage`, with every baked constant lifted
// to a uniform and a soft cursor "impact" term added (zero by default).
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3  iResolution;
  uniform float iTime;
  uniform vec2  uMouse;      // 0..1 viewport, y up
  uniform float uImpact;     // cursor light strength
  uniform float uDomeBias;   // .2
  uniform float uCurve;      // .3
  uniform float uHexScale;   // .9 divisor
  uniform float uDrift;      // .2
  uniform float uHexEdge;    // 1.5
  uniform float uGain;       // x (1/2e3)
  uniform float uFalloff;    // .09
  uniform vec3  uTint;       // (2,3,5)

  void mainImage(out vec4 O, vec2 I)
  {
      float i, z, t = iTime;
      O *= i;
      for (i = 0.0; i < 1.0; i += 0.01) {
          vec2 v = iResolution.xy;
          // Center and scale outward (unchanged from the brief).
          vec2 p = (I + I - v) / v.y * i;
          // Sphere distortion -> z; bias + curvature are now uniforms.
          p /= uDomeBias + sqrt(z = max(1.0 - dot(p, p), 0.0)) * uCurve;
          // Hex offset; the /.9 cell scale and the t*.2 drift are uniforms.
          p.y += fract(ceil(p.x = p.x / uHexScale + t) * 0.5) + t * uDrift;
          // Mirror quadrants.
          v = abs(fract(p) - 0.5);
          // Accumulate; tint, gain, edge anisotropy and falloff are uniforms.
          O += vec4(uTint, 1.0) * (uGain / 2e3) * z /
               (abs(max(v.x * uHexEdge + v, v + v).y - 1.0) + 0.1 - i * uFalloff);
      }
      O = tanh(O * O);

      // Deflector impact: a soft radial bloom under the cursor. With uImpact = 0
      // this is a no-op and the frame is identical to the brief's output.
      if (uImpact > 0.0) {
          vec2 uv = I / iResolution.xy;          // 0..1, y up (gl_FragCoord)
          float d = distance(uv, uMouse);
          float glow = exp(-d * d * 26.0) * uImpact;
          O.rgb += normalize(uTint + 1e-4) * glow * 0.9;
          O = tanh(O);
      }
  }

  void main() {
    vec4 O;
    mainImage(O, gl_FragCoord.xy);
    gl_FragColor = O;
  }
`;

function ShieldField({
  state,
  paused,
  impactStrength,
  onFrame,
}: {
  state: ShieldUniformState;
  paused: boolean;
  impactStrength: number;
  onFrame?: (s: ShieldFrameState) => void;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { size, pointer } = useThree();

  // Frozen-clock bookkeeping so FREEZE holds the exact frame it was struck on.
  const clockTime = useRef(0);
  const pausedAt = useRef(0);
  const wasPaused = useRef(false);

  // Eased pointer + measured fps + smoothed charge for telemetry.
  const smoothMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const fps = useRef(60);
  const lastT = useRef(performance.now());
  const charge = useRef(0);
  const accum = useRef(0);
  const frames = useRef(0);

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(size.width, size.height, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uImpact: { value: 0 },
      uDomeBias: { value: state.domeBias },
      uCurve: { value: state.curve },
      uHexScale: { value: state.hexScale },
      uDrift: { value: state.drift },
      uHexEdge: { value: state.hexEdge },
      uGain: { value: state.gain },
      uFalloff: { value: state.falloff },
      uTint: { value: new THREE.Vector3(...state.tint) },
    }),
    // Built once; values are mutated each frame below so changes are live and
    // never trigger a material rebuild / flash.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame(({ clock }) => {
    const mat = materialRef.current;
    if (!mat) return;
    const u = mat.uniforms;

    // --- clock with freeze ---
    const raw = clock.getElapsedTime();
    if (paused && !wasPaused.current) pausedAt.current = raw;
    if (!paused && wasPaused.current) clockTime.current -= raw - pausedAt.current;
    wasPaused.current = paused;
    const t = paused ? pausedAt.current + clockTime.current : raw + clockTime.current;
    u.iTime.value = t;

    // --- resolution ---
    (u.iResolution.value as THREE.Vector3).set(size.width, size.height, 1);

    // --- pointer (r3f pointer is -1..1; convert to 0..1, y up) ---
    const mx = pointer.x * 0.5 + 0.5;
    const my = pointer.y * 0.5 + 0.5;
    const inView = pointer.x !== 0 || pointer.y !== 0;
    const target = charge.current;
    // Charge climbs while the pointer sits near the dome centre, decays otherwise.
    const distToCenter = Math.hypot(mx - 0.5, my - 0.5);
    const want = inView ? Math.max(0, 1 - distToCenter * 1.7) : 0;
    charge.current = target + (want - target) * 0.08;
    smoothMouse.current.x += (mx - smoothMouse.current.x) * 0.12;
    smoothMouse.current.y += (my - smoothMouse.current.y) * 0.12;
    (u.uMouse.value as THREE.Vector2).copy(smoothMouse.current);
    u.uImpact.value = charge.current * impactStrength;

    // --- live uniform sync (sliders) ---
    u.uDomeBias.value = state.domeBias;
    u.uCurve.value = state.curve;
    u.uHexScale.value = state.hexScale;
    u.uDrift.value = state.drift;
    u.uHexEdge.value = state.hexEdge;
    u.uGain.value = state.gain;
    u.uFalloff.value = state.falloff;
    (u.uTint.value as THREE.Vector3).set(...state.tint);

    // --- fps (smoothed) ---
    const now = performance.now();
    const dt = now - lastT.current;
    lastT.current = now;
    if (dt > 0) fps.current += (1000 / dt - fps.current) * 0.1;

    // Report telemetry at ~12 Hz so React state churn stays cheap.
    accum.current += dt;
    frames.current += 1;
    if (onFrame && accum.current >= 80) {
      accum.current = 0;
      onFrame({
        ...state,
        time: t,
        fps: fps.current,
        impact: { x: smoothMouse.current.x, y: smoothMouse.current.y },
        charge: charge.current,
      });
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        depthWrite={false}
        depthTest={false}
        transparent={false}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export function AegisShield({
  paused = false,
  impactStrength = 1.0,
  onFrame,
  className,
  ...overrides
}: AegisShieldProps) {
  const state: ShieldUniformState = { ...DEFAULTS, ...overrides };
  return (
    <div className={cn("relative h-full w-full", className)}>
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }} dpr={[1, 2]}>
        <color attach="background" args={["#000000"]} />
        <ShieldField
          state={state}
          paused={paused}
          impactStrength={impactStrength}
          onFrame={onFrame}
        />
      </Canvas>
    </div>
  );
}

export default AegisShield;
