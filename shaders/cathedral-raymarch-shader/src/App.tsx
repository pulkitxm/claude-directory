import { useCallback, useEffect, useRef, useState } from "react";
import {
	Church,
	Flame,
	Gauge,
	Pause,
	Play,
	Sparkles,
	SunMedium,
	Terminal,
} from "lucide-react";

import CathedralStage, {
	type CathedralSample,
} from "@/components/ui/cathedral-stage";
import { cn } from "@/lib/utils";

/**
 * VAULTWORK — CATHEDRAL OF LIGHT
 *
 * The prompt's verbatim `cathedral.tsx` shader (a WebGL2 volumetric ray-march that
 * resolves a luminous vaulted nave of sine-rainbow ribs) is the signature, rendered
 * full-bleed behind everything via `CathedralStage` — the framing wrapper that keeps
 * the exact `mainImage` body and runtime but lets the nave live inside a page and
 * exposes its hidden knobs (pixelRatio / timeScale / paused / exposure) as props.
 *
 * The chrome reads the nave as a cathedral-light analysis bench: gothic tracery and
 * corner reticles frame the live stage, a rose-window reticle on the left rail tracks
 * the pointer light the shader sees, the right rail promotes the runtime knobs to
 * brass faders + named light regimes, and a bottom telemetry strip reports the
 * shader's real per-frame clock / FPS / resolution / cursor light and the center-pixel
 * luminance + dominant stained-glass channel sampled straight off the GPU.
 */

/* ------------------------------------------------------------------ */
/* Light regimes — named presets that snap the runtime knobs.          */
/* ------------------------------------------------------------------ */
type Regime = {
	id: string;
	name: string;
	verse: string;
	timeScale: number;
	exposure: number;
	pixelRatio: number;
};

const REGIMES: Regime[] = [
	{
		id: "vespers",
		name: "Vespers",
		verse: "slow drift · full leading",
		timeScale: 0.45,
		exposure: 1.0,
		pixelRatio: 2,
	},
	{
		id: "matins",
		name: "Matins",
		verse: "dawn cadence · clean glass",
		timeScale: 1.0,
		exposure: 1.18,
		pixelRatio: 2,
	},
	{
		id: "gloria",
		name: "Gloria",
		verse: "bright transept · over-lit",
		timeScale: 1.6,
		exposure: 1.55,
		pixelRatio: 2,
	},
	{
		id: "crypt",
		name: "Crypt",
		verse: "deep undercroft · dim",
		timeScale: 0.7,
		exposure: 0.62,
		pixelRatio: 1,
	},
];

/* ------------------------------------------------------------------ */
/* Small chrome atoms.                                                  */
/* ------------------------------------------------------------------ */
function Stat({
	label,
	value,
	accent,
}: {
	label: string;
	value: string;
	accent?: string;
}) {
	return (
		<div className="flex items-baseline gap-2 whitespace-nowrap">
			<span className="tele text-foreground/35">{label}</span>
			<span className="tele" style={{ color: accent ?? "hsl(var(--foreground) / 0.85)" }}>
				{value}
			</span>
		</div>
	);
}

function Fader({
	icon,
	label,
	value,
	min,
	max,
	step,
	display,
	onChange,
}: {
	icon: React.ReactNode;
	label: string;
	value: number;
	min: number;
	max: number;
	step: number;
	display: string;
	onChange: (v: number) => void;
}) {
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<span className="flex items-center gap-1.5 tele text-foreground/55">
					<span className="text-foreground/40">{icon}</span>
					{label}
				</span>
				<span className="tele text-foreground/85">{display}</span>
			</div>
			<input
				className="fader"
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				aria-label={label}
			/>
		</div>
	);
}

const CHANNEL_COLOR: Record<CathedralSample["channel"], string> = {
	rose: "hsl(var(--glass-rose))",
	gold: "hsl(var(--glass-gold))",
	azure: "hsl(var(--glass-azure))",
};
const CHANNEL_LABEL: Record<CathedralSample["channel"], string> = {
	rose: "ROSE",
	gold: "GOLD",
	azure: "AZURE",
};

/* ------------------------------------------------------------------ */
/* Gothic tracery overlay — pointed arches drawn over the live nave.    */
/* ------------------------------------------------------------------ */
function TraceryOverlay() {
	return (
		<svg
			className="pointer-events-none absolute inset-0 h-full w-full mix-blend-soft-light"
			viewBox="0 0 1200 800"
			preserveAspectRatio="xMidYMid slice"
			aria-hidden
		>
			<defs>
				<linearGradient id="lead" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="hsl(40 30% 92% / 0.0)" />
					<stop offset="55%" stopColor="hsl(40 30% 92% / 0.10)" />
					<stop offset="100%" stopColor="hsl(40 30% 92% / 0.22)" />
				</linearGradient>
			</defs>
			{/* Three lancet arches receding to the apse */}
			{[
				{ cx: 600, w: 520, h: 760 },
				{ cx: 600, w: 360, h: 600 },
				{ cx: 600, w: 220, h: 470 },
			].map((a, i) => {
				const left = a.cx - a.w / 2;
				const right = a.cx + a.w / 2;
				const top = 800 - a.h;
				const apex = top - a.w * 0.28;
				return (
					<path
						key={i}
						d={`M ${left} 800 L ${left} ${top} Q ${a.cx} ${apex} ${right} ${top} L ${right} 800`}
						fill="none"
						stroke="url(#lead)"
						strokeWidth={i === 0 ? 1.4 : 1}
					/>
				);
			})}
			{/* Vault ribs fanning from the apex */}
			{Array.from({ length: 7 }).map((_, i) => {
				const x = 600 + (i - 3) * 150;
				return (
					<line
						key={`rib-${i}`}
						x1="600"
						y1="64"
						x2={x}
						y2="800"
						stroke="hsl(40 30% 92% / 0.05)"
						strokeWidth="1"
					/>
				);
			})}
		</svg>
	);
}

/* ------------------------------------------------------------------ */
/* Corner reticle bracket.                                              */
/* ------------------------------------------------------------------ */
function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
	const base = "absolute h-7 w-7 border-foreground/25";
	const map: Record<string, string> = {
		tl: "left-4 top-4 border-l border-t",
		tr: "right-4 top-4 border-r border-t",
		bl: "left-4 bottom-4 border-l border-b",
		br: "right-4 bottom-4 border-r border-b",
	};
	return <div className={cn(base, map[pos])} aria-hidden />;
}

/* ================================================================== */
/* App                                                                 */
/* ================================================================== */
export default function App() {
	// Runtime knobs wired into the shader.
	const [timeScale, setTimeScale] = useState(1);
	const [exposure, setExposure] = useState(1.15);
	const [pixelRatio, setPixelRatio] = useState(2);
	const [paused, setPaused] = useState(false);
	const [regime, setRegime] = useState<string>("matins");

	// Live telemetry mirror (sampled off the GPU).
	const [sample, setSample] = useState<CathedralSample | null>(null);

	// Cursor light position for the rose-window reticle (CSS px, normalized 0..1).
	const stageWrapRef = useRef<HTMLDivElement | null>(null);
	const [lightUV, setLightUV] = useState({ x: 0.5, y: 0.42 });

	const onSample = useCallback((s: CathedralSample) => setSample(s), []);

	const applyRegime = useCallback((r: Regime) => {
		setRegime(r.id);
		setTimeScale(r.timeScale);
		setExposure(r.exposure);
		setPixelRatio(r.pixelRatio);
		setPaused(false);
	}, []);

	// Mark the regime "custom" the moment a fader is touched.
	const nudge = useCallback(
		(setter: (v: number) => void) => (v: number) => {
			setter(v);
			setRegime("custom");
		},
		[],
	);

	// Track pointer over the stage to drive the rose-window reticle.
	useEffect(() => {
		const el = stageWrapRef.current;
		if (!el) return;
		function onMove(e: PointerEvent) {
			const rect = el!.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			const y = (e.clientY - rect.top) / rect.height;
			setLightUV({
				x: Math.max(0, Math.min(1, x)),
				y: Math.max(0, Math.min(1, y)),
			});
		}
		el.addEventListener("pointermove", onMove);
		return () => el.removeEventListener("pointermove", onMove);
	}, []);

	const channel = sample?.channel ?? "gold";
	const accent = CHANNEL_COLOR[channel];

	return (
		<main className="relative min-h-[100dvh] w-full overflow-x-hidden bg-background text-foreground">
			{/* ============================ THE NAVE ============================ */}
			<section className="relative h-[100dvh] w-full overflow-hidden">
				{/* Live shader — the prompt's verbatim cathedral runtime, framed. */}
				<div ref={stageWrapRef} className="absolute inset-0">
					<CathedralStage
						fill
						timeScale={timeScale}
						exposure={exposure}
						pixelRatio={pixelRatio}
						paused={paused}
						onSample={onSample}
					/>
				</div>

				{/* Gothic tracery + grain + legibility scrims */}
				<TraceryOverlay />
				<div className="pointer-events-none absolute inset-0 nave-grain opacity-60" />
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,transparent_40%,hsl(258_40%_3%/0.55)_100%)]" />
				<div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/85 to-transparent" />
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background/92 to-transparent" />

				{/* Corner reticles */}
				<Corner pos="tl" />
				<Corner pos="tr" />
				<Corner pos="bl" />
				<Corner pos="br" />

				{/* ---------------------- Top monument bar ---------------------- */}
				<header className="animate-hud-in pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-6 pt-7 sm:px-10">
					<div className="flex items-center gap-3">
						<span className="grid h-9 w-9 place-items-center rounded-sm border border-foreground/20 bg-background/40 backdrop-blur">
							<Church className="h-4 w-4 text-glass-gold" />
						</span>
						<div className="leading-tight">
							<div className="tele text-foreground/55">VAULTWORK · ORDO LUCIS</div>
							<div className="tele text-foreground/30">Cathedral of Light — Bay IX</div>
						</div>
					</div>
					<div className="hidden items-center gap-2 sm:flex">
						<span
							className="h-1.5 w-1.5 animate-candle-flicker rounded-full"
							style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
						/>
						<span className="tele text-foreground/55">
							{paused ? "OFFICE HELD" : "OFFICE LIVE"}
						</span>
					</div>
				</header>

				{/* ---------------------- Center lockup ---------------------- */}
				<div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
					<div className="animate-reveal-blur tele mb-5 text-foreground/45">
						WEBGL2 · VOLUMETRIC RAY-MARCH · 50 STEPS
					</div>
					<h1 className="animate-reveal-up text-monument text-[clamp(3.25rem,12vw,9.5rem)] text-foreground drop-shadow-[0_2px_40px_rgba(0,0,0,0.6)]">
						Cathedral
						<span className="block text-[0.42em] tracking-monument text-foreground/65">
							OF&nbsp;LIGHT
						</span>
					</h1>
					<p className="animate-reveal-up mt-6 max-w-md font-body text-sm leading-relaxed text-foreground/55 [animation-delay:120ms]">
						A single fragment shader folds fifty marching steps into a vaulted
						nave of leaded, sine-rainbow light. Move the pointer to carry the
						lantern through the apse.
					</p>
				</div>

				{/* ---------------------- Left rail: regimes + rose reticle ---------------------- */}
				<aside className="animate-rail-in absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 pl-6 sm:block">
					<div className="glass-panel w-[208px] rounded-md p-3.5">
						<div className="mb-3 flex items-center gap-2">
							<Flame className="h-3.5 w-3.5 text-glass-gold" />
							<span className="tele text-foreground/55">Light Regimes</span>
						</div>
						<div className="space-y-1.5">
							{REGIMES.map((r) => {
								const active = regime === r.id;
								return (
									<button
										key={r.id}
										onClick={() => applyRegime(r)}
										className={cn(
											"group w-full rounded-sm border px-2.5 py-2 text-left transition-colors",
											active
												? "border-glass-gold/45 bg-glass-gold/10"
												: "border-border/70 bg-background/20 hover:border-foreground/25 hover:bg-background/40",
										)}
									>
										<div className="flex items-center justify-between">
											<span
												className={cn(
													"font-display text-base leading-none",
													active ? "text-foreground" : "text-foreground/80",
												)}
											>
												{r.name}
											</span>
											{active && (
												<span className="h-1.5 w-1.5 rounded-full bg-glass-gold shadow-[0_0_8px] shadow-glass-gold/70" />
											)}
										</div>
										<div className="tele mt-1 text-foreground/35">{r.verse}</div>
									</button>
								);
							})}
						</div>

						{/* Rose-window reticle — tracks the pointer light the shader reads. */}
						<div className="mt-3.5 leaded-rule" />
						<div className="mt-3 flex items-center gap-2">
							<div className="relative h-[68px] w-[68px] shrink-0">
								<div className="absolute inset-0 animate-sweep-spin rounded-full border border-foreground/15" />
								<div className="absolute inset-[10px] rounded-full border border-foreground/10" />
								<div className="absolute inset-0">
									{/* radial spokes */}
									{Array.from({ length: 8 }).map((_, i) => (
										<span
											key={i}
											className="absolute left-1/2 top-1/2 h-[34px] w-px origin-top -translate-x-1/2 bg-foreground/12"
											style={{ transform: `rotate(${i * 45}deg)` }}
										/>
									))}
								</div>
								{/* lantern dot */}
								<span
									className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
									style={{
										left: `${lightUV.x * 100}%`,
										top: `${lightUV.y * 100}%`,
										background: accent,
										boxShadow: `0 0 12px ${accent}`,
									}}
								/>
							</div>
							<div className="leading-snug">
								<div className="tele text-foreground/40">LANTERN</div>
								<div className="tele text-foreground/80">
									x {lightUV.x.toFixed(2)}
								</div>
								<div className="tele text-foreground/80">
									y {lightUV.y.toFixed(2)}
								</div>
							</div>
						</div>
					</div>
				</aside>

				{/* ---------------------- Right rail: control deck ---------------------- */}
				<aside className="animate-rail-in-right absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 pr-6 sm:block">
					<div className="glass-panel w-[228px] rounded-md p-3.5">
						<div className="mb-3.5 flex items-center justify-between">
							<span className="flex items-center gap-2 tele text-foreground/55">
								<Gauge className="h-3.5 w-3.5 text-glass-azure" />
								Office Controls
							</span>
						</div>

						<div className="space-y-4">
							<Fader
								icon={<Sparkles className="h-3 w-3" />}
								label="Cadence"
								value={timeScale}
								min={0}
								max={2.5}
								step={0.01}
								display={`${timeScale.toFixed(2)}×`}
								onChange={nudge(setTimeScale)}
							/>
							<Fader
								icon={<SunMedium className="h-3 w-3" />}
								label="Exposure"
								value={exposure}
								min={0.2}
								max={2}
								step={0.01}
								display={exposure.toFixed(2)}
								onChange={nudge(setExposure)}
							/>
							<Fader
								icon={<Gauge className="h-3 w-3" />}
								label="Render scale"
								value={pixelRatio}
								min={1}
								max={2}
								step={0.05}
								display={`${pixelRatio.toFixed(2)}×`}
								onChange={nudge(setPixelRatio)}
							/>
						</div>

						<div className="mt-4 leaded-rule" />

						<button
							onClick={() => setPaused((p) => !p)}
							className={cn(
								"mt-3.5 flex w-full items-center justify-center gap-2 rounded-sm border px-3 py-2 transition-colors",
								paused
									? "border-glass-gold/45 bg-glass-gold/10 text-foreground"
									: "border-border/70 bg-background/20 text-foreground/80 hover:border-foreground/25 hover:bg-background/40",
							)}
						>
							{paused ? (
								<Play className="h-3.5 w-3.5" />
							) : (
								<Pause className="h-3.5 w-3.5" />
							)}
							<span className="tele">{paused ? "Resume office" : "Hold office"}</span>
						</button>
					</div>
				</aside>

				{/* ---------------------- Bottom telemetry strip ---------------------- */}
				<footer className="animate-hud-in absolute inset-x-0 bottom-0 z-20 px-6 pb-6 sm:px-10">
					<div className="leaded-rule mb-3" />
					<div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
						<div className="flex flex-wrap items-center gap-x-6 gap-y-2">
							<Stat
								label="Nave clock"
								value={sample ? `${sample.time.toFixed(1)}s` : "—"}
							/>
							<Stat
								label="Refresh"
								value={sample ? `${Math.round(sample.fps)} fps` : "—"}
							/>
							<Stat
								label="Glass"
								value={sample ? `${(sample.width / pixelRatio) | 0}×${(sample.height / pixelRatio) | 0}` : "—"}
							/>
							<Stat
								label="Lantern"
								value={
									sample
										? `${sample.mouseX.toFixed(0)},${sample.mouseY.toFixed(0)}`
										: "—"
								}
							/>
						</div>
						<div className="flex flex-wrap items-center gap-x-6 gap-y-2">
							<Stat
								label="Lumen"
								value={sample ? sample.luma.toFixed(3) : "—"}
								accent={accent}
							/>
							<Stat
								label="Dominant"
								value={sample ? CHANNEL_LABEL[channel] : "—"}
								accent={accent}
							/>
						</div>
					</div>
				</footer>
			</section>

			{/* ===================== INTEGRATION STORY ===================== */}
			<IntegrationStory />
		</main>
	);
}

/* ================================================================== */
/* Below-the-fold: the shadcn / Tailwind / TypeScript integration story.*/
/* ================================================================== */
function IntegrationStory() {
	return (
		<section className="relative border-t border-border/70 bg-background">
			<div className="mx-auto max-w-5xl px-6 py-20 sm:px-10">
				{/* Heading */}
				<div className="max-w-2xl">
					<div className="tele mb-3 text-glass-gold/80">INTEGRATION DOSSIER</div>
					<h2 className="text-monument text-4xl text-foreground sm:text-5xl">
						Dropping the nave into{" "}
						<span className="text-foreground/55">components/ui</span>
					</h2>
					<p className="mt-5 font-body text-[15px] leading-relaxed text-foreground/60">
						The verbatim <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground/80">cathedral.tsx</code>{" "}
						is a self-contained WebGL2 component — no props, no context, no
						assets, no runtime dependencies. It is copy-pasted unchanged into{" "}
						<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground/80">@/components/ui/cathedral.tsx</code>
						; the framed instrument you scrolled past is a thin wrapper around
						the same shader runtime.
					</p>
				</div>

				{/* Q&A — the prompt's "Questions to Ask" */}
				<div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border/70 bg-border/70 sm:grid-cols-2">
					{[
						{
							q: "What props / data does it take?",
							a: "The verbatim component takes none — it is a default-export with no props. The instrument wrapper adds optional knobs (pixelRatio, timeScale, paused, exposure, onSample) that flow into the shader's uniforms.",
						},
						{
							q: "State management requirements?",
							a: "None external. All state is local: useRef holds the GL handles, RAF loop, clock and pointer; no store, no provider, no context. SSR-safe behind the original \"use client\".",
						},
						{
							q: "Required assets (images, icons)?",
							a: "Zero image assets — the nave is 100% procedural GLSL. The instrument chrome uses lucide-react icons only; fonts (Cormorant Garamond / Inter / JetBrains Mono) are vendored locally as woff2.",
						},
						{
							q: "Expected responsive behavior?",
							a: "A ResizeObserver re-fits the drawing buffer to the box at a clamped 1–2× DPR every frame it changes; the fullscreen default tracks 100vw / 100dvh, the framed wrapper fills its positioned ancestor.",
						},
						{
							q: "Best place to use it?",
							a: "As a full-bleed hero / section background, a landing splash, a loading veil, or — as shown here — the live stage of a shader showcase. Anywhere a quiet, GPU-cheap moving backdrop earns its place.",
						},
						{
							q: "Why /components/ui specifically?",
							a: "shadcn's components.json maps the \"ui\" alias to @/components/ui. Placing the file there makes the @/components/ui/cathedral import in the demo resolve, and keeps it on the same shelf the CLI installs primitives into.",
						},
					].map((item) => (
						<div key={item.q} className="bg-background p-6">
							<div className="font-display text-xl text-foreground">{item.q}</div>
							<p className="mt-2 font-body text-[14px] leading-relaxed text-foreground/55">
								{item.a}
							</p>
						</div>
					))}
				</div>

				{/* Setup blocks */}
				<div className="mt-14 grid gap-8 lg:grid-cols-2">
					<SetupCard
						step="01"
						title="Scaffold a shadcn-ready project"
						note="Only if your codebase isn't already Vite + React + TS + Tailwind + shadcn."
						lines={[
							"# Vite + React + TypeScript",
							"npm create vite@latest my-app -- --template react-ts",
							"cd my-app",
							"",
							"# Tailwind CSS",
							"npm i -D tailwindcss postcss autoprefixer",
							"npx tailwindcss init -p",
							"",
							"# shadcn — writes components.json + the ui alias",
							"npx shadcn@latest init",
						]}
					/>
					<SetupCard
						step="02"
						title="Place the component + render it"
						note="The import path must resolve to the components.json ui alias."
						lines={[
							"# 1 — copy the file verbatim",
							"src/components/ui/cathedral.tsx",
							"",
							"# 2 — the @ alias (vite.config.ts + tsconfig)",
							'"@/*": ["./src/*"]',
							"",
							"# 3 — render it (the prompt's demo.tsx)",
							'import Component from',
							'  "@/components/ui/cathedral";',
							"export default () => <Component />;",
						]}
					/>
				</div>

				{/* Why /components/ui callout */}
				<div className="mt-10 rounded-lg border border-glass-gold/25 bg-glass-gold/[0.06] p-6">
					<div className="flex items-center gap-2">
						<Terminal className="h-4 w-4 text-glass-gold" />
						<span className="tele text-glass-gold/90">
							WHY THE /COMPONENTS/UI FOLDER MATTERS
						</span>
					</div>
					<p className="mt-3 font-body text-[14px] leading-relaxed text-foreground/65">
						The demo imports{" "}
						<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground/80">
							@/components/ui/cathedral
						</code>
						. shadcn's{" "}
						<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground/80">
							components.json
						</code>{" "}
						declares <span className="text-foreground/80">aliases.ui = "@/components/ui"</span>,
						and the <span className="text-foreground/80">@</span> alias maps to{" "}
						<span className="text-foreground/80">./src</span>. If the folder doesn't
						exist, that import can't resolve and every shadcn primitive you add
						later (which the CLI also drops into{" "}
						<span className="text-foreground/80">components/ui</span>) lands in a
						different place — so create it first and keep all UI primitives on one
						predictable shelf.
					</p>
				</div>

				{/* Props / uniforms API */}
				<div className="mt-14">
					<div className="tele mb-4 text-foreground/45">
						INSTRUMENT WRAPPER · PROPS & SHADER UNIFORMS
					</div>
					<div className="overflow-hidden rounded-lg border border-border/70">
						<table className="w-full border-collapse text-left font-mono text-[13px]">
							<thead>
								<tr className="bg-muted/60 text-foreground/55">
									<th className="px-4 py-3 font-medium">prop / uniform</th>
									<th className="px-4 py-3 font-medium">type</th>
									<th className="px-4 py-3 font-medium">role</th>
								</tr>
							</thead>
							<tbody className="text-foreground/70">
								{[
									["pixelRatio", "number?", "Clamp DPR 1–2 → iResolution.z"],
									["timeScale", "number?", "Scales the iTime advance (0 = frozen)"],
									["paused", "boolean?", "Holds the clock; render keeps running"],
									["exposure", "number?", "Post gain on colour → iExposure"],
									["fill", "boolean?", "Fill ancestor vs. fixed fullscreen"],
									["onSample", "(s) => void", "GPU-read luma + channel ~1×/sec"],
								].map(([a, b, c], i) => (
									<tr
										key={a}
										className={cn(
											"border-t border-border/60",
											i % 2 ? "bg-background" : "bg-background/40",
										)}
									>
										<td className="px-4 py-3 text-glass-azure">{a}</td>
										<td className="px-4 py-3 text-foreground/50">{b}</td>
										<td className="px-4 py-3 font-body text-foreground/70">{c}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<p className="mt-4 font-mono text-[12px] leading-relaxed text-foreground/40">
						The dropped-in <span className="text-foreground/60">cathedral.tsx</span>{" "}
						exposes none of these — it is the zero-prop fullscreen default. The
						wrapper keeps its exact <span className="text-foreground/60">mainImage</span>{" "}
						body and only appends an <span className="text-foreground/60">iExposure</span>{" "}
						multiply in <span className="text-foreground/60">main()</span>.
					</p>
				</div>

				{/* Footer */}
				<div className="mt-16 flex items-center justify-between border-t border-border/70 pt-6">
					<span className="tele text-foreground/35">
						VAULTWORK · CATHEDRAL OF LIGHT
					</span>
					<span className="tele text-foreground/35">
						WEBGL2 · SHADCN · TAILWIND · TYPESCRIPT
					</span>
				</div>
			</div>
		</section>
	);
}

function SetupCard({
	step,
	title,
	note,
	lines,
}: {
	step: string;
	title: string;
	note: string;
	lines: string[];
}) {
	return (
		<div className="rounded-lg border border-border/70 bg-muted/30">
			<div className="flex items-center gap-3 border-b border-border/70 px-5 py-3.5">
				<span className="font-mono text-xs text-glass-gold/80">{step}</span>
				<span className="font-display text-lg text-foreground">{title}</span>
			</div>
			<pre className="overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-relaxed text-foreground/70">
				{lines.map((l, i) => (
					<div
						key={i}
						className={cn(
							l.startsWith("#") && "text-foreground/35",
							l === "" && "h-2",
						)}
					>
						{l || " "}
					</div>
				))}
			</pre>
			<div className="border-t border-border/70 px-5 py-3 font-body text-[12.5px] text-foreground/45">
				{note}
			</div>
		</div>
	);
}
