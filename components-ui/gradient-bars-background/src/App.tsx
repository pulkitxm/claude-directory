import { useEffect, useMemo, useRef, useState } from "react";
import {
	AudioLines,
	Boxes,
	Github,
	Layers,
	MousePointerClick,
	Palette,
	Settings,
	Sparkles,
	Zap,
} from "lucide-react";
import { Component, GradientBars } from "@/components/ui/gradient-bars-background";
import { Fader, SwatchRow } from "@/components/lab/Fader";
import { CodeBlock } from "@/components/lab/CodeBlock";
import {
	Card,
	CheckPill,
	Eyebrow,
	Lead,
	Section,
	SectionTitle,
	StepNum,
} from "@/components/lab/Primitives";
import {
	COMPONENT_SOURCE,
	DEP_INSTALL,
	PRESETS,
	PROPS,
	QA_LIST,
	SETUP_SHADCN,
	TICKER,
	USAGE_SNIPPET_HEAD,
} from "@/lib/content";

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function hexToRgb(hex: string): string {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
		: "rgb(255, 60, 0)";
}

/** Live render-FPS sampler used by the hero telemetry strip. */
function useFps(): number {
	const [fps, setFps] = useState(60);
	useEffect(() => {
		let raf = 0;
		let frames = 0;
		let last = performance.now();
		const tick = (t: number) => {
			frames++;
			if (t - last >= 500) {
				setFps(Math.round((frames * 1000) / (t - last)));
				frames = 0;
				last = t;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);
	return fps;
}

function useUptime(): string {
	const start = useRef(Date.now());
	const [, force] = useState(0);
	useEffect(() => {
		const id = setInterval(() => force((n) => n + 1), 1000);
		return () => clearInterval(id);
	}, []);
	const s = Math.floor((Date.now() - start.current) / 1000);
	const mm = String(Math.floor(s / 60)).padStart(2, "0");
	const ss = String(s % 60).padStart(2, "0");
	return `${mm}:${ss}`;
}

/* ------------------------------------------------------------------ */
/* nav                                                                 */
/* ------------------------------------------------------------------ */

const NAV = [
	{ id: "deck", label: "Control deck" },
	{ id: "integrate", label: "Integration" },
	{ id: "api", label: "Props API" },
];

function Nav() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
			<nav className="flex w-full max-w-5xl items-center justify-between rounded-full border border-line/80 bg-ink-900/70 px-3 py-2 backdrop-blur-xl">
				<a
					href="#top"
					className="flex items-center gap-2 pl-2 font-display text-sm font-semibold tracking-tight text-fog-200"
				>
					<AudioLines className="h-4 w-4 text-flame-soft" />
					Gradient&nbsp;Bars
				</a>
				<div className="hidden items-center gap-1 sm:flex">
					{NAV.map((n) => (
						<a
							key={n.id}
							href={`#${n.id}`}
							className="rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fog-400 transition-colors hover:bg-ink-700/60 hover:text-fog-200"
						>
							{n.label}
						</a>
					))}
				</div>
				<a
					href="https://ui.shadcn.com"
					target="_blank"
					rel="noreferrer noopener"
					className="flex items-center gap-1.5 rounded-full border border-line bg-ink-800/80 px-3 py-1.5 font-mono text-[11px] text-fog-300 transition-colors hover:border-flame/40 hover:text-fog-200"
				>
					<Github className="h-3.5 w-3.5" />
					shadcn/ui
				</a>
			</nav>
		</header>
	);
}

/* ------------------------------------------------------------------ */
/* hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
	const fps = useFps();
	const uptime = useUptime();

	return (
		<div id="top" className="relative">
			{/* The verbatim <Component> wrapper, scaled up as the hero. */}
			<Component
				numBars={15}
				gradientFrom="rgb(255, 60, 0)"
				gradientTo="transparent"
				animationDuration={2}
				backgroundColor="rgb(9, 8, 7)"
			>
				{/* soft vignette so the headline reads over the bars */}
				<div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(9,8,7,0.55),transparent_70%)]" />

				<div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 text-center">
					<span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.24em] text-white/80 backdrop-blur-md">
						<Sparkles className="h-3.5 w-3.5 text-ember" />
						components / ui integration
					</span>

					<h1 className="mt-6 font-display text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl">
						Gradient&nbsp;Bars
					</h1>

					<p className="mt-5 max-w-xl text-pretty text-base text-white/55 sm:text-lg">
						An equalizer-shaped wall of pulsing CSS gradients — dropped into{" "}
						<code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[13px] text-white/80">
							@/components/ui
						</code>{" "}
						and wired to live controls. No canvas, no WebGL, no images.
					</p>

					<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
						<a
							href="#deck"
							className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
						>
							<Settings className="h-4 w-4 transition-transform group-hover:rotate-90" />
							Open the control deck
						</a>
						<a
							href="#integrate"
							className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-5 py-2.5 text-sm font-medium text-white/85 backdrop-blur-md transition-colors hover:border-white/40"
						>
							How it integrates
						</a>
					</div>
				</div>

				{/* telemetry strip */}
				<div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-black/35 backdrop-blur-md">
					<div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
						<Telemetry label="render" value={`${fps} fps`} live />
						<Telemetry label="bars" value="15" />
						<Telemetry label="assets" value="0 imgs" />
						<Telemetry label="uptime" value={uptime} />
					</div>
				</div>
			</Component>

			{/* spec ticker */}
			<div className="relative overflow-hidden border-y border-line bg-ink-900 py-3">
				<div className="flex w-max animate-ticker gap-8 whitespace-nowrap pr-8">
					{[...TICKER, ...TICKER].map((t, i) => (
						<span
							key={i}
							className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-fog-400"
						>
							<span className="h-1 w-1 rounded-full bg-flame" />
							{t}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}

function Telemetry({
	label,
	value,
	live = false,
}: {
	label: string;
	value: string;
	live?: boolean;
}) {
	return (
		<div className="flex items-center justify-between px-5 py-3">
			<span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
				{label}
			</span>
			<span className="flex items-center gap-1.5 font-mono text-xs font-medium tabular-nums text-white/85">
				{live && (
					<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame-soft" />
				)}
				{value}
			</span>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/* control deck                                                        */
/* ------------------------------------------------------------------ */

function ControlDeck() {
	const [numBars, setNumBars] = useState(11);
	const [color, setColor] = useState("#ff3c00");
	const [duration, setDuration] = useState(2);
	const [bg, setBg] = useState("#0a0a0a");

	const rgbFrom = useMemo(() => hexToRgb(color), [color]);

	const usage = `${USAGE_SNIPPET_HEAD}
  numBars={${numBars}}
  gradientFrom="${rgbFrom}"
  gradientTo="transparent"
  animationDuration={${duration}}
  backgroundColor="${hexToRgb(bg)}"
/>`;

	return (
		<Section id="deck" className="py-24 sm:py-28">
			<div className="flex flex-col gap-3">
				<Eyebrow>Live control deck</Eyebrow>
				<SectionTitle>Every fader is wired to a real prop.</SectionTitle>
				<Lead>
					The preview below is a second live <code className="font-mono text-ember">&lt;Component /&gt;</code>{" "}
					instance. Move a fader, pick a colour, change the canvas — the bars and
					the copyable usage snippet update in lock-step, so what you see is
					exactly what you ship.
				</Lead>
			</div>

			<div className="mt-10 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
				{/* live preview */}
				<div className="relative h-[420px] overflow-hidden rounded-2xl border border-line">
					<div className="absolute inset-0">
						<GradientBars
							numBars={numBars}
							gradientFrom={rgbFrom}
							gradientTo="transparent"
							animationDuration={duration}
						/>
						<div
							className="absolute inset-0 -z-10"
							style={{ background: bg }}
							data-deck-bg
						/>
					</div>
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,0,0,0.35),transparent_70%)]" />
					<div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
						<p
							className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
							data-deck-headline
						>
							{numBars} bars
						</p>
						<p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-white/55">
							{rgbFrom}
						</p>
					</div>
					<span className="absolute left-3 top-3 z-10 rounded-md border border-white/10 bg-black/40 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 backdrop-blur-sm">
						live preview
					</span>
				</div>

				{/* controls */}
				<Card className="flex flex-col gap-6">
					<div className="flex items-center gap-2">
						<Settings className="h-4 w-4 text-flame-soft" />
						<h3 className="font-display text-sm font-semibold tracking-tight text-fog-200">
							Customize
						</h3>
					</div>

					<Fader
						label="numBars"
						value={numBars}
						min={3}
						max={20}
						onChange={setNumBars}
					/>
					<Fader
						label="animationDuration"
						value={duration}
						min={0.5}
						max={6}
						step={0.5}
						unit="s"
						onChange={setDuration}
					/>

					<div>
						<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog-400">
							gradientFrom
						</span>
						<div className="mt-2 flex items-center gap-3">
							<label className="relative h-9 w-12 shrink-0 cursor-pointer overflow-hidden rounded-md border border-white/15">
								<input
									type="color"
									value={color}
									onChange={(e) => setColor(e.target.value)}
									className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
									aria-label="Pick bar gradient colour"
								/>
								<span
									className="absolute inset-0"
									style={{ background: color }}
								/>
							</label>
							<SwatchRow
								colors={PRESETS}
								active={color}
								onPick={setColor}
								className="flex-1"
							/>
						</div>
					</div>

					<div>
						<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog-400">
							backgroundColor
						</span>
						<div className="mt-2 flex items-center gap-3">
							<label className="relative h-9 w-12 shrink-0 cursor-pointer overflow-hidden rounded-md border border-white/15">
								<input
									type="color"
									value={bg}
									onChange={(e) => setBg(e.target.value)}
									className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
									aria-label="Pick canvas background colour"
								/>
								<span className="absolute inset-0" style={{ background: bg }} />
							</label>
							<div className="grid flex-1 grid-cols-4 gap-2">
								{["#0a0a0a", "#09080d", "#0d0a14", "#13060a"].map((c) => (
									<button
										key={c}
										type="button"
										onClick={() => setBg(c)}
										aria-label={`Set canvas to ${c}`}
										className="aspect-square rounded-md border border-white/10 transition-transform hover:scale-110"
										style={{ background: c }}
									/>
								))}
							</div>
						</div>
					</div>
				</Card>
			</div>

			{/* mirrored usage snippet */}
			<div className="mt-5">
				<CodeBlock
					code={usage}
					filename="live-usage.tsx"
					lang="tsx"
				/>
			</div>
		</Section>
	);
}

/* ------------------------------------------------------------------ */
/* integration story                                                   */
/* ------------------------------------------------------------------ */

function Integration() {
	return (
		<Section id="integrate" className="py-24 sm:py-28">
			<div className="flex flex-col gap-3">
				<Eyebrow>Integration story</Eyebrow>
				<SectionTitle>Drop it into a shadcn project — unchanged.</SectionTitle>
				<Lead>
					The prompt asks for a shadcn-structured, Tailwind + TypeScript codebase
					with the component living under <code className="font-mono text-ember">/components/ui</code>.
					Here is the supported-stack check, the CLI setup, why that folder
					matters, the single dependency, and the verbatim source.
				</Lead>
			</div>

			{/* supported stack check */}
			<div className="mt-10 grid gap-5 md:grid-cols-3">
				<Card>
					<Boxes className="h-5 w-5 text-flame-soft" />
					<h3 className="mt-3 font-display text-base font-semibold text-fog-200">
						shadcn structure
					</h3>
					<p className="mt-1.5 text-sm leading-relaxed text-fog-400">
						This project ships a real <code className="font-mono text-ember">components.json</code>,
						the <code className="font-mono text-ember">@/*</code> alias, and the{" "}
						<code className="font-mono text-ember">@/lib/utils</code> <code className="font-mono text-ember">cn()</code> helper.
					</p>
				</Card>
				<Card>
					<Layers className="h-5 w-5 text-flame-soft" />
					<h3 className="mt-3 font-display text-base font-semibold text-fog-200">
						Tailwind CSS v4
					</h3>
					<p className="mt-1.5 text-sm leading-relaxed text-fog-400">
						Wired through <code className="font-mono text-ember">@tailwindcss/vite</code> with a single{" "}
						<code className="font-mono text-ember">@import "tailwindcss"</code> and design tokens in{" "}
						<code className="font-mono text-ember">@theme</code>.
					</p>
				</Card>
				<Card>
					<Zap className="h-5 w-5 text-flame-soft" />
					<h3 className="mt-3 font-display text-base font-semibold text-fog-200">
						TypeScript
					</h3>
					<p className="mt-1.5 text-sm leading-relaxed text-fog-400">
						Strict TS throughout; the component's prop interfaces are exported
						so consumers get full type-safety.
					</p>
				</Card>
			</div>

			<div className="mt-6 flex flex-wrap gap-2">
				<CheckPill label="shadcn ✓" />
				<CheckPill label="tailwind ✓" />
				<CheckPill label="typescript ✓" />
				<CheckPill label="components/ui ✓" />
			</div>

			{/* setup + why /components/ui */}
			<div className="mt-10 grid gap-5 lg:grid-cols-2">
				<div className="flex flex-col gap-4">
					<h3 className="font-display text-lg font-semibold text-fog-200">
						If you're starting fresh
					</h3>
					<CodeBlock code={SETUP_SHADCN} filename="setup.sh" lang="bash" />
					<CodeBlock code={DEP_INSTALL} filename="deps.sh" lang="bash" />
				</div>

				<Card className="flex flex-col gap-4 bg-ink-850/90">
					<div className="flex items-center gap-2">
						<MousePointerClick className="h-4 w-4 text-flame-soft" />
						<h3 className="font-display text-lg font-semibold text-fog-200">
							Why <code className="font-mono text-ember">/components/ui</code> matters
						</h3>
					</div>
					<ul className="flex flex-col gap-4 text-sm leading-relaxed text-fog-400">
						<li className="flex gap-3">
							<StepNum n={1} />
							<span>
								<strong className="text-fog-200">It's the shadcn contract.</strong>{" "}
								<code className="font-mono text-ember">components.json</code> maps the{" "}
								<code className="font-mono text-ember">ui</code> alias to{" "}
								<code className="font-mono text-ember">@/components/ui</code>. The CLI and every
								tutorial expect generated primitives to land there.
							</span>
						</li>
						<li className="flex gap-3">
							<StepNum n={2} />
							<span>
								<strong className="text-fog-200">Imports stay portable.</strong> The demo
								imports <code className="font-mono text-ember">@/components/ui/gradient-bars-background</code>{" "}
								— place the file anywhere else and that import breaks.
							</span>
						</li>
						<li className="flex gap-3">
							<StepNum n={3} />
							<span>
								<strong className="text-fog-200">It separates concerns.</strong> Reusable,
								copy-owned primitives live in <code className="font-mono text-ember">ui/</code>;
								your composed app components live one level up.
							</span>
						</li>
					</ul>
					<p className="mt-1 rounded-lg border border-line bg-ink-900/60 p-3 font-mono text-xs leading-relaxed text-fog-400">
						components → <span className="text-ember">@/components</span>
						<br />
						ui&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; → <span className="text-ember">@/components/ui</span>
						<br />
						styles&nbsp;&nbsp; → <span className="text-ember">src/index.css</span>
					</p>
				</Card>
			</div>

			{/* verbatim source */}
			<div className="mt-10 flex flex-col gap-4">
				<h3 className="font-display text-lg font-semibold text-fog-200">
					The component, verbatim
				</h3>
				<CodeBlock
					code={COMPONENT_SOURCE}
					filename="components/ui/gradient-bars-background.tsx"
					lang="tsx"
					scroll
				/>
			</div>
		</Section>
	);
}

/* ------------------------------------------------------------------ */
/* props api + Q&A                                                     */
/* ------------------------------------------------------------------ */

function PropsApi() {
	return (
		<Section id="api" className="py-24 sm:py-28">
			<div className="flex flex-col gap-3">
				<Eyebrow>Props API & notes</Eyebrow>
				<SectionTitle>Five bar props, two wrapper props.</SectionTitle>
				<Lead>
					Every prop the component accepts, plus the prompt's required Q&amp;A —
					data, state, assets, responsive behaviour and best placement.
				</Lead>
			</div>

			{/* props table */}
			<div className="mt-10 overflow-hidden rounded-2xl border border-line">
				<table className="w-full border-collapse text-left">
					<thead>
						<tr className="bg-ink-850/80 font-mono text-[11px] uppercase tracking-[0.16em] text-fog-400">
							<th className="px-4 py-3 font-medium">Prop</th>
							<th className="px-4 py-3 font-medium">Type</th>
							<th className="hidden px-4 py-3 font-medium sm:table-cell">Default</th>
							<th className="px-4 py-3 font-medium">What it does</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-line">
						{PROPS.map((p) => (
							<tr key={p.name} className="align-top hover:bg-ink-850/40">
								<td className="whitespace-nowrap px-4 py-3">
									<code className="font-mono text-[13px] text-ember">{p.name}</code>
								</td>
								<td className="whitespace-nowrap px-4 py-3 font-mono text-[12px] text-fog-300">
									{p.type}
								</td>
								<td className="hidden whitespace-nowrap px-4 py-3 font-mono text-[12px] text-fog-400 sm:table-cell">
									{p.def}
								</td>
								<td className="px-4 py-3 text-[13px] leading-relaxed text-fog-400">
									{p.desc}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* prompt Q&A */}
			<div className="mt-8 grid gap-4 md:grid-cols-2">
				{QA_LIST.map((qa) => (
					<Card key={qa.q} className="flex flex-col gap-2">
						<div className="flex items-start gap-2">
							<Palette className="mt-0.5 h-4 w-4 shrink-0 text-flame-soft" />
							<h3 className="font-display text-[15px] font-semibold leading-snug text-fog-200">
								{qa.q}
							</h3>
						</div>
						<p className="text-[13px] leading-relaxed text-fog-400">{qa.a}</p>
					</Card>
				))}
			</div>
		</Section>
	);
}

/* ------------------------------------------------------------------ */
/* footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
	return (
		<footer className="relative mt-10 border-t border-line">
			<div className="relative h-40 overflow-hidden">
				<GradientBars
					numBars={21}
					gradientFrom="rgb(255, 60, 0)"
					gradientTo="transparent"
					animationDuration={2.4}
				/>
				<div className="absolute inset-0 -z-10 bg-ink-950" />
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
			</div>
			<div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-8 text-center">
				<p className="font-display text-sm font-semibold tracking-tight text-fog-200">
					Gradient Bars · components/ui integration
				</p>
				<p className="font-mono text-xs text-fog-400">
					Pure CSS @keyframes · zero image assets · offline-first · React + TS + Tailwind
				</p>
			</div>
		</footer>
	);
}

/* ------------------------------------------------------------------ */
/* app                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
	return (
		<main className="relative min-h-screen bg-ink-900">
			<Nav />
			<Hero />
			<ControlDeck />
			<Integration />
			<PropsApi />
			<Footer />
		</main>
	);
}
