import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Activity, Layers, Pause, Play, Radio, Triangle } from "lucide-react";

import StrataLab, { type StrataSample } from "@/components/ui/lab";

/**
 * STRATA — HORIZON FIELD SCANNER
 *
 * The prompt's WebGL2 component (`@/components/ui/lab`) is the signature, rendered
 * full-bleed behind everything. The fragment program folds space into repeating
 * 4-unit horizon strata (`p.y = abs(mod(d - 2, 4) - 2)`) and flies forward through a
 * cosine-tube ground plane (`p.z -= t`), so the page reads it as a deep-field
 * stratigraphy scanner:
 *
 *   • a right-edge layer gauge whose reticle rides the shader's own march clock,
 *     counting the horizon strata sliding past (one band per 4 depth units);
 *   • a chromatic-split STRATA wordmark echoing the shader's luminance banding;
 *   • a freeze / resume control wired straight to the component's real `paused` prop;
 *   • a bottom telemetry rail wired to the live per-frame fps + depth sampled off the
 *     GPU loop via `onSample` — no second render, no re-reading the canvas.
 */

/* The march clock `t` offsets depth directly (`p.z -= t`): ~1 field-unit / second. */
function depthFromTime(t: number) {
	return t;
}
/* The vertical fold period is 4 units, so one horizon stratum crosses every 4 units. */
const STRATA_PERIOD = 4;
function layersFromDepth(d: number) {
	return d / STRATA_PERIOD;
}

function Stat({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-baseline gap-2 whitespace-nowrap">
			<span className="tele text-white/35">{label}</span>
			<span className="tele text-white/85">{value}</span>
		</div>
	);
}

/**
 * Right-edge stratigraphy gauge — the page's signature. A fixed tick ladder whose
 * reticle rides the fractional part of the strata count, so it physically tracks the
 * shader's marching cadence (one full sweep per stratum) instead of a decorative timer.
 */
function StrataGauge({ layers, paused }: { layers: number; paused: boolean }) {
	const ticks = Array.from({ length: 17 });
	const frac = ((layers % 1) + 1) % 1; // position within the current stratum
	const reticlePct = frac * 100;

	return (
		<div className="animate-gauge-in pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-24 flex-col items-center justify-center sm:flex">
			<div className="relative flex h-[56vh] w-full items-stretch">
				{/* spine */}
				<div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />

				{/* tick ladder */}
				<div className="absolute inset-0 flex flex-col justify-between">
					{ticks.map((_, i) => {
						const major = i % 4 === 0;
						return (
							<div
								key={i}
								className="flex items-center justify-end gap-2 pr-[calc(50%-0px)]"
							>
								{major && (
									<span className="tele text-[0.5rem] text-white/30">
										{String((16 - i) * 25).padStart(3, "0")}
									</span>
								)}
								<span
									className="block h-px bg-white/30"
									style={{ width: major ? 14 : 7 }}
								/>
							</div>
						);
					})}
				</div>

				{/* live reticle */}
				<div
					className="absolute left-1/2 -translate-x-1/2 transition-[top] duration-300 ease-linear"
					style={{ top: `${reticlePct}%` }}
				>
					<div className="relative -translate-y-1/2">
						<div
							className="h-[2px] w-9 -translate-x-1/2"
							style={{
								background:
									"linear-gradient(90deg, transparent, hsl(var(--scan-cyan)), transparent)",
								boxShadow: "0 0 10px hsl(var(--scan-cyan) / 0.85)",
							}}
						/>
						<Triangle
							className="absolute -right-[18px] top-1/2 h-2 w-2 -translate-y-1/2 -rotate-90 fill-scan-cyan text-scan-cyan"
							strokeWidth={0}
						/>
					</div>
				</div>
			</div>

			{/* gauge caption */}
			<div className="mt-5 flex flex-col items-center gap-1.5">
				<span
					className="tele text-[0.5rem] text-white/40"
					style={{ writingMode: "vertical-rl" }}
				>
					STRATA&nbsp;INDEX
				</span>
				<span className={`tele mt-1 ${paused ? "text-strata-amber" : "text-scan-cyan"}`}>
					{paused ? "HELD" : "SCAN"}
				</span>
			</div>
		</div>
	);
}

/** CSS strata fallback for environments without WebGL2 — so the page never goes blank. */
function StrataFallback() {
	return (
		<div className="absolute inset-0 overflow-hidden bg-black">
			<div
				className="absolute inset-0 animate-scan-sweep"
				style={{
					backgroundImage:
						"repeating-linear-gradient(0deg, transparent 0, transparent 38px, hsl(var(--strata-amber) / 0.10) 40px, transparent 46px), repeating-linear-gradient(0deg, transparent 0, transparent 78px, hsl(var(--scan-cyan) / 0.10) 80px, transparent 86px)",
				}}
			/>
			<div
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(70% 55% at 50% 52%, hsl(var(--strata-violet) / 0.22), transparent 70%)",
				}}
			/>
		</div>
	);
}

export default function App() {
	const [paused, setPaused] = useState(false);
	const [fps, setFps] = useState(60);
	const [depth, setDepth] = useState(0);
	const [frame, setFrame] = useState(0);
	const [webglOk, setWebglOk] = useState(true);
	// Keep the latest depth so the freeze label / gauge stay in sync between samples.
	const depthRef = useRef(0);

	// Probe WebGL2 once so we can swap in the CSS-strata fallback if it's missing.
	useEffect(() => {
		try {
			const c = document.createElement("canvas");
			if (!c.getContext("webgl2")) setWebglOk(false);
		} catch {
			setWebglOk(false);
		}
	}, []);

	const handleSample = useCallback((s: StrataSample) => {
		setFps(s.fps);
		setFrame(s.frame);
		const d = depthFromTime(s.time);
		depthRef.current = d;
		setDepth(d);
	}, []);

	const layers = useMemo(() => layersFromDepth(depth), [depth]);
	const depthStamp = depth.toFixed(1).padStart(7, "0");
	const layerStamp = Math.floor(layers).toString().padStart(3, "0");

	return (
		<div className="relative h-dvh w-full overflow-hidden bg-black text-white">
			{/* === SIGNATURE: the prompt's live WebGL2 strata-corridor shader, behind everything === */}
			<div className="fixed inset-0 z-0">
				{webglOk ? (
					<StrataLab fill paused={paused} onSample={handleSample} />
				) : (
					<StrataFallback />
				)}
			</div>

			{/* horizon vignette — pulls the eye toward the vanishing point */}
			<div
				aria-hidden
				className="pointer-events-none fixed inset-0 z-[1]"
				style={{
					background:
						"radial-gradient(120% 95% at 50% 50%, transparent 32%, rgba(0,0,0,0.66) 100%)",
				}}
			/>
			{/* faint scanlines — read the field as a CRT survey display */}
			<div
				aria-hidden
				className="pointer-events-none fixed inset-0 z-[1] opacity-[0.10] mix-blend-soft-light"
				style={{
					backgroundImage:
						"repeating-linear-gradient(0deg, rgba(255,255,255,0.7) 0, rgba(255,255,255,0.7) 1px, transparent 2px, transparent 4px)",
				}}
			/>
			{/* slow scan sweep bar */}
			{webglOk && (
				<div
					aria-hidden
					className="animate-scan-sweep pointer-events-none fixed inset-x-0 top-0 z-[1] h-24"
					style={{
						background:
							"linear-gradient(180deg, transparent, hsl(var(--scan-cyan) / 0.07), transparent)",
					}}
				/>
			)}

			{/* === Top callsign bar === */}
			<header className="animate-hud-in fixed inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-4 sm:px-8">
				<div className="flex items-center gap-2.5">
					<Radio
						className="h-4 w-4 animate-signal-flicker text-white/80"
						strokeWidth={1.6}
					/>
					<span className="tele text-white/85">STRATA&nbsp;·&nbsp;FIELD&nbsp;SCANNER</span>
				</div>
				<nav className="hidden items-center gap-6 md:flex">
					<span className="tele text-white/35">BANDS</span>
					<span className="tele text-scan-cyan">CYN</span>
					<span className="tele text-strata-amber">AMB</span>
					<span className="tele text-strata-violet">VLT</span>
				</nav>
				<Stat label="LINK" value={paused ? "HELD" : "LIVE"} />
			</header>

			{/* === Right vertical stratigraphy gauge (signature) === */}
			<StrataGauge layers={layers} paused={paused} />

			{/* === Centered field lockup === */}
			<main className="relative z-10 flex h-dvh w-full items-center justify-center px-6">
				<div className="flex max-w-2xl flex-col items-center text-center">
					<span
						className="animate-reveal-up tele mb-6 text-white/45"
						style={{ animationDelay: "0.05s" }}
					>
						FIELD&nbsp;//&nbsp;STR-001&nbsp;//&nbsp;HORIZON&nbsp;OPEN
					</span>

					<h1
						className="strata-split animate-reveal-blur font-display text-[clamp(3rem,13vw,8.5rem)] font-bold uppercase leading-[0.84] tracking-[-0.05em]"
						data-text="Strata"
					>
						Strata
					</h1>

					<p
						className="animate-reveal-up mt-6 max-w-md text-sm leading-relaxed text-white/60 sm:text-base"
						style={{ animationDelay: "0.2s" }}
					>
						A single WebGL2 pass, ray-marched live — space folded into glowing horizon
						strata and flown forward toward the vanishing point. The gauge to the right
						counts each band as it slides past.
					</p>

					{/* freeze / resume — drives the shader component's own `paused` prop */}
					<div
						className="animate-reveal-up mt-9 flex items-center gap-3"
						style={{ animationDelay: "0.3s" }}
					>
						<button
							type="button"
							onClick={() => setPaused((p) => !p)}
							className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 backdrop-blur-sm transition-colors hover:border-scan-cyan/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scan-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black"
							aria-pressed={paused}
						>
							{paused ? (
								<Play className="h-3.5 w-3.5 text-scan-cyan" strokeWidth={2} />
							) : (
								<Pause className="h-3.5 w-3.5 text-white/80" strokeWidth={2} />
							)}
							<span className="tele text-white/90">
								{paused ? "RESUME SCAN" : "HOLD FIELD"}
							</span>
						</button>

						<div className="hidden items-center gap-2 sm:flex">
							<span className="relative flex h-2.5 w-2.5 items-center justify-center">
								{!paused && (
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--scan-cyan))] opacity-70" />
								)}
								<span
									className="relative inline-flex h-2 w-2 rounded-full"
									style={{
										background: paused
											? "hsl(var(--strata-amber))"
											: "hsl(var(--scan-cyan))",
									}}
								/>
							</span>
							<span className="tele text-white/45">
								{paused ? "FIELD HELD" : "SWEEPING"}
							</span>
						</div>
					</div>
				</div>
			</main>

			{/* === Floating layer readout (left) — driven by the shader's own march clock === */}
			<div className="animate-reveal-up pointer-events-none absolute bottom-20 left-5 z-20 hidden flex-col gap-2 sm:flex sm:bottom-24 sm:left-8">
				<div className="panel flex w-44 flex-col gap-2 rounded-lg px-4 py-3">
					<div className="flex items-center gap-2">
						<Layers className="h-3.5 w-3.5 text-strata-amber" strokeWidth={1.8} />
						<span className="tele text-white/45">STRATA CROSSED</span>
					</div>
					<span className="font-display text-3xl font-semibold tabular-nums text-white/90">
						{layerStamp}
					</span>
					<div className="h-px w-full bg-white/10" />
					<div className="flex items-center gap-2">
						<Activity className="h-3 w-3 text-scan-cyan" strokeWidth={1.8} />
						<span className="tele text-white/45">PERIOD&nbsp;·&nbsp;4U FOLD</span>
					</div>
				</div>
			</div>

			{/* === Bottom telemetry rail — real per-frame fps + depth off the GPU loop === */}
			<footer className="animate-hud-in fixed inset-x-0 bottom-0 z-20 flex items-center justify-between px-5 py-4 sm:px-8">
				<Stat label="DEPTH" value={`${depthStamp}u`} />
				<div className="hidden items-center gap-6 md:flex">
					<Stat label="PASS" value="GLSL · 30 STEPS" />
					<Stat label="MAP" value="TANH · /400" />
					<Stat label="FRAME" value={String(frame).padStart(6, "0")} />
				</div>
				<Stat label="FPS" value={String(fps).padStart(2, "0")} />
			</footer>
		</div>
	);
}
