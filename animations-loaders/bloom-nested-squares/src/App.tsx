import { useMemo, useState } from "react";
import { BloomLab, type BloomStops } from "@/components/ui/bloom-lab";

/* ── Palettes ──────────────────────────────────────────────────────────────
 * "Specimen N-25" is the canonical violet bloom shipped in the prompt; the
 * others are alternate light cultures observed in the same chamber. */
const PALETTES: BloomStops[] = [
	{
		id: "n25",
		label: "Specimen N-25",
		stops: [
			"rgb(147, 51, 234)",
			"rgb(168, 85, 247)",
			"rgb(196, 181, 253)",
			"rgb(139, 92, 246)",
			"rgb(124, 58, 237)",
		],
	},
	{
		id: "ember",
		label: "Ember Culture",
		stops: [
			"rgb(244, 63, 94)",
			"rgb(251, 113, 133)",
			"rgb(253, 186, 116)",
			"rgb(249, 115, 22)",
			"rgb(217, 70, 39)",
		],
	},
	{
		id: "tidal",
		label: "Tidal Culture",
		stops: [
			"rgb(34, 211, 238)",
			"rgb(56, 189, 248)",
			"rgb(125, 211, 252)",
			"rgb(45, 212, 191)",
			"rgb(20, 184, 166)",
		],
	},
	{
		id: "chlor",
		label: "Chloro Culture",
		stops: [
			"rgb(132, 204, 22)",
			"rgb(190, 242, 100)",
			"rgb(236, 252, 203)",
			"rgb(74, 222, 128)",
			"rgb(22, 163, 74)",
		],
	},
];

interface DialDef {
	key: "count" | "duration" | "stagger" | "scale" | "rotate" | "angle";
	label: string;
	min: number;
	max: number;
	step: number;
	unit: string;
	fmt?: (v: number) => string;
}

const DIALS: DialDef[] = [
	{ key: "count", label: "Rings", min: 6, max: 40, step: 1, unit: "" },
	{ key: "duration", label: "Period", min: 0.8, max: 4, step: 0.1, unit: "s" },
	{ key: "stagger", label: "Stagger", min: 0, max: 0.24, step: 0.01, unit: "s" },
	{ key: "scale", label: "Growth", min: 1, max: 3, step: 0.05, unit: "×" },
	{ key: "rotate", label: "Spin", min: 0, max: 360, step: 5, unit: "°" },
	{ key: "angle", label: "Light", min: 0, max: 180, step: 5, unit: "°" },
];

const DEFAULTS = {
	count: 25,
	duration: 2,
	stagger: 0.1,
	scale: 2,
	rotate: 180,
	angle: 45,
};
const STEP = 10; // padding step, matches the prompt's `(index + 1) * 10`

/** Microscope-plate graticule: outer tick ring + crosshair. */
function Graticule() {
	const ticks = Array.from({ length: 60 }, (_, i) => i);
	return (
		<svg className="graticule" viewBox="0 0 400 400" aria-hidden="true">
			<circle
				cx="200"
				cy="200"
				r="186"
				fill="none"
				stroke="currentColor"
				strokeWidth="0.75"
				strokeDasharray="1 5"
				opacity="0.55"
			/>
			<circle
				cx="200"
				cy="200"
				r="150"
				fill="none"
				stroke="currentColor"
				strokeWidth="0.5"
				opacity="0.3"
			/>
			{ticks.map((i) => {
				const a = (i / 60) * Math.PI * 2;
				const long = i % 5 === 0;
				const r1 = long ? 178 : 183;
				const r2 = 188;
				return (
					<line
						key={i}
						x1={200 + Math.cos(a) * r1}
						y1={200 + Math.sin(a) * r1}
						x2={200 + Math.cos(a) * r2}
						y2={200 + Math.sin(a) * r2}
						stroke="currentColor"
						strokeWidth={long ? 1 : 0.5}
						opacity={long ? 0.7 : 0.35}
					/>
				);
			})}
			{/* crosshair */}
			<line x1="200" y1="18" x2="200" y2="64" stroke="currentColor" strokeWidth="0.75" opacity="0.45" />
			<line x1="200" y1="336" x2="200" y2="382" stroke="currentColor" strokeWidth="0.75" opacity="0.45" />
			<line x1="18" y1="200" x2="64" y2="200" stroke="currentColor" strokeWidth="0.75" opacity="0.45" />
			<line x1="336" y1="200" x2="382" y2="200" stroke="currentColor" strokeWidth="0.75" opacity="0.45" />
		</svg>
	);
}

export default function App() {
	const [params, setParams] = useState(DEFAULTS);
	const [paletteId, setPaletteId] = useState(PALETTES[0].id);

	const palette = useMemo(
		() => PALETTES.find((p) => p.id === paletteId) ?? PALETTES[0],
		[paletteId],
	);

	const set = (key: keyof typeof DEFAULTS, value: number) =>
		setParams((prev) => ({ ...prev, [key]: value }));

	const reset = () => {
		setParams(DEFAULTS);
		setPaletteId(PALETTES[0].id);
	};

	const isCanonical =
		paletteId === "n25" &&
		params.count === DEFAULTS.count &&
		params.duration === DEFAULTS.duration &&
		params.stagger === DEFAULTS.stagger &&
		params.scale === DEFAULTS.scale &&
		params.rotate === DEFAULTS.rotate &&
		params.angle === DEFAULTS.angle;

	const fmt = (d: DialDef) => {
		const v = params[d.key];
		const str =
			d.step >= 1 ? String(Math.round(v)) : v.toFixed(d.step < 0.05 ? 2 : 1);
		return `${str}${d.unit}`;
	};

	return (
		<main className="studio-root font-body">
			<div className="studio-grid" />

			<div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col px-5 py-7 sm:px-8 lg:px-12">
				{/* ── Masthead ───────────────────────────────────────────────── */}
				<header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-rule/60 pb-6">
					<div>
						<p className="eyebrow mb-3">Motion Specimen Study · No. 25</p>
						<h1 className="font-display text-[clamp(2.6rem,7vw,5.4rem)] font-normal leading-[0.92] tracking-tight text-bone">
							Bloom
						</h1>
					</div>
					<p className="max-w-sm text-sm leading-relaxed text-lilac/80">
						Twenty-five concentric squares, each ringed in a gradient and set to
						scale and rotate forever. Observed here under a tunable viewer — turn
						the dials and watch the same component re-bloom.
					</p>
				</header>

				{/* ── Viewer + instrument rail ───────────────────────────────── */}
				<section className="grid flex-1 grid-cols-1 items-stretch gap-6 py-8 lg:grid-cols-[1fr_320px]">
					{/* Viewing chamber */}
					<div className="relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-xl border border-rule/50 bg-[hsl(258_30%_6%/0.5)]">
						<div className="absolute left-4 top-4 z-10 flex items-center gap-2">
							<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet" />
							<span className="eyebrow !tracking-[0.28em]">Live · Looping</span>
						</div>
						<div className="absolute right-4 top-4 z-10 font-mono text-[0.62rem] tracking-[0.12em] text-muted">
							PLATE Ø 384PX
						</div>

						<div className="specimen-plate w-[min(78vw,28rem)]">
							<div className="specimen-glow" />
							<Graticule />
							<div className="relative z-[3] grid place-items-center [transform:scale(var(--fit))] [--fit:0.78] sm:[--fit:0.92] lg:[--fit:1]">
								<BloomLab
									count={params.count}
									scale={params.scale}
									rotate={params.rotate}
									duration={params.duration}
									stagger={params.stagger}
									step={STEP}
									angle={params.angle}
									palette={palette}
								/>
							</div>
						</div>

						<div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2">
							<span className="chip">{palette.label.toUpperCase()}</span>
							<span className="font-mono text-[0.62rem] tracking-[0.12em] text-muted">
								{isCanonical ? "PROMPT DEFAULT" : "ALTERED CULTURE"}
							</span>
						</div>
					</div>

					{/* Instrument rail */}
					<aside className="instrument-rail flex flex-col gap-6 rounded-xl p-6">
						<div className="flex items-center justify-between">
							<p className="eyebrow">Calibration</p>
							<button
								type="button"
								className="ghost-btn !px-3 !py-1.5"
								onClick={reset}
							>
								Reset
							</button>
						</div>

						<div className="flex flex-col gap-5">
							{DIALS.map((d) => (
								<label key={d.key} className="block">
									<div className="mb-2 flex items-baseline justify-between">
										<span className="text-[0.82rem] text-lilac/90">{d.label}</span>
										<span className="font-mono text-[0.72rem] text-bone">
											{fmt(d)}
										</span>
									</div>
									<input
										type="range"
										className="dial"
										min={d.min}
										max={d.max}
										step={d.step}
										value={params[d.key]}
										aria-label={`${d.label}, ${fmt(d)}`}
										onChange={(e) => set(d.key, Number(e.target.value))}
									/>
								</label>
							))}
						</div>

						<div className="mt-1 border-t border-rule/50 pt-5">
							<p className="eyebrow mb-3">Culture</p>
							<div className="grid grid-cols-4 gap-2">
								{PALETTES.map((p) => (
									<button
										key={p.id}
										type="button"
										className="swatch"
										data-active={p.id === paletteId}
										aria-pressed={p.id === paletteId}
										aria-label={p.label}
										title={p.label}
										style={{
											background: `linear-gradient(135deg, ${p.stops[0]}, ${p.stops[2]}, ${p.stops[4]})`,
										}}
										onClick={() => setPaletteId(p.id)}
									/>
								))}
							</div>
						</div>
					</aside>
				</section>

				{/* ── Specimen plate caption + readout ───────────────────────── */}
				<footer className="grid grid-cols-1 gap-x-10 gap-y-6 border-t border-rule/60 pt-6 sm:grid-cols-2 lg:grid-cols-4">
					<Field label="Component">
						NestedSquares · framer-motion
						<span className="mt-1 block font-mono text-[0.7rem] text-muted">
							@/components/ui/bloom
						</span>
					</Field>
					<Field label="Loop">
						scale 0→{params.scale}× · rotate 0→{params.rotate}°
						<span className="mt-1 block font-mono text-[0.7rem] text-muted">
							easeInOut · reverse · infinite
						</span>
					</Field>
					<Field label="Stack">
						Vite · React · TypeScript · Tailwind
						<span className="mt-1 block font-mono text-[0.7rem] text-muted">
							shadcn structure · cn() util
						</span>
					</Field>
					<Field label="Cadence">
						{params.count} rings · {params.stagger.toFixed(2)}s stagger
						<span className="mt-1 block font-mono text-[0.7rem] text-muted">
							{params.duration.toFixed(1)}s period · 10px step
						</span>
					</Field>
				</footer>
			</div>

			<div className="studio-scanlines" />
			<div className="studio-grain" />
		</main>
	);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div>
			<p className="eyebrow mb-2">{label}</p>
			<p className="text-sm leading-snug text-lilac/90">{children}</p>
		</div>
	);
}
