import { useEffect, useMemo, useRef, useState } from "react";
import {
	Boxes,
	FolderTree,
	Gauge,
	Github,
	MousePointer2,
	Package,
	Palette,
	Sparkles,
	Terminal,
} from "lucide-react";

import { GradientDots } from "@/components/ui/gradient-dots";
import { Fader } from "@/components/lab/Fader";
import { CodeBlock } from "@/components/lab/CodeBlock";
import {
	CornerBrackets,
	Eyebrow,
	Panel,
	SectionTitle,
} from "@/components/lab/Primitives";
import {
	COMPONENT_SOURCE,
	DEMO_SOURCE,
	INSTALL_DEP,
	PRESETS,
	PROPS,
	SETUP_COMMANDS,
	USAGE_SNIPPET,
} from "@/lib/content";

/* A live frames-per-second readout for the telemetry strip. */
function useFps() {
	const [fps, setFps] = useState(60);
	useEffect(() => {
		let raf = 0;
		let frames = 0;
		let last = performance.now();
		const loop = (now: number) => {
			frames++;
			if (now - last >= 500) {
				setFps(Math.round((frames * 1000) / (now - last)));
				frames = 0;
				last = now;
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, []);
	return fps;
}

/* A monotonically increasing uptime clock for the telemetry strip. */
function useUptime() {
	const [t, setT] = useState(0);
	const start = useRef(performance.now());
	useEffect(() => {
		let raf = 0;
		const loop = () => {
			setT((performance.now() - start.current) / 1000);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, []);
	return t;
}

function TelemetryStat({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex flex-col">
			<span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-fog-400">
				{label}
			</span>
			<span className="font-mono text-sm tabular-nums text-fog-200">
				{value}
			</span>
		</div>
	);
}

export default function App() {
	const fps = useFps();
	const uptime = useUptime();

	// Live, controllable copy of the component's real props.
	const [dotSize, setDotSize] = useState(8);
	const [spacing, setSpacing] = useState(10);
	const [duration, setDuration] = useState(20);
	const [colorCycleDuration, setColorCycleDuration] = useState(6);
	const [bg, setBg] = useState("#050507");
	const [activePreset, setActivePreset] = useState("Default");

	const applyPreset = (name: string) => {
		const p = PRESETS.find((x) => x.name === name);
		if (!p) return;
		setDotSize(p.dotSize);
		setSpacing(p.spacing);
		setDuration(p.duration);
		setColorCycleDuration(p.colorCycleDuration);
		setBg(p.backgroundColor);
		setActivePreset(name);
	};

	// Mark the deck as "custom" once the user diverges from the active preset.
	useEffect(() => {
		const p = PRESETS.find((x) => x.name === activePreset);
		if (
			p &&
			(p.dotSize !== dotSize ||
				p.spacing !== spacing ||
				p.duration !== duration ||
				p.colorCycleDuration !== colorCycleDuration ||
				p.backgroundColor !== bg)
		) {
			setActivePreset("Custom");
		}
	}, [dotSize, spacing, duration, colorCycleDuration, bg, activePreset]);

	const liveUsage = useMemo(
		() =>
			`<GradientDots\n  dotSize={${dotSize}}\n  spacing={${spacing}}\n  duration={${duration}}\n  colorCycleDuration={${colorCycleDuration}}\n  backgroundColor="${bg}"\n/>`,
		[dotSize, spacing, duration, colorCycleDuration, bg],
	);

	return (
		<div className="min-h-screen bg-ink-950 text-fog-200">
			{/* ============================ NAV ============================ */}
			<header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
				<nav className="flex w-full max-w-5xl items-center justify-between rounded-full border border-line/80 bg-ink-900/70 px-5 py-2.5 backdrop-blur-md">
					<div className="flex items-center gap-2.5">
						<span className="grid h-7 w-7 place-items-center rounded-md border border-accent/40 bg-ink-950">
							<Sparkles className="h-3.5 w-3.5 text-accent" />
						</span>
						<span className="font-display text-sm font-600 tracking-tight text-fog-200">
							gradient-dots
						</span>
						<span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.2em] text-fog-400 sm:inline">
							/ components / ui
						</span>
					</div>
					<div className="flex items-center gap-1.5">
						<a
							href="#deck"
							className="hidden rounded-full px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-fog-300 transition-colors hover:text-accent sm:inline"
						>
							deck
						</a>
						<a
							href="#integrate"
							className="hidden rounded-full px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-fog-300 transition-colors hover:text-accent sm:inline"
						>
							integrate
						</a>
						<a
							href="#api"
							className="hidden rounded-full px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-fog-300 transition-colors hover:text-accent sm:inline"
						>
							api
						</a>
						<a
							href="https://www.framer.com/motion/"
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-1.5 rounded-full border border-line bg-ink-950 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-fog-200 transition-colors hover:border-accent/50"
						>
							<Github className="h-3.5 w-3.5" /> docs
						</a>
					</div>
				</nav>
			</header>

			{/* ============================ HERO ============================ */}
			{/*
			 * The hero is the verbatim demo.tsx, scaled up: a full-bleed live
			 * <GradientDots /> with a centered headline. Everything else on the
			 * page documents this one drop-in.
			 */}
			<section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
				<GradientDots duration={20} />

				{/* legibility scrim so chrome reads over the busy field */}
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/70 via-transparent to-ink-950" />
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,7,0.65)_100%)]" />

				<div className="relative z-10 flex flex-col items-center px-6 text-center">
					<div className="mb-6 flex items-center gap-2 rounded-full border border-line/80 bg-ink-950/70 px-3.5 py-1.5 backdrop-blur-md">
						<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
						<span className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-fog-300">
							shadcn · tailwind · typescript
						</span>
					</div>

					<h1 className="font-display text-6xl font-700 leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl">
						Gradient Dots
					</h1>

					<p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-fog-300 sm:text-lg">
						A hue-cycling hexagonal dot grid that drops into{" "}
						<code className="rounded bg-ink-950/80 px-1.5 py-0.5 font-mono text-sm text-accent">
							@/components/ui
						</code>{" "}
						as a single animated background — one{" "}
						<span className="text-fog-200">framer-motion</span> element, zero
						assets, infinite loop.
					</p>

					<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
						<a
							href="#integrate"
							className="rounded-full bg-accent px-5 py-2.5 font-display text-sm font-600 text-ink-950 transition-transform hover:scale-[1.03]"
						>
							Integrate the component
						</a>
						<a
							href="#deck"
							className="rounded-full border border-line bg-ink-950/70 px-5 py-2.5 font-display text-sm font-600 text-fog-200 backdrop-blur-md transition-colors hover:border-accent/50"
						>
							Open the control deck
						</a>
					</div>
				</div>

				{/* telemetry strip */}
				<div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-6 rounded-xl border border-line/80 bg-ink-950/80 px-5 py-3 backdrop-blur-md">
					<TelemetryStat label="render" value={`${fps} fps`} />
					<span className="h-7 w-px bg-line" />
					<TelemetryStat label="uptime" value={`${uptime.toFixed(1)}s`} />
					<span className="h-7 w-px bg-line" />
					<TelemetryStat label="loop" value="∞" />
					<span className="h-7 w-px bg-line" />
					<TelemetryStat label="assets" value="0" />
				</div>
			</section>

			{/* ============================ CONTROL DECK ============================ */}
			<section
				id="deck"
				className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24"
			>
				<Eyebrow index="01">Control deck</Eyebrow>
				<div className="mt-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
					<SectionTitle className="max-w-2xl">
						Every prop, wired to a live fader.
					</SectionTitle>
					<p className="max-w-md text-sm leading-relaxed text-fog-400">
						The deck mounts a second{" "}
						<code className="font-mono text-accent">GradientDots</code> instance
						and drives its real props in real time — exactly the values you'd
						pass in JSX.
					</p>
				</div>

				<div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
					{/* live preview window */}
					<Panel className="relative overflow-hidden">
						<CornerBrackets />
						<div className="relative h-[360px] w-full overflow-hidden rounded-2xl sm:h-[440px]">
							<GradientDots
								key={`${dotSize}-${spacing}`}
								dotSize={dotSize}
								spacing={spacing}
								duration={duration}
								colorCycleDuration={colorCycleDuration}
								backgroundColor={bg}
							/>
							<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,5,7,0.55)_100%)]" />
							<div className="absolute left-4 top-4 flex items-center gap-2 rounded-md border border-line/70 bg-ink-950/70 px-2.5 py-1 backdrop-blur-md">
								<MousePointer2 className="h-3 w-3 text-accent" />
								<span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-fog-300">
									live specimen
								</span>
							</div>
							<div className="absolute bottom-4 right-4 rounded-md border border-line/70 bg-ink-950/70 px-2.5 py-1 font-mono text-[0.62rem] tabular-nums text-fog-300 backdrop-blur-md">
								{spacing}px grid · {duration}s drift
							</div>
						</div>
					</Panel>

					{/* fader rack */}
					<Panel className="flex flex-col p-6">
						<div className="mb-5 flex items-center gap-2">
							<Gauge className="h-4 w-4 text-accent" />
							<span className="font-display text-sm font-600 uppercase tracking-[0.16em] text-fog-200">
								Field parameters
							</span>
						</div>

						<div className="flex flex-col gap-5">
							<Fader
								label="Dot size"
								uniform="dotSize"
								value={dotSize}
								min={2}
								max={20}
								step={1}
								unit="px"
								onChange={setDotSize}
							/>
							<Fader
								label="Spacing"
								uniform="spacing"
								value={spacing}
								min={6}
								max={28}
								step={1}
								unit="px"
								onChange={setSpacing}
							/>
							<Fader
								label="Drift duration"
								uniform="duration"
								value={duration}
								min={6}
								max={60}
								step={1}
								unit="s"
								onChange={setDuration}
							/>
							<Fader
								label="Color cycle"
								uniform="colorCycleDuration"
								value={colorCycleDuration}
								min={2}
								max={20}
								step={1}
								unit="s"
								onChange={setColorCycleDuration}
							/>
						</div>

						{/* background swatch control */}
						<div className="mt-6 border-t border-line pt-5">
							<div className="mb-2 flex items-baseline justify-between">
								<span className="font-display text-[0.7rem] font-600 uppercase tracking-[0.18em] text-fog-300">
									Background
								</span>
								<span className="font-mono text-xs text-accent">{bg}</span>
							</div>
							<div className="flex items-center gap-3">
								<label className="relative h-9 w-12 cursor-pointer overflow-hidden rounded-md border border-line">
									<input
										type="color"
										value={bg}
										onChange={(e) => setBg(e.target.value)}
										aria-label="Background color"
										className="absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] cursor-pointer"
									/>
								</label>
								<div className="flex flex-wrap gap-1.5">
									{["#050507", "#0b0d1a", "#1a0a14", "#0a1410", "#ffffff"].map(
										(c) => (
											<button
												key={c}
												type="button"
												onClick={() => setBg(c)}
												aria-label={`Set background ${c}`}
												className="h-6 w-6 rounded-md border border-line transition-transform hover:scale-110"
												style={{ backgroundColor: c }}
											/>
										),
									)}
								</div>
							</div>
							<p className="mt-2 font-mono text-[0.62rem] leading-relaxed text-fog-400/80">
								backgroundColor doubles as the dot punch-out mask — light values
								invert the field.
							</p>
						</div>
					</Panel>
				</div>

				{/* presets + live usage */}
				<div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
					<Panel className="p-6">
						<div className="mb-4 flex items-center gap-2">
							<Boxes className="h-4 w-4 text-accent" />
							<span className="font-display text-sm font-600 uppercase tracking-[0.16em] text-fog-200">
								Presets
							</span>
							<span className="ml-auto font-mono text-[0.66rem] uppercase tracking-wider text-fog-400">
								{activePreset}
							</span>
						</div>
						<div className="flex flex-wrap gap-2">
							{PRESETS.map((p) => (
								<button
									key={p.name}
									type="button"
									onClick={() => applyPreset(p.name)}
									className={
										activePreset === p.name
											? "rounded-full border border-accent bg-accent/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-accent transition-colors"
											: "rounded-full border border-line px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-fog-300 transition-colors hover:border-accent/40 hover:text-fog-200"
									}
								>
									{p.name}
								</button>
							))}
						</div>
						<p className="mt-4 text-sm leading-relaxed text-fog-400">
							Each preset snaps all five props at once. “Custom” lights up the
							moment you nudge a fader off a named patch.
						</p>
					</Panel>

					<div>
						<div className="mb-2 flex items-center gap-2 px-1">
							<Palette className="h-3.5 w-3.5 text-accent" />
							<span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-fog-400">
								live usage — copies your current settings
							</span>
						</div>
						<CodeBlock code={liveUsage} lang="tsx" />
					</div>
				</div>
			</section>

			{/* ============================ INTEGRATE ============================ */}
			<section
				id="integrate"
				className="relative scroll-mt-24 border-y border-line bg-ink-900/40"
			>
				<div className="grain pointer-events-none absolute inset-0" />
				<div className="relative mx-auto max-w-6xl px-6 py-24">
					<Eyebrow index="02">Integration</Eyebrow>
					<SectionTitle className="mt-5 max-w-3xl">
						Drop it into a shadcn project in four steps.
					</SectionTitle>

					{/* requirements check */}
					<div className="mt-10 grid gap-4 sm:grid-cols-3">
						{[
							{
								label: "shadcn structure",
								note: "@/ alias + components/ui + lib/utils cn()",
							},
							{ label: "Tailwind CSS", note: "v4 via @tailwindcss/vite" },
							{ label: "TypeScript", note: "strict, bundler resolution" },
						].map((r) => (
							<Panel key={r.label} className="p-5">
								<div className="flex items-center gap-2">
									<span className="grid h-5 w-5 place-items-center rounded-full border border-accent/50 text-[0.6rem] text-accent">
										✓
									</span>
									<span className="font-display text-sm font-600 text-fog-200">
										{r.label}
									</span>
								</div>
								<p className="mt-2 font-mono text-[0.7rem] leading-relaxed text-fog-400">
									{r.note}
								</p>
							</Panel>
						))}
					</div>

					{/* step grid */}
					<div className="mt-10 grid gap-x-10 gap-y-12 lg:grid-cols-2">
						{/* step 0 — scaffold */}
						<div>
							<StepHead
								icon={<Terminal className="h-4 w-4" />}
								n="0"
								title="Scaffold a supported project"
							/>
							<p className="mb-4 text-sm leading-relaxed text-fog-400">
								If your codebase doesn’t already have shadcn + Tailwind +
								TypeScript, stand one up, then run{" "}
								<code className="font-mono text-accent">init</code>. It writes the{" "}
								<code className="font-mono text-accent">@/</code> alias,{" "}
								<code className="font-mono text-accent">lib/utils.ts</code>, and
								your CSS variables.
							</p>
							<CodeBlock code={SETUP_COMMANDS} lang="bash" />
						</div>

						{/* step 1 — dependency */}
						<div>
							<StepHead
								icon={<Package className="h-4 w-4" />}
								n="1"
								title="Install the one dependency"
							/>
							<p className="mb-4 text-sm leading-relaxed text-fog-400">
								The component’s only external dependency is{" "}
								<code className="font-mono text-accent">framer-motion</code> —
								it renders a single <code className="font-mono">motion.div</code>
								. No context providers, no hooks to wire up.
							</p>
							<CodeBlock code={INSTALL_DEP} lang="bash" />
							<div className="mt-4 rounded-xl border border-line bg-ink-950/60 p-4">
								<div className="flex items-center gap-2">
									<FolderTree className="h-4 w-4 text-accent" />
									<span className="font-display text-xs font-600 uppercase tracking-[0.16em] text-fog-200">
										Default paths
									</span>
								</div>
								<ul className="mt-3 space-y-1.5 font-mono text-[0.72rem] text-fog-300">
									<li>
										components → <span className="text-accent">@/components</span>
									</li>
									<li>
										ui → <span className="text-accent">@/components/ui</span>
									</li>
									<li>
										styles → <span className="text-accent">src/index.css</span>
									</li>
									<li>
										utils → <span className="text-accent">@/lib/utils</span>
									</li>
								</ul>
							</div>
						</div>

						{/* step 2 — component */}
						<div className="lg:col-span-2">
							<StepHead
								icon={<FolderTree className="h-4 w-4" />}
								n="2"
								title="Paste the component into /components/ui"
							/>
							<div className="mb-4 max-w-3xl rounded-xl border border-accent/25 bg-accent/[0.04] p-4">
								<p className="text-sm leading-relaxed text-fog-300">
									<span className="font-600 text-accent">
										Why /components/ui matters.
									</span>{" "}
									It’s the convention every shadcn import path assumes — the{" "}
									<code className="font-mono">@/components/ui/&lt;name&gt;</code>{" "}
									alias, the registry’s copy targets, and tooling like the CLI’s{" "}
									<code className="font-mono">add</code> command all resolve here.
									Keeping primitives in one predictable folder means the demo’s{" "}
									<code className="font-mono">
										import {"{"} GradientDots {"}"} from
										"@/components/ui/gradient-dots"
									</code>{" "}
									works untouched, and future shadcn components sit beside it
									without collisions.
								</p>
							</div>
							<div className="grid gap-6 lg:grid-cols-2">
								<div>
									<FileLabel path="src/components/ui/gradient-dots.tsx" />
									<CodeBlock
										code={COMPONENT_SOURCE}
										lang="tsx"
										className="max-h-[460px] overflow-y-auto"
									/>
								</div>
								<div>
									<FileLabel path="src/components/ui/demo.tsx" />
									<CodeBlock code={DEMO_SOURCE} lang="tsx" />
									<div className="mt-4">
										<FileLabel path="usage anywhere" />
										<CodeBlock code={USAGE_SNIPPET} lang="tsx" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ============================ API + Q&A ============================ */}
			<section
				id="api"
				className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24"
			>
				<Eyebrow index="03">Props API &amp; integration notes</Eyebrow>
				<SectionTitle className="mt-5 max-w-3xl">
					Five props, plus everything <code>motion.div</code> accepts.
				</SectionTitle>

				<div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
					{/* props table */}
					<Panel className="overflow-hidden">
						<div className="grid grid-cols-[1.1fr_0.8fr_0.7fr] gap-2 border-b border-line bg-ink-950/50 px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fog-400">
							<span>Prop</span>
							<span>Type</span>
							<span>Default</span>
						</div>
						<div className="divide-y divide-line/70">
							{PROPS.map((p) => (
								<div
									key={p.name}
									className="grid grid-cols-[1.1fr_0.8fr_0.7fr] items-start gap-2 px-5 py-3.5"
								>
									<div>
										<div className="font-mono text-sm text-accent">{p.name}</div>
										<div className="mt-1 text-[0.78rem] leading-snug text-fog-400">
											{p.desc}
										</div>
									</div>
									<span className="font-mono text-[0.74rem] text-fog-300">
										{p.type}
									</span>
									<span className="font-mono text-[0.74rem] text-fog-300">
										{p.def}
									</span>
								</div>
							))}
						</div>
					</Panel>

					{/* Q&A — the prompt's required questions */}
					<div className="flex flex-col gap-4">
						<QA
							q="What data / props will be passed?"
							a="Five optional numbers/strings: dotSize, spacing, duration, colorCycleDuration, and backgroundColor. All have sensible defaults — <GradientDots /> renders with no props at all. It also forwards any extra motion.div props (className, style, onClick…)."
						/>
						<QA
							q="Any state-management requirements?"
							a="None. The component is fully self-contained and stateless — the looping animation is declarative framer-motion. No Redux/Zustand/context, no providers to mount."
						/>
						<QA
							q="Any required assets (images, icons)?"
							a="Zero. The dot field is painted entirely with layered CSS radial-gradients, so there are no images, sprites, or icons to vendor. (The lucide-react icons on this page are for the showcase chrome, not the component.)"
						/>
						<QA
							q="Expected responsive behavior?"
							a="It's a position: absolute inset-0 layer that fills its nearest positioned ancestor at any size. The grid is defined in fixed px, so dot density stays constant while the field reflows — give the parent position: relative and a height."
						/>
						<QA
							q="Best place to use it?"
							a="As a decorative background behind hero sections, auth screens, 404/empty states, or modal scrims. Wrap it in a relative container and place your content in a higher z-index sibling, exactly like demo.tsx."
						/>
					</div>
				</div>
			</section>

			{/* ============================ FOOTER ============================ */}
			<footer className="relative overflow-hidden border-t border-line">
				<div className="absolute inset-0 opacity-50">
					<GradientDots duration={40} dotSize={6} spacing={14} />
				</div>
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/85 to-ink-950" />
				<div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-16 text-center">
					<span className="grid h-9 w-9 place-items-center rounded-lg border border-accent/40 bg-ink-950">
						<Sparkles className="h-4 w-4 text-accent" />
					</span>
					<p className="font-display text-lg font-600 text-fog-200">
						gradient-dots · a single drop-in for{" "}
						<code className="text-accent">@/components/ui</code>
					</p>
					<p className="max-w-md text-sm text-fog-400">
						Built as a Fable 5 experiment — shadcn structure, Tailwind CSS,
						TypeScript, framer-motion. Fonts vendored locally; runs fully
						offline.
					</p>
					<div className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-fog-400">
						components / ui / gradient-dots.tsx
					</div>
				</div>
			</footer>
		</div>
	);
}

/* ---- local presentational helpers ---- */

function StepHead({
	icon,
	n,
	title,
}: {
	icon: React.ReactNode;
	n: string;
	title: string;
}) {
	return (
		<div className="mb-3 flex items-center gap-3">
			<span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-ink-950 text-accent">
				{icon}
			</span>
			<div className="flex items-baseline gap-2">
				<span className="font-mono text-xs text-accent">step {n}</span>
				<h3 className="font-display text-lg font-600 text-fog-200">{title}</h3>
			</div>
		</div>
	);
}

function FileLabel({ path }: { path: string }) {
	return (
		<div className="mb-2 flex items-center gap-2 px-1">
			<span className="h-1.5 w-1.5 rounded-full bg-accent" />
			<span className="font-mono text-[0.68rem] tracking-wide text-fog-400">
				{path}
			</span>
		</div>
	);
}

function QA({ q, a }: { q: string; a: string }) {
	return (
		<Panel className="p-5">
			<h4 className="font-display text-sm font-600 text-fog-200">{q}</h4>
			<p className="mt-2 text-[0.86rem] leading-relaxed text-fog-400">{a}</p>
		</Panel>
	);
}
