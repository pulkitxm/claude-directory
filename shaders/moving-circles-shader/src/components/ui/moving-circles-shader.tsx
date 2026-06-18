import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

/**
 * Telemetry sampled off the GPU clock once per rendered frame. The surrounding
 * console reads these so the UI never lies about what the shader is doing.
 */
export type ShaderTelemetry = {
  time: number; // uTime in seconds (frozen when paused)
  axis: 0 | 1 | 2; // active translation axis: mod(time, 3.0)
  phase: number; // (time - sin(time*TAU)/TAU), the eased sweep position
  direction: -1 | 0 | 1; // mod(vec3(2,0,1) - ceil(time), 3) - 1 on the active axis
  fps: number; // rolling frames-per-second estimate
};

type FullscreenShaderProps = {
  paused?: boolean;
  /** Multiplies playback speed without touching the shader math. */
  speed?: number;
  onSample?: (t: ShaderTelemetry) => void;
};

function FullscreenShader({ paused = false, speed = 1, onSample }: FullscreenShaderProps) {
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const { size } = useThree();

  // Internal accumulator so pause/speed never desync the GPU from the readout.
  const clockTime = useRef(0);
  const lastReal = useRef<number | null>(null);
  const fpsBuf = useRef<number[]>([]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector3(size.width, size.height, 1) },
    }),
    [size.width, size.height]
  );

  useFrame(({ clock }) => {
    if (!shaderRef.current) return;

    const real = clock.getElapsedTime();
    const dt = lastReal.current === null ? 0 : real - lastReal.current;
    lastReal.current = real;

    if (!paused) clockTime.current += dt * speed;
    const t = clockTime.current;

    shaderRef.current.uniforms.uTime.value = t;
    shaderRef.current.uniforms.uResolution.value.set(size.width, size.height, 1);

    if (onSample) {
      // FPS over a short rolling window.
      if (dt > 0) {
        fpsBuf.current.push(1 / dt);
        if (fpsBuf.current.length > 30) fpsBuf.current.shift();
      }
      const fps =
        fpsBuf.current.length > 0
          ? fpsBuf.current.reduce((a, b) => a + b, 0) / fpsBuf.current.length
          : 0;

      // Mirror the exact GLSL phase / axis logic so the UI matches the GPU.
      const TAU = 6.283;
      const axis = (Math.floor(((t % 3) + 3) % 3) % 3) as 0 | 1 | 2;
      const phase = t - Math.sin(t * TAU) / TAU;
      // mod(vec3(2,0,1) - ceil(t), 3) - 1, sampled on the active axis component
      const base = [2, 0, 1][axis];
      const dirRaw = (((base - Math.ceil(t)) % 3) + 3) % 3;
      const direction = (dirRaw - 1) as -1 | 0 | 1;

      onSample({ time: t, axis, phase, direction, fps });
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={shaderRef}
        depthWrite={false}
        depthTest={false}
        transparent={false}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          varying vec2 vTexCoord;
          void main() {
            vTexCoord = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          precision highp float;

          uniform vec3 uResolution;   // viewport resolution (pixels)
          uniform float uTime;        // elapsed time (seconds)

          // Isometric space warping effect
          void renderScene(out vec4 fragColor, vec2 fragCoord) {
              float TAU = 6.283; // 2 * PI
              float time = uTime;
              vec3 res = uResolution;

              // Ray origin in isometric projection
              vec3 pos = (vec3(fragCoord + fragCoord, 1.0) - res) * mat3(
                  707.0, -408.0, 577.0,
                  0.0,   816.0, 577.0,
                 -707.0, -408.0, 577.0
              ) / 300.0 / res.y;

              // Sphere repetition logic
              fragColor = res.yyyy * 0.1 * (
                length(
                  fract(
                    pos + 0.5
                    + (time - sin(time * TAU) / TAU)
                      * (mod(vec3(2.0, 0.0, 1.0) - ceil(time), 3.0) - 1.0)
                      * cos(round(pos[int(mod(time, 3.0))]) * TAU * 0.5)
                  ) - 0.5
                ) - 0.5
              );
          }

          void main() {
            vec4 outCol;
            renderScene(outCol, gl_FragCoord.xy);
            gl_FragColor = outCol;
          }
        `}
      />
    </mesh>
  );
}

export type MovingCirclesShaderProps = {
  className?: string;
  paused?: boolean;
  speed?: number;
  dpr?: [number, number];
  onSample?: (t: ShaderTelemetry) => void;
};

export const Component = ({
  className,
  paused = false,
  speed = 1,
  dpr = [1, 2],
  onSample,
}: MovingCirclesShaderProps) => {
  return (
    <div className={cn("flex flex-col items-center gap-4 p-0 rounded-lg w-full h-[100vh]", className)}>
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }} dpr={dpr}>
        <color attach="background" args={["#000000"]} />
        <FullscreenShader paused={paused} speed={speed} onSample={onSample} />
      </Canvas>
    </div>
  );
};
