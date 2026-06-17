import React, { useRef, useEffect, memo } from "react";
import * as THREE from "three";

// --- GLSL Shaders ---
// (Verbatim from the integration brief — untouched.)
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform float u_cloud_density;
  uniform float u_glow_intensity;

  float random(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898,78.233,151.7182))) * 43758.5453);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f*f*(3.0 - 2.0*f);

    return mix(
      mix(mix(random(i+vec3(0,0,0)), random(i+vec3(1,0,0)), u.x),
          mix(random(i+vec3(0,1,0)), random(i+vec3(1,1,0)), u.x), u.y),
      mix(mix(random(i+vec3(0,0,1)), random(i+vec3(1,0,1)), u.x),
          mix(random(i+vec3(0,1,1)), random(i+vec3(1,1,1)), u.x), u.y),
      u.z
    );
  }

  float fbm(vec3 p) {
    float v = 0.0, amp = 0.5;
    for (int i = 0; i < 6; i++) {
      v += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float d = 1.0 - dot(uv, uv);
    if (d < 0.0) discard;

    // map UV onto sphere
    vec3 pos = vec3(uv, sqrt(d));

    // cloud / nebula
    vec3 coord = pos * u_cloud_density + u_time * 0.1;
    float c = fbm(coord);
    vec3 nebula = mix(u_color1, u_color2, smoothstep(0.4, 0.6, c));

    // Fresnel rim glow
    float fresnel = pow(1.0 - dot(normalize(pos), vec3(0,0,1)), 2.0)
                    * u_glow_intensity;
    vec3 glow = fresnel * u_color2;

    gl_FragColor = vec4(nebula + glow, 1.0);
  }
`;

/**
 * Per-frame telemetry surfaced for the surrounding survey console. This is the
 * only addition over the brief's component: an optional `onFrame` callback and
 * a `fill` flag so the canvas can either own the viewport (default, exactly as
 * shipped) or fill a framed parent container. The shader, uniforms, geometry,
 * and animation loop are otherwise verbatim.
 */
export interface SphereTelemetry {
  /** seconds since the WebGL clock started (THREE.Clock.getElapsedTime) */
  elapsed: number;
  /** sampled frames-per-second */
  fps: number;
  /** sphere Y rotation in radians, accumulated by rotationSpeed */
  rotation: number;
}

export interface ShaderCanvasProps {
  color1?: THREE.Color | string | number;
  color2?: THREE.Color | string | number;
  cloudDensity?: number;
  glowIntensity?: number;
  rotationSpeed?: number;
  /** Fill the parent element (absolute inset:0) instead of the viewport. */
  fill?: boolean;
  /** Receives live per-frame telemetry. */
  onFrame?: (t: SphereTelemetry) => void;
}

const ShaderCanvas: React.FC<ShaderCanvasProps> = memo(
  ({
    color1 = 0xff4444,
    color2 = 0x4444ff,
    cloudDensity = 2.0,
    glowIntensity = 1.0,
    rotationSpeed = 0.5,
    fill = false,
    onFrame,
  }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    // Keep the latest callback without re-running the whole effect.
    const onFrameRef = useRef(onFrame);
    onFrameRef.current = onFrame;
    // Live prop values read inside the (one-time) render loop, so changing a
    // colour or dial mutates the running uniforms in place instead of tearing
    // down and rebuilding the WebGL scene (which would reset rotation + churn
    // the GL context on every slider tick).
    const rotationSpeedRef = useRef(rotationSpeed);
    rotationSpeedRef.current = rotationSpeed;

    const threeRef = useRef<{
      renderer?: THREE.WebGLRenderer;
      scene?: THREE.Scene;
      camera?: THREE.PerspectiveCamera;
      uniforms?: {
        u_time: { value: number };
        u_color1: { value: THREE.Color };
        u_color2: { value: THREE.Color };
        u_cloud_density: { value: number };
        u_glow_intensity: { value: number };
      };
      sphere?: THREE.Mesh;
      clock?: THREE.Clock;
    }>({});

    useEffect(() => {
      const container = mountRef.current;
      if (!container) return;

      // The canvas matches its container when `fill` is set, otherwise the
      // viewport (the brief's original behaviour).
      const measure = () =>
        fill
          ? { w: container.clientWidth, h: container.clientHeight }
          : { w: window.innerWidth, h: window.innerHeight };

      // 1. Scene + Camera
      const scene = new THREE.Scene();
      const start = measure();
      const camera = new THREE.PerspectiveCamera(75, start.w / start.h, 0.1, 1000);
      camera.position.z = 1;

      // 2. Renderer (no alpha → we get a visible background color)
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(start.w, start.h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 1); // BLACK background
      container.appendChild(renderer.domElement);

      // 3. Uniforms
      const uniforms = {
        u_time: { value: 0.0 },
        u_color1: { value: new THREE.Color(color1) },
        u_color2: { value: new THREE.Color(color2) },
        u_cloud_density: { value: cloudDensity },
        u_glow_intensity: { value: glowIntensity },
      };

      // 4. Sphere mesh with ShaderMaterial
      const geo = new THREE.SphereGeometry(0.6, 64, 64);
      const mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: false, // ensure the black clearColor shows through
      });
      const sphere = new THREE.Mesh(geo, mat);
      scene.add(sphere);

      const clock = new THREE.Clock();
      threeRef.current = { renderer, scene, camera, uniforms, sphere, clock };

      // 5. Handle resize
      function onResize() {
        const { w, h } = measure();
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
      window.addEventListener("resize", onResize);
      // ResizeObserver keeps a filled canvas crisp when the parent reflows.
      const ro = fill ? new ResizeObserver(onResize) : null;
      ro?.observe(container);
      onResize();

      // 6. Animation loop
      let raf: number;
      let fpsEMA = 60;
      const loop = () => {
        const { clock, sphere } = threeRef.current;
        const delta = clock!.getDelta();
        sphere!.rotation.y += delta * rotationSpeedRef.current;
        uniforms.u_time.value = clock!.getElapsedTime();

        renderer.render(scene, camera);

        // Telemetry: smoothed FPS + live clock + accumulated rotation.
        if (delta > 0) fpsEMA = fpsEMA * 0.9 + (1 / delta) * 0.1;
        onFrameRef.current?.({
          elapsed: uniforms.u_time.value,
          fps: fpsEMA,
          rotation: sphere!.rotation.y,
        });

        raf = requestAnimationFrame(loop);
      };
      loop();

      // 7. Cleanup
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        ro?.disconnect();
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
      // Only `fill` changes the scene plumbing; colours/dials are synced live
      // by the effect below without rebuilding the renderer.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fill]);

    // Sync the live uniforms in place (no scene rebuild, so the sphere keeps
    // spinning from where it was and the GL context is never recreated).
    useEffect(() => {
      const u = threeRef.current.uniforms;
      if (!u) return;
      u.u_color1.value.set(color1);
      u.u_color2.value.set(color2);
      u.u_cloud_density.value = cloudDensity;
      u.u_glow_intensity.value = glowIntensity;
    }, [color1, color2, cloudDensity, glowIntensity]);

    return (
      <div
        ref={mountRef}
        style={{
          position: fill ? "absolute" : "fixed",
          inset: 0,
          width: fill ? "100%" : "100vw",
          height: fill ? "100%" : "100vh",
          backgroundColor: "#000", // fallback CSS background
        }}
      />
    );
  },
);

ShaderCanvas.displayName = "ShaderCanvas";

export default ShaderCanvas;
