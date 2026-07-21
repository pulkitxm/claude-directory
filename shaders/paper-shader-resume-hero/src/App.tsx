import { Dithering } from "@paper-design/shaders-react";
import {
	ArrowUpRight,
	Boxes,
	Command,
	FileCode2,
	Github,
	Layers,
	MoonStar,
	Sun,
	Terminal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { ShaderConsole } from "@/components/shader-console";
import ResumePage from "@/components/ui/portfolio-hero-with-paper-shaders";
import { useInView } from "@/lib/useInView";
import { useStudioClock } from "@/lib/useStudioClock";
import { cn } from "@/lib/utils";
import {
	COMPONENT_SOURCE,
	DEMO_SOURCE,
	INSTALL_SOURCE,
} from "@/source-snippets";

/* ------------------------------------------------------------------ *
 * Small chrome primitives
 * ------------------------------------------------------------------ */

function SectionLabel({
	index,
	children,
}: {
	index: string;
	children: React.ReactNode;
}) {
	return (
		<div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-dim">
			<span className="text-magenta">{index}</span>
			<span className="h-px w-8 bg-rule" />
			{children}
		</div>
	);
}

function Pill({ children }: { children: React.ReactNode }) {
	return (
		<span className="rounded-full border border-border bg-panel-2/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-ink-dim">
			{children}
		</span>
	);
}

/* ------------------------------------------------------------------ *
 * Masthead — fixed, with the studio theme toggle and a live clock.
 * ------------------------------------------------------------------ */

function Masthead({
	light,
	onToggle,
}: {
	light: boolean;
	onToggle: () => void;
}) {
	const clock = useStudioClock();
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
				<div className="flex items-center gap-3">
					<div className="grid size-7 place-items-center rounded-md bg-magenta text-[13px] font-bold text-primary-foreground">
						✦
					</div>
					<div className="leading-none">
						<div className="font-mono text-[13px] font-medium tracking-tight text-ink">
							paper-shader-resume-hero
						</div>
						<div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
							components/ui · shadcn integration
						</div>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<div className="hidden items-center gap-2 font-mono text-[10.5px] uppercase tracking-widest text-ink-dim sm:flex">
						<span className="ink-run inline-block h-1.5 w-1.5 rounded-full bg-magenta" />
						<span className="tabular-nums">{clock.uptime.toFixed(1)}s</span>
						<span className="text-rule">/</span>
						<span className="tabular-nums">{clock.frames} fr</span>
					</div>
					<a
						href="https://github.com/paper-design/shaders"
						target="_blank"
						rel="noreferrer noopener"
						className="hidden rounded-md border border-border p-2 text-ink-dim transition-colors hover:border-magenta/60 hover:text-ink sm:inline-flex"
						aria-label="paper-design/shaders on GitHub"
					>
						<Github className="size-4" />
					</a>
					<button
						type="button"
						onClick={onToggle}
						className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-ink-dim transition-colors hover:border-magenta/60 hover:text-ink"
						aria-label={
							light
								? "Switch to darkroom theme"
								: "Switch to light studio theme"
						}
					>
						{light ? (
							<MoonStar className="size-4" />
						) : (
							<Sun className="size-4" />
						)}
						{light ? "darkroom" : "studio"}
					</button>
				</div>
			</div>
		</header>
	);
}

/* ------------------------------------------------------------------ *
 * Ticker — a thin marquee of shader/integration facts.
 * ------------------------------------------------------------------ */

function Ticker() {
	const items = [
		"@paper-design/shaders-react",
		"Dithering · shape=sphere",
		"bayer 4×4",
		"live WebGL · prop-driven telemetry",
		"shadcn components/ui",
		"Tailwind v4 · TypeScript",
		"fonts vendored · offline",
		"CLI-verified render",
	];
	const row = [...items, ...items];
	return (
		<div className="overflow-hidden border-y border-border bg-panel-2/30 py-2.5">
			<div className="marquee flex w-max items-center gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">
				{row.map((t, i) => (
					<span key={i} className="flex items-center gap-8">
						{t}
						<span className="text-magenta">✦</span>
					</span>
				))}
			</div>
		</div>
	);
}

/* ------------------------------------------------------------------ *
 * Hero — the verbatim ResumePage component, framed as a press proof.
 * ResumePage owns its OWN light/dark state internally (the prompt's
 * `isDarkMode` useState), independent of the studio theme.
 * ------------------------------------------------------------------ */

function Hero() {
	return (
		<section id="top" className="relative scroll-mt-24">
			<div className="mx-auto max-w-6xl px-5 pb-10 pt-28 sm:px-8 sm:pt-32">
				<div className="grid items-end gap-6 pb-8 lg:grid-cols-[1.5fr_1fr]">
					<div className="min-w-0">
						<SectionLabel index="00">the component, live</SectionLabel>
						<h1 className="font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
							A résumé hero,
							<br />
							<span className="font-serif italic text-magenta">
								dithered to ink.
							</span>
						</h1>
						<p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-dim">
							<code className="rounded bg-panel-2/70 px-1.5 py-0.5 font-mono text-[13px] text-ink">
								portfolio-hero-with-paper-shaders.tsx
							</code>{" "}
							dropped verbatim into shadcn's{" "}
							<code className="rounded bg-panel-2/70 px-1.5 py-0.5 font-mono text-[13px] text-ink">
								@/components/ui
							</code>
							. A split-screen designer CV where the right panel is a real{" "}
							<span className="text-ink">@paper-design/shaders-react</span>{" "}
							Dithering canvas, with its own self-contained light/dark toggle.
						</p>
						<div className="mt-6 flex flex-wrap items-center gap-2">
							<Pill>react 19</Pill>
							<Pill>typescript</Pill>
							<Pill>tailwind v4</Pill>
							<Pill>shadcn/ui</Pill>
							<Pill>webgl</Pill>
						</div>
					</div>

					<div className="space-y-2 font-mono text-[12px] text-ink-dim">
						<div className="flex justify-between border-b border-border/70 pb-2">
							<span>artifact</span>
							<span className="text-ink">ResumePage</span>
						</div>
						<div className="flex justify-between border-b border-border/70 pb-2">
							<span>dependency</span>
							<span className="text-ink">shaders-react@0.0.76</span>
						</div>
						<div className="flex justify-between border-b border-border/70 pb-2">
							<span>internal state</span>
							<span className="text-ink">isDarkMode</span>
						</div>
						<div className="flex justify-between">
							<span>props</span>
							<span className="text-ink">none (self-contained)</span>
						</div>
					</div>
				</div>

				{/* The proof — verbatim component inside a darkroom plate. */}
				<figure className="relative">
					<figcaption className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">
						<span className="flex items-center gap-2">
							<span className="inline-block h-1.5 w-1.5 rounded-full bg-magenta" />
							proof · &lt;ResumePage /&gt; · rendered as-shipped
						</span>
						<span className="hidden sm:inline">
							toggle lives inside the component →
						</span>
					</figcaption>
					<div className="relative overflow-hidden rounded-3xl border border-border bg-panel shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
						<span className="crop crop-tl z-20" />
						<span className="crop crop-tr z-20" />
						<span className="crop crop-bl z-20" />
						<span className="crop crop-br z-20" />
						{/* Fixed-height plate so the component's min-h-screen layout reads
                as a contained "proof" rather than taking the whole viewport. */}
						<div className="relative h-[460px] sm:h-[520px]">
							<div className="absolute inset-0 [&_.min-h-screen]:!min-h-full [&>div]:h-full">
								<ResumePage />
							</div>
						</div>
					</div>
				</figure>
			</div>
		</section>
	);
}

/* ------------------------------------------------------------------ *
 * Console section
 * ------------------------------------------------------------------ */

function ConsoleSection() {
	return (
		<section
			id="console"
			className="relative scroll-mt-24 border-t border-border"
		>
			<div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
				<SectionLabel index="01">ink console</SectionLabel>
				<div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<h2 className="max-w-xl font-sans text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
						Every Dithering prop, promoted to a live control.
					</h2>
					<p className="max-w-md text-sm leading-relaxed text-ink-dim">
						The component bakes in <span className="text-ink">shape</span>,{" "}
						<span className="text-ink">type</span>,{" "}
						<span className="text-ink">pxSize</span>,{" "}
						<span className="text-ink">scale</span> and{" "}
						<span className="text-ink">speed</span>. Here they're faders — and
						the telemetry strip reads back the live props, a real rAF frame
						rate, and the active ink's luminance.
					</p>
				</div>
				<ShaderConsole />
			</div>
		</section>
	);
}

/* ------------------------------------------------------------------ *
 * Applied-in-context — the dither as a row of portfolio cards.
 * ------------------------------------------------------------------ */

const PEOPLE = [
	{
		name: "JESSI REDACTED",
		role: "DESIGNER",
		shape: "sphere",
		front: "hsl(320, 100%, 70%)",
	},
	{
		name: "MAYA OKONKWO",
		role: "ART DIRECTOR",
		shape: "swirl",
		front: "hsl(280, 100%, 72%)",
	},
	{
		name: "REN TAKAHASHI",
		role: "MOTION",
		shape: "ripple",
		front: "hsl(190, 100%, 66%)",
	},
] as const;

/**
 * A team card whose portrait is a live Dithering shader, mounted only once the
 * card nears the viewport. Deferring the WebGL context keeps the top of the
 * page to just two live contexts (hero + console), so initial layout is fast.
 */
function PersonCard({ person }: { person: (typeof PEOPLE)[number] }) {
	const [ref, inView] = useInView<HTMLDivElement>();
	return (
		<article className="group overflow-hidden rounded-2xl border border-border bg-panel/60 transition-colors hover:border-magenta/50">
			<div ref={ref} className="relative h-44 overflow-hidden bg-black">
				{inView ? (
					<Dithering
						style={{ height: "100%", width: "100%" }}
						colorBack="hsl(0, 0%, 0%)"
						colorFront={person.front}
						shape={person.shape}
						type="4x4"
						pxSize={3}
						scale={0.85}
						speed={0.12}
					/>
				) : (
					// Placeholder halftone so the card has presence before the shader mounts.
					<span
						className="absolute inset-0"
						style={{
							backgroundImage: `radial-gradient(${person.front} 35%, transparent 36%) 0 0 / 4px 4px, radial-gradient(circle at 40% 35%, ${person.front}, #000 70%)`,
							opacity: 0.6,
						}}
					/>
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
			</div>
			<div className="p-4 font-mono">
				<div className="text-[13px] font-medium tracking-tight text-ink">
					{person.name}
				</div>
				<div className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-ink-dim">
					{person.role}
				</div>
				<div className="mt-3 flex items-center gap-3 text-[11px] text-ink-dim">
					<span className="flex space-x-3">
						<span>Twitter</span>
						<span>Email</span>
						<span>Blog</span>
					</span>
					<ArrowUpRight className="ml-auto size-3.5 text-magenta opacity-0 transition-opacity group-hover:opacity-100" />
				</div>
			</div>
		</article>
	);
}

function ContextSection() {
	return (
		<section
			id="context"
			className="relative scroll-mt-24 border-t border-border"
		>
			<div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
				<SectionLabel index="02">applied in context</SectionLabel>
				<div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<h2 className="max-w-xl font-sans text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
						One component, a whole directory of faces.
					</h2>
					<p className="max-w-md text-sm leading-relaxed text-ink-dim">
						No stock photography — every portrait is the Dithering shader
						itself, so the gallery stays fully procedural and offline. Drop the
						component into a team page and each card gets its own ink.
					</p>
				</div>
				<div className="grid gap-4 sm:grid-cols-3">
					{PEOPLE.map((p) => (
						<PersonCard key={p.name} person={p} />
					))}
				</div>
			</div>
		</section>
	);
}

/* ------------------------------------------------------------------ *
 * Integration story — setup steps + why components/ui matters.
 * ------------------------------------------------------------------ */

const STEPS = [
	{
		icon: Terminal,
		title: "Scaffold + Tailwind + TS",
		body: "Vite react-ts template, then Tailwind v4 via @tailwindcss/vite and the @/* path alias in tsconfig + vite.config.",
	},
	{
		icon: Command,
		title: "shadcn init",
		body: "npx shadcn@latest init writes components.json and establishes src/components/ui as the canonical UI directory.",
	},
	{
		icon: Boxes,
		title: "Install the dependency",
		body: "npm i @paper-design/shaders-react — the component's only external import (Dithering).",
	},
	{
		icon: FileCode2,
		title: "Drop the files in",
		body: "portfolio-hero-with-paper-shaders.tsx + demo.tsx land in src/components/ui, exactly where the verbatim @/ import resolves.",
	},
];

function IntegrationSection() {
	return (
		<section
			id="integration"
			className="relative scroll-mt-24 border-t border-border"
		>
			<div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
				<SectionLabel index="03">integration</SectionLabel>
				<div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
					<div className="min-w-0">
						<h2 className="font-sans text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
							Wiring it into a shadcn project.
						</h2>
						<p className="mt-4 text-sm leading-relaxed text-ink-dim">
							The codebase must support a shadcn project structure, Tailwind CSS
							and TypeScript. This repo ships all three — Vite + React 19,
							Tailwind v4 and strict TS — with a
							<code className="mx-1 rounded bg-panel-2/70 px-1.5 py-0.5 font-mono text-[12.5px] text-ink">
								components.json
							</code>
							aliasing <span className="text-ink">ui → @/components/ui</span>.
						</p>

						<div className="mt-6 space-y-3">
							{STEPS.map((s, i) => (
								<div
									key={s.title}
									className="flex gap-4 rounded-xl border border-border bg-panel/50 p-4"
								>
									<div className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-panel-2/60 text-magenta">
										<s.icon className="size-4" />
									</div>
									<div>
										<div className="flex items-baseline gap-2">
											<span className="font-mono text-[11px] text-magenta">
												0{i + 1}
											</span>
											<h3 className="font-sans text-sm font-semibold text-ink">
												{s.title}
											</h3>
										</div>
										<p className="mt-1 text-[13px] leading-relaxed text-ink-dim">
											{s.body}
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="mt-6 rounded-xl border border-magenta/30 bg-magenta/[0.06] p-4">
							<div className="mb-1.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-magenta">
								<Layers className="size-3.5" /> why /components/ui
							</div>
							<p className="text-[13px] leading-relaxed text-ink-dim">
								shadcn's default UI path is{" "}
								<code className="rounded bg-panel-2/70 px-1.5 py-0.5 font-mono text-[12px] text-ink">
									components/ui
								</code>
								. Keeping it there is what makes the verbatim import{" "}
								<code className="rounded bg-panel-2/70 px-1.5 py-0.5 font-mono text-[12px] text-ink">
									@/components/ui/portfolio-hero-with-paper-shaders
								</code>{" "}
								resolve unchanged, lets the shadcn CLI add/update components in
								the expected place, and keeps primitives separate from app
								composition. If your alias points elsewhere, create the folder
								(or adjust the alias) so drop-in components keep working.
							</p>
						</div>
					</div>

					<div className="min-w-0 space-y-4">
						<CodeBlock
							code={INSTALL_SOURCE}
							label="setup · shell"
							lang="bash"
						/>
						<div className="rounded-xl border border-border bg-panel/50 p-4">
							<div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">
								integration notes
							</div>
							<ul className="space-y-2.5 text-[13px] leading-relaxed text-ink-dim">
								<li className="flex gap-2">
									<span className="text-magenta">→</span>
									<span>
										<span className="text-ink">Props &amp; data:</span> none.
										ResumePage is self-contained; the CV content is hard-coded
										and the only state is{" "}
										<code className="rounded bg-panel-2/70 px-1 font-mono text-[12px] text-ink">
											isDarkMode
										</code>
										. No context providers or external hooks are required.
									</span>
								</li>
								<li className="flex gap-2">
									<span className="text-magenta">→</span>
									<span>
										<span className="text-ink">Assets:</span> no images — the
										visual is the Dithering canvas. SVG icons are inline; this
										showcase swaps them for{" "}
										<span className="text-ink">lucide-react</span> in the
										chrome.
									</span>
								</li>
								<li className="flex gap-2">
									<span className="text-magenta">→</span>
									<span>
										<span className="text-ink">Fix:</span>{" "}
										<code className="rounded bg-panel-2/70 px-1 font-mono text-[12px] text-ink">
											shape="cat"
										</code>{" "}
										isn't a valid DitheringShape (
										<span className="text-ink">
											simplex · warp · dots · wave · ripple · swirl · sphere
										</span>
										); it fails strict TS and paints nothing, so it's corrected
										to{" "}
										<code className="rounded bg-panel-2/70 px-1 font-mono text-[12px] text-ink">
											sphere
										</code>
										.
									</span>
								</li>
								<li className="flex gap-2">
									<span className="text-magenta">→</span>
									<span>
										<span className="text-ink">Responsive:</span> the source is
										a fixed{" "}
										<code className="rounded bg-panel-2/70 px-1 font-mono text-[12px] text-ink">
											w-1/2
										</code>{" "}
										split. On narrow screens that's cramped — stack the panels (
										<code className="rounded bg-panel-2/70 px-1 font-mono text-[12px] text-ink">
											flex-col
										</code>{" "}
										+{" "}
										<code className="rounded bg-panel-2/70 px-1 font-mono text-[12px] text-ink">
											w-full
										</code>
										) for a real mobile layout.
									</span>
								</li>
								<li className="flex gap-2">
									<span className="text-magenta">→</span>
									<span>
										<span className="text-ink">Best placement:</span> a
										portfolio / landing hero or an "about" splash — anywhere a
										full-bleed, art-directed first impression fits.
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

/* ------------------------------------------------------------------ *
 * Source tabs — the verbatim component + demo.
 * ------------------------------------------------------------------ */

function SourceSection() {
	const [tab, setTab] = useState<"component" | "demo">("component");
	return (
		<section
			id="source"
			className="relative scroll-mt-24 border-t border-border"
		>
			<div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
				<SectionLabel index="04">source</SectionLabel>
				<div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<h2 className="max-w-xl font-sans text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
						The files, as they live in{" "}
						<span className="font-serif italic">components/ui</span>.
					</h2>
					<div className="flex gap-1.5">
						{(["component", "demo"] as const).map((t) => (
							<button
								key={t}
								type="button"
								onClick={() => setTab(t)}
								aria-pressed={tab === t}
								className={cn(
									"rounded-md border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors",
									tab === t
										? "border-magenta bg-magenta/10 text-ink"
										: "border-border text-ink-dim hover:border-magenta/50 hover:text-ink",
								)}
							>
								{t === "component" ? "portfolio-hero…tsx" : "demo.tsx"}
							</button>
						))}
					</div>
				</div>
				{tab === "component" ? (
					<CodeBlock
						code={COMPONENT_SOURCE}
						label="src/components/ui/portfolio-hero-with-paper-shaders.tsx"
					/>
				) : (
					<CodeBlock code={DEMO_SOURCE} label="src/components/ui/demo.tsx" />
				)}
			</div>
		</section>
	);
}

/* ------------------------------------------------------------------ *
 * Props / API table
 * ------------------------------------------------------------------ */

const PROPS: { name: string; type: string; def: string; note: string }[] = [
	{
		name: "shape",
		type: "DitheringShape",
		def: '"sphere"',
		note: "simplex·warp·dots·wave·ripple·swirl·sphere",
	},
	{
		name: "type",
		type: "DitheringType",
		def: '"4x4"',
		note: "bayer matrix: random·2x2·4x4·8x8",
	},
	{
		name: "colorBack",
		type: "string",
		def: '"#000000"',
		note: "background ink (any CSS colour)",
	},
	{
		name: "colorFront",
		type: "string",
		def: '"#00b2ff"',
		note: "foreground ink",
	},
	{
		name: "pxSize",
		type: "number",
		def: "2",
		note: "dither cell size (deprecated alias of size)",
	},
	{ name: "scale", type: "number", def: "0.6", note: "pattern scale / zoom" },
	{
		name: "speed",
		type: "number",
		def: "1",
		note: "animation rate (0 = frozen)",
	},
	{
		name: "offsetX / offsetY",
		type: "number",
		def: "0",
		note: "pattern translation",
	},
	{
		name: "rotation",
		type: "number",
		def: "0",
		note: "pattern rotation (deg)",
	},
];

function ApiSection() {
	return (
		<section id="api" className="relative scroll-mt-24 border-t border-border">
			<div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
				<SectionLabel index="05">api · Dithering</SectionLabel>
				<h2 className="mb-6 max-w-xl font-sans text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
					The props the component drives.
				</h2>
				<div className="overflow-hidden rounded-2xl border border-border">
					<div className="grid grid-cols-[1.2fr_1.2fr_0.8fr_2fr] gap-2 border-b border-border bg-panel-2/40 px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-dim">
						<span>prop</span>
						<span>type</span>
						<span>default</span>
						<span>note</span>
					</div>
					{PROPS.map((p, i) => (
						<div
							key={p.name}
							className={cn(
								"grid grid-cols-[1.2fr_1.2fr_0.8fr_2fr] gap-2 px-4 py-3 font-mono text-[12.5px]",
								i % 2 ? "bg-panel/40" : "bg-transparent",
							)}
						>
							<span className="text-magenta">{p.name}</span>
							<span className="text-ink">{p.type}</span>
							<span className="text-ink-dim">{p.def}</span>
							<span className="text-ink-dim">{p.note}</span>
						</div>
					))}
				</div>
				<p className="mt-3 font-mono text-[11px] text-ink-dim">
					source: @paper-design/shaders-react@0.0.76 · DitheringProps
				</p>
			</div>
		</section>
	);
}

/* ------------------------------------------------------------------ *
 * Colophon footer
 * ------------------------------------------------------------------ */

function Colophon() {
	return (
		<footer className="relative border-t border-border">
			<div className="regrid absolute inset-0 opacity-[0.35]" />
			<div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8">
				<div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
					<div>
						<div className="font-serif text-3xl italic text-ink">Jessi.cv</div>
						<p className="mt-2 max-w-md text-[13px] leading-relaxed text-ink-dim">
							A shadcn/ui integration of @paper-design/shaders-react's Dithering
							shader. Built as a Fable 5 experiment · verified headlessly via
							the CLI · fonts vendored locally.
						</p>
					</div>
					<div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] text-ink-dim">
						<a className="transition-colors hover:text-ink" href="#top">
							Links
						</a>
						<a
							className="transition-colors hover:text-ink"
							href="https://github.com/paper-design/shaders"
							target="_blank"
							rel="noreferrer noopener"
						>
							Twitter
						</a>
						<a className="transition-colors hover:text-ink" href="#integration">
							Email
						</a>
						<a className="transition-colors hover:text-ink" href="#source">
							Blog
						</a>
					</div>
				</div>
				<div className="mt-8 flex items-center justify-between border-t border-border/70 pt-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-dim">
					<span>© Jessi.cv — proof copy</span>
					<span className="flex items-center gap-2">
						<span className="ink-run inline-block h-1.5 w-1.5 rounded-full bg-magenta" />
						ink on black
					</span>
				</div>
			</div>
		</footer>
	);
}

/* ------------------------------------------------------------------ *
 * App
 * ------------------------------------------------------------------ */

export default function App() {
	// Studio chrome theme. Default = darkroom (no class). `.light` flips it.
	const [light, setLight] = useState(false);

	useEffect(() => {
		const el = document.documentElement;
		el.classList.toggle("light", light);
	}, [light]);

	return (
		<div className="relative min-h-screen">
			{/* page-wide faint dot field */}
			<div className="dotfield pointer-events-none fixed inset-0 opacity-[0.5]" />
			<div className="relative">
				<Masthead light={light} onToggle={() => setLight((v) => !v)} />
				<Hero />
				<Ticker />
				<ConsoleSection />
				<ContextSection />
				<IntegrationSection />
				<SourceSection />
				<ApiSection />
				<Colophon />
			</div>
		</div>
	);
}
