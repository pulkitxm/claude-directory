import {
	Brain,
	ChevronDown,
	Infinity as InfinityIcon,
	Play,
	Rocket,
	Shield,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ===========================================================================
   ShaderCanvas
   ---------------------------------------------------------------------------
   The animated aurora background from the prompt, kept faithful to the
   original three.js setup (same orthographic full-screen quad, same uniforms,
   the same vertex + fragment GLSL, the same rAF loop and disposal).

   The only deliberate change from the snippet: the renderer's <canvas> is a
   FIXED, full-viewport background layer (inset-0, -z-10, pointer-events-none).
   In the original the canvas was appended into a `position: relative` div with
   no size, so the shader never actually filled the screen. Pinning it to the
   viewport is what makes the aurora visible behind the UI — exactly the
   "w-full h-screen bg-black" intent of the provided demo.
   =========================================================================== */
const ShaderCanvas = ({ onUnsupported }: { onUnsupported: () => void }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Guard the whole WebGL setup: if a context can't be created (locked-down
		// browsers, blocklisted GPUs, headless without GL) we must NOT let three.js
		// throw out of the effect — that would crash the React tree. Instead we
		// signal the parent to show the CSS aurora fallback.
		let renderer: THREE.WebGLRenderer;
		try {
			renderer = new THREE.WebGLRenderer({ antialias: true });
		} catch (err) {
			console.warn("AnoAI: WebGL unavailable, using CSS fallback.", err);
			onUnsupported();
			return;
		}

		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		// Cap the pixel ratio so the heavy 35-iteration fragment loop stays smooth
		// on hi-DPI displays while remaining crisp.
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		const material = new THREE.ShaderMaterial({
			uniforms: {
				iTime: { value: 0 },
				iResolution: {
					value: new THREE.Vector2(window.innerWidth, window.innerHeight),
				},
			},
			vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
			fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;

        #define NUM_OCTAVES 3

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u*u*(3.0-2.0*u);

          float res = mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
          return res * res;
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.3;
          vec2 shift = vec2(100);
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.4;
          }
          return v;
        }

        void main() {
          vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005);
          vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
          vec2 v;
          vec4 o = vec4(0.0);

          float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

          for (float i = 0.0; i < 35.0; i++) {
            v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5 + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
            float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 35.0));
            vec4 auroraColors = vec4(
              0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4),
              0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5),
              0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3),
              1.0
            );
            vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
            float thinnessFactor = smoothstep(0.0, 1.0, i / 35.0) * 0.6;
            o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
          }

          o = tanh(pow(o / 100.0, vec4(1.6)));
          gl_FragColor = o * 1.5;
        }
      `,
		});

		const geometry = new THREE.PlaneGeometry(2, 2);
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		let frameId = 0;
		const animate = () => {
			material.uniforms.iTime.value += 0.016;
			renderer.render(scene, camera);
			frameId = requestAnimationFrame(animate);
		};
		animate();

		const handleResize = () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			material.uniforms.iResolution.value.set(
				window.innerWidth,
				window.innerHeight,
			);
		};
		window.addEventListener("resize", handleResize);

		// If the GPU context is dropped at runtime, stop the loop and fall back.
		const canvasEl = renderer.domElement;
		const handleContextLost = (e: Event) => {
			e.preventDefault();
			cancelAnimationFrame(frameId);
			onUnsupported();
		};
		canvasEl.addEventListener("webglcontextlost", handleContextLost);

		return () => {
			cancelAnimationFrame(frameId);
			window.removeEventListener("resize", handleResize);
			canvasEl.removeEventListener("webglcontextlost", handleContextLost);
			if (renderer.domElement.parentNode === container) {
				container.removeChild(renderer.domElement);
			}
			geometry.dispose();
			material.dispose();
			renderer.dispose();
		};
	}, [onUnsupported]);

	return (
		<div
			ref={containerRef}
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
		/>
	);
};

/* ===========================================================================
   CssAuroraFallback
   ---------------------------------------------------------------------------
   Pure-CSS approximation of the aurora used when WebGL is unavailable, so the
   hero always has a living, on-brand background instead of flat black.
   =========================================================================== */
const CssAuroraFallback = () => (
	<div
		aria-hidden="true"
		className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
	>
		<div
			className="animate-[drift_18s_ease-in-out_infinite] absolute -left-1/4 top-[-10%] h-[70vh] w-[70vw] rounded-full opacity-70 blur-[80px]"
			style={{
				background:
					"radial-gradient(circle at 30% 30%, rgba(45,212,191,0.55), transparent 60%)",
			}}
		/>
		<div
			className="animate-[drift_22s_ease-in-out_infinite_reverse] absolute right-[-15%] top-[5%] h-[80vh] w-[60vw] rounded-full opacity-70 blur-[90px]"
			style={{
				background:
					"radial-gradient(circle at 60% 40%, rgba(167,139,250,0.5), transparent 62%)",
			}}
		/>
		<div
			className="animate-[drift_26s_ease-in-out_infinite] absolute bottom-[-20%] left-1/3 h-[70vh] w-[70vw] rounded-full opacity-60 blur-[100px]"
			style={{
				background:
					"radial-gradient(circle at 50% 50%, rgba(240,171,252,0.4), transparent 60%)",
			}}
		/>
	</div>
);

/* ===========================================================================
   Small presentational helpers
   =========================================================================== */
type FeatureChip = {
	icon: typeof Rocket;
	label: string;
};

const FEATURES: FeatureChip[] = [
	{ icon: Brain, label: "Reasoning engine" },
	{ icon: Rocket, label: "Ships in seconds" },
	{ icon: Shield, label: "Private by design" },
];

const AVATARS = [
	{ src: "./assets/avatar-1.svg", name: "Mara Velez" },
	{ src: "./assets/avatar-2.svg", name: "Idris Cole" },
	{ src: "./assets/avatar-3.svg", name: "Sana Okafor" },
	{ src: "./assets/avatar-4.svg", name: "Theo Lindqvist" },
];

/* ===========================================================================
   AnoAI
   ---------------------------------------------------------------------------
   The hero composed on top of the live shader. Uses every lucide icon the
   original snippet imported (Infinity, Rocket, Shield, Brain, Play,
   ChevronDown). Default-exported so it matches the prompt's
   `import AnoAI from "@/components/ui/animated-shader-background"`.
   =========================================================================== */
const AnoAI = () => {
	const [webglFailed, setWebglFailed] = useState(false);
	const handleUnsupported = useCallback(() => setWebglFailed(true), []);

	return (
		<div className="relative isolate min-h-screen w-full overflow-x-hidden bg-black text-foreground">
			{/* Live WebGL aurora — falls back to a CSS aurora if WebGL is unavailable */}
			{webglFailed ? (
				<CssAuroraFallback />
			) : (
				<ShaderCanvas onUnsupported={handleUnsupported} />
			)}

			{/* Readability scrim above the shader, below the UI */}
			<div
				aria-hidden="true"
				className="scrim pointer-events-none fixed inset-0 z-10"
			/>

			{/* ---------------- Navbar ---------------- */}
			<header className="animate-rise fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-5">
				<nav className="flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-xl sm:px-6">
					<a href="#" className="flex items-center gap-2.5">
						<span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-teal-300/90 to-violet-400/90 text-black shadow-[0_0_24px_-4px_rgba(94,234,212,0.7)]">
							<InfinityIcon className="h-5 w-5" strokeWidth={2.4} />
						</span>
						<span className="text-[15px] font-semibold tracking-tight">
							Ano<span className="text-accent">AI</span>
						</span>
					</a>

					<div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
						<a className="transition-colors hover:text-foreground" href="#">
							Platform
						</a>
						<a className="transition-colors hover:text-foreground" href="#">
							Research
						</a>
						<a className="transition-colors hover:text-foreground" href="#">
							Pricing
						</a>
						<a className="transition-colors hover:text-foreground" href="#">
							Docs
						</a>
					</div>

					<div className="flex items-center gap-2">
						<a
							href="#"
							className="hidden rounded-xl px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
						>
							Sign in
						</a>
						<a
							href="#"
							className="group inline-flex items-center gap-1.5 rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03]"
						>
							Get access
						</a>
					</div>
				</nav>
			</header>

			{/* ---------------- Hero ---------------- */}
			<main className="relative z-20 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 pb-24 pt-32 text-center">
				{/* Announcement pill */}
				<div
					className="animate-rise mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] py-1.5 pl-1.5 pr-4 text-xs text-muted-foreground backdrop-blur-md"
					style={{ animationDelay: "0.05s" }}
				>
					<span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-teal-300 to-violet-400 px-2.5 py-1 text-[11px] font-semibold text-black">
						<Rocket className="h-3 w-3" strokeWidth={2.6} />
						New
					</span>
					AnoAI v5 — agents that reason across your whole stack
				</div>

				{/* Headline */}
				<h1
					className="animate-rise copy-legible max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl"
					style={{ animationDelay: "0.12s" }}
				>
					<span className="text-aurora">Intelligence,</span>
					<br className="hidden sm:block" /> unbounded.
				</h1>

				{/* Subhead */}
				<p
					className="animate-rise copy-legible mt-6 max-w-xl text-pretty text-base leading-relaxed text-slate-200/90 sm:text-lg"
					style={{ animationDelay: "0.2s" }}
				>
					A self-directed research intelligence that plans, searches, and
					verifies — turning the messy edge of a question into a cited answer
					you can ship.
				</p>

				{/* CTAs */}
				<div
					className="animate-rise mt-9 flex flex-col items-center gap-3 sm:flex-row"
					style={{ animationDelay: "0.28s" }}
				>
					<a
						href="#"
						className="group inline-flex items-center gap-2 rounded-2xl bg-foreground px-6 py-3.5 text-sm font-semibold text-black shadow-[0_8px_40px_-12px_rgba(255,255,255,0.5)] transition-transform duration-200 hover:scale-[1.03]"
					>
						Start building free
						<span className="transition-transform duration-200 group-hover:translate-x-0.5">
							&rarr;
						</span>
					</a>
					<a
						href="#"
						className="group inline-flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:bg-white/[0.08]"
					>
						<span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-accent group-hover:text-black">
							<Play className="h-3.5 w-3.5 translate-x-px fill-current" />
						</span>
						Watch the demo
					</a>
				</div>

				{/* Feature chips (Brain / Rocket / Shield) */}
				<ul
					className="animate-rise mt-12 flex flex-wrap items-center justify-center gap-2.5"
					style={{ animationDelay: "0.36s" }}
				>
					{FEATURES.map(({ icon: Icon, label }) => (
						<li
							key={label}
							className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[13px] text-muted-foreground backdrop-blur-md"
						>
							<Icon className="h-4 w-4 text-accent" strokeWidth={2} />
							{label}
						</li>
					))}
				</ul>

				{/* Social proof */}
				<div
					className="animate-rise mt-12 flex items-center gap-3"
					style={{ animationDelay: "0.44s" }}
				>
					<div className="flex -space-x-2.5">
						{AVATARS.map((a) => (
							<img
								key={a.src}
								src={a.src}
								alt={a.name}
								loading="lazy"
								width={36}
								height={36}
								className="h-9 w-9 rounded-full border-2 border-black/60 object-cover"
							/>
						))}
					</div>
					<p className="text-left text-xs leading-tight text-muted-foreground">
						<span className="font-semibold text-foreground">12,000+</span>{" "}
						researchers
						<br />
						building with AnoAI
					</p>
				</div>
			</main>

			{/* The original component's `divider`, kept and given a role as the
          hero's bottom seam. */}
			<div className="pointer-events-none absolute inset-x-0 bottom-20 z-20 mx-auto max-w-3xl px-6">
				<div className="relative z-10 divider" />
			</div>

			{/* Scroll cue */}
			<a
				href="#"
				className="animate-float absolute inset-x-0 bottom-7 z-20 mx-auto flex w-fit flex-col items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70"
			>
				Scroll
				<ChevronDown className="h-4 w-4" />
			</a>
		</div>
	);
};

export default AnoAI;
