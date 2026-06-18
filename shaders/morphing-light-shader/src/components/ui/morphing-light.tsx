"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * MorphingLight — verbatim Three.js morphing-light shader from the brief, with
 * the baked-in constants promoted to optional props so the same component can be
 * dropped in bare (`<MorphingLight />`, identical to the original) or driven by
 * an instrument console. Every prop defaults to the exact value the original
 * shader hard-coded, so zero-prop usage is byte-for-byte the original look.
 */
export interface MorphingLightProps {
  /** Animation speed multiplier (original: 2.5). */
  speed?: number;
  /** Inner ring frequency (original: 4.0). */
  innerBands?: number;
  /** Outer ring frequency (original: 8.0). */
  outerBands?: number;
  /** Hue rotation applied to the final color, in degrees (original: 0). */
  hueShift?: number;
  /** First spectrum endpoint, rgb 0–1 (original: pink 1.0, 0.41, 0.71). */
  colorA?: [number, number, number];
  /** Second spectrum endpoint, rgb 0–1 (original: cyan 0.0, 1.0, 1.0). */
  colorB?: [number, number, number];
  /** Freeze the clock without tearing down the GL context. */
  paused?: boolean;
  /** Per-frame telemetry tap: center-pixel color + luminance, clock, fps. */
  onSample?: (s: {
    time: number;
    fps: number;
    luma: number;
    rgb: [number, number, number];
  }) => void;
  className?: string;
}

export function MorphingLight({
  speed = 2.5,
  innerBands = 4.0,
  outerBands = 8.0,
  hueShift = 0,
  colorA = [1.0, 0.41, 0.71],
  colorB = [0.0, 1.0, 1.0],
  paused = false,
  onSample,
  className = "absolute -z-10 w-full h-screen",
}: MorphingLightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera?: THREE.Camera;
    scene?: THREE.Scene;
    renderer?: THREE.WebGLRenderer;
    clock?: THREE.Clock;
    uniforms?: any;
    animationId?: number;
  }>({});

  // Live mirrors so prop changes reach the render loop without re-creating GL.
  const props = useRef({ speed, innerBands, outerBands, hueShift, colorA, colorB, paused, onSample });
  props.current = { speed, innerBands, outerBands, hueShift, colorA, colorB, paused, onSample };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Fragment shader — the brief's logic, with the hard-coded constants read
    // from uniforms and an HSV hue-shift on the final color.
    const fragmentShader = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_speed;
uniform float u_inner;
uniform float u_outer;
uniform float u_hue;
uniform vec3 u_colorA;
uniform vec3 u_colorB;

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_resolution * .5) / u_resolution.yy;

  // Rotate UVs by -90 degrees
  float angle = -1.5708; // -90 degrees in radians
  mat2 rotation = mat2(cos(angle), -sin(angle),
                       sin(angle),  cos(angle));
  uv = rotation * uv;

  float c = distance(uv, vec2(0.0));
  float a = u_time * u_speed;

  vec3 light = vec3(0.5 - acos(sin(c * u_inner + a)), 0.5 - acos(sin(c * u_outer + a)), 0.0);
  vec3 source = mix(light, vec3(5.), .5 - c);
  vec3 hue = mix(u_colorA, u_colorB, (uv.y - sin(u_time)) * 0.5);
  vec3 color = mix(source, hue, uv.x);

  // Optional hue rotation on the composited color.
  if (abs(u_hue) > 0.001) {
    vec3 h = rgb2hsv(color);
    h.x = fract(h.x + u_hue / 360.0);
    color = hsv2rgb(h);
  }

  gl_FragColor = vec4(color, 1.0);
}
    `;

    // Initialize Three.js scene
    const clock = new THREE.Clock();
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      u_time: { value: 1.0 },
      u_resolution: { value: new THREE.Vector2() },
      u_speed: { value: speed },
      u_inner: { value: innerBands },
      u_outer: { value: outerBands },
      u_hue: { value: hueShift },
      u_colorA: { value: new THREE.Vector3(...colorA) },
      u_colorB: { value: new THREE.Vector3(...colorB) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // preserveDrawingBuffer lets us read the center pixel back for telemetry.
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    sceneRef.current = { camera, scene, renderer, clock, uniforms };

    // Resize handler
    const onWindowResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(width, height);
      uniforms.u_resolution.value.x = renderer.domElement.width;
      uniforms.u_resolution.value.y = renderer.domElement.height;
    };

    // Telemetry: throttled center-pixel readback + fps.
    const pixel = new Uint8Array(4);
    let last = performance.now();
    let fps = 60;
    let acc = 0;
    let frozenTime = 0;
    let wasPaused = false;

    const animate = () => {
      const ref = sceneRef.current;
      if (!ref.uniforms || !ref.clock) return;
      const p = props.current;

      // Pause: hold the clock value steady while still rendering the last frame.
      if (p.paused) {
        if (!wasPaused) {
          frozenTime = ref.clock.getElapsedTime();
          wasPaused = true;
        }
      } else {
        if (wasPaused) {
          // Re-anchor so resuming doesn't jump the animation.
          ref.clock.start();
          ref.clock.elapsedTime = frozenTime;
          wasPaused = false;
        }
      }

      const t = p.paused ? frozenTime : ref.clock.getElapsedTime();
      ref.uniforms.u_time.value = t;
      ref.uniforms.u_speed.value = p.speed;
      ref.uniforms.u_inner.value = p.innerBands;
      ref.uniforms.u_outer.value = p.outerBands;
      ref.uniforms.u_hue.value = p.hueShift;
      ref.uniforms.u_colorA.value.set(...p.colorA);
      ref.uniforms.u_colorB.value.set(...p.colorB);

      renderer.render(scene, camera);

      // fps (EMA) + center-pixel sample, reported ~10x/sec.
      const now = performance.now();
      const dt = now - last;
      last = now;
      if (dt > 0) fps = fps * 0.9 + (1000 / dt) * 0.1;
      acc += dt;
      if (acc >= 100 && p.onSample) {
        acc = 0;
        const gl = renderer.getContext();
        const w = renderer.domElement.width;
        const h = renderer.domElement.height;
        gl.readPixels(w >> 1, h >> 1, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
        const r = pixel[0] / 255;
        const g = pixel[1] / 255;
        const b = pixel[2] / 255;
        p.onSample({
          time: t,
          fps,
          luma: 0.2126 * r + 0.7152 * g + 0.0722 * b,
          rgb: [r, g, b],
        });
      }

      ref.animationId = requestAnimationFrame(animate);
    };

    onWindowResize();
    window.addEventListener("resize", onWindowResize);
    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      if (sceneRef.current.renderer) {
        container.removeChild(sceneRef.current.renderer.domElement);
        sceneRef.current.renderer.dispose();
      }
      geometry.dispose();
      material.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={className} ref={containerRef} />;
}
