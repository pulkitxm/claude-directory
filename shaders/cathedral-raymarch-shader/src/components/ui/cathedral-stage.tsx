"use client";

/**
 * CathedralStage — an instrument-grade wrapper around the prompt's verbatim
 * `cathedral.tsx` shader runtime.
 *
 * The default export of `cathedral.tsx` is hard-fixed to the viewport
 * (`position: fixed; inset: 0`), which is correct for a drop-in fullscreen
 * background but impossible to frame inside a page. This component keeps the
 * EXACT same WebGL2 plumbing and the EXACT same Shadertoy `mainImage` body, but:
 *
 *   • renders into its own positioned box (`fill` ⇒ absolute, else the same fixed),
 *   • promotes the runtime's hidden knobs to props — `pixelRatio`, `timeScale`,
 *     `paused`, `exposure` — wired to the live `iTime` clock / DPR / a new
 *     `iExposure` uniform appended after the original `mainImage`,
 *   • forwards the pointer to the shader's `iMouse` exactly as the original does,
 *   • samples the rendered framebuffer once per second via `gl.readPixels` and
 *     reports center-pixel luminance + the dominant stained-glass channel back
 *     out through `onSample`, so the page chrome can read the nave's real state
 *     off the GPU instead of faking a timer.
 *
 * The original `mainImage` is reproduced byte-for-byte; only the `main()` entry
 * point is extended to multiply the resolved colour by `iExposure`.
 */

import { useEffect, useRef } from "react";

/* ========= The prompt's fragment shader — mainImage() verbatim ========= */
/* The only addition is the `iExposure` uniform + its use in main(). */
export const CATHEDRAL_FRAG = `#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 v_uv;

uniform vec3  iResolution;   // (width, height, dpr)
uniform float iTime;         // seconds
uniform int   iFrame;        // frame counter
uniform vec4  iMouse;        // (x, y, L, R)
uniform float iExposure;     // post gain on the resolved colour

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2  r  = iResolution.xy;
    float t  = iTime;
    vec3  FC = vec3(fragCoord, t);
    vec4  o  = vec4(0.0);

    vec3 p;
    for (float i, z, d; i++ < 5e1; o += (sin(p.y + vec4(6., 1., 2., 3.)) + 2.) / d / z)
    {
        p = z * normalize(FC.rgb * 2. - r.xyx) + t;
        z += d = length(vec2(
            length(cos(sin(.5 * p) + p).xy + 1.) - 2.,
            min(d = p.z - t + 9., d * .1) * .5
        ));
    }

    o = tanh(o / 5e1);
    fragColor = vec4(o.rgb, 1.0);
}

void main(){
  vec4 col;
  mainImage(col, gl_FragCoord.xy);
  fragColor = vec4(col.rgb * iExposure, 1.0);
}
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

/* ========= WebGL helpers (no throw) ========= */
function safeCompile(gl: WebGL2RenderingContext, type: number, src: string) {
	const sh = gl.createShader(type)!;
	gl.shaderSource(sh, src);
	gl.compileShader(sh);
	const ok = gl.getShaderParameter(sh, gl.COMPILE_STATUS);
	const log = gl.getShaderInfoLog(sh) || "";
	return { shader: ok ? sh : null, log };
}
function safeLink(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader) {
	const prog = gl.createProgram()!;
	gl.attachShader(prog, vs);
	gl.attachShader(prog, fs);
	gl.linkProgram(prog);
	const ok = gl.getProgramParameter(prog, gl.LINK_STATUS);
	const log = gl.getProgramInfoLog(prog) || "";
	return { program: ok ? prog : null, log };
}
function drawError(gl: WebGL2RenderingContext, msg: string) {
	console.error(msg);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.clearColor(0.16, 0.01, 0.04, 1);
	gl.clear(gl.COLOR_BUFFER_BIT);
}

/** Per-frame telemetry the page chrome reads back off the GPU. */
export type CathedralSample = {
	/** Seconds elapsed on the shader clock (respects timeScale + pause). */
	time: number;
	/** Measured frames-per-second, EMA-smoothed. */
	fps: number;
	/** Drawing-buffer pixels (already DPR-scaled). */
	width: number;
	height: number;
	/** Cursor in CSS px from the canvas top-left (y already flipped to GL space). */
	mouseX: number;
	mouseY: number;
	/** Center-pixel luminance 0..1, read via gl.readPixels. */
	luma: number;
	/** Dominant stained-glass channel of the center pixel. */
	channel: "rose" | "gold" | "azure";
};

export type CathedralStageProps = {
	/** When true, fills the nearest positioned ancestor instead of the viewport. */
	fill?: boolean;
	/** Clamp/override the device-pixel-ratio (1..2). */
	pixelRatio?: number;
	/** Multiplies the rate the `iTime` clock advances (0 = frozen, 1 = realtime). */
	timeScale?: number;
	/** Hard-freeze the clock (clock holds, render keeps running). */
	paused?: boolean;
	/** Post gain on the resolved colour (the `iExposure` uniform). */
	exposure?: number;
	/** Telemetry pump — called ~once/sec with GPU-sampled state. */
	onSample?: (s: CathedralSample) => void;
	className?: string;
};

export default function CathedralStage({
	fill = false,
	pixelRatio,
	timeScale = 1,
	paused = false,
	exposure = 1,
	onSample,
	className,
}: CathedralStageProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	// Live-prop mirrors so the RAF loop reads current values without re-binding.
	const timeScaleRef = useRef(timeScale);
	const pausedRef = useRef(paused);
	const exposureRef = useRef(exposure);
	const pixelRatioRef = useRef(pixelRatio);
	const onSampleRef = useRef(onSample);
	timeScaleRef.current = timeScale;
	pausedRef.current = paused;
	exposureRef.current = exposure;
	pixelRatioRef.current = pixelRatio;
	onSampleRef.current = onSample;

	useEffect(() => {
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext("webgl2", { premultipliedAlpha: false });
		if (!ctx) return;
		// Capture as a non-null const so the narrowing survives into the hoisted
		// helpers below (TS loses `if (!ctx) return` narrowing across `function` decls).
		const gl: WebGL2RenderingContext = ctx;

		let disposed = false;

		// Geometry — fullscreen triangle (identical to the original runtime).
		const vao = gl.createVertexArray()!;
		gl.bindVertexArray(vao);
		const vbo = gl.createBuffer()!;
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 3, -1, -1, 3]),
			gl.STATIC_DRAW,
		);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

		// Shaders
		const { shader: vs, log: vsLog } = safeCompile(gl, gl.VERTEX_SHADER, VERT_SRC);
		if (!vs) {
			drawError(gl, `Vertex compile error:\n${vsLog}`);
			return cleanup;
		}
		const { shader: fs, log: fsLog } = safeCompile(
			gl,
			gl.FRAGMENT_SHADER,
			CATHEDRAL_FRAG,
		);
		if (!fs) {
			drawError(gl, `Fragment compile error:\n${fsLog}`);
			gl.deleteShader(vs);
			return cleanup;
		}
		const { program, log: linkLog } = safeLink(gl, vs, fs);
		gl.deleteShader(vs);
		gl.deleteShader(fs);
		if (!program) {
			drawError(gl, `Program link error:\n${linkLog}`);
			return cleanup;
		}

		const uResolution = gl.getUniformLocation(program, "iResolution");
		const uTime = gl.getUniformLocation(program, "iTime");
		const uFrame = gl.getUniformLocation(program, "iFrame");
		const uMouse = gl.getUniformLocation(program, "iMouse");
		const uExposure = gl.getUniformLocation(program, "iExposure");

		const getDpr = () => {
			const sys = window.devicePixelRatio || 1;
			return Math.max(1, Math.min(2, pixelRatioRef.current ?? sys));
		};

		// Resize (ResizeObserver, RAF-coalesced) — same shape as the original.
		let resizeScheduled = false;
		function applySize() {
			resizeScheduled = false;
			if (disposed) return;
			const dpr = getDpr();
			const cssW = Math.max(1, canvas.clientWidth | 0);
			const cssH = Math.max(1, canvas.clientHeight | 0);
			const w = Math.max(1, Math.floor(cssW * dpr));
			const h = Math.max(1, Math.floor(cssH * dpr));
			if (canvas.width !== w || canvas.height !== h) {
				canvas.width = w;
				canvas.height = h;
				gl.viewport(0, 0, w, h);
			}
		}
		function scheduleSize() {
			if (resizeScheduled) return;
			resizeScheduled = true;
			requestAnimationFrame(applySize);
		}
		const ro = new ResizeObserver(scheduleSize);
		ro.observe(canvas);
		scheduleSize();

		// Pointer → iMouse (verbatim mapping: x left-origin, y flipped to GL space).
		const mouse = { x: 0, y: 0, l: 0, r: 0 };
		function onMove(e: MouseEvent) {
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			mouse.x = Math.max(0, Math.min(x, rect.width));
			mouse.y = Math.max(0, Math.min(rect.height - y, rect.height));
		}
		function onDown(e: MouseEvent) {
			if (e.button === 0) mouse.l = 1;
			if (e.button === 2) mouse.r = 1;
		}
		function onUp(e: MouseEvent) {
			if (e.button === 0) mouse.l = 0;
			if (e.button === 2) mouse.r = 0;
		}
		canvas.addEventListener("mousemove", onMove);
		canvas.addEventListener("mousedown", onDown);
		canvas.addEventListener("mouseup", onUp);
		const onCtx = (e: Event) => e.preventDefault();
		canvas.addEventListener("contextmenu", onCtx);

		// Context loss / restore.
		let raf: number | null = null;
		function onContextLost(ev: Event) {
			ev.preventDefault();
			if (raf) cancelAnimationFrame(raf);
			raf = null;
		}
		function onContextRestored() {
			scheduleSize();
			last = performance.now();
			frame = 0;
			if (!raf) raf = requestAnimationFrame(tick);
		}
		canvas.addEventListener("webglcontextlost", onContextLost);
		canvas.addEventListener("webglcontextrestored", onContextRestored);

		// Clock — accumulated so timeScale / pause never jump the shader.
		let clock = 0; // seconds fed to iTime
		let last = performance.now();
		let frame = 0;
		let fpsEma = 60;
		let lastSample = 0;
		const px = new Uint8Array(4);

		function tick(now: number) {
			if (disposed) return;
			if (gl.isContextLost()) {
				raf = requestAnimationFrame(tick);
				return;
			}

			const dtMs = now - last;
			last = now;
			const dt = dtMs / 1000;
			if (dtMs > 0) fpsEma += (1000 / dtMs - fpsEma) * 0.1;

			if (!pausedRef.current) clock += dt * Math.max(0, timeScaleRef.current);
			frame += 1;

			try {
				gl.useProgram(program);
				if (resizeScheduled) applySize();
				const dpr = getDpr();
				const w = canvas.width;
				const h = canvas.height;

				if (uResolution) gl.uniform3f(uResolution, w, h, dpr);
				if (uTime) gl.uniform1f(uTime, clock);
				if (uFrame) gl.uniform1i(uFrame, frame);
				if (uMouse) gl.uniform4f(uMouse, mouse.x * dpr, mouse.y * dpr, mouse.l, mouse.r);
				if (uExposure) gl.uniform1f(uExposure, Math.max(0, exposureRef.current));

				gl.bindVertexArray(vao);
				gl.drawArrays(gl.TRIANGLES, 0, 3);

				// Telemetry — sample the center pixel ~once/sec off the GPU.
				if (onSampleRef.current && now - lastSample > 1000) {
					lastSample = now;
					gl.readPixels(
						(w / 2) | 0,
						(h / 2) | 0,
						1,
						1,
						gl.RGBA,
						gl.UNSIGNED_BYTE,
						px,
					);
					const r = px[0] / 255;
					const g = px[1] / 255;
					const b = px[2] / 255;
					const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
					const channel: CathedralSample["channel"] =
						r >= g && r >= b ? "rose" : g >= b ? "gold" : "azure";
					onSampleRef.current({
						time: clock,
						fps: fpsEma,
						width: w,
						height: h,
						mouseX: mouse.x,
						mouseY: mouse.y,
						luma,
						channel,
					});
				}
			} catch (err) {
				drawError(gl, (err as Error)?.message ?? String(err));
			}

			raf = requestAnimationFrame(tick);
		}
		raf = requestAnimationFrame(tick);

		function cleanup() {
			disposed = true;
			if (raf) cancelAnimationFrame(raf);
			canvas.removeEventListener("mousemove", onMove);
			canvas.removeEventListener("mousedown", onDown);
			canvas.removeEventListener("mouseup", onUp);
			canvas.removeEventListener("contextmenu", onCtx);
			canvas.removeEventListener("webglcontextlost", onContextLost);
			canvas.removeEventListener("webglcontextrestored", onContextRestored);
			ro.disconnect();
			try {
				gl.deleteBuffer(vbo);
			} catch {
				/* noop */
			}
			try {
				gl.deleteVertexArray(vao);
			} catch {
				/* noop */
			}
			try {
				gl.deleteProgram(program);
			} catch {
				/* noop */
			}
		}

		return cleanup;
		// Re-init only when the surface mode changes; live props are read via refs.
	}, [fill]);

	const positioned: React.CSSProperties = fill
		? { position: "absolute", inset: 0 }
		: {
				position: "fixed",
				inset: 0,
				width: "100vw",
				height: "100dvh",
				background: "black",
				overflow: "hidden",
			};

	return (
		<div style={positioned} className={className}>
			<canvas
				ref={canvasRef}
				style={{ width: "100%", height: "100%", display: "block" }}
			/>
		</div>
	);
}
