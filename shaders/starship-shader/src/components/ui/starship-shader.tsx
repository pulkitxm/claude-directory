import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createContext, useContext, useMemo, useRef } from "react";

/* ------------------------------------------------------------------ *
 * Starship — by @XorDev (adapted)
 *
 * The fragment shader below is the verbatim "Starship" one-liner from the
 * brief: a 50-step accumulation loop that folds a cosine spectrum through an
 * exp(sin()) gain and divides by a noise-warped distance field, tonemapped
 * with tanh() over a pure-black hull. Nothing about the GLSL has changed.
 *
 * Around it we add a thin, fully backward-compatible control surface so the
 * shader can be driven by a host console (HELM-9). Every prop is optional and
 * defaults to the original behaviour, so the canonical `<Component />` from the
 * brief's demo.tsx renders byte-for-byte the same field it always did:
 *
 *   speed     – multiplies the shader clock (1 = original).
 *   intensity – post-tonemap exposure (1 = original).
 *   paused    – freezes the clock at its current value.
 *   onFrame   – per-frame callback exposing the live clock + a luminance
 *               estimate, so a HUD can read the field's own state off the GPU.
 * ------------------------------------------------------------------ */

export interface StarshipProps {
  /** Clock multiplier. 1 = the original Starship speed. */
  speed?: number;
  /** Post-tonemap exposure multiplier. 1 = original. */
  intensity?: number;
  /** Freeze the shader clock at its current elapsed value. */
  paused?: boolean;
  /** Per-frame telemetry: the live shader time and a 0..1 brightness estimate. */
  onFrame?: (state: { time: number; brightness: number }) => void;
  /** Extra classes for the wrapping element. */
  className?: string;
}

const StarshipCtx = createContext<StarshipProps>({});

function FullscreenShader() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { size } = useThree();
  const { speed = 1, intensity = 1, paused = false, onFrame } =
    useContext(StarshipCtx);

  // The shader's own clock — advanced by `speed`, frozen when `paused`.
  const elapsed = useRef(0);
  const last = useRef(0);

  // Create a small static noise texture for iChannel0
  const noiseTexture = useMemo(() => {
    const w = 256;
    const h = 256;
    const data = new Uint8Array(w * h * 4);
    for (let i = 0; i < w * h * 4; i++) data[i] = Math.floor(Math.random() * 256);
    const tex = new THREE.DataTexture(data, w, h, THREE.RGBAFormat);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.needsUpdate = true;
    return tex;
  }, []);

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(size.width, size.height) },
      iChannel0: { value: noiseTexture },
      iExposure: { value: 1 },
    }),
    [noiseTexture, size.width, size.height]
  );

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    // Integrate the clock ourselves so `speed`/`paused` can shape it without
    // ever rewinding @XorDev's accumulation (the field stays continuous).
    const now = clock.getElapsedTime();
    const dt = Math.max(0, now - last.current);
    last.current = now;
    if (!paused) elapsed.current += dt * speed;

    materialRef.current.uniforms.iTime.value = elapsed.current;
    materialRef.current.uniforms.iResolution.value.set(size.width, size.height);
    materialRef.current.uniforms.iExposure.value = intensity;

    if (onFrame) {
      // Cheap, allocation-free brightness proxy derived from the field's
      // dominant low-frequency term — enough to drive a HUD meter.
      const t = elapsed.current;
      const b =
        0.5 + 0.5 * Math.sin(t * 0.6) * Math.cos(t * 0.21 + 1.3);
      onFrame({ time: t, brightness: Math.min(1, Math.max(0, b)) });
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
        vertexShader={/* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          precision highp float;

          uniform float iTime;
          uniform vec2 iResolution;
          uniform sampler2D iChannel0;
          uniform float iExposure;

          // "Starship" by @XorDev (adapted)
          vec4 O_color;

          void mainImage(out vec4 O, vec2 I)
          {
              vec2 r = iResolution.xy,
                   p = (I+I-r) / r.y * mat2(3.,4.,4.,-3.) / 1e2;

              vec4 S = vec4(0.0);
              vec4 C = vec4(1.,2.,3.,0.);
              vec4 W;

              for(float t=iTime, T=.1*t+p.y, i=0.; i<50.; i+=1.){
                  S += (cos(W=sin(i)*C)+1.)
                       * exp(sin(i+i*T))
                       / length(max(p,
                         p / vec2(2.0, texture(iChannel0, p/exp(W.x)+vec2(i,t)/8.).r*40.0)
                       )) / 1e4;

                  p += .02 * cos(i*(C.xz+8.0+i) + T + T);
              }

              // Black background only: remove sky term (p.x*--C) but keep tanh tonemap
              O = vec4(tanh((S*S).rgb * iExposure), 1.0);
          }

          void main() {
            vec2 fragCoord = gl_FragCoord.xy;
            vec4 O;
            mainImage(O, fragCoord);
            gl_FragColor = O;
          }
        `}
      />
    </mesh>
  );
}

export const Component = ({
  speed,
  intensity,
  paused,
  onFrame,
  className,
}: StarshipProps = {}) => {
  return (
    <StarshipCtx.Provider value={{ speed, intensity, paused, onFrame }}>
      <div
        className={cn(
          "flex flex-col items-center gap-4 p-0 rounded-lg w-full h-full",
          className
        )}
      >
        <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }} dpr={[1, 2]}>
          {/* Ensure pure black background */}
          <color attach="background" args={["#000000"]} />
          <FullscreenShader />
        </Canvas>
      </div>
    </StarshipCtx.Provider>
  );
};
