import { Dithering } from "@paper-design/shaders-react";
import {
	ArrowUpRight,
	Box,
	Clock,
	Droplets,
	FileCode,
	FolderTree,
	Gauge,
	Hash,
	Layers,
	Moon,
	Palette,
	Pause,
	Play,
	Printer,
	SlidersHorizontal,
	Sparkles,
	Sun,
	Terminal,
} from "lucide-react";
import {
	type ComponentProps,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { CodeBlock } from "@/components/code-block";
import DemoOne from "@/components/ui/demo";
import { CTASection } from "@/components/ui/hero-dithering-card";
import { useTelemetry } from "@/lib/useTelemetry";
import {
	COMPONENT_SOURCE,
	DEMO_SOURCE,
	INSTALL_SOURCE,
	TREE_SOURCE,
	USAGE_SOURCE,
} from "@/source-snippets";

/* Fader option types are derived from the real Dithering props, so the console
 * can never drift out of sync with the shader's accepted values. */
type DitherShape = NonNullable<ComponentProps<typeof Dithering>["shape"]>;
type DitherType = NonNullable<ComponentProps<typeof Dithering>["type"]>;

const SHAPES: DitherShape[] = [
	"warp",
	"simplex",
	"dots",
	"wave",
	"ripple",
	"swirl",
	"sphere",
];
const TYPES: DitherType[] = ["random", "2x2", "4x4", "8x8"];

const INKS: { name: string; hex: string }[] = [
	{ name: "Pantone 021 — Orange", hex: "#EC4E02" },
	{ name: "Process Cyan", hex: "#0098D8" },
	{ name: "Process Magenta", hex: "#E5007E" },
	{ name: "Spot — Viridian", hex: "#1FA37A" },
	{ name: "Rich Black", hex: "#171717" },
];

export default function App() {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", dark);
	}, [dark]);

	// The hero centerpiece's dither canvas is the press bed we read ink off.
	const heroHostRef = useRef<HTMLDivElement>(null);
	const tel = useTelemetry(heroHostRef);

	return (
		<div className="min-h-screen bg-background text-foreground">
			<Masthead dark={dark} onToggle={() => setDark((d) => !d)} />
			<main>
				<Hero heroHostRef={heroHostRef} tel={tel} />
				<Console />
				<Integration />
				<Source />
				<Api />
				<DemoBay />
			</main>
			<Colophon />
		</div>
	);
}

/* ----------------------------------------------------------------- chrome -- */

function Masthead({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
				<a href="#top" className="flex items-center gap-2.5">
					<span className="grid h-7 w-7 place-items-center rounded-sm border border-border bg-card text-press">
						<Printer className="h-3.5 w-3.5" />
					</span>
					<span className="font-mono text-[13px] tracking-[0.18em] text-foreground/90">
						DITHER<span className="text-press">·</span>PRESS
					</span>
				</a>

				<nav className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim md:flex">
					<a
						href="#console"
						className="transition-colors hover:text-foreground"
					>
						Console
					</a>
					<a
						href="#install"
						className="transition-colors hover:text-foreground"
					>
						Install
					</a>
					<a href="#source" className="transition-colors hover:text-foreground">
						Source
					</a>
					<a href="#api" className="transition-colors hover:text-foreground">
						API
					</a>
				</nav>

				<div className="flex items-center gap-2.5">
					<button
						type="button"
						onClick={onToggle}
						aria-label={
							dark ? "Switch to paper (light)" : "Switch to lights-out (dark)"
						}
						className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card text-ink-dim transition-colors hover:text-foreground"
					>
						{dark ? (
							<Sun className="h-3.5 w-3.5" />
						) : (
							<Moon className="h-3.5 w-3.5" />
						)}
					</button>
					<a
						href="#install"
						className="hidden items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/85 transition-colors hover:border-press/50 hover:text-press sm:flex"
					>
						components/ui
						<ArrowUpRight className="h-3 w-3" />
					</a>
				</div>
			</div>
		</header>
	);
}

/* ------------------------------------------------------------------- hero -- */

function Hero({
	heroHostRef,
	tel,
}: {
	heroHostRef: React.RefObject<HTMLDivElement | null>;
	tel: ReturnType<typeof useTelemetry>;
}) {
	return (
		<section
			id="top"
			className="relative overflow-hidden border-b border-border"
		>
			{/* press-bed backdrop: engraved register grid + half-tone dot field */}
			<div className="regrid pointer-events-none absolute inset-0 opacity-[0.5]" />
			<div className="dotfield pointer-events-none absolute inset-0 opacity-60" />

			<div className="relative mx-auto max-w-7xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
				<div className="mb-7 flex flex-wrap items-center justify-between gap-4">
					<span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-press">
						<span className="h-px w-7 bg-press/60" />
						proof · plate 01 · hero-dithering-card
					</span>
					<span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim">
						@paper-design/shaders · Dithering
					</span>
				</div>

				<h1 className="max-w-4xl font-serif text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[1.02] tracking-tight">
					A dithered hero card, <span className="text-press">pressed</span> into{" "}
					<span className="text-foreground/70">components/ui</span>.
				</h1>
				<p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-dim sm:text-base">
					The brief's <code className="font-mono text-press">CTASection</code>{" "}
					drops in verbatim — a transparent-backed{" "}
					<code className="font-mono text-press">Dithering</code> shader laying
					Pantone-orange ink under the headline. Below, the framed proof runs
					live on the press bed, with crop marks, a registration loupe, and ink
					read straight off the plate.
				</p>

				{/* the press bed — the verbatim component, framed */}
				<div className="relative mt-10">
					<Crop className="crop-tl" />
					<Crop className="crop-tr" />
					<Crop className="crop-bl" />
					<Crop className="crop-br" />
					<Loupe />

					<div ref={heroHostRef} className="relative">
						<CTASection />
					</div>

					<TelemetryStrip tel={tel} />
				</div>
			</div>
		</section>
	);
}

function Crop({ className }: { className: string }) {
	return <span className={`crop ${className}`} aria-hidden />;
}

function Loupe() {
	return (
		<div className="pointer-events-none absolute -right-3 -top-3 z-20 hidden h-16 w-16 place-items-center rounded-full border border-border bg-background/80 backdrop-blur sm:grid">
			<div className="reg-spin relative h-9 w-9 rounded-full border border-press/40">
				<span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-press/40" />
				<span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-press/40" />
				<span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-press" />
			</div>
		</div>
	);
}

function TelemetryStrip({ tel }: { tel: ReturnType<typeof useTelemetry> }) {
	return (
		<div className="mt-4 flex flex-wrap items-stretch gap-px overflow-hidden rounded-lg border border-border bg-border font-mono">
			<Gauge_ icon={<Gauge className="h-3.5 w-3.5" />} label="fps">
				<span ref={tel.fpsRef}>00</span>
			</Gauge_>
			<Gauge_ icon={<Hash className="h-3.5 w-3.5" />} label="frames">
				<span ref={tel.framesRef}>0</span>
			</Gauge_>
			<Gauge_ icon={<Clock className="h-3.5 w-3.5" />} label="uptime">
				<span ref={tel.uptimeRef}>00:00</span>
			</Gauge_>
			<Gauge_
				icon={<Droplets className="h-3.5 w-3.5" />}
				label="ink coverage"
				suffix="%"
			>
				<span ref={tel.inkRef}>0.0</span>
			</Gauge_>
		</div>
	);
}

function Gauge_({
	icon,
	label,
	suffix,
	children,
}: {
	icon: ReactNode;
	label: string;
	suffix?: string;
	children: ReactNode;
}) {
	return (
		<div className="flex min-w-[7.5rem] flex-1 items-center gap-3 bg-card px-4 py-3">
			<span className="text-press">{icon}</span>
			<span className="flex flex-col leading-tight">
				<span className="text-[9px] uppercase tracking-[0.16em] text-ink-dim">
					{label}
				</span>
				<span className="text-[15px] text-foreground">
					{children}
					{suffix ? <span className="text-ink-dim">{suffix}</span> : null}
				</span>
			</span>
		</div>
	);
}

/* ------------------------------------------------------------ ink console -- */

function Console() {
	const [speed, setSpeed] = useState(0.4);
	const [paused, setPaused] = useState(false);
	const [shape, setShape] = useState<DitherShape>("warp");
	const [type, setType] = useState<DitherType>("4x4");
	const [ink, setInk] = useState(INKS[0].hex);

	const effectiveSpeed = paused ? 0 : speed;

	return (
		<section id="console" className="border-b border-border bg-paper-2/40">
			<div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
				<SectionLabel
					icon={<SlidersHorizontal className="h-3.5 w-3.5" />}
					index="01"
				>
					ink console
				</SectionLabel>
				<h2 className="mt-6 max-w-2xl font-serif text-[clamp(1.8rem,3.6vw,2.9rem)] font-medium leading-[1.05] tracking-tight">
					The same shader, on the faders.
				</h2>
				<p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim">
					Every control writes straight to a live{" "}
					<code className="font-mono text-press">Dithering</code> uniform — the
					exact props the card sets, here promoted to knobs so you can feel the
					plate before you ship it.
				</p>

				<div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
					{/* live plate */}
					<div className="relative overflow-hidden rounded-2xl border border-border bg-[#0c0c10]">
						<div className="absolute inset-0">
							<Dithering
								key={`${shape}-${type}`}
								colorBack="#00000000"
								colorFront={ink}
								shape={shape}
								type={type}
								speed={effectiveSpeed}
								className="size-full"
								minPixelRatio={1}
							/>
						</div>
						<div className="pointer-events-none relative z-10 flex h-[340px] flex-col justify-between p-5 sm:h-[420px]">
							<div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
								<span>live plate</span>
								<span>
									{shape} · {type} · {effectiveSpeed.toFixed(2)}×
								</span>
							</div>
							<div
								className="h-6 w-6 self-end rounded-full border border-white/30"
								style={{ background: ink }}
								aria-hidden
							/>
						</div>
					</div>

					{/* faders */}
					<div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 sm:p-6">
						<div className="flex items-center justify-between">
							<span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim">
								press controls
							</span>
							<button
								type="button"
								onClick={() => setPaused((p) => !p)}
								className="flex items-center gap-1.5 rounded-md border border-border bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-dim transition-colors hover:text-foreground"
							>
								{paused ? (
									<Play className="h-3 w-3" />
								) : (
									<Pause className="h-3 w-3" />
								)}
								{paused ? "Run" : "Halt"}
							</button>
						</div>

						<Fader
							id="fader-speed"
							label="speed"
							value={speed}
							min={0}
							max={1}
							step={0.05}
							onChange={setSpeed}
							readout={`${speed.toFixed(2)}×`}
						/>

						<Choice<DitherShape>
							label="shape"
							value={shape}
							options={SHAPES}
							onChange={setShape}
						/>
						<Choice<DitherType>
							label="dither"
							value={type}
							options={TYPES}
							onChange={setType}
						/>

						<div>
							<div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">
								<Palette className="h-3.5 w-3.5" /> ink
							</div>
							<div className="flex flex-wrap gap-2">
								{INKS.map((i) => (
									<button
										key={i.hex}
										type="button"
										title={i.name}
										aria-label={i.name}
										aria-pressed={ink === i.hex}
										onClick={() => setInk(i.hex)}
										className={`h-8 w-8 rounded-full border transition-transform hover:scale-110 ${
											ink === i.hex
												? "border-foreground ring-2 ring-press/40"
												: "border-border"
										}`}
										style={{ background: i.hex }}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function Fader({
	id,
	label,
	value,
	min,
	max,
	step,
	onChange,
	readout,
}: {
	id: string;
	label: string;
	value: number;
	min: number;
	max: number;
	step: number;
	onChange: (n: number) => void;
	readout: string;
}) {
	return (
		<div>
			<label
				htmlFor={id}
				className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim"
			>
				<span>{label}</span>
				<span className="text-foreground">{readout}</span>
			</label>
			<input
				id={id}
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="w-full accent-press"
			/>
		</div>
	);
}

function Choice<T extends string>({
	label,
	value,
	options,
	onChange,
}: {
	label: string;
	value: T;
	options: T[];
	onChange: (v: T) => void;
}) {
	return (
		<div>
			<div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">
				{label}
			</div>
			<div className="flex flex-wrap gap-1.5">
				{options.map((o) => (
					<button
						key={o}
						type="button"
						aria-pressed={value === o}
						onClick={() => onChange(o)}
						className={`rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors ${
							value === o
								? "border-press/60 bg-press/10 text-press"
								: "border-border bg-paper text-ink-dim hover:text-foreground"
						}`}
					>
						{o}
					</button>
				))}
			</div>
		</div>
	);
}

/* ----------------------------------------------------------- integration -- */

function Integration() {
	const steps = [
		{
			icon: <Terminal className="h-4 w-4" />,
			title: "Install the dependencies",
			body: (
				<>
					The card renders through{" "}
					<code className="font-mono text-press">
						@paper-design/shaders-react
					</code>{" "}
					(the <code className="font-mono text-press">Dithering</code> shader)
					and uses <code className="font-mono text-press">lucide-react</code>{" "}
					for its arrow icon. Add both before copying the file in.
				</>
			),
			code: INSTALL_SOURCE,
			filename: "bash",
		},
		{
			icon: <FolderTree className="h-4 w-4" />,
			title: "Why it lives in components/ui",
			body: (
				<>
					shadcn maps the <code className="font-mono text-press">ui</code> alias
					to <code className="font-mono text-press">@/components/ui</code> in{" "}
					<code className="font-mono text-press">components.json</code>. The
					demo imports{" "}
					<code className="font-mono text-press">
						@/components/ui/hero-dithering-card
					</code>
					, so the file has to sit there for the alias — and any future{" "}
					<code className="font-mono text-press">shadcn add</code> — to resolve.
					If your project aliases{" "}
					<code className="font-mono text-press">@</code> elsewhere, create the
					folder so the import path stays portable.
				</>
			),
			code: TREE_SOURCE,
			filename: "tree",
		},
		{
			icon: <Box className="h-4 w-4" />,
			title: "Import and place it",
			body: (
				<>
					The shader sits behind the content at{" "}
					<code className="font-mono text-press">z-0</code> with{" "}
					<code className="font-mono text-press">colorBack="#00000000"</code>,
					so it blends onto whatever surface you place the card on. No props
					required.
				</>
			),
			code: USAGE_SOURCE,
			filename: "page.tsx",
		},
	];

	return (
		<section id="install" className="border-b border-border">
			<div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
				<SectionLabel icon={<Terminal className="h-3.5 w-3.5" />} index="02">
					integration
				</SectionLabel>
				<h2 className="mt-6 max-w-2xl font-serif text-[clamp(1.8rem,3.6vw,2.9rem)] font-medium leading-[1.05] tracking-tight">
					Three steps from a fresh shadcn app to a shipping plate.
				</h2>

				<ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
					{steps.map((s, i) => (
						<li key={s.title} className="min-w-0 flex flex-col">
							<div className="mb-4 flex items-center gap-3">
								<span className="grid h-9 w-9 place-items-center rounded-md border border-border bg-card text-press">
									{s.icon}
								</span>
								<span className="font-mono text-[11px] tracking-[0.18em] text-ink-dim">
									STEP {String(i + 1).padStart(2, "0")}
								</span>
							</div>
							<h3 className="font-serif text-xl font-medium">{s.title}</h3>
							<p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">
								{s.body}
							</p>
							<CodeBlock code={s.code} filename={s.filename} className="mt-5" />
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}

/* ---------------------------------------------------------------- source -- */

type Tab = "component" | "demo" | "usage";

function Source() {
	const [tab, setTab] = useState<Tab>("component");
	const tabs: { id: Tab; label: string; file: string; code: string }[] = [
		{
			id: "component",
			label: "Component",
			file: "components/ui/hero-dithering-card.tsx",
			code: COMPONENT_SOURCE,
		},
		{
			id: "demo",
			label: "Demo",
			file: "components/ui/demo.tsx",
			code: DEMO_SOURCE,
		},
		{ id: "usage", label: "Usage", file: "page.tsx", code: USAGE_SOURCE },
	];
	const active = tabs.find((t) => t.id === tab) ?? tabs[0];

	return (
		<section id="source" className="border-b border-border bg-paper-2/40">
			<div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
				<SectionLabel icon={<FileCode className="h-3.5 w-3.5" />} index="03">
					source
				</SectionLabel>
				<h2 className="mt-6 max-w-2xl font-serif text-[clamp(1.8rem,3.6vw,2.9rem)] font-medium leading-[1.05] tracking-tight">
					Copy the file. It is the whole component.
				</h2>

				<div className="mt-10 flex flex-wrap gap-1.5">
					{tabs.map((t) => (
						<button
							key={t.id}
							type="button"
							onClick={() => setTab(t.id)}
							className={`rounded-md border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
								tab === t.id
									? "border-press/60 bg-press/10 text-press"
									: "border-border bg-paper text-ink-dim hover:text-foreground"
							}`}
						>
							{t.label}
						</button>
					))}
				</div>

				<CodeBlock code={active.code} filename={active.file} className="mt-5" />
			</div>
		</section>
	);
}

/* ------------------------------------------------------------------- api -- */

function Api() {
	const props: { name: string; type: string; def: string; desc: string }[] = [
		{
			name: "colorFront",
			type: "string",
			def: '"#EC4E02"',
			desc: "The ink the dither lays down. The card uses Pantone-orange.",
		},
		{
			name: "colorBack",
			type: "string",
			def: '"#00000000"',
			desc: "Background fill — transparent here so the card surface shows through.",
		},
		{
			name: "shape",
			type: "DitheringShape",
			def: '"warp"',
			desc: "Underlying field: simplex · warp · dots · wave · ripple · swirl · sphere.",
		},
		{
			name: "type",
			type: "DitheringType",
			def: '"4x4"',
			desc: "Bayer matrix: random · 2x2 · 4x4 · 8x8 — the dot grid resolution.",
		},
		{
			name: "speed",
			type: "number",
			def: "0.2 / 0.6",
			desc: "Animation rate. The card eases it up on hover.",
		},
		{
			name: "minPixelRatio",
			type: "number",
			def: "1",
			desc: "Floors the render DPR so the pattern stays crisp on low-DPI screens.",
		},
		{
			name: "className",
			type: "string",
			def: '"size-full"',
			desc: "Sizing classes for the canvas wrapper.",
		},
	];

	return (
		<section id="api" className="border-b border-border">
			<div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
				<SectionLabel icon={<Layers className="h-3.5 w-3.5" />} index="04">
					api · Dithering
				</SectionLabel>
				<h2 className="mt-6 max-w-2xl font-serif text-[clamp(1.8rem,3.6vw,2.9rem)] font-medium leading-[1.05] tracking-tight">
					The props the card sets on the shader.
				</h2>

				<div className="mt-10 overflow-hidden rounded-lg border border-border">
					{props.map((p, i) => (
						<div
							key={p.name}
							className={`grid grid-cols-1 gap-x-4 gap-y-1 px-4 py-3.5 sm:grid-cols-[170px_140px_1fr] ${
								i === 0 ? "" : "border-t border-border"
							}`}
						>
							<code className="font-mono text-[13px] text-press">{p.name}</code>
							<span className="font-mono text-[11px] text-ink-dim">
								{p.type}
							</span>
							<span className="text-[13px] leading-relaxed text-foreground/80">
								{p.desc} <span className="text-ink-dim">· default {p.def}</span>
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

/* ------------------------------------------------------------- demo bay --- */

function DemoBay() {
	return (
		<section className="border-b border-border bg-paper-2/40">
			<div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
				<SectionLabel icon={<Sparkles className="h-3.5 w-3.5" />} index="05">
					demo · DemoOne
				</SectionLabel>
				<h2 className="mt-6 max-w-2xl font-serif text-[clamp(1.8rem,3.6vw,2.9rem)] font-medium leading-[1.05] tracking-tight">
					The brief's demo, running unmodified.
				</h2>
				<p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim">
					<code className="font-mono text-press">DemoOne</code> renders{" "}
					<code className="font-mono text-press">&lt;CTASection /&gt;</code>{" "}
					exactly as exported — no wrapper, no overrides.
				</p>
				<div className="mt-8">
					<DemoOne />
				</div>
			</div>
		</section>
	);
}

/* ----------------------------------------------------------------- shared -- */

function SectionLabel({
	icon,
	index,
	children,
}: {
	icon: ReactNode;
	index: string;
	children: ReactNode;
}) {
	return (
		<div className="flex items-center gap-4">
			<span className="grid h-7 w-7 place-items-center rounded-sm border border-border bg-card text-press">
				{icon}
			</span>
			<span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-dim">
				{index} <span className="mx-1.5 text-border">/</span>{" "}
				<span className="text-foreground/80">{children}</span>
			</span>
		</div>
	);
}

function Colophon() {
	return (
		<footer className="bg-background">
			<div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
				<span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-ink-dim">
					<Printer className="h-3.5 w-3.5" />
					DITHER·PRESS — hero-dithering-card · components/ui
				</span>
				<span className="font-mono text-[11px] tracking-[0.14em] text-ink-dim">
					@paper-design/shaders · drop-in · zero required props
				</span>
			</div>
		</footer>
	);
}
