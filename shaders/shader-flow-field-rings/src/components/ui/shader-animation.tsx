"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Telemetry pushed once per rendered frame. Lets a parent draw a live HUD
 * (FPS, shader uptime, per-channel intensity) without reaching into the WebGL
 * internals. The decomposition is computed exactly the way the fragment shader
 * accumulates each colour channel, so the readouts track what you see.
 */
export interface ShaderFrame {
  /** The `time` uniform handed to the shader this frame. */
  time: number;
  /** Smoothed frames-per-second over the last second. */
  fps: number;
  /** Wall-clock seconds since the first rendered frame. */
  uptime: number;
  /**
   * Mean brightness of each additive loop (R, G, B) sampled at the centre,
   * normalised to roughly 0..1. Mirrors the shader's `color[j]` accumulation.
   */
  channels: [number, number, number];
}

export interface ShaderAnimationProps {
  /**
   * Animation rate. The original component advances `time` by 0.05 per frame;
   * `speed` scales that step, so 1 is the canonical look. Defaults to 1.
   */
  speed?: number;
  /** Freeze the loop while keeping the last frame on screen. Defaults to false. */
  paused?: boolean;
  /** Optional per-frame telemetry callback (see {@link ShaderFrame}). */
  onFrame?: (frame: ShaderFrame) => void;
  /** Extra classes for the canvas wrapper. */
  className?: string;
  /** Inline styles merged onto the canvas wrapper. */
  style?: React.CSSProperties;
}

/**
 * Renders an additive R/G/B interference-ring field on a single full-screen
 * GLSL quad. Three independent loops (one per colour channel) each accumulate
 * five thin concentric rings whose radii drift over time; where the channels
 * overlap they sum to white, producing the moiré bloom at the centre.
 *
 * The shader maths is unchanged from the source component — `speed`, `paused`
 * and `onFrame` are additive conveniences that leave the default visual
 * identical (no props == the original).
 */
export function ShaderAnimation({
  speed = 1,
  paused = false,
  onFrame,
  className,
  style,
}: ShaderAnimationProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mutable mirrors of the props so the long-lived rAF closure always reads
  // the latest values without being torn down and rebuilt on every change.
  const speedRef = useRef(speed);
  const pausedRef = useRef(paused);
  const onFrameRef = useRef(onFrame);
  speedRef.current = speed;
  pausedRef.current = paused;
  onFrameRef.current = onFrame;

  const sceneRef = useRef<{
    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    uniforms: {
      time: { value: number };
      resolution: { value: THREE.Vector2 };
    };
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

    // Fragment shader
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
          }
        }

        gl_FragColor = vec4(color[0],color[1],color[2],1.0);
      }
    `;

    // Initialize Three.js scene
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    // Handle resize against the wrapper (not the window) so the component is
    // happy inside an arbitrarily-sized container, not just full-bleed.
    const onResize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      renderer.setSize(width, height, false);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    };

    onResize();
    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    window.addEventListener("resize", onResize, false);

    // Approximate the centre-pixel intensity of each additive loop so the HUD
    // can show per-channel readouts. uv ≈ (0,0) at the centre, so length(uv)≈0
    // and mod(uv.x+uv.y, 0.2)≈0, matching the shader's inner term.
    const sampleChannels = (time: number): [number, number, number] => {
      const t = time * 0.05;
      const lineWidth = 0.002;
      const out: [number, number, number] = [0, 0, 0];
      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 5; i++) {
          const frac = (t - 0.01 * j + i * 0.01) % 1;
          const denom = Math.abs((frac < 0 ? frac + 1 : frac) * 5.0);
          out[j] += (lineWidth * (i * i)) / Math.max(denom, 1e-3);
        }
        out[j] = Math.min(out[j], 1);
      }
      return out;
    };

    // FPS smoothing + uptime tracking.
    let startTs = 0;
    let lastTs = 0;
    let fps = 0;

    const animate = (ts: number) => {
      const animationId = requestAnimationFrame(animate);
      if (sceneRef.current) sceneRef.current.animationId = animationId;

      if (startTs === 0) startTs = ts;
      if (lastTs !== 0) {
        const dt = ts - lastTs;
        if (dt > 0) fps += ((1000 / dt) - fps) * 0.1;
      }
      lastTs = ts;

      if (!pausedRef.current) {
        uniforms.time.value += 0.05 * speedRef.current;
      }
      renderer.render(scene, camera);

      onFrameRef.current?.({
        time: uniforms.time.value,
        fps,
        uptime: (ts - startTs) / 1000,
        channels: sampleChannels(uniforms.time.value),
      });
    };

    sceneRef.current = { camera, scene, renderer, uniforms, animationId: 0 };
    const id = requestAnimationFrame(animate);
    sceneRef.current.animationId = id;

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        sceneRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className ?? "w-full h-screen"}
      style={{
        background: "#000",
        overflow: "hidden",
        ...style,
      }}
    />
  );
}
