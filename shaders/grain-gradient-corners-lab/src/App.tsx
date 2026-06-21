"use client";

import {
	Blend,
	Check,
	Circle,
	CircleDot,
	Copy,
	Droplet,
	Gauge,
	Grid2x2,
	LayoutGrid,
	Maximize2,
	Move3d,
	Pause,
	Play,
	RotateCw,
	Sparkles,
	SunMedium,
	Terminal,
	Waves,
	Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
	GrainGradientStage,
	type GrainShape,
} from "@/components/ui/grain-gradient-stage";
import { useTelemetry } from "@/lib/useTelemetry";
import { cn, pct } from "@/lib/utils";
import {
	COMPONENT_SRC,
	INSTALL_CMD,
	PARAMETRIC_SRC,
	SHADCN_INIT,
	USAGE_SRC,
} from "@/source-snippets";

/* ================================================================== *
 * Shapes — the GrainGradient `u_shape` enum, each with a glyph + note.
 * ================================================================== */
interface ShapeDef {
	id: GrainShape;
	code: string;
	label: string;
	icon: typeof Waves;
	note: string;
}

const SHAPES: ShapeDef[] = [
	{
		id: "corners",
		code: "S4",
		label: "Corners",
		icon: LayoutGrid,
		note: "Two rounded rectangles — the prompt default.",
	},
	{
		id: "wave",
		code: "S1",
		label: "Wave",
		icon: Waves,
		note: "A single travelling sine band.",
	},
	{
		id: "dots",
		code: "S2",
		label: "Dots",
		icon: Grid2x2,
		note: "Soft dot lattice over the ramp.",
	},
	{
		id: "truchet",
		code: "S3",
		label: "Truchet",
		icon: Blend,
		note: "Interlocking truchet arcs.",
	},
	{
		id: "ripple",
		code: "S5",
		label: "Ripple",
		icon: CircleDot,
		note: "Concentric ripple from centre.",
	},
	{
		id: "blob",
		code: "S6",
		label: "Blob",
		icon: Droplet,
		note: "Fused metaball blobs.",
	},
	{
		id: "sphere",
		code: "S7",
		label: "Sphere",
		icon: Circle,
		note: "Circle faking a 3D sphere.",
	},
];

/* ================================================================== *
 * Palettes — named colour profiles. The first is the verbatim default.
 * ================================================================== */
interface Palette {
	id: string;
	label: string;
	colorBack: string;
	colors: string[];
}

const PALETTES: Palette[] = [
	{
		id: "ember",
		label: "Ember",
		colorBack: "hsl(0, 0%, 0%)",
		colors: ["hsl(14, 100%, 57%)", "hsl(45, 100%, 51%)", "hsl(340, 82%, 52%)"],
	},
	{
		id: "abyss",
		label: "Abyss",
		colorBack: "hsl(222, 47%, 4%)",
		colors: ["hsl(199, 89%, 58%)", "hsl(244, 90%, 68%)", "hsl(280, 84%, 62%)"],
	},
	{
		id: "spring",
		label: "Spring",
		colorBack: "hsl(150, 30%, 4%)",
		colors: ["hsl(152, 76%, 56%)", "hsl(84, 81%, 55%)", "hsl(173, 80%, 50%)"],
	},
	{
		id: "mono",
		label: "Mono",
		colorBack: "hsl(0, 0%, 2%)",
		colors: ["hsl(0, 0%, 96%)", "hsl(0, 0%, 62%)", "hsl(0, 0%, 30%)"],
	},
	{
		id: "candy",
		label: "Candy",
		colorBack: "hsl(330, 40%, 5%)",
		colors: ["hsl(330, 95%, 66%)", "hsl(280, 90%, 70%)", "hsl(45, 100%, 62%)"],
	},
];

/* ================================================================== *
 * State shape for the live shader.
 * ================================================================== */
interface ShaderState {
	shape: GrainShape;
	paletteId: string;
	softness: number;
	intensity: number;
	noise: number;
	scale: number;
	rotation: number;
	speed: number;
}

const DEFAULT_STATE: ShaderState = {
	shape: "corners",
	paletteId: "ember",
	softness: 0.76,
	intensity: 0.45,
	noise: 0,
	scale: 1,
	rotation: 0,
	speed: 1,
};

/* ================================================================== *
 * Fader — instrument range module.
 * ================================================================== */
function Fader({
	id,
	label,
	unit,
	value,
	min,
	max,
	step,
	onChange,
	icon: Icon,
	format,
}: {
	id: string;
	label: string;
	unit: string;
	value: number;
	min: number;
	max: number;
	step: number;
	onChange: (v: number) => void;
	icon: typeof Gauge;
	format?: (v: number) => string;
}) {
	const fill = ((value - min) / (max - min)) * 100;
	return (
		<div className="px-4 py-3">
			<div className="mb-2 flex items-center justify-between">
				<div className="flex items-center gap-1.5 text-[var(--ink-dim)]">
					<Icon size={12} strokeWidth={1.75} />
					<label
						htmlFor={id}
						className="font-mono text-[10px] uppercase tracking-[0.2em]"
					>
						{label}
					</label>
				</div>
				<span className="font-mono text-[12.5px] tabular-nums text-[var(--signal)]">
					{format ? format(value) : value.toFixed(2)}
					<span className="ml-0.5 text-[9px] text-[var(--ink-dim)]">
						{unit}
					</span>
				</span>
			</div>
			<input
				id={id}
				type="range"
				className="fader"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(parseFloat(e.target.value))}
				style={{ ["--fill" as string]: `${fill}%` }}
			/>
		</div>
	);
}

/* ================================================================== *
 * Telemetry readout cell.
 * ================================================================== */
function Stat({
	label,
	value,
	accent,
}: {
	label: string;
	value: string;
	accent?: boolean;
}) {
	return (
		<div className="flex min-w-0 flex-col gap-0.5">
			<span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--ink-dim)]">
				{label}
			</span>
			<span
				className={cn(
					"truncate font-mono text-[13px] tabular-nums",
					accent ? "text-[var(--signal)]" : "text-[var(--ink)]",
				)}
			>
				{value}
			</span>
		</div>
	);
}

/* ================================================================== *
 * App
 * ================================================================== */
type Tab = "component" | "usage" | "parametric" | "setup";

export default function App() {
	const [s, setS] = useState<ShaderState>(DEFAULT_STATE);
	const [paused, setPaused] = useState(false);
	const [showChrome, setShowChrome] = useState(true);
	const [tab, setTab] = useState<Tab>("component");
	const [copied, setCopied] = useState<string | null>(null);

	const telemetry = useTelemetry(!paused && s.speed > 0);

	const palette = useMemo(
		() => PALETTES.find((p) => p.id === s.paletteId) ?? PALETTES[0],
		[s.paletteId],
	);
	const shapeDef = useMemo(
		() => SHAPES.find((sh) => sh.id === s.shape) ?? SHAPES[0],
		[s.shape],
	);

	const set = <K extends keyof ShaderState>(k: K, v: ShaderState[K]) =>
		setS((prev) => ({ ...prev, [k]: v }));

	const reset = () => {
		setS(DEFAULT_STATE);
		setPaused(false);
	};

	const copy = async (key: string, text: string) => {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			/* clipboard may be blocked in headless; ignore */
		}
		setCopied(key);
		window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1400);
	};

	const TABS: { id: Tab; label: string; src: string }[] = [
		{ id: "component", label: "component", src: COMPONENT_SRC },
		{ id: "usage", label: "usage", src: USAGE_SRC },
		{ id: "parametric", label: "parametric", src: PARAMETRIC_SRC },
		{ id: "setup", label: "setup", src: SHADCN_INIT },
	];
	const activeSrc = TABS.find((t) => t.id === tab)?.src ?? COMPONENT_SRC;

	return (
		<div className="relative h-full w-full overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
			{/* ---- Live shader stage (the GrainGradient) ---- */}
			<div className="absolute inset-0 -z-10">
				<GrainGradientStage
					colorBack={palette.colorBack}
					colors={palette.colors}
					shape={s.shape}
					softness={s.softness}
					intensity={s.intensity}
					noise={s.noise}
					scale={s.scale}
					rotation={s.rotation}
					speed={s.speed}
					paused={paused}
				/>
			</div>
			{/* prompt's dimming layer + a console grid for the chrome */}
			<div className="pointer-events-none absolute inset-0 -z-10 bg-black/20" />
			{showChrome && (
				<div className="console-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />
			)}

			{/* ============================================================ *
			 *  HERO — the prompt's preserved headline, centred.
			 * ============================================================ */}
			<section className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
				<div className="flex flex-col items-center gap-5 text-center">
					<span className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-white/70 backdrop-blur">
						<span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--signal)]" />
						paper-design · GrainGradient
					</span>
					<h1 className="max-w-[20ch] text-balance font-light tracking-tight text-white text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
						Backgrounds are awesome{" "}
						<span className="text-[var(--signal)]">:)</span>
					</h1>
					<p className="max-w-[46ch] text-balance text-[13px] font-light leading-relaxed text-white/65 sm:text-sm">
						The verbatim{" "}
						<code className="font-mono text-white/85">GradientBackground</code>{" "}
						drop-in, wired into a shadcn{" "}
						<code className="font-mono text-white/85">components/ui</code> lab
						so every uniform is live.
					</p>
				</div>
			</section>

			{/* ============================================================ *
			 *  TOP BAR
			 * ============================================================ */}
			<header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 border-b border-white/10 bg-black/30 px-4 py-3 backdrop-blur-md sm:px-6">
				<div className="flex items-center gap-3">
					<div className="grid h-8 w-8 place-items-center rounded-md border border-[var(--signal)]/40 bg-black/40">
						<Sparkles
							size={15}
							className="text-[var(--signal)]"
							strokeWidth={1.75}
						/>
					</div>
					<div className="leading-tight">
						<div className="flex items-baseline gap-2">
							<h2 className="font-mono text-[13px] font-medium tracking-tight text-white">
								GRAINFIELD
							</h2>
							<span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 sm:inline">
								GrainGradient Lab
							</span>
						</div>
						<p className="hidden font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/35 md:block">
							components/ui · @paper-design/shaders-react
						</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<button
						type="button"
						aria-pressed={!showChrome}
						onClick={() => setShowChrome((v) => !v)}
						className="hidden items-center gap-1.5 rounded-md border border-white/15 bg-black/30 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70 transition hover:border-white/30 hover:text-white sm:inline-flex"
					>
						<Maximize2 size={12} strokeWidth={1.75} />
						{showChrome ? "Focus" : "Panels"}
					</button>
					<button
						type="button"
						aria-pressed={paused}
						onClick={() => setPaused((v) => !v)}
						className="inline-flex items-center gap-1.5 rounded-md border border-[var(--signal)]/40 bg-[var(--signal)]/10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--signal)] transition hover:bg-[var(--signal)]/20"
					>
						{paused ? (
							<Play size={12} strokeWidth={2} />
						) : (
							<Pause size={12} strokeWidth={2} />
						)}
						{paused ? "Resume" : "Freeze"}
					</button>
				</div>
			</header>

			{/* ============================================================ *
			 *  LEFT RAIL — shape + palette
			 * ============================================================ */}
			<aside
				className={cn(
					"rail-scroll absolute left-3 top-1/2 z-20 hidden max-h-[78vh] w-[210px] -translate-y-1/2 flex-col gap-3 overflow-y-auto pr-1 transition-all duration-300 lg:flex",
					showChrome
						? "opacity-100"
						: "pointer-events-none -translate-x-6 opacity-0",
				)}
			>
				{/* Shape selector */}
				<div className="rounded-lg border border-white/10 bg-black/45 p-3 backdrop-blur-md">
					<div className="mb-2.5 flex items-center justify-between">
						<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
							Shape
						</span>
						<span className="font-mono text-[10px] tabular-nums text-[var(--signal)]">
							{shapeDef.code}
						</span>
					</div>
					<div className="grid grid-cols-2 gap-1.5">
						{SHAPES.map((sh) => {
							const active = sh.id === s.shape;
							const Icon = sh.icon;
							return (
								<button
									key={sh.id}
									type="button"
									aria-pressed={active}
									onClick={() => set("shape", sh.id)}
									title={sh.note}
									className={cn(
										"flex items-center gap-1.5 rounded-md border px-2 py-2 font-mono text-[10.5px] tracking-tight transition",
										active
											? "border-[var(--signal)]/60 bg-[var(--signal)]/15 text-white"
											: "border-white/10 bg-white/[0.02] text-white/55 hover:border-white/25 hover:text-white/85",
									)}
								>
									<Icon
										size={13}
										strokeWidth={1.75}
										className={active ? "text-[var(--signal)]" : ""}
									/>
									{sh.label}
								</button>
							);
						})}
					</div>
					<p className="mt-2.5 border-t border-white/10 pt-2 font-mono text-[10px] leading-relaxed text-white/40">
						{shapeDef.note}
					</p>
				</div>

				{/* Palette selector */}
				<div className="rounded-lg border border-white/10 bg-black/45 p-3 backdrop-blur-md">
					<div className="mb-2.5 flex items-center justify-between">
						<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
							Palette
						</span>
						<span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
							{palette.colors.length} stops
						</span>
					</div>
					<div className="flex flex-col gap-1.5">
						{PALETTES.map((p) => {
							const active = p.id === s.paletteId;
							return (
								<button
									key={p.id}
									type="button"
									aria-pressed={active}
									onClick={() => set("paletteId", p.id)}
									className={cn(
										"flex items-center gap-2.5 rounded-md border px-2.5 py-2 transition",
										active
											? "border-[var(--signal)]/60 bg-[var(--signal)]/10"
											: "border-white/10 bg-white/[0.02] hover:border-white/25",
									)}
								>
									<span className="flex h-4 w-12 overflow-hidden rounded-sm ring-1 ring-white/10">
										{p.colors.map((c, i) => (
											<span
												key={i}
												className="flex-1"
												style={{ background: c }}
											/>
										))}
									</span>
									<span
										className={cn(
											"font-mono text-[11px] tracking-tight",
											active ? "text-white" : "text-white/60",
										)}
									>
										{p.label}
									</span>
								</button>
							);
						})}
					</div>
				</div>
			</aside>

			{/* ============================================================ *
			 *  RIGHT RAIL — control deck (faders) + integration tabs
			 * ============================================================ */}
			<aside
				className={cn(
					"rail-scroll absolute right-3 top-1/2 z-20 hidden max-h-[80vh] w-[320px] -translate-y-1/2 flex-col gap-3 overflow-y-auto pl-1 transition-all duration-300 md:flex",
					showChrome
						? "opacity-100"
						: "pointer-events-none translate-x-6 opacity-0",
				)}
			>
				{/* Faders */}
				<div className="overflow-hidden rounded-lg border border-white/10 bg-black/45 backdrop-blur-md">
					<div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
						<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
							Uniforms
						</span>
						<button
							type="button"
							onClick={reset}
							className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45 transition hover:text-[var(--signal)]"
						>
							Reset
						</button>
					</div>
					<div className="divide-y divide-white/[0.06]">
						<Fader
							id="fader-softness"
							label="Softness"
							unit=""
							value={s.softness}
							min={0}
							max={1}
							step={0.01}
							onChange={(v) => set("softness", v)}
							icon={Blend}
							format={pct}
						/>
						<Fader
							id="fader-intensity"
							label="Intensity"
							unit=""
							value={s.intensity}
							min={0}
							max={1}
							step={0.01}
							onChange={(v) => set("intensity", v)}
							icon={Zap}
							format={pct}
						/>
						<Fader
							id="fader-noise"
							label="Grain"
							unit=""
							value={s.noise}
							min={0}
							max={1}
							step={0.01}
							onChange={(v) => set("noise", v)}
							icon={SunMedium}
							format={pct}
						/>
						<Fader
							id="fader-scale"
							label="Scale"
							unit="×"
							value={s.scale}
							min={0.3}
							max={2.5}
							step={0.01}
							onChange={(v) => set("scale", v)}
							icon={Maximize2}
						/>
						<Fader
							id="fader-rotation"
							label="Rotation"
							unit="°"
							value={s.rotation}
							min={0}
							max={360}
							step={1}
							onChange={(v) => set("rotation", v)}
							icon={RotateCw}
							format={(v) => v.toFixed(0)}
						/>
						<Fader
							id="fader-speed"
							label="Speed"
							unit="×"
							value={s.speed}
							min={0}
							max={3}
							step={0.01}
							onChange={(v) => set("speed", v)}
							icon={Gauge}
						/>
					</div>
				</div>

				{/* Integration tabs */}
				<div className="overflow-hidden rounded-lg border border-white/10 bg-black/45 backdrop-blur-md">
					<div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
						<Terminal
							size={12}
							className="text-[var(--signal)]"
							strokeWidth={1.75}
						/>
						<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
							Integration
						</span>
					</div>
					<div className="flex flex-wrap gap-1 px-3 pt-3">
						{TABS.map((t) => (
							<button
								key={t.id}
								type="button"
								aria-pressed={tab === t.id}
								onClick={() => setTab(t.id)}
								className={cn(
									"rounded-md border px-2 py-1 font-mono text-[10px] tracking-tight transition",
									tab === t.id
										? "border-[var(--signal)]/60 bg-[var(--signal)]/15 text-white"
										: "border-white/10 text-white/50 hover:border-white/25 hover:text-white/80",
								)}
							>
								{t.label}
							</button>
						))}
					</div>
					<div className="relative m-3 mt-2.5 rounded-md border border-white/10 bg-black/60">
						<button
							type="button"
							onClick={() => copy(tab, activeSrc)}
							className="absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded border border-white/15 bg-black/60 px-1.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/60 transition hover:text-white"
						>
							{copied === tab ? (
								<Check size={11} className="text-[var(--signal)]" />
							) : (
								<Copy size={11} />
							)}
							{copied === tab ? "ok" : "copy"}
						</button>
						<pre className="rail-scroll max-h-[210px] overflow-auto p-3 pr-12 font-mono text-[10.5px] leading-relaxed text-white/75">
							<code>{activeSrc}</code>
						</pre>
					</div>
					<div className="border-t border-white/10 px-3 py-2.5">
						<div className="flex items-center justify-between gap-2 rounded-md border border-white/10 bg-black/50 px-2.5 py-1.5">
							<code className="truncate font-mono text-[10.5px] text-[var(--signal)]">
								{INSTALL_CMD}
							</code>
							<button
								type="button"
								onClick={() => copy("install", INSTALL_CMD)}
								className="shrink-0 text-white/55 transition hover:text-white"
								title="Copy install command"
							>
								{copied === "install" ? (
									<Check size={13} className="text-[var(--signal)]" />
								) : (
									<Copy size={13} />
								)}
							</button>
						</div>
					</div>
				</div>
			</aside>

			{/* ============================================================ *
			 *  BOTTOM TELEMETRY STRIP
			 * ============================================================ */}
			<footer className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/35 px-4 py-2.5 backdrop-blur-md sm:px-6">
				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-5 overflow-x-auto sm:gap-7">
						<div className="flex items-center gap-2">
							<span
								className={cn(
									"inline-block h-2 w-2 rounded-full",
									paused ? "bg-[var(--warn)]" : "live-dot bg-[var(--signal)]",
								)}
							/>
							<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
								{paused ? "FROZEN" : "LIVE"}
							</span>
						</div>
						<Stat
							label="FPS"
							value={String(telemetry.fps).padStart(2, "0")}
							accent
						/>
						<Stat label="Clock" value={`${telemetry.clock.toFixed(1)}s`} />
						<Stat label="Shape" value={shapeDef.label} />
						<div className="hidden sm:block">
							<Stat label="Palette" value={palette.label} />
						</div>
						<div className="hidden md:block">
							<Stat
								label="Soft·Int"
								value={`${pct(s.softness)} · ${pct(s.intensity)}`}
							/>
						</div>
						<div className="hidden lg:block">
							<Stat label="Grain" value={pct(s.noise)} />
						</div>
						<div className="hidden lg:block">
							<Stat label="Frames" value={telemetry.frames.toLocaleString()} />
						</div>
					</div>
					<div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35 sm:flex">
						<Move3d size={12} strokeWidth={1.75} />
						WebGL · procedural
					</div>
				</div>
			</footer>

			{/* subtle moving scanline for the instrument feel */}
			{showChrome && (
				<div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-[0.04]">
					<div className="scanline h-24 w-full bg-gradient-to-b from-transparent via-white to-transparent" />
				</div>
			)}
		</div>
	);
}
