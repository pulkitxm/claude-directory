"use client";

import {
	Activity,
	Atom,
	Box,
	Check,
	Copy,
	Gauge,
	Grid3x3,
	Layers,
	Pause,
	Play,
	Power,
	Sparkles,
	Waves,
	Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { BackgroundPaperShaders } from "@/components/ui/background-paper-shaders";
import {
	type PaperChannel,
	PaperShadersStage,
} from "@/components/ui/paper-shaders-stage";
import { useTelemetry } from "@/lib/useTelemetry";
import { clamp, cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Channels — the four shader sources this deck can patch into the
 * scope. Three come from @paper-design/shaders-react, one is the
 * prompt's own react-three-fiber custom-shader background.
 * ------------------------------------------------------------------ */
type Channel = PaperChannel | "r3f";

interface ChannelDef {
	id: Channel;
	code: string;
	label: string;
	source: "PAPER" | "R3F";
	icon: typeof Waves;
	blurb: string;
}

const CHANNELS: ChannelDef[] = [
	{
		id: "mesh",
		code: "CH·01",
		label: "Mesh Gradient",
		source: "PAPER",
		icon: Waves,
		blurb: "Flowing four-stop gradient field, grain-mixed.",
	},
	{
		id: "dots",
		code: "CH·02",
		label: "Dot Orbit",
		source: "PAPER",
		icon: Grid3x3,
		blurb: "Orbiting dot lattice, stepped colour ramp.",
	},
	{
		id: "combined",
		code: "CH·03",
		label: "Combined Bus",
		source: "PAPER",
		icon: Layers,
		blurb: "Mesh base screened with an orbiting dot layer.",
	},
	{
		id: "r3f",
		code: "CH·04",
		label: "Shader Plane",
		source: "R3F",
		icon: Atom,
		blurb: "Custom GLSL planes + energy rings on react-three-fiber.",
	},
];

const INSTALL_CMD =
	"npm i @paper-design/shaders-react three @react-three/fiber";

/* ------------------------------------------------------------------ *
 * Faders — instrument-styled range modules
 * ------------------------------------------------------------------ */
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
}) {
	const fill = ((value - min) / (max - min)) * 100;
	return (
		<div className="rounded-md border border-[var(--hairline)] bg-[var(--panel-2)] px-3.5 py-3">
			<div className="mb-2.5 flex items-center justify-between">
				<div className="flex items-center gap-1.5 text-[var(--ink-dim)]">
					<Icon size={12} strokeWidth={1.75} />
					<label
						htmlFor={id}
						className="font-mono text-[10px] uppercase tracking-[0.22em]"
					>
						{label}
					</label>
				</div>
				<span className="font-mono text-[13px] tabular-nums text-[var(--signal)]">
					{value.toFixed(2)}
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
				onChange={(e) => onChange(Number(e.target.value))}
				style={{ ["--fill" as string]: `${fill}%` }}
				aria-valuetext={`${value.toFixed(2)} ${unit}`}
			/>
			<div className="mt-1.5 flex justify-between font-mono text-[9px] text-[var(--ink-dim)]/60">
				<span>{min.toFixed(1)}</span>
				<span>{max.toFixed(1)}</span>
			</div>
		</div>
	);
}

/* ------------------------------------------------------------------ *
 * Telemetry readout cell
 * ------------------------------------------------------------------ */
function Readout({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
	return (
		<div className="flex flex-col gap-0.5 border-l border-[var(--hairline)] px-3 first:border-l-0 first:pl-0">
			<span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink-dim)]">
				{k}
			</span>
			<span
				className={cn(
					"font-mono text-[13px] tabular-nums",
					accent ? "text-[var(--signal)]" : "text-[var(--ink)]",
				)}
			>
				{v}
			</span>
		</div>
	);
}

/* Corner brackets for the scope housing */
function Bracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
	const map: Record<string, string> = {
		tl: "left-0 top-0 border-l border-t",
		tr: "right-0 top-0 border-r border-t",
		bl: "left-0 bottom-0 border-l border-b",
		br: "right-0 bottom-0 border-r border-b",
	};
	return (
		<span
			aria-hidden
			className={cn(
				"pointer-events-none absolute h-5 w-5 border-[var(--signal)]",
				map[pos],
			)}
		/>
	);
}

export default function App() {
	const [channel, setChannel] = useState<Channel>("mesh");
	const [speed, setSpeed] = useState(1.0);
	const [intensity, setIntensity] = useState(1.5);
	const [running, setRunning] = useState(true);
	const [copied, setCopied] = useState(false);

	const tel = useTelemetry();

	const active = useMemo(
		() => CHANNELS.find((c) => c.id === channel)!,
		[channel],
	);

	// When paused, freeze the shaders by driving speed to 0 downstream.
	const liveSpeed = running ? speed : 0;

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(INSTALL_CMD);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1800);
		} catch {
			setCopied(false);
		}
	};

	// Keyboard: 1–4 switch channels, space toggles run.
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.target instanceof HTMLInputElement) return;
			if (e.key >= "1" && e.key <= "4") {
				setChannel(CHANNELS[Number(e.key) - 1].id);
			} else if (e.code === "Space") {
				e.preventDefault();
				setRunning((r) => !r);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	return (
		<div className="chassis-grain flex h-full w-full flex-col overflow-hidden p-3 sm:p-4 lg:p-5">
			{/* ============================== HEADER ============================== */}
			<header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[var(--hairline)] pb-3">
				<div className="flex items-center gap-3">
					<div className="grid h-9 w-9 place-items-center rounded-md border border-[var(--hairline)] bg-[var(--panel)]">
						<Sparkles
							size={16}
							strokeWidth={1.75}
							className="text-[var(--signal)]"
						/>
					</div>
					<div className="leading-none">
						<h1 className="font-mono text-[13px] font-medium uppercase tracking-[0.28em] text-[var(--ink)]">
							Paper&nbsp;Shaders
						</h1>
						<p className="mt-1 font-mono text-[10px] uppercase tracking-[0.34em] text-[var(--ink-dim)]">
							Control&nbsp;Deck&nbsp;/&nbsp;v0.0.76
						</p>
					</div>
				</div>

				{/* Live telemetry strip */}
				<div className="flex items-center gap-1">
					<div className="mr-3 flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--panel)] px-3 py-1.5">
						<span
							className={cn(
								"h-2 w-2 rounded-full",
								running ? "tally bg-[var(--signal)]" : "bg-[var(--warn)]",
							)}
						/>
						<span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink-dim)]">
							{running ? "Live" : "Hold"}
						</span>
					</div>
					<Readout k="FPS" v={String(tel.fps).padStart(2, "0")} accent />
					<Readout k="Frame" v={tel.frame.toLocaleString("en-US")} />
					<Readout k="Uptime" v={`${tel.uptime.toFixed(1)}s`} />
					<Readout k="Source" v={active.source} accent />
				</div>
			</header>

			{/* ============================== BODY =============================== */}
			<main className="grid min-h-0 flex-1 grid-cols-1 gap-3 pt-3 lg:grid-cols-[300px_1fr] lg:gap-4">
				{/* -------- LEFT: module rack -------- */}
				<aside className="flex min-h-0 flex-col gap-3 overflow-y-auto pr-1">
					{/* Channel selector */}
					<section className="rounded-md border border-[var(--hairline)] bg-[var(--panel)] p-3">
						<div className="mb-3 flex items-center justify-between">
							<span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink-dim)]">
								Channel&nbsp;Patch
							</span>
							<span className="font-mono text-[10px] text-[var(--signal)]">
								{active.code}
							</span>
						</div>
						<div className="grid grid-cols-2 gap-2">
							{CHANNELS.map((c, i) => {
								const on = c.id === channel;
								const Icon = c.icon;
								return (
									<button
										key={c.id}
										onClick={() => setChannel(c.id)}
										aria-pressed={on}
										className={cn(
											"group relative flex flex-col gap-2 rounded-md border px-3 py-3 text-left transition-colors",
											on
												? "border-[var(--signal)]/70 bg-[var(--signal)]/10"
												: "border-[var(--hairline)] bg-[var(--panel-2)] hover:border-[var(--ink-dim)]/60",
										)}
									>
										<div className="flex items-center justify-between">
											<Icon
												size={16}
												strokeWidth={1.75}
												className={cn(
													on ? "text-[var(--signal)]" : "text-[var(--ink-dim)]",
												)}
											/>
											<span className="font-mono text-[9px] tabular-nums text-[var(--ink-dim)]">
												{String(i + 1)}
											</span>
										</div>
										<span
											className={cn(
												"font-mono text-[11px] leading-tight",
												on ? "text-[var(--ink)]" : "text-[var(--ink-dim)]",
											)}
										>
											{c.label}
										</span>
										<span
											className={cn(
												"font-mono text-[8px] uppercase tracking-[0.18em]",
												c.source === "R3F"
													? "text-[var(--warn)]"
													: "text-[var(--signal-dim)]",
											)}
										>
											{c.source}
										</span>
									</button>
								);
							})}
						</div>
					</section>

					{/* Parameter faders */}
					<section className="rounded-md border border-[var(--hairline)] bg-[var(--panel)] p-3">
						<div className="mb-3 flex items-center justify-between">
							<span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink-dim)]">
								Patch&nbsp;Bay
							</span>
							<Activity size={12} className="text-[var(--ink-dim)]" />
						</div>
						<div className="space-y-2.5">
							<Fader
								id="fader-speed"
								label="Speed"
								unit="×"
								icon={Gauge}
								value={speed}
								min={0}
								max={3}
								step={0.01}
								onChange={(v) => setSpeed(clamp(v, 0, 3))}
							/>
							<Fader
								id="fader-intensity"
								label="Intensity"
								unit="amp"
								icon={Zap}
								value={intensity}
								min={0}
								max={3}
								step={0.01}
								onChange={(v) => setIntensity(clamp(v, 0, 3))}
							/>
						</div>

						{/* Transport */}
						<div className="mt-3 grid grid-cols-2 gap-2">
							<button
								onClick={() => setRunning((r) => !r)}
								aria-pressed={running}
								className={cn(
									"flex items-center justify-center gap-2 rounded-md border px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors",
									running
										? "border-[var(--hairline)] bg-[var(--panel-2)] text-[var(--ink-dim)] hover:text-[var(--ink)]"
										: "border-[var(--warn)]/60 bg-[var(--warn)]/10 text-[var(--warn)]",
								)}
							>
								{running ? <Pause size={13} /> : <Play size={13} />}
								{running ? "Hold" : "Run"}
							</button>
							<button
								onClick={() => {
									setSpeed(1.0);
									setIntensity(1.5);
								}}
								className="flex items-center justify-center gap-2 rounded-md border border-[var(--hairline)] bg-[var(--panel-2)] px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-dim)] transition-colors hover:text-[var(--ink)]"
							>
								<Power size={13} />
								Reset
							</button>
						</div>
					</section>

					{/* Install module */}
					<section className="rounded-md border border-[var(--hairline)] bg-[var(--panel)] p-3">
						<div className="mb-2 flex items-center gap-1.5 text-[var(--ink-dim)]">
							<Box size={12} strokeWidth={1.75} />
							<span className="font-mono text-[10px] uppercase tracking-[0.24em]">
								Wire&nbsp;It&nbsp;Up
							</span>
						</div>
						<button
							onClick={copy}
							className="group flex w-full items-center justify-between gap-2 rounded-md border border-[var(--hairline)] bg-[var(--rail)] px-3 py-2.5 text-left transition-colors hover:border-[var(--signal)]/50"
							title="Copy install command"
						>
							<code className="truncate font-mono text-[10px] text-[var(--ink)]">
								<span className="text-[var(--signal)]">$</span> {INSTALL_CMD}
							</code>
							{copied ? (
								<Check size={13} className="shrink-0 text-[var(--signal)]" />
							) : (
								<Copy
									size={13}
									className="shrink-0 text-[var(--ink-dim)] group-hover:text-[var(--ink)]"
								/>
							)}
						</button>
						<p className="mt-2 font-mono text-[9px] leading-relaxed text-[var(--ink-dim)]/70">
							Drop{" "}
							<span className="text-[var(--ink-dim)]">
								background-paper-shaders.tsx
							</span>{" "}
							into <span className="text-[var(--ink-dim)]">/components/ui</span>{" "}
							and patch any channel behind your UI.
						</p>
					</section>
				</aside>

				{/* -------- RIGHT: scope viewport -------- */}
				<section className="relative min-h-[240px] lg:min-h-0">
					<div className="scope-scan scope-vignette relative h-full w-full overflow-hidden rounded-lg border border-[var(--hairline)] bg-[var(--rail)]">
						{/* Live shader specimen */}
						<div className="absolute inset-0">
							{channel === "r3f" ? (
								<BackgroundPaperShaders
									className="h-full w-full"
									color1="#54e6c8"
									color2="#f2f0ea"
									speed={liveSpeed}
									intensity={intensity}
								/>
							) : (
								<PaperShadersStage
									channel={channel}
									speed={liveSpeed}
									intensity={intensity}
								/>
							)}
						</div>

						{/* Scope housing brackets */}
						<Bracket pos="tl" />
						<Bracket pos="tr" />
						<Bracket pos="bl" />
						<Bracket pos="br" />

						{/* Top-left scope label */}
						<div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-md border border-[var(--hairline)] bg-black/45 px-3 py-1.5 backdrop-blur-sm">
							<active.icon
								size={13}
								className="text-[var(--signal)]"
								strokeWidth={1.75}
							/>
							<span className="font-mono text-[11px] tracking-[0.06em] text-[var(--ink)]">
								{active.label}
							</span>
							<span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink-dim)]">
								/ {active.source}
							</span>
						</div>

						{/* Top-right scope readout */}
						<div className="pointer-events-none absolute right-4 top-4 flex items-center gap-3 rounded-md border border-[var(--hairline)] bg-black/45 px-3 py-1.5 font-mono text-[10px] backdrop-blur-sm">
							<span className="text-[var(--ink-dim)]">
								SPD{" "}
								<span className="text-[var(--signal)]">
									{liveSpeed.toFixed(2)}
								</span>
							</span>
							<span className="text-[var(--ink-dim)]">
								AMP{" "}
								<span className="text-[var(--signal)]">
									{intensity.toFixed(2)}
								</span>
							</span>
						</div>

						{/* Bottom signal bus */}
						<div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
							<p className="max-w-[60%] font-mono text-[10px] leading-relaxed text-[var(--ink-dim)]">
								{active.blurb}
							</p>
							{/* Animated signal sweep bar */}
							<div className="relative h-1.5 w-40 overflow-hidden rounded-full border border-[var(--hairline)] bg-black/50">
								{running && (
									<span className="sweep absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-[var(--signal)] to-transparent" />
								)}
							</div>
						</div>
					</div>
				</section>
			</main>

			{/* ============================== FOOTER ============================= */}
			<footer className="mt-3 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-[var(--hairline)] pt-2.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--ink-dim)]">
				<span>
					Paper&nbsp;Shaders&nbsp;Control&nbsp;Deck —
					@paper-design/shaders-react · react-three-fiber · three
				</span>
				<span className="flex items-center gap-1.5 text-[var(--ink-dim)]/70">
					<span className="hidden sm:inline">Keys 1–4 patch · Space holds</span>
					<span className="text-[var(--signal-dim)]">●</span> WebGL
				</span>
			</footer>
		</div>
	);
}
