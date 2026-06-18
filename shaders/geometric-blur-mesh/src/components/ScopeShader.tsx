"use client";

import { useEffect, useRef } from "react";
import {
  fragmentShader,
  vertexShader,
} from "@/components/ui/geometric-blur-mesh";

/* ----------------------------------------------------------------------------
   ScopeShader — an *instrumented* mount of the verbatim Geometric Blur Mesh.

   The prompt's `GeometricBlurMesh` is a self-contained full-screen widget that
   owns its own mouse/click/key handling and renders its own caption. Faithful
   copy lives untouched in `components/ui/geometric-blur-mesh.tsx` (and is wired
   straight through by `components/demo.tsx`, exactly as the prompt asks).

   To frame that shader as a proper instrument — a left specimen registry, live
   focus telemetry, a defocus dial — the surrounding UI needs to *read* the
   cursor/shape state and *drive* it (registry clicks, number keys, autopilot).
   So this wrapper recompiles the identical exported shader sources and lifts
   the interaction model up:

     • the same blur-on-hover falloff, the same eight solids, the same rotation;
     • shape is controlled by the parent (`shape` / `onCycle`);
     • the live damped cursor + focus influence are reported via `onSample`,
       so the chrome can render a reticle and telemetry that track the GPU 1:1;
     • an autopilot sweeps a virtual cursor and cycles solids until a real
       pointer/keypress takes over — this is what makes the cursor-defocus
       choreography legible the instant the page loads (and on the demo reel).

   Nothing about the shader maths changes; this is purely the integration glue.
---------------------------------------------------------------------------- */

const SHAPE_COUNT = 8;

export type Sample = {
  /** Damped cursor in CSS px relative to the canvas. */
  x: number;
  y: number;
  /** 0..1 — same falloff the fragment shader uses for blur (1 = fully defocused). */
  influence: number;
  /** True while the autopilot is driving (no real pointer engaged). */
  auto: boolean;
};

type Props = {
  shape: number;
  /** Advance to the next solid (registry click on the canvas, or autopilot). */
  onCycle: () => void;
  /** Per-frame cursor + focus readout for the chrome overlay. */
  onSample: (s: Sample) => void;
  /** Fired the first time a real pointer/keypress takes over from autopilot. */
  onEngage?: () => void;
};

export default function ScopeShader({
  shape,
  onCycle,
  onSample,
  onEngage,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Target cursor (raw) and damped cursor (what the shader actually sees), in
  // canvas-local CSS px. Kept in refs so the rAF loop never re-subscribes.
  const targetRef = useRef({ x: 0, y: 0 });
  const dampRef = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ w: 1, h: 1 });

  // Autopilot bookkeeping. `auto` flips false the first time a real pointer or
  // key arrives; `cycleAt` schedules the next automated solid change.
  const autoRef = useRef(true);
  const engagedRef = useRef(false);
  const cycleAtRef = useRef(0);

  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const rafRef = useRef<number>();
  const startRef = useRef(performance.now());

  // Latest props mirrored into refs for the long-lived animation loop.
  const shapeRef = useRef(shape);
  const onCycleRef = useRef(onCycle);
  const onSampleRef = useRef(onSample);
  const onEngageRef = useRef(onEngage);
  useEffect(() => {
    shapeRef.current = shape;
  }, [shape]);
  useEffect(() => {
    onCycleRef.current = onCycle;
    onSampleRef.current = onSample;
    onEngageRef.current = onEngage;
  });

  // Mark that a real human took control: stop the autopilot, notify once.
  const engage = () => {
    autoRef.current = false;
    if (!engagedRef.current) {
      engagedRef.current = true;
      onEngageRef.current?.();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl", {
      antialias: true,
      alpha: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }
    glRef.current = gl;
    gl.clearColor(0, 0, 0, 1);

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, vertexShader);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentShader);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    programRef.current = program;
    gl.useProgram(program);

    uniformsRef.current = {
      u_mouse: gl.getUniformLocation(program, "u_mouse"),
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_pixelRatio: gl.getUniformLocation(program, "u_pixelRatio"),
      u_time: gl.getUniformLocation(program, "u_time"),
      u_shape: gl.getUniformLocation(program, "u_shape"),
    };

    const verts = new Float32Array([
      -1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0,
    ]);
    const uvs = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);

    const uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    const uvLoc = gl.getAttribLocation(program, "a_uv");
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

    // --- sizing -------------------------------------------------------------
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = container.clientWidth;
      const h = container.clientHeight;
      sizeRef.current = { w, h };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      // Park the cursor at centre until the first real move / autopilot step.
      if (dampRef.current.x === 0 && dampRef.current.y === 0) {
        dampRef.current = { x: w / 2, y: h / 2 };
        targetRef.current = { x: w / 2, y: h / 2 };
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // --- input --------------------------------------------------------------
    const pointTo = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      targetRef.current = { x: clientX - rect.left, y: clientY - rect.top };
    };
    const onMove = (e: PointerEvent) => {
      engage();
      pointTo(e.clientX, e.clientY);
    };
    const onClick = () => {
      engage();
      onCycleRef.current();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "8") engage();
    };
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerdown", onMove);
    container.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);

    // --- the matching falloff the fragment shader uses for blur -------------
    // Mirrors `coord()` + `mouseInfluence` from the GLSL so telemetry tracks
    // the GPU exactly: aspect-correct, centred, smoothstep(0, 0.5, dist).
    const influenceAt = (px: number, py: number) => {
      const { w, h } = sizeRef.current;
      // canvas-local px -> shader's centred, aspect-corrected st (y flipped).
      const norm = (vx: number, vy: number) => {
        let x = vx / w;
        let y = vy / h;
        if (w > h) {
          x *= w / h;
          x += (h - w) / h / 2;
        } else {
          y *= h / w;
          y += (w - h) / w / 2;
        }
        return { x: x - 0.5, y: -(y - 0.5) };
      };
      const m = norm(px, py); // cursor in shader space (the specimen sits at 0,0)
      const dist = Math.hypot(m.x, m.y);
      const t = Math.min(Math.max(dist / 0.5, 0), 1);
      const smooth = t * t * (3 - 2 * t);
      return 1 - smooth;
    };

    // --- autopilot path -----------------------------------------------------
    // A lissajous-ish sweep that repeatedly crosses the specimen at centre, so
    // the defocus falloff is unmistakable. Returns a target in canvas px.
    const autopilotTarget = (tSec: number) => {
      const { w, h } = sizeRef.current;
      const cx = w / 2;
      const cy = h / 2;
      const rx = w * 0.34;
      const ry = h * 0.3;
      const x = cx + Math.sin(tSec * 0.9) * rx * Math.cos(tSec * 0.27);
      const y = cy + Math.sin(tSec * 0.62 + 1.1) * ry;
      return { x, y };
    };

    cycleAtRef.current = performance.now() + 2600;

    // --- render loop --------------------------------------------------------
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const prog = programRef.current;
      const g = glRef.current;
      if (!g || !prog) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // Autopilot drives the *target* until a human engages.
      if (autoRef.current) {
        const tSec = (now - startRef.current) / 1000;
        targetRef.current = autopilotTarget(tSec);
        if (now >= cycleAtRef.current) {
          onCycleRef.current();
          cycleAtRef.current = now + 2600;
        }
      }

      // Same damping constant the prompt component uses (factor 8).
      const k = 8 * dt;
      dampRef.current.x += (targetRef.current.x - dampRef.current.x) * k;
      dampRef.current.y += (targetRef.current.y - dampRef.current.y) * k;

      const dpr = Math.min(window.devicePixelRatio, 2);
      const elapsed = (Date.now() - Math.round(startRef.current)) / 1000;
      g.clear(g.COLOR_BUFFER_BIT);
      const u = uniformsRef.current;
      if (u.u_mouse) g.uniform2f(u.u_mouse, dampRef.current.x, dampRef.current.y);
      if (u.u_resolution)
        g.uniform2f(u.u_resolution, canvas.width, canvas.height);
      if (u.u_pixelRatio) g.uniform1f(u.u_pixelRatio, dpr);
      if (u.u_time) g.uniform1f(u.u_time, elapsed);
      if (u.u_shape) g.uniform1i(u.u_shape, shapeRef.current);
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4);

      onSampleRef.current({
        x: dampRef.current.x,
        y: dampRef.current.y,
        influence: influenceAt(dampRef.current.x, dampRef.current.y),
        auto: autoRef.current,
      });

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerdown", onMove);
      container.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="scope-stage absolute inset-0 h-full w-full overflow-hidden bg-black"
      aria-label="Polyhedral specimen stage. Move the cursor to defocus, click to cycle solids."
      role="img"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export { SHAPE_COUNT };
