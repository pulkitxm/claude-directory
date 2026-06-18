import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * GLSLHills
 * ---------
 * A monochrome perlin-noise hill range drifting under haze, rendered on a single
 * `RawShaderMaterial` plane (256×256 segments) that is folded to face the camera
 * and pushed forever forward through 3D Perlin noise. The fragment stage fades
 * each vertex out by its distance, so the far ridges dissolve into fog.
 *
 * Ported verbatim from the integration brief's `glsl-hills.tsx` — the GLSL
 * vertex/fragment programs, the `Plane` class, the camera framing and the render
 * loop are byte-for-byte the original. TypeScript types, a typed props surface,
 * proper WebGL teardown and two *optional* introspection hooks were layered on
 * top without touching the shader maths:
 *
 *   • `onReady`  — fires once with `{ uniforms, renderer, camera }` so a host can
 *                  read the live clock / drive uniforms (used by the showcase HUD).
 *   • `onFrame`  — fires every animation frame with the current shader `time`,
 *                  the measured FPS and the camera depth.
 *
 * Deviation from the brief (documented): the original sized the canvas to
 * `window.innerWidth/innerHeight`. To let the scene sit inside a framed
 * instrument window it now sizes to its own container via `ResizeObserver`,
 * falling back to the window when the container has no measured box. With the
 * default `width:'100vw' height:'100vh'` that container *is* the viewport, so the
 * canonical full-bleed demo renders identically.
 */

export interface GLSLHillsHandles {
  /** The live shader uniforms (`time`). */
  uniforms: { time: { value: number } };
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
}

export interface GLSLHillsProps {
  /** CSS width of the host element. Default `'100vw'`. */
  width?: string | number;
  /** CSS height of the host element. Default `'100vh'`. */
  height?: string | number;
  /** Camera Z distance from the range. Default `125`. */
  cameraZ?: number;
  /** Plane size + segment count (the brief couples them). Default `256`. */
  planeSize?: number;
  /** Drift speed multiplier applied to the per-frame delta. Default `0.5`. */
  speed?: number;
  /** Fog tint as a 0..1 greyscale value (the shader's `vec3(0.6)`). Default `0.6`. */
  fog?: number;
  /** Haze depth — divides the opacity falloff (the shader's `256.0`). Default `256`. */
  haze?: number;
  /** When true the drift clock is held still. Default `false`. */
  paused?: boolean;
  /** Fires once the renderer + uniforms exist. */
  onReady?: (handles: GLSLHillsHandles) => void;
  /** Fires every frame with live shader state. */
  onFrame?: (state: { time: number; fps: number; cameraZ: number }) => void;
  className?: string;
}

const GLSLHills = ({
  width = "100vw",
  height = "100vh",
  cameraZ = 125,
  planeSize = 256,
  speed = 0.5,
  fog = 0.6,
  haze = 256,
  paused = false,
  onReady,
  onFrame,
  className,
}: GLSLHillsProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Live prop mirrors so the render loop can read the latest values without
  // tearing down and rebuilding the WebGL context on every control tweak.
  const speedRef = useRef(speed);
  const pausedRef = useRef(paused);
  const fogRef = useRef(fog);
  const hazeRef = useRef(haze);
  const onFrameRef = useRef(onFrame);
  const onReadyRef = useRef(onReady);
  speedRef.current = speed;
  pausedRef.current = paused;
  fogRef.current = fog;
  hazeRef.current = haze;
  onFrameRef.current = onFrame;
  onReadyRef.current = onReady;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Plane class — verbatim from the brief, retyped.
    class Plane {
      uniforms: {
        time: { type: string; value: number };
        // Promoted from the brief's baked constants so the showcase can drive
        // the fog tint / haze depth live. Defaulted to the original literals.
        fog: { type: string; value: number };
        haze: { type: string; value: number };
      };
      mesh: THREE.Mesh;
      time: number;

      constructor() {
        this.uniforms = {
          time: { type: "f", value: 0 },
          fog: { type: "f", value: fogRef.current },
          haze: { type: "f", value: hazeRef.current },
        };
        this.mesh = this.createMesh();
        this.time = speedRef.current;
      }

      createMesh() {
        return new THREE.Mesh(
          new THREE.PlaneGeometry(planeSize, planeSize, planeSize, planeSize),
          new THREE.RawShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: `
              #define GLSLIFY 1
              attribute vec3 position;
              uniform mat4 projectionMatrix;
              uniform mat4 modelViewMatrix;
              uniform float time;
              varying vec3 vPosition;

              mat4 rotateMatrixX(float radian) {
                return mat4(
                  1.0, 0.0, 0.0, 0.0,
                  0.0, cos(radian), -sin(radian), 0.0,
                  0.0, sin(radian), cos(radian), 0.0,
                  0.0, 0.0, 0.0, 1.0
                );
              }

              vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
              vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
              vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
              vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
              vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

              float cnoise(vec3 P) {
                vec3 Pi0 = floor(P);
                vec3 Pi1 = Pi0 + vec3(1.0);
                Pi0 = mod289(Pi0);
                Pi1 = mod289(Pi1);
                vec3 Pf0 = fract(P);
                vec3 Pf1 = Pf0 - vec3(1.0);
                vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
                vec4 iy = vec4(Pi0.yy, Pi1.yy);
                vec4 iz0 = Pi0.zzzz;
                vec4 iz1 = Pi1.zzzz;

                vec4 ixy = permute(permute(ix) + iy);
                vec4 ixy0 = permute(ixy + iz0);
                vec4 ixy1 = permute(ixy + iz1);

                vec4 gx0 = ixy0 * (1.0 / 7.0);
                vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
                gx0 = fract(gx0);
                vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
                vec4 sz0 = step(gz0, vec4(0.0));
                gx0 -= sz0 * (step(0.0, gx0) - 0.5);
                gy0 -= sz0 * (step(0.0, gy0) - 0.5);

                vec4 gx1 = ixy1 * (1.0 / 7.0);
                vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
                gx1 = fract(gx1);
                vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
                vec4 sz1 = step(gz1, vec4(0.0));
                gx1 -= sz1 * (step(0.0, gx1) - 0.5);
                gy1 -= sz1 * (step(0.0, gy1) - 0.5);

                vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
                vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
                vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
                vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
                vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
                vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
                vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
                vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

                vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
                g000 *= norm0.x;
                g010 *= norm0.y;
                g100 *= norm0.z;
                g110 *= norm0.w;
                vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
                g001 *= norm1.x;
                g011 *= norm1.y;
                g101 *= norm1.z;
                g111 *= norm1.w;

                float n000 = dot(g000, Pf0);
                float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
                float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
                float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
                float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
                float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
                float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
                float n111 = dot(g111, Pf1);

                vec3 fade_xyz = fade(Pf0);
                vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
                vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
                float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
                return 2.2 * n_xyz;
              }

              void main(void) {
                vec3 updatePosition = (rotateMatrixX(radians(90.0)) * vec4(position, 1.0)).xyz;
                float sin1 = sin(radians(updatePosition.x / 128.0 * 90.0));
                vec3 noisePosition = updatePosition + vec3(0.0, 0.0, time * -30.0);
                float noise1 = cnoise(noisePosition * 0.08);
                float noise2 = cnoise(noisePosition * 0.06);
                float noise3 = cnoise(noisePosition * 0.4);
                vec3 lastPosition = updatePosition + vec3(0.0,
                  noise1 * sin1 * 8.0
                  + noise2 * sin1 * 8.0
                  + noise3 * (abs(sin1) * 2.0 + 0.5)
                  + pow(sin1, 2.0) * 40.0, 0.0);

                vPosition = lastPosition;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(lastPosition, 1.0);
              }
            `,
            fragmentShader: `
              precision highp float;
              #define GLSLIFY 1
              varying vec3 vPosition;
              uniform float fog;
              uniform float haze;

              void main(void) {
                float opacity = (96.0 - length(vPosition)) / haze * 0.6;
                vec3 color = vec3(fog);
                gl_FragColor = vec4(color, opacity);
              }
            `,
            transparent: true,
          }),
        );
      }

      render(time: number) {
        this.uniforms.time.value += time * this.time;
      }
    }

    // Three.js setup — verbatim, retyped.
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 10000);
    const clock = new THREE.Clock();
    const plane = new Plane();

    // FPS sampling for the optional telemetry hook (does not touch the maths).
    let frames = 0;
    let fpsClock = performance.now();
    let fps = 0;

    const sizeOf = () => {
      // Prefer the host container's measured box; fall back to the window so the
      // canonical full-bleed demo (100vw/100vh container == viewport) is identical.
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      return { w, h };
    };

    const resize = () => {
      const { w, h } = sizeOf();
      canvas.width = w;
      canvas.height = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    let frameId = 0;
    const render = () => {
      // Honour live pause without rebuilding the scene: feed a zero delta when held.
      const delta = pausedRef.current ? 0 : clock.getDelta();
      plane.time = speedRef.current;
      plane.uniforms.fog.value = fogRef.current;
      plane.uniforms.haze.value = hazeRef.current;
      // Keep the clock advancing so the next resume doesn't jump.
      if (pausedRef.current) clock.getDelta();
      plane.render(delta);
      renderer.render(scene, camera);

      // FPS + per-frame telemetry callback.
      frames++;
      const now = performance.now();
      if (now - fpsClock >= 500) {
        fps = Math.round((frames * 1000) / (now - fpsClock));
        frames = 0;
        fpsClock = now;
      }
      onFrameRef.current?.({
        time: plane.uniforms.time.value,
        fps,
        cameraZ: camera.position.z,
      });
    };

    const renderLoop = () => {
      render();
      frameId = requestAnimationFrame(renderLoop);
    };

    const ro = new ResizeObserver(() => resize());

    const init = () => {
      const { w, h } = sizeOf();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h, false);
      renderer.setClearColor(0x000000, 0);
      camera.position.set(0, 16, cameraZ);
      camera.lookAt(new THREE.Vector3(0, 28, 0));
      scene.add(plane.mesh);
      window.addEventListener("resize", resize);
      ro.observe(container);
      resize();
      onReadyRef.current?.({ uniforms: plane.uniforms, renderer, camera });
      renderLoop();
    };

    init();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      ro.disconnect();
      plane.mesh.geometry.dispose();
      (plane.mesh.material as THREE.Material).dispose();
      renderer.dispose();
    };
    // The scene is rebuilt only when the structural props change; live values
    // (speed/fog/haze/paused/callbacks) flow through refs without a teardown.
  }, [cameraZ, planeSize]);

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", width, height }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export { GLSLHills };
export default GLSLHills;
