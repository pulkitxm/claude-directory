import { useEffect, useRef } from "react";

/**
 * MistField — the lab-instrument variant of the verbatim `demo.tsx`
 * MistBackground. Same fBm-domain-warped fog, but every baked constant in the
 * original shader is promoted to a live uniform so the HAAR control deck can
 * drive it, and the render loop reads a small block of the framebuffer back so
 * the visibility gauge reports the fog's *actual* luminance off the GPU.
 *
 * Defaults reproduce the original component pixel-for-pixel: density 1, drift 1,
 * octaves 6, accent 1, beam 1, warp 1, exposure 1.
 */
export interface MistFieldProps {
  /** Overall mist opacity — scales the fog mix. 0 = clear, 1 = original, up to ~1.6. */
  density?: number;
  /** Animation speed of the rolling fog. 1 = original. */
  drift?: number;
  /** fBm octaves (detail). 1–8, original 6. */
  octaves?: number;
  /** Cool accent lift in the deep folds. 1 = original. */
  accent?: number;
  /** Strength of the cursor "lighthouse beam" glow. 1 = original. */
  beam?: number;
  /** Domain-warp amount — how much the fog curls around itself. 1 = original. */
  warp?: number;
  /** Post-exposure gain. 1 = original. */
  exposure?: number;
  /** Freeze the drift clock (the fog holds still). */
  paused?: boolean;
  /** Per-sample telemetry read straight off the render loop (~8×/s). */
  onSample?: (s: MistSample) => void;
  className?: string;
}

export interface MistSample {
  time: number;
  fps: number;
  /** Mean luminance of a centre block, 0–1 (denser fog → brighter). */
  lumAvg: number;
  mouseX: number;
  mouseY: number;
}

const VERT = `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_density;
  uniform float u_drift;
  uniform int u_octaves;
  uniform float u_accent;
  uniform float u_beam;
  uniform float u_warp;
  uniform float u_exposure;

  float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
  }

  float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 8; i++) {
          if (i >= u_octaves) break;
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
      }
      return v;
  }

  void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      uv.x *= u_resolution.x / u_resolution.y;

      vec2 mPos = u_mouse / u_resolution.xy;
      mPos.x *= u_resolution.x / u_resolution.y;
      float dist = distance(uv, mPos);

      float t = u_time * u_drift;

      vec2 q = vec2(0.0);
      q.x = fbm(uv + 0.07 * t);
      q.y = fbm(uv + vec2(1.0, 1.0));

      vec2 r = vec2(0.0);
      r.x = fbm(uv + u_warp * q + vec2(1.7, 9.2) + 0.15 * t);
      r.y = fbm(uv + u_warp * q + vec2(8.3, 2.8) + 0.126 * t);

      float f = fbm(uv + r);

      vec3 baseColor = vec3(0.03, 0.03, 0.05);
      vec3 mistColor = vec3(0.18, 0.20, 0.25);
      vec3 accentColor = vec3(0.3, 0.35, 0.45);

      vec3 color = mix(baseColor, mistColor, clamp(f * u_density, 0.0, 1.0));
      color = mix(color, accentColor, dot(q, r) * 0.5 * u_accent);

      float mouseGlow = smoothstep(0.35, 0.0, dist);
      color += mouseGlow * 0.05 * u_beam * vec3(0.6, 0.7, 1.0);

      color = pow(color, vec3(1.1)) * (1.4 * u_exposure);
      gl_FragColor = vec4(color, 1.0);
  }
`;

export default function MistField({
  density = 1,
  drift = 1,
  octaves = 6,
  accent = 1,
  beam = 1,
  warp = 1,
  exposure = 1,
  paused = false,
  onSample,
  className,
}: MistFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Live props mirror so the rAF loop reads the latest without re-binding.
  const props = useRef({ density, drift, octaves, accent, beam, warp, exposure, paused });
  props.current = { density, drift, octaves, accent, beam, warp, exposure, paused };
  const onSampleRef = useRef(onSample);
  onSampleRef.current = onSample;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const posAttrib = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const loc = {
      time: u("u_time"), res: u("u_resolution"), mouse: u("u_mouse"),
      density: u("u_density"), drift: u("u_drift"), octaves: u("u_octaves"),
      accent: u("u_accent"), beam: u("u_beam"), warp: u("u_warp"), exposure: u("u_exposure"),
    };

    // Respect reduced-motion: hold the drift clock so the fog renders as a
    // still field instead of rolling. The cursor beam still responds.
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = window.innerHeight - e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let clock = 0; // accumulated drift time, frozen when paused
    let last = performance.now();
    let fps = 60;
    let lastSample = 0;
    const block = 48; // centre readback block, in device px

    const render = (now: number) => {
      const p = props.current;
      const dt = Math.min(now - last, 50);
      last = now;
      fps = fps * 0.9 + (1000 / Math.max(dt, 1)) * 0.1;
      if (!p.paused && !reduce) clock += dt * 0.001;

      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.uniform1f(loc.time, clock);
      gl.uniform2f(loc.res, canvas.width, canvas.height);
      gl.uniform2f(loc.mouse, mouse.x, mouse.y);
      gl.uniform1f(loc.density, p.density);
      gl.uniform1f(loc.drift, p.drift);
      gl.uniform1i(loc.octaves, Math.max(1, Math.min(8, Math.round(p.octaves))));
      gl.uniform1f(loc.accent, p.accent);
      gl.uniform1f(loc.beam, p.beam);
      gl.uniform1f(loc.warp, p.warp);
      gl.uniform1f(loc.exposure, p.exposure);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (onSampleRef.current && now - lastSample > 120) {
        lastSample = now;
        const px = new Uint8Array(block * block * 4);
        const cx = Math.max(0, (canvas.width - block) >> 1);
        const cy = Math.max(0, (canvas.height - block) >> 1);
        gl.readPixels(cx, cy, block, block, gl.RGBA, gl.UNSIGNED_BYTE, px);
        let sum = 0;
        for (let i = 0; i < px.length; i += 4) {
          sum += 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2];
        }
        const lumAvg = sum / (block * block) / 255;
        onSampleRef.current({ time: clock, fps, lumAvg, mouseX: mouse.x, mouseY: mouse.y });
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? "fixed inset-0 h-full w-full pointer-events-none z-[-1]"}
      style={{ background: "#09090b" }}
    />
  );
}
