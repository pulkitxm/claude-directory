import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	Activity,
	Check,
	Circle,
	Copy,
	Diamond,
	Droplet,
	Flame,
	FlaskConical,
	Gauge,
	Hexagon,
	Layers,
	Moon,
	RotateCcw,
	Shuffle,
	Snowflake,
	Sparkles,
	Sun,
	Thermometer,
	Waves,
	Wind,
	Zap,
} from "lucide-react";
import LiquidMetalBackground, {
	type LiquidMetalShape,
} from "@/components/ui/liquid-metal-foundry";
import { useTelemetry } from "@/lib/useTelemetry";
import {
	cn,
	clamp,
	hexToHsl,
	hslToCss,
	hslToHex,
	round,
	type Hsl,
} from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Alloy presets — each is a full LiquidMetal parameter set the component
 * accepts. Selecting one drives the live shader plate. The first ("Molten
 * Copper") is the prompt's verbatim look, reconciled to a valid shape.
 * ------------------------------------------------------------------ */
interface Alloy {
	id: string;
	name: string;
	tag: string;
	/** Tint as HSL so the readout matches the component's own hsl() prop. */
	tint: Hsl;
	repetition: number;
	softness: number;
	shiftRed: number;
	shiftBlue: number;
	distortion: number;
	contour: number;
	shape: LiquidMetalShape;
	rotation: number;
	scale: number;
	speed: number;
	blur: number;
}

const ALLOYS: Alloy[] = [
	{
		id: "copper",
		name: "Molten Copper",
		tag: "VERBATIM",
		tint: { h: 29, s: 77, l: 49 },
		repetition: 4,
		softness: 0.6,
		shiftRed: 0.25,
		shiftBlue: 0.25,
		distortion: 0.12,
		contour: 1,
		shape: "circle",
		rotation: 25,
		scale: 1,
		speed: 2,
		blur: 10,
	},
	{
		id: "chrome",
		name: "Liquid Chrome",
		tag: "COOL",
		tint: { h: 205, s: 12, l: 72 },
		repetition: 6,
		softness: 0.35,
		shiftRed: 0.12,
		shiftBlue: 0.4,
		distortion: 0.2,
		contour: 0.8,
		shape: "metaballs",
		rotation: 0,
		scale: 1.1,
		speed: 1.4,
		blur: 4,
	},
	{
		id: "magma",
		name: "Magma Bloom",
		tag: "HOT",
		tint: { h: 12, s: 88, l: 52 },
		repetition: 3,
		softness: 0.75,
		shiftRed: 0.5,
		shiftBlue: 0.05,
		distortion: 0.45,
		contour: 1,
		shape: "daisy",
		rotation: 40,
		scale: 0.9,
		speed: 2.6,
		blur: 14,
	},
	{
		id: "quench",
		name: "Quench Blue",
		tag: "COOLANT",
		tint: { h: 208, s: 72, l: 54 },
		repetition: 5,
		softness: 0.5,
		shiftRed: 0.3,
		shiftBlue: 0.3,
		distortion: 0.18,
		contour: 0.9,
		shape: "diamond",
		rotation: 12,
		scale: 1.05,
		speed: 1.8,
		blur: 8,
	},
	{
		id: "patina",
		name: "Verdigris",
		tag: "AGED",
		tint: { h: 158, s: 42, l: 46 },
		repetition: 7,
		softness: 0.65,
		shiftRed: 0.18,
		shiftBlue: 0.22,
		distortion: 0.3,
		contour: 0.7,
		shape: "circle",
		rotation: 60,
		scale: 1,
		speed: 1.1,
		blur: 10,
	},
];

const SHAPES: Array<{ id: LiquidMetalShape; label: string; icon: typeof Circle }> = [
	{ id: "circle", label: "Circle", icon: Circle },
	{ id: "metaballs", label: "Metaballs", icon: Droplet },
	{ id: "daisy", label: "Daisy", icon: Sparkles },
	{ id: "diamond", label: "Diamond", icon: Diamond },
	{ id: "none", label: "None", icon: Hexagon },
];

/* ------------------------------------------------------------------ *
 * Small presentational atoms
 * ------------------------------------------------------------------ */

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
	return (
		<div className="flex flex-col leading-none">
			<span className="text-[9px] uppercase tracking-[0.18em] text-ink-dim">{label}</span>
			<span
				className={cn(
					"mt-1 font-mono text-[13px] tabular-nums",
					accent ? "text-molten" : "text-ink",
				)}
			>
				{value}
			</span>
		</div>
	);
}

function Fader({
	id,
	icon: Icon,
	label,
	value,
	min,
	max,
	step,
	unit,
	display,
	onChange,
}: {
	id: string;
	icon: typeof Gauge;
	label: string;
	value: number;
	min: number;
	max: number;
	step: number;
	unit?: string;
	/** Optional custom readout formatter (defaults to value.toFixed(2)). */
	display?: (v: number) => string;
	onChange: (v: number) => void;
}) {
	const fill = ((value - min) / (max - min)) * 100;
	return (
		<div className="group">
			<div className="mb-2 flex items-center justify-between">
				<span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-ink-dim">
					<Icon className="size-3" strokeWidth={1.75} />
					{label}
				</span>
				<span className="font-mono text-[12px] tabular-nums text-ink">
					{display ? display(value) : value.toFixed(2)}
					{unit ? <span className="ml-0.5 text-ink-dim">{unit}</span> : null}
				</span>
			</div>
			<input
				id={id}
				type="range"
				className="fader"
				style={{ ["--fill" as string]: `${fill}%` }}
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(parseFloat(e.target.value))}
				aria-label={label}
			/>
		</div>
	);
}

function ModuleCard({
	title,
	icon: Icon,
	right,
	children,
}: {
	title: string;
	icon: typeof Gauge;
	right?: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<section className="rounded-xl border border-hairline bg-steel-2/70 brushed backdrop-blur-sm">
			<header className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
				<h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
					<Icon className="size-3.5 text-molten" strokeWidth={2} />
					{title}
				</h3>
				{right}
			</header>
			<div className="p-4">{children}</div>
		</section>
	);
}

function CodeBlock({
	code,
	onCopy,
	copied,
}: {
	code: string;
	onCopy: () => void;
	copied: boolean;
}) {
	return (
		<div className="group relative overflow-hidden rounded-lg border border-hairline bg-steel/80">
			<button
				onClick={onCopy}
				className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-md border border-hairline bg-steel-2/90 px-2 py-1 text-[10px] uppercase tracking-wide text-ink-dim transition-colors hover:text-ink"
				aria-label="Copy code"
			>
				{copied ? <Check className="size-3 text-molten" /> : <Copy className="size-3" />}
				{copied ? "Copied" : "Copy"}
			</button>
			<pre className="overflow-x-auto px-4 py-3 font-mono text-[12px] leading-relaxed text-ink">
				<code>{code}</code>
			</pre>
		</div>
	);
}

/* ------------------------------------------------------------------ *
 * Documentation dock
 * ------------------------------------------------------------------ */

const INSTALL_CMD = `npm i @paper-design/shaders-react framer-motion lucide-react`;

const SCAFFOLD_CMD = `# fresh project (shadcn structure + Tailwind + TypeScript)
npm create vite@latest my-app -- --template react-ts
cd my-app
npx shadcn@latest init        # writes components.json + the @/ alias
npm i tailwindcss @tailwindcss/vite`;

const PROPS_API: Array<{ name: string; type: string; def: string; note: string }> = [
	{ name: "colorBack", type: "string", def: '"hsl(0,0%,0%,0)"', note: "Backdrop color (RGBA-aware → transparent)" },
	{ name: "colorTint", type: "string", def: '"hsl(29,77%,49%)"', note: "Color-burn tint over the metal" },
	{ name: "repetition", type: "number", def: "4", note: "Stripe-pattern density (1–10)" },
	{ name: "softness", type: "number", def: "0.6", note: "Edge softness: 0 hard … 1 smooth (0–1)" },
	{ name: "shiftRed", type: "number", def: "0.25", note: "R-channel dispersion (−1…1)" },
	{ name: "shiftBlue", type: "number", def: "0.25", note: "B-channel dispersion (−1…1)" },
	{ name: "distortion", type: "number", def: "0.12", note: "Noise distortion on stripes (0–1)" },
	{ name: "contour", type: "number", def: "1", note: "Edge-distortion strength (0–1)" },
	{ name: "shape", type: "LiquidMetalShape", def: '"circle"', note: "none | circle | daisy | diamond | metaballs" },
	{ name: "rotation", type: "number", def: "25", note: "Overall rotation in degrees (0–360)" },
	{ name: "scale", type: "number", def: "1", note: "Overall zoom (0.01–4)" },
	{ name: "offsetX / Y", type: "number", def: "0", note: "Center offset (−1…1)" },
	{ name: "speed", type: "number", def: "2", note: "Animation time multiplier" },
	{ name: "style", type: "CSSProperties", def: "filter: blur(10px)", note: "Canvas style — the verbatim soft-focus blur" },
];

function usageSnippet(p: {
	tint: Hsl;
	repetition: number;
	softness: number;
	distortion: number;
	contour: number;
	shape: LiquidMetalShape;
	rotation: number;
	scale: number;
	speed: number;
	blur: number;
}): string {
	return `import LiquidMetalBackground from "@/components/ui/liquid-metal-foundry";

export default function Page() {
  return (
    <LiquidMetalBackground
      colorTint="${hslToCss(p.tint)}"
      shape="${p.shape}"
      repetition={${p.repetition}}
      softness={${round(p.softness)}}
      distortion={${round(p.distortion)}}
      contour={${round(p.contour)}}
      rotation={${Math.round(p.rotation)}}
      scale={${round(p.scale)}}
      speed={${round(p.speed)}}
      blur={${Math.round(p.blur)}}
    />
  );
}`;
}

type Tab = "install" | "props" | "source" | "notes" | "shadcn";

function Dock({
	tab,
	setTab,
	snippet,
	onCopy,
	copied,
}: {
	tab: Tab;
	setTab: (t: Tab) => void;
	snippet: string;
	onCopy: (text: string, key: string) => void;
	copied: string | null;
}) {
	const tabs: Array<{ id: Tab; label: string }> = [
		{ id: "install", label: "Install" },
		{ id: "props", label: "Props API" },
		{ id: "source", label: "Usage" },
		{ id: "notes", label: "Integration notes" },
		{ id: "shadcn", label: "Why /components/ui" },
	];

	return (
		<div className="rounded-xl border border-hairline bg-steel-2/70 brushed backdrop-blur-sm">
			<div className="flex flex-wrap items-center gap-1 border-b border-hairline px-2 py-1.5">
				{tabs.map((t) => (
					<button
						key={t.id}
						role="tab"
						aria-selected={tab === t.id}
						onClick={() => setTab(t.id)}
						className={cn(
							"tab-ink rounded-md px-3 py-1.5 text-[12px] font-medium",
							tab === t.id ? "bg-molten/15 text-molten" : "text-ink-dim hover:text-ink",
						)}
					>
						{t.label}
					</button>
				))}
			</div>

			<div className="p-4">
				{tab === "install" && (
					<div className="space-y-3">
						<p className="text-[13px] leading-relaxed text-ink-dim">
							The background needs two runtime deps — the shader and{" "}
							<code className="text-ink">framer-motion</code> for the breathing wrapper — plus the
							icon set used by this console. Then drop the component into{" "}
							<code className="text-ink">src/components/ui</code>.
						</p>
						<CodeBlock
							code={INSTALL_CMD}
							onCopy={() => onCopy(INSTALL_CMD, "install")}
							copied={copied === "install"}
						/>
						<CodeBlock
							code={SCAFFOLD_CMD}
							onCopy={() => onCopy(SCAFFOLD_CMD, "scaffold")}
							copied={copied === "scaffold"}
						/>
					</div>
				)}

				{tab === "props" && (
					<div className="overflow-x-auto">
						<table className="w-full border-collapse text-left text-[12px]">
							<thead>
								<tr className="text-[10px] uppercase tracking-[0.14em] text-ink-dim">
									<th className="py-1.5 pr-4 font-medium">Prop</th>
									<th className="py-1.5 pr-4 font-medium">Type</th>
									<th className="py-1.5 pr-4 font-medium">Default</th>
									<th className="py-1.5 font-medium">Notes</th>
								</tr>
							</thead>
							<tbody className="align-top">
								{PROPS_API.map((p) => (
									<tr key={p.name} className="border-t border-hairline">
										<td className="whitespace-nowrap py-1.5 pr-4 font-mono text-molten">{p.name}</td>
										<td className="whitespace-nowrap py-1.5 pr-4 font-mono text-ink">{p.type}</td>
										<td className="whitespace-nowrap py-1.5 pr-4 font-mono text-ink-dim">{p.def}</td>
										<td className="py-1.5 text-ink-dim">{p.note}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{tab === "source" && (
					<div className="space-y-3">
						<p className="text-[13px] leading-relaxed text-ink-dim">
							This snippet reflects the <strong className="text-ink">live</strong> crucible above —
							pick an alloy or drag a fader, then copy a ready-to-paste call.
						</p>
						<CodeBlock code={snippet} onCopy={() => onCopy(snippet, "source")} copied={copied === "source"} />
					</div>
				)}

				{tab === "notes" && (
					<div className="space-y-3 text-[13px] leading-relaxed text-ink-dim">
						<p>
							The prompt's component is pasted <strong className="text-ink">verbatim</strong> at{" "}
							<code className="text-ink">src/components/ui/background-shades.tsx</code>. Auditing it
							against <code className="text-ink">@paper-design/shaders-react@0.0.76</code> surfaced two
							API mismatches, reconciled in the production wrapper this console renders:
						</p>
						<ul className="list-disc space-y-1.5 pl-5">
							<li>
								<code className="text-ink">PulsingBorder</code> is imported but never rendered — it's a
								single liquid-metal plane, so the import is dropped in the wrapper.
							</li>
							<li>
								<code className="text-ink">shape="plane"</code> is not a{" "}
								<code className="text-ink">LiquidMetalShape</code> (valid:{" "}
								<code className="text-ink">none · circle · daisy · diamond · metaballs</code>). With no{" "}
								<code className="text-ink">image</code>, an invalid shape paints an empty mask, so the
								wrapper defaults to <code className="text-ink">circle</code> and exposes the shape picker.
							</li>
						</ul>
						<p>
							Everything else is faithful: a fixed, <code className="text-ink">pointer-events-none</code>,{" "}
							<code className="text-ink">-z-10</code> full-bleed layer; the{" "}
							<code className="text-ink">filter: blur(10px)</code> soft-focus; and the 8s framer-motion
							opacity/scale/rotate breathing loop.
						</p>
					</div>
				)}

				{tab === "shadcn" && (
					<div className="space-y-3 text-[13px] leading-relaxed text-ink-dim">
						<p>
							shadcn/ui isn't a dependency you import — it copies source straight into your repo. The
							convention is <code className="text-ink">@/components/ui</code>, wired through a{" "}
							<code className="text-ink">@/*</code> path alias (in{" "}
							<code className="text-ink">tsconfig</code> + <code className="text-ink">vite.config</code>).
						</p>
						<ul className="list-disc space-y-1.5 pl-5">
							<li>
								The CLI writes here by default, so{" "}
								<code className="text-ink">npx shadcn@latest add …</code> drops files in the same place.
							</li>
							<li>
								The import <code className="text-ink">@/components/ui/background-shades</code> resolves
								regardless of how deeply the importing file is nested.
							</li>
							<li>
								It keeps owned primitives separate from app/feature components — predictable to find and
								to theme.
							</li>
						</ul>
						<p>
							This project mirrors that exactly: the verbatim component lives at{" "}
							<code className="text-ink">src/components/ui/background-shades.tsx</code>, the reconciled
							wrapper at <code className="text-ink">src/components/ui/liquid-metal-foundry.tsx</code>, and
							the alias is configured in both configs.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

/* ------------------------------------------------------------------ *
 * The foundry console shell
 * ------------------------------------------------------------------ */

export default function App() {
	const tel = useTelemetry();

	// Live shader state — these flow straight into the LiquidMetal wrapper.
	const [alloyId, setAlloyId] = useState(ALLOYS[0].id);
	const [tint, setTint] = useState<Hsl>(ALLOYS[0].tint);
	const [repetition, setRepetition] = useState(ALLOYS[0].repetition);
	const [softness, setSoftness] = useState(ALLOYS[0].softness);
	const [shiftRed, setShiftRed] = useState(ALLOYS[0].shiftRed);
	const [shiftBlue, setShiftBlue] = useState(ALLOYS[0].shiftBlue);
	const [distortion, setDistortion] = useState(ALLOYS[0].distortion);
	const [contour, setContour] = useState(ALLOYS[0].contour);
	const [shape, setShape] = useState<LiquidMetalShape>(ALLOYS[0].shape);
	const [rotation, setRotation] = useState(ALLOYS[0].rotation);
	const [scale, setScale] = useState(ALLOYS[0].scale);
	const [speed, setSpeed] = useState(ALLOYS[0].speed);
	const [blur, setBlur] = useState(ALLOYS[0].blur);

	const [theme, setTheme] = useState<"dark" | "light">("dark");
	const [tab, setTab] = useState<Tab>("install");
	const [copied, setCopied] = useState<string | null>(null);
	const [reducedMotion, setReducedMotion] = useState(false);
	const copyTimer = useRef<number | null>(null);

	// Reflect light theme via a `.light` class on <html> (dark is the :root default).
	useEffect(() => {
		document.documentElement.classList.toggle("light", theme === "light");
	}, [theme]);

	// Honour prefers-reduced-motion: pause the wrapper's framer-motion breathing
	// loop (the CSS @media block only quiets the chrome animations, not the JS one).
	useEffect(() => {
		if (typeof window === "undefined" || !window.matchMedia) return;
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => setReducedMotion(mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);

	useEffect(() => {
		return () => {
			if (copyTimer.current) window.clearTimeout(copyTimer.current);
		};
	}, []);

	const dirty = useCallback(() => setAlloyId("custom"), []);

	const applyAlloy = useCallback((a: Alloy) => {
		setAlloyId(a.id);
		setTint(a.tint);
		setRepetition(a.repetition);
		setSoftness(a.softness);
		setShiftRed(a.shiftRed);
		setShiftBlue(a.shiftBlue);
		setDistortion(a.distortion);
		setContour(a.contour);
		setShape(a.shape);
		setRotation(a.rotation);
		setScale(a.scale);
		setSpeed(a.speed);
		setBlur(a.blur);
	}, []);

	const reset = useCallback(() => applyAlloy(ALLOYS[0]), [applyAlloy]);

	const randomize = useCallback(() => {
		setTint({
			h: Math.floor(Math.random() * 360),
			s: 50 + Math.floor(Math.random() * 45),
			l: 40 + Math.floor(Math.random() * 25),
		});
		setRepetition(round(1 + Math.random() * 9, 0));
		setDistortion(round(Math.random() * 0.8));
		setContour(round(0.4 + Math.random() * 0.6));
		setRotation(Math.floor(Math.random() * 360));
		setShape(SHAPES[Math.floor(Math.random() * SHAPES.length)].id);
		dirty();
	}, [dirty]);

	const copy = useCallback((text: string, key: string) => {
		const done = () => {
			setCopied(key);
			if (copyTimer.current) window.clearTimeout(copyTimer.current);
			copyTimer.current = window.setTimeout(() => setCopied(null), 1600);
		};
		if (navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(text).then(done).catch(done);
		} else {
			done();
		}
	}, []);

	const snippet = useMemo(
		() =>
			usageSnippet({ tint, repetition, softness, distortion, contour, shape, rotation, scale, speed, blur }),
		[tint, repetition, softness, distortion, contour, shape, rotation, scale, speed, blur],
	);

	const tintHex = useMemo(() => hslToHex(tint), [tint]);
	const activeAlloy = ALLOYS.find((a) => a.id === alloyId);

	return (
		<div className="bench relative flex min-h-screen flex-col">
			{/* ---- Live crucible plate (fixed, full-viewport behind the chrome) ---- */}
			<div className="plate-bracket plate-vignette pointer-events-none fixed inset-0 z-0">
				<div className="absolute inset-0">
					<LiquidMetalBackground
						asBackground={false}
						colorTint={hslToCss(tint)}
						repetition={repetition}
						softness={softness}
						shiftRed={shiftRed}
						shiftBlue={shiftBlue}
						distortion={distortion}
						contour={contour}
						shape={shape}
						rotation={rotation}
						scale={scale}
						speed={speed}
						blur={blur}
						animate={!reducedMotion}
					/>
				</div>
			</div>

			{/* ---- Top utility rail ---- */}
			<header className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-steel/70 px-4 py-2.5 backdrop-blur-md sm:px-6">
				<div className="flex items-center gap-3">
					<span className="ember grid size-8 place-items-center rounded-lg border border-hairline bg-steel-2 text-molten">
						<FlaskConical className="size-4" strokeWidth={2} />
					</span>
					<div className="leading-none">
						<div className="flex items-center gap-2">
							<h1 className="text-[13px] font-semibold tracking-tight text-ink">LiquidMetal Foundry</h1>
							<span className="rounded-full border border-hairline px-1.5 py-0.5 font-mono text-[9px] text-ink-dim">
								shaders-react · 0.0.76
							</span>
						</div>
						<p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-ink-dim">
							Casting console
						</p>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<div className="hidden items-center gap-4 rounded-lg border border-hairline bg-steel-2/70 px-3 py-1.5 sm:flex">
						<span className="flex items-center gap-1.5">
							<span className="tally inline-block size-1.5 rounded-full bg-molten" />
							<span className="text-[9px] uppercase tracking-[0.18em] text-ink-dim">Molten</span>
						</span>
						<Stat label="FPS" value={String(tel.fps)} accent />
						<Stat label="Frame" value={String(tel.frame)} />
						<Stat label="Uptime" value={`${tel.uptime.toFixed(1)}s`} />
						<Stat label="Shape" value={shape} />
					</div>
					<button
						onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
						className="flex items-center gap-1.5 rounded-lg border border-hairline bg-steel-2/80 px-2.5 py-1.5 text-[11px] text-ink transition-colors hover:border-molten"
						aria-label="Toggle theme"
					>
						{theme === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
						<span className="hidden sm:inline">{theme === "dark" ? "Anneal" : "Forge"}</span>
					</button>
				</div>
			</header>

			{/* ---- Main work area: crucible stage (caption) + casting deck ---- */}
			<main className="relative z-10 grid flex-1 grid-cols-1 gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[1fr_380px]">
				{/* Stage caption sits over the live plate (which is fixed behind) */}
				<div className="pointer-events-none relative hidden lg:block">
					<div className="absolute left-0 top-0 flex items-center gap-2 rounded-full border border-hairline bg-steel/55 px-3 py-1.5 backdrop-blur-md">
						<Flame className="size-3.5 text-molten" strokeWidth={2} />
						<span className="text-[11px] text-ink">
							Live pour · <span className="font-mono">{activeAlloy?.name ?? "Custom alloy"}</span>
						</span>
					</div>
					<div className="absolute bottom-0 left-0 flex items-center gap-2 rounded-full border border-hairline bg-steel/55 px-3 py-1.5 font-mono text-[11px] text-ink-dim backdrop-blur-md">
						<Thermometer className="size-3.5" strokeWidth={1.75} />
						tint {hslToCss(tint)} · {Math.round(rotation)}°
					</div>
				</div>

				{/* Casting deck */}
				<div className="flex flex-col gap-4">
					{/* Alloy presets */}
					<ModuleCard
						title="Alloy"
						icon={Layers}
						right={
							<button
								onClick={randomize}
								className="flex items-center gap-1 rounded-md border border-hairline bg-steel px-2 py-1 text-[10px] uppercase tracking-wide text-ink-dim transition-colors hover:text-ink"
							>
								<Shuffle className="size-3" /> Random
							</button>
						}
					>
						<div className="grid grid-cols-1 gap-1.5">
							{ALLOYS.map((a) => {
								const active = a.id === alloyId;
								return (
									<button
										key={a.id}
										onClick={() => applyAlloy(a)}
										aria-pressed={active}
										className={cn(
											"group flex items-center gap-3 rounded-lg border px-2.5 py-2 text-left transition-colors",
											active ? "border-molten bg-molten/10" : "border-hairline bg-steel hover:border-molten/60",
										)}
									>
										<span
											className="size-7 shrink-0 rounded-md border border-hairline"
											style={{ background: hslToCss(a.tint) }}
										/>
										<span className="flex-1">
											<span className="block text-[12px] font-medium text-ink">{a.name}</span>
											<span className="block font-mono text-[9px] text-ink-dim">
												{a.shape} · rep {a.repetition} · {Math.round(a.rotation)}°
											</span>
										</span>
										<span className={cn("font-mono text-[9px] tracking-wide", active ? "text-molten" : "text-ink-dim")}>
											{a.tag}
										</span>
									</button>
								);
							})}
						</div>

						{/* Tint editor */}
						<div className="mt-3 border-t border-hairline pt-3">
							<div className="mb-2 flex items-center justify-between">
								<span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-ink-dim">
									<Droplet className="size-3" strokeWidth={1.75} /> Tint
								</span>
								<span className="font-mono text-[11px] text-ink">{hslToCss(tint)}</span>
							</div>
							<div className="flex items-center gap-3">
								<label
									className="relative size-9 shrink-0 overflow-hidden rounded-md border border-hairline"
									style={{ background: hslToCss(tint) }}
									title="Pick tint"
								>
									<input
										type="color"
										className="swatch-input"
										value={tintHex}
										onChange={(e) => {
											setTint(hexToHsl(e.target.value));
											dirty();
										}}
										aria-label="Tint color"
									/>
								</label>
								<div className="flex-1">
									<Fader
										id="fader-hue"
										icon={Droplet}
										label="Hue"
										value={tint.h}
										min={0}
										max={360}
										step={1}
										unit="°"
										display={(v) => String(Math.round(v))}
										onChange={(v) => {
											setTint((t) => ({ ...t, h: v }));
											dirty();
										}}
									/>
								</div>
							</div>
						</div>
					</ModuleCard>

					{/* Shape selector */}
					<ModuleCard title="Shape" icon={Hexagon}>
						<div className="grid grid-cols-5 gap-1.5">
							{SHAPES.map((s) => {
								const active = s.id === shape;
								const Icon = s.icon;
								return (
									<button
										key={s.id}
										onClick={() => {
											setShape(s.id);
											dirty();
										}}
										aria-pressed={active}
										title={s.label}
										className={cn(
											"flex flex-col items-center gap-1 rounded-lg border px-1 py-2 transition-colors",
											active ? "border-molten bg-molten/10 text-molten" : "border-hairline bg-steel text-ink-dim hover:text-ink",
										)}
									>
										<Icon className="size-4" strokeWidth={1.75} />
										<span className="text-[9px]">{s.label}</span>
									</button>
								);
							})}
						</div>
					</ModuleCard>

					{/* Pattern + sizing faders */}
					<ModuleCard title="Casting" icon={Gauge}>
						<div className="space-y-4">
							<Fader
								id="fader-repetition"
								icon={Waves}
								label="Repetition"
								value={repetition}
								min={1}
								max={10}
								step={0.1}
								onChange={(v) => {
									setRepetition(clamp(v, 1, 10));
									dirty();
								}}
							/>
							<Fader
								id="fader-softness"
								icon={Droplet}
								label="Softness"
								value={softness}
								min={0}
								max={1}
								step={0.01}
								onChange={(v) => {
									setSoftness(clamp(v, 0, 1));
									dirty();
								}}
							/>
							<Fader
								id="fader-distortion"
								icon={Wind}
								label="Distortion"
								value={distortion}
								min={0}
								max={1}
								step={0.01}
								onChange={(v) => {
									setDistortion(clamp(v, 0, 1));
									dirty();
								}}
							/>
							<Fader
								id="fader-contour"
								icon={Activity}
								label="Contour"
								value={contour}
								min={0}
								max={1}
								step={0.01}
								onChange={(v) => {
									setContour(clamp(v, 0, 1));
									dirty();
								}}
							/>
							<Fader
								id="fader-shiftred"
								icon={Zap}
								label="Shift Red"
								value={shiftRed}
								min={-1}
								max={1}
								step={0.01}
								onChange={(v) => {
									setShiftRed(clamp(v, -1, 1));
									dirty();
								}}
							/>
							<Fader
								id="fader-shiftblue"
								icon={Snowflake}
								label="Shift Blue"
								value={shiftBlue}
								min={-1}
								max={1}
								step={0.01}
								onChange={(v) => {
									setShiftBlue(clamp(v, -1, 1));
									dirty();
								}}
							/>
							<Fader
								id="fader-rotation"
								icon={RotateCcw}
								label="Rotation"
								value={rotation}
								min={0}
								max={360}
								step={1}
								unit="°"
								display={(v) => String(Math.round(v))}
								onChange={(v) => {
									setRotation(clamp(v, 0, 360));
									dirty();
								}}
							/>
							<Fader
								id="fader-scale"
								icon={Layers}
								label="Scale"
								value={scale}
								min={0.2}
								max={3}
								step={0.01}
								unit="×"
								onChange={(v) => {
									setScale(clamp(v, 0.2, 3));
									dirty();
								}}
							/>
							<Fader
								id="fader-speed"
								icon={Gauge}
								label="Speed"
								value={speed}
								min={0}
								max={5}
								step={0.01}
								unit="×"
								onChange={(v) => {
									setSpeed(clamp(v, 0, 5));
									dirty();
								}}
							/>
							<Fader
								id="fader-blur"
								icon={Droplet}
								label="Blur"
								value={blur}
								min={0}
								max={30}
								step={1}
								unit="px"
								display={(v) => String(Math.round(v))}
								onChange={(v) => {
									setBlur(clamp(v, 0, 30));
									dirty();
								}}
							/>
						</div>

						<div className="mt-4 flex gap-2 border-t border-hairline pt-3">
							<button
								onClick={reset}
								className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-hairline bg-steel px-3 py-2 text-[11px] font-medium text-ink transition-colors hover:border-molten"
							>
								<RotateCcw className="size-3.5" /> Reset
							</button>
							<button
								onClick={() => copy(snippet, "deck-source")}
								className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-molten bg-molten/15 px-3 py-2 text-[11px] font-medium text-molten transition-colors hover:bg-molten/25"
							>
								{copied === "deck-source" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
								{copied === "deck-source" ? "Copied" : "Copy JSX"}
							</button>
						</div>
					</ModuleCard>
				</div>
			</main>

			{/* ---- Documentation dock ---- */}
			<section className="relative z-10 px-4 pb-4 sm:px-6">
				<Dock tab={tab} setTab={setTab} snippet={snippet} onCopy={copy} copied={copied} />
			</section>

			{/* ---- Bottom signal bus ---- */}
			<footer className="relative z-10 overflow-hidden border-t border-hairline bg-steel/70 px-4 py-2 backdrop-blur-md sm:px-6">
				<div className="relative flex items-center justify-between font-mono text-[10px] text-ink-dim">
					<span className="flex items-center gap-2">
						<Flame className="size-3 text-molten" />
						LiquidMetal · @paper-design/shaders-react · framer-motion ·{" "}
						<span className="text-molten-deep">vendored Space Grotesk / JetBrains Mono</span>
					</span>
					<span className="hidden items-center gap-3 sm:flex">
						{reducedMotion && (
							<span className="flex items-center gap-1 text-coolant" title="prefers-reduced-motion: breathing loop paused">
								<Snowflake className="size-3" strokeWidth={2} /> quenched
							</span>
						)}
						<span>
							rep {repetition.toFixed(1)} · dist {distortion.toFixed(2)} · {Math.round(rotation)}° · {speed.toFixed(2)}×
						</span>
					</span>
				</div>
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
					<span className="sweep absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-molten to-transparent" />
				</div>
			</footer>
		</div>
	);
}
