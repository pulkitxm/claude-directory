import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crosshair, Pause, Play, RotateCcw, ScanLine, Radio } from "lucide-react";
import { HudFrame, TargetingUI } from "@/components/ui/animated-hud-targeting-ui";
import { PHASE_LABEL, useAcquisition } from "@/hooks/useAcquisition";
import { TARGETS, THREAT_COLOR } from "@/data/targets";
import { Counter } from "@/hud/Counter";
import { BearingTape } from "@/hud/BearingTape";
import { HorizonLadder } from "@/hud/HorizonLadder";
import { LockBrackets } from "@/hud/LockBrackets";

/** Small uppercase label/value pair used throughout the readout corners. */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div className="flex items-baseline justify-between gap-3">
			<span
				className="text-[9px] tracking-[0.22em] uppercase"
				style={{ color: "var(--phosphor-dim)", fontFamily: "var(--display)" }}
			>
				{label}
			</span>
			<span className="text-[12px] font-medium tnum" style={{ color: "var(--phosphor)" }}>
				{children}
			</span>
		</div>
	);
}

/** A bracketed corner readout module. */
function Readout({
	children,
	corner,
}: {
	children: React.ReactNode;
	corner: "tl" | "tr" | "bl" | "br";
}) {
	const edge: Record<typeof corner, string> = {
		tl: "border-l border-t",
		tr: "border-r border-t",
		bl: "border-l border-b",
		br: "border-r border-b",
	} as const;
	return (
		<div
			className={`relative w-[40vw] max-w-[228px] min-w-[140px] px-2.5 py-2.5 sm:px-3.5 sm:py-3 ${edge[corner]}`}
			style={{
				borderColor: "rgba(95,230,214,0.28)",
				background: "linear-gradient(180deg, rgba(8,16,15,0.62), rgba(8,16,15,0.30))",
				backdropFilter: "blur(2px)",
			}}
		>
			{children}
		</div>
	);
}

export default function App() {
	const acq = useAcquisition();
	const target = TARGETS[acq.targetIndex];
	const locked = acq.phase === "locked";
	const tracking = locked || acq.phase === "tracking";
	const threatColor = THREAT_COLOR[target.threat];
	const reticleColor = locked ? "#ffb43d" : tracking ? "#5fe6d6" : "#e8f4f2";

	// Live-feeling drift for the horizon ladder + a faint frame jitter.
	const [t, setT] = useState(0);
	useEffect(() => {
		let raf = 0;
		const start = performance.now();
		const loop = (now: number) => {
			setT((now - start) / 1000);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, []);
	const roll = Math.sin(t * 0.6) * 2.4;
	const pitch = Math.sin(t * 0.9 + 1) * 1.2;

	// Telemetry wobbles slightly around its baseline so the numbers feel alive,
	// then settles tight once locked.
	const jitter = locked ? 0.06 : tracking ? 0.4 : 1.1;
	const range = target.rangeKm + Math.sin(t * 1.3) * 0.12 * jitter;
	const azimuth = target.azimuthDeg + Math.sin(t * 1.7) * 1.6 * jitter;
	const elevation = target.elevationM + Math.round(Math.sin(t * 1.1) * 6 * jitter);
	const speed = target.speedKt;

	// Mission clock derived from elapsed seconds.
	const elapsed = t.toFixed(0);
	const mm = String(Math.floor(Number(elapsed) / 60)).padStart(2, "0");
	const ss = String(Number(elapsed) % 60).padStart(2, "0");

	const phaseLabel = PHASE_LABEL[acq.phase];
	const phaseColor = locked ? "var(--lock)" : tracking ? "var(--cyan)" : "var(--phosphor)";

	const targetList = useMemo(() => TARGETS, []);

	return (
		<div className="relative h-screen w-screen overflow-hidden" style={{ background: "var(--abyss)" }}>
			{/* ── Recon feed framed by the chamfered/notched HUD frame ───────────── */}
			<HudFrame backgroundColor="#060809">
				{/* The frame's children render above everything (z-20). We layer the
				    live feed, atmospherics and HUD chrome inside it. */}
				<div className="absolute inset-0 overflow-hidden">
					{/* Cross-faded recon stills behind the reticle. */}
					<AnimatePresence mode="popLayout">
						<motion.div
							key={target.id}
							className="absolute inset-0"
							initial={{ opacity: 0, scale: 1.06 }}
							animate={{ opacity: 1, scale: 1.02 }}
							exit={{ opacity: 0, scale: 1.0 }}
							transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
						>
							<img
								src={target.image}
								alt=""
								className="h-full w-full object-cover"
								style={{
									filter: "saturate(0.55) contrast(1.05) brightness(0.62)",
								}}
							/>
							{/* sensor tint + vignette */}
							<div
								className="absolute inset-0"
								style={{
									background:
										"radial-gradient(120% 90% at 50% 45%, transparent 38%, rgba(6,8,9,0.55) 78%, rgba(6,8,9,0.9) 100%)",
								}}
							/>
							<div
								className="absolute inset-0 mix-blend-screen"
								style={{
									background:
										"radial-gradient(80% 60% at 50% 45%, rgba(95,230,214,0.10), transparent 70%)",
								}}
							/>
						</motion.div>
					</AnimatePresence>

					{/* Scanline + grid atmospherics */}
					<div className="pointer-events-none absolute inset-0" style={{ opacity: 0.5 }}>
						<div
							className="absolute inset-0"
							style={{
								backgroundImage:
									"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 3px)",
							}}
						/>
						<div
							className="absolute inset-0"
							style={{
								backgroundImage:
									"linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
								backgroundSize: "56px 56px",
								maskImage:
									"radial-gradient(120% 90% at 50% 50%, #000 30%, transparent 75%)",
								WebkitMaskImage:
									"radial-gradient(120% 90% at 50% 50%, #000 30%, transparent 75%)",
							}}
						/>
					</div>

					{/* A drifting sensor sweep bar during SCANNING. */}
					<AnimatePresence>
						{acq.phase === "scanning" && (
							<motion.div
								key={`sweep-${acq.cycle}`}
								className="pointer-events-none absolute inset-y-0 w-32"
								initial={{ left: "-10%", opacity: 0 }}
								animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1.6, ease: "linear" }}
								style={{
									background:
										"linear-gradient(90deg, transparent, rgba(95,230,214,0.22), rgba(95,230,214,0.45), transparent)",
									filter: "blur(0.5px)",
								}}
							/>
						)}
					</AnimatePresence>

					{/* ── Central reticle stack ──────────────────────────────────── */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div
							className="relative"
							style={{
								width: "min(58vh, 520px)",
								aspectRatio: "237 / 220",
								transform: `translate(${azimuth * 1.6}px, ${pitch * 6}px)`,
								transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
							}}
						>
							<HorizonLadder roll={roll} pitch={pitch} />

							{/* The prompt's TargetingUI. Remounted each acquisition cycle so its
							    draw-in choreography replays; tinted per phase. */}
							<div
								className="absolute inset-0 flex items-center justify-center"
								style={{
									filter: `drop-shadow(0 0 ${locked ? 14 : 8}px ${reticleColor}55)`,
								}}
							>
								<TargetingUI
									key={`${target.id}-${acq.cycle}`}
									className="h-full w-full"
									pathColors={{ dark: reticleColor, light: reticleColor }}
								/>
							</div>

							<LockBrackets locked={locked} color={reticleColor} />

							{/* Lock flash */}
							<AnimatePresence>
								{locked && (
									<motion.div
										key={`flash-${acq.cycle}`}
										className="pointer-events-none absolute inset-0 rounded-full"
										initial={{ opacity: 0.0, scale: 0.6 }}
										animate={{ opacity: [0, 0.5, 0], scale: 1.15 }}
										transition={{ duration: 0.7, ease: "easeOut" }}
										style={{
											background:
												"radial-gradient(circle, rgba(255,180,61,0.5), transparent 60%)",
										}}
									/>
								)}
							</AnimatePresence>

							{/* MATCH / LOCK stamp */}
							<AnimatePresence>
								{locked && (
									<motion.div
										key={`stamp-${acq.cycle}`}
										className="absolute left-1/2 top-[62%] -translate-x-1/2"
										initial={{ opacity: 0, y: 6, letterSpacing: "0.6em" }}
										animate={{ opacity: 1, y: 0, letterSpacing: "0.32em" }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.35 }}
									>
										<span
											className="px-2 py-0.5 text-[12px] font-bold uppercase"
											style={{
												color: "var(--abyss)",
												background: "var(--lock)",
												fontFamily: "var(--display)",
												boxShadow: "0 0 14px var(--lock)",
											}}
										>
											Target Locked
										</span>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>

					{/* ── HUD chrome layer ───────────────────────────────────────── */}
					<div className="pointer-events-none absolute inset-0">
						{/* Top notch label */}
						<div className="absolute left-1/2 top-[10px] w-[240px] -translate-x-1/2 text-center">
							<div
								className="flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.34em] uppercase"
								style={{ color: "var(--phosphor)", fontFamily: "var(--display)" }}
							>
								<Crosshair size={13} strokeWidth={2} style={{ color: "var(--cyan)" }} />
								FCS // ARRAY-7
							</div>
						</div>

						{/* Bearing tape just under the notch */}
						<div className="absolute left-1/2 top-[34px] w-[420px] max-w-[64vw] -translate-x-1/2">
							<BearingTape bearing={target.bearingDeg} locked={locked} />
						</div>

						{/* Corner readouts */}
						<div className="absolute left-3 top-[68px] sm:left-7 sm:top-[78px]">
							<Readout corner="tl">
								<div
									className="mb-2 flex items-center gap-2 text-[10px] font-semibold tracking-[0.28em] uppercase"
									style={{ color: "var(--cyan)", fontFamily: "var(--display)" }}
								>
									<Radio size={12} /> Sensor Feed
								</div>
								<Field label="Mode">EO/IR</Field>
								<Field label="Frame">{`${mm}:${ss}`}</Field>
								<Field label="Gain">
									<Counter value={tracking ? 84 : 61} /> %
								</Field>
								<Field label="Grid">
									<span className="text-[10px]">{target.gridRef}</span>
								</Field>
							</Readout>
						</div>

						<div className="absolute right-3 top-[68px] sm:right-7 sm:top-[78px]">
							<Readout corner="tr">
								<div
									className="mb-2 flex items-center justify-between text-[10px] font-semibold tracking-[0.28em] uppercase"
									style={{ color: threatColor, fontFamily: "var(--display)" }}
								>
									<span>Track</span>
									<span>{target.id}</span>
								</div>
								<Field label="Callsign">{target.callsign}</Field>
								<Field label="Range">
									<Counter value={range} decimals={2} ease={tracking ? 0.5 : 0.9} /> km
								</Field>
								<Field label="Bearing">
									{String(target.bearingDeg).padStart(3, "0")}°
								</Field>
								<Field label="Speed">
									<Counter value={speed} /> kt
								</Field>
							</Readout>
						</div>

						<div className="absolute bottom-[84px] left-3 sm:bottom-[78px] sm:left-7">
							<Readout corner="bl">
								<div
									className="mb-2 text-[10px] font-semibold tracking-[0.28em] uppercase"
									style={{ color: "var(--phosphor-dim)", fontFamily: "var(--display)" }}
								>
									Ballistics
								</div>
								<Field label="Azimuth">
									<Counter value={azimuth} decimals={1} ease={0.4} />°
								</Field>
								<Field label="Elevation">
									<Counter value={elevation} /> m
								</Field>
								<Field label="Classify">
									<span className="text-[9px]">{target.classify.split(" // ")[0]}</span>
								</Field>
							</Readout>
						</div>

						{/* Bottom-right: phase + confidence (the live state machine) */}
						<div className="absolute bottom-[84px] right-3 sm:bottom-[78px] sm:right-7">
							<Readout corner="br">
								<div className="mb-2 flex items-center justify-between">
									<span
										className="text-[10px] font-semibold tracking-[0.28em] uppercase"
										style={{ color: "var(--phosphor-dim)", fontFamily: "var(--display)" }}
									>
										Acquisition
									</span>
									<motion.span
										key={phaseLabel}
										initial={{ opacity: 0, x: 6 }}
										animate={{ opacity: 1, x: 0 }}
										className="text-[11px] font-bold tracking-[0.18em]"
										style={{ color: phaseColor }}
									>
										{phaseLabel}
									</motion.span>
								</div>
								{/* confidence meter */}
								<div className="mb-1 flex items-baseline justify-between">
									<span
										className="text-[9px] tracking-[0.22em] uppercase"
										style={{ color: "var(--phosphor-dim)", fontFamily: "var(--display)" }}
									>
										Lock Conf.
									</span>
									<span
										className="text-[12px] font-bold tnum"
										style={{ color: phaseColor }}
									>
										<Counter value={acq.confidence} ease={0.7} />%
									</span>
								</div>
								<div
									className="h-1.5 w-full overflow-hidden"
									style={{ background: "rgba(95,230,214,0.14)" }}
								>
									<motion.div
										className="h-full"
										animate={{ width: `${acq.confidence}%` }}
										transition={{ duration: 0.6, ease: "easeOut" }}
										style={{
											background: phaseColor,
											boxShadow: `0 0 8px ${phaseColor}`,
										}}
									/>
								</div>
								<div className="mt-2 flex items-center gap-1.5">
									<div
										className="h-1.5 w-1.5 rounded-full"
										style={{
											background: threatColor,
											boxShadow: `0 0 6px ${threatColor}`,
										}}
									/>
									<span
										className="text-[9px] tracking-[0.2em] uppercase"
										style={{ color: "var(--phosphor-dim)", fontFamily: "var(--display)" }}
									>
										Threat {target.threat}
									</span>
								</div>
							</Readout>
						</div>
					</div>
				</div>
			</HudFrame>

			{/* ── Control dock (outside the frame, interactive) ────────────────── */}
			<div className="absolute bottom-4 left-1/2 z-30 w-[94vw] max-w-max -translate-x-1/2 sm:bottom-5">
				<div
					className="flex flex-wrap items-center justify-center gap-1.5 px-2 py-2"
					style={{
						background: "linear-gradient(180deg, rgba(12,17,19,0.92), rgba(8,12,13,0.92))",
						border: "1px solid rgba(95,230,214,0.22)",
						backdropFilter: "blur(8px)",
						clipPath:
							"polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)",
					}}
				>
					<button
						onClick={acq.togglePause}
						className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors"
						style={{ color: "var(--phosphor)", fontFamily: "var(--display)" }}
						title={acq.paused ? "Resume sweep" : "Hold sweep"}
					>
						{acq.paused ? <Play size={13} /> : <Pause size={13} />}
						{acq.paused ? "Resume" : "Hold"}
					</button>
					<div className="h-5 w-px" style={{ background: "rgba(95,230,214,0.2)" }} />
					<button
						onClick={acq.rearm}
						className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
						style={{ color: "var(--cyan)", fontFamily: "var(--display)" }}
						title="Re-arm acquisition on current track"
					>
						<RotateCcw size={13} /> Re-arm
					</button>
					<div className="h-5 w-px" style={{ background: "rgba(95,230,214,0.2)" }} />
					{/* target chips */}
					<div className="flex items-center gap-1.5 px-1.5">
						{targetList.map((tg, i) => {
							const active = i === acq.targetIndex;
							return (
								<button
									key={tg.id}
									onClick={() => acq.selectTarget(i)}
									className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
									style={{
										fontFamily: "var(--display)",
										color: active ? "var(--abyss)" : "var(--phosphor-dim)",
										background: active ? "var(--cyan)" : "transparent",
										border: `1px solid ${active ? "var(--cyan)" : "rgba(95,230,214,0.22)"}`,
									}}
									title={`${tg.callsign} — ${tg.classify}`}
								>
									{active ? <ScanLine size={11} /> : null}
									{tg.callsign}
								</button>
							);
						})}
					</div>
				</div>
			</div>

			{/* Top corner build tags, outside the frame — hidden on narrow screens
			    where they would collide with the notch label. */}
			<div
				className="absolute left-5 top-4 z-30 hidden text-[10px] tracking-[0.3em] uppercase lg:block"
				style={{ color: "var(--phosphor-dim)", fontFamily: "var(--display)" }}
			>
				Animated HUD Targeting UI
			</div>
			<div
				className="absolute right-5 top-4 z-30 hidden text-[10px] tracking-[0.3em] uppercase tnum lg:block"
				style={{ color: "var(--phosphor-dim)", fontFamily: "var(--display)" }}
			>
				BUILD 5.{String(acq.cycle).padStart(2, "0")} · FABLE
			</div>
		</div>
	);
}
