// lab.tsx
// The prompt's WebGL2 fullscreen fragment-shader component, dropped into shadcn
// `components/ui` verbatim. A single full-screen triangle renders a fragment program
// that ray-marches forward (`p.z -= t`) through a vertical fold —
// `p.y = abs(mod(d - 2.0, 4.0) - 2.0)` — which stacks space into repeating 4-unit
// HORIZON STRATA, while `length(cos(p.xz)) - 0.4` carves a tube field in the ground
// plane. The result is a luminous, layered corridor of strata flying toward a
// vanishing point, accumulated over 30 march steps and tone-mapped with `tanh`.
//
// The GLSL (SHADER_SRC / VERT_SRC), the vertex buffer, the uniform wiring and the
// render loop are byte-for-byte the prompt's original. The ONLY additions are
// optional, opt-in, and never touch the draw path:
//   • `paused`   — freezes the march clock (the field holds its current frame).
//   • `onSample` — fires ~2×/s with the shader's own `iTime`/`iFrame`/fps so a host
//                  page can drive telemetry without re-reading the GPU.
//   • `fill`     — when true the canvas fills its parent (100%/100%) instead of the
//                  original 100vw/100vh, so it can be embedded in a framed lab.
// With no props it behaves identically to the brief's `export default Component`.
"use client";
import { useEffect, useRef } from "react";

const SHADER_SRC = `#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 v_uv;

uniform vec3  iResolution;
uniform float iTime;
uniform int   iFrame;
uniform vec4  iMouse;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
  vec2  r  = iResolution.xy;
  float t  = iTime;
  vec3  FC = vec3(fragCoord, t);
  vec4  o  = vec4(0.0);

  vec3 s = normalize(FC.rgb * 2.1 - r.xyy), p, c = s;
  c /= max(1e-4, abs(c.y));
  c.z -= t;

  float z = 0.0, d = 1.0;
  for (float i = 0.0; i < 30.0; i++)
  {
    p = s * z;
    p.z -= t;
    float py = p.y;
    d = ++py;
    p.y = abs(mod(d - 2.0, 4.0) - 2.0);
    p += 0.03 * sin(c / 0.04) * abs(p.y - d);
    float dxz = abs(length(cos(p.xz)) - 0.4);
    float dy  = abs(cos(p.y + z));
    float stepLen = 0.6 * dxz + 0.1 * dy;
    z += stepLen;
    d  = max(stepLen, 1e-4);
    o.rgb += (1.1 - sin(p)) / d;
  }

  o = tanh(o / 400.0);
  fragColor = vec4(o.rgb, 1.0);
}

void main(){ mainImage(fragColor, gl_FragCoord.xy); }
`;

const VERT_SRC = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main(){
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
	const sh = gl.createShader(type)!;
	gl.shaderSource(sh, src);
	gl.compileShader(sh);
	if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
		console.error(gl.getShaderInfoLog(sh) || "");
		gl.deleteShader(sh);
		return null;
	}
	return sh;
}
function link(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader) {
	const prog = gl.createProgram()!;
	gl.attachShader(prog, vs);
	gl.attachShader(prog, fs);
	gl.linkProgram(prog);
	if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
		console.error(gl.getProgramInfoLog(prog) || "");
		gl.deleteProgram(prog);
		return null;
	}
	return prog;
}

/** A single per-frame readout of the shader's own clock — for host telemetry. */
export interface StrataSample {
	/** Seconds the field has marched — the exact value driving `iTime`. */
	time: number;
	/** Frame counter handed to `iFrame`. */
	frame: number;
	/** Smoothed frames-per-second from requestAnimationFrame deltas. */
	fps: number;
}

export interface StrataLabProps {
	/** Freeze the march clock; the strata corridor holds its current frame. */
	paused?: boolean;
	/** Fires ~2×/second with the live shader clock + frame rate for HUD readouts. */
	onSample?: (s: StrataSample) => void;
	/** Fill the parent box (100%/100%) instead of the original 100vw/100vh. */
	fill?: boolean;
	className?: string;
}

export default function Component({
	paused = false,
	onSample,
	fill = false,
	className,
}: StrataLabProps = {}) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	// Keep the latest callback / paused flag in refs so the render loop never re-binds.
	const onSampleRef = useRef(onSample);
	const pausedRef = useRef(paused);
	onSampleRef.current = onSample;
	pausedRef.current = paused;

	useEffect(() => {
		const canvas = canvasRef.current!;
		const glOrNull = canvas.getContext("webgl2", { premultipliedAlpha: false });
		if (!glOrNull) return;
		// Pin a non-null binding so the type survives into the render / cleanup closures
		// below (the repo's strict null-checks otherwise re-widen `getContext`'s result).
		const gl: WebGL2RenderingContext = glOrNull;

		const vao = gl.createVertexArray()!;
		gl.bindVertexArray(vao);
		const vbo = gl.createBuffer()!;
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

		const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
		const fs = compile(gl, gl.FRAGMENT_SHADER, SHADER_SRC);
		if (!vs || !fs) return;
		const program = link(gl, vs, fs);
		if (!program) return;
		gl.useProgram(program);

		const uRes = gl.getUniformLocation(program, "iResolution");
		const uTime = gl.getUniformLocation(program, "iTime");
		const uFrame = gl.getUniformLocation(program, "iFrame");
		const uMouse = gl.getUniformLocation(program, "iMouse");

		const mouse = { x: 0, y: 0, l: 0, r: 0 };
		function onMove(e: MouseEvent) {
			const rect = canvas.getBoundingClientRect();
			mouse.x = e.clientX - rect.left;
			mouse.y = rect.height - (e.clientY - rect.top);
		}
		function onDown(e: MouseEvent) {
			if (e.button === 0) mouse.l = 1;
		}
		function onUp(e: MouseEvent) {
			if (e.button === 0) mouse.l = 0;
		}
		function onContextMenu(e: MouseEvent) {
			e.preventDefault();
		}
		canvas.addEventListener("mousemove", onMove);
		canvas.addEventListener("mousedown", onDown);
		canvas.addEventListener("mouseup", onUp);
		canvas.addEventListener("contextmenu", onContextMenu);

		let ro: ResizeObserver | null = null;
		const applySize = () => {
			const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
			const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
			const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
			if (canvas.width !== w || canvas.height !== h) {
				canvas.width = w;
				canvas.height = h;
				gl.viewport(0, 0, w, h);
			}
		};
		ro = new ResizeObserver(() => applySize());
		ro.observe(canvas);
		applySize();

		let raf = 0;
		const start = performance.now();
		let frame = 0;
		// --- opt-in instrumentation: a paused clock + a smoothed fps sampler.
		// These never gate `drawArrays`, so the original render is untouched.
		let clock = 0; // accumulated march seconds (honours `paused`)
		let last = start;
		let fpsEMA = 60;
		let lastEmit = 0;

		function tick(now: number) {
			const dtReal = (now - last) / 1000;
			last = now;
			if (dtReal > 0) fpsEMA = fpsEMA + (1 / dtReal - fpsEMA) * 0.1;
			if (!pausedRef.current) clock += dtReal;
			const t = clock;
			frame++;
			applySize();
			const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
			uRes && gl.uniform3f(uRes, canvas.width, canvas.height, dpr);
			uTime && gl.uniform1f(uTime, t);
			uFrame && gl.uniform1i(uFrame, frame);
			uMouse && gl.uniform4f(uMouse, mouse.x, mouse.y, mouse.l, mouse.r);
			gl.bindVertexArray(vao);
			gl.drawArrays(gl.TRIANGLES, 0, 3);

			if (onSampleRef.current && now - lastEmit > 500) {
				lastEmit = now;
				onSampleRef.current({ time: t, frame, fps: Math.round(fpsEMA) });
			}
			raf = requestAnimationFrame(tick);
		}
		raf = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(raf);
			canvas.removeEventListener("mousemove", onMove);
			canvas.removeEventListener("mousedown", onDown);
			canvas.removeEventListener("mouseup", onUp);
			canvas.removeEventListener("contextmenu", onContextMenu);
			try {
				ro && ro.disconnect();
			} catch {}
			try {
				gl.deleteProgram(program);
			} catch {}
			try {
				gl.deleteShader(vs);
			} catch {}
			try {
				gl.deleteShader(fs);
			} catch {}
			try {
				gl.deleteBuffer(vbo);
			} catch {}
			try {
				gl.deleteVertexArray(vao);
			} catch {}
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className={className}
			style={{
				width: fill ? "100%" : "100vw",
				height: fill ? "100%" : "100vh",
				display: "block",
				background: "black",
				cursor: "crosshair",
			}}
		/>
	);
}
