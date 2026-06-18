import { useEffect, useMemo, useRef, useState } from "react";
import {
	Boxes,
	Droplets,
	FolderTree,
	Gauge,
	Github,
	Layers,
	MousePointer2,
	Package,
	Sparkles,
	Terminal,
} from "lucide-react";

import { AnimatedDots } from "@/components/ui/animated-dots";
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

const BLEND_MODES: GlobalCompositeOperation[] = [
	"source-over",
	"lighter",
	"screen",
];

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
	const [dotsNum, setDotsNum] = useState(60);
	const [dotRadius, setDotRadius] = useState(10);
	const [dotSpacing, setDotSpacing] = useState(0);
	const [speedMin, setSpeedMin] = useState(1);
	const [speedMax, setSpeedMax] = useState(4);
	const [opacity, setOpacity] = useState(1);
	const [blendMode, setBlendMode] =
		useState<GlobalCompositeOperation>("source-over");
	const [bg, setBg] = useState("#050507");
	const [activePreset, setActivePreset] = useState("Default");

	const speedRange = useMemo<[number, number]>(
		() => [speedMin, Math.max(speedMin, speedMax)],
		[speedMin, speedMax],
	);

	const applyPreset = (name: string) => {
		const p = PRESETS.find((x) => x.name === name);
		if (!p) return;
		setDotsNum(p.dotsNum);
		setDotRadius(p.dotRadius);
		setDotSpacing(p.dotSpacing);
		setSpeedMin(p.speedRange[0]);
		setSpeedMax(p.speedRange[1]);
		setOpacity(p.opacity);
		setBlendMode(p.blendMode);
		setBg(p.backgroundColor);
		setActivePreset(name);
	};

	// Mark the deck as "custom" once the user diverges from the active preset.
	useEffect(() => {
		const p = PRESETS.find((x) => x.name === activePreset);
		if (
			p &&
			(p.dotsNum !== dotsNum ||
				p.dotRadius !== dotRadius ||
				p.dotSpacing !== dotSpacing ||
				p.speedRange[0] !== speedMin ||
				p.speedRange[1] !== speedMax ||
				p.opacity !== opacity ||
				p.blendMode !== blendMode ||
				p.backgroundColor !== bg)
		) {
			setActivePreset("Custom");
		}
	}, [
		dotsNum,
		dotRadius,
		dotSpacing,
		speedMin,
		speedMax,
		opacity,
		blendMode,
		bg,
		activePreset,
	]);

	const liveUsage = useMemo(
		() =>
			`<AnimatedDots\n  fullScreen={false}\n  dotsNum={${dotsNum}}\n  dotRadius={${dotRadius}}\n  dotSpacing={${dotSpacing}}\n  speedRange={[${speedRange[0]}, ${speedRange[1]}]}\n  opacity={${opacity}}\n  blendMode="${blendMode}"\n  backgroundColor="${bg}"\n/>`,
		[dotsNum, dotRadius, dotSpacing, speedRange, opacity, blendMode, bg],
	);

	// Remount key — AnimatedDots reads most props inside its effect on mount,
	// so we bump the key on prop changes to re-seed the field cleanly.
	const previewKey = `${dotsNum}-${dotRadius}-${dotSpacing}-${speedRange[0]}-${speedRange[1]}-${opacity}-${blendMode}-${bg}`;

	return (
		<div className="min-h-screen bg-ink-950 text-fog-200">
			{/* ============================ NAV ============================ */}
			<header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
				<nav className="flex w-full max-w-5xl items-center justify-between rounded-full border border-line/80 bg-ink-900/70 px-5 py-2.5 backdrop-blur-md">
					<div className="flex items-center gap-2.5">
						<span className="grid h-7 w-7 place-items-center rounded-md border border-accent/40 bg-ink-950">
							<Droplets className="h-3.5 w-3.5 text-accent" />
						</span>
						<span className="font-display text-sm font-600 tracking-tight text-fog-200">
							animated-dots
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
							href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API"
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
			 * <AnimatedDots /> with a centered headline. Everything else on the
			 * page documents this one drop-in.
			 */}
			<section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
				<AnimatedDots backgroundColor="#050507" className="absolute inset-0" />

				{/* legibility scrim so chrome reads over the busy field */}
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/75 via-ink-950/30 to-ink-950" />
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,5,7,0.78)_100%)]" />

				<div className="relative z-10 flex flex-col items-center px-6 text-center">
					<div className="mb-6 flex items-center gap-2 rounded-full border border-line/80 bg-ink-950/70 px-3.5 py-1.5 backdrop-blur-md">
						<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
						<span className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-fog-300">
							shadcn · tailwind · typescript
						</span>
					</div>

					<h1 className="font-display text-6xl font-700 leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl">
						Animated Dots
					</h1>

					<p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-fog-300 sm:text-lg">
						A canvas rain of dots that fall in columns, each bleeding one{" "}
						<span className="text-chan-r">R</span>
						<span className="text-chan-g">G</span>
						<span className="text-chan-b">B</span> channel from black to full
						as it drops — drops straight into{" "}
						<code className="rounded bg-ink-950/80 px-1.5 py-0.5 font-mono text-sm text-accent">
							@/components/ui
						</code>{" "}
						as a single <span className="text-fog-200">requestAnimationFrame</span>{" "}
						loop. Zero dependencies, zero assets.
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
						<code className="font-mono text-accent">AnimatedDots</code> instance
						(<code className="font-mono text-accent">fullScreen=false</code>) and
						drives its real props — exactly the values you&apos;d pass in JSX.
					</p>
				</div>

				<div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
					{/* live preview window */}
					<Panel className="relative overflow-hidden">
						<CornerBrackets />
						<div className="relative h-[360px] w-full overflow-hidden rounded-2xl sm:h-[440px]">
							<AnimatedDots
								key={previewKey}
								fullScreen={false}
								dotsNum={dotsNum}
								dotRadius={dotRadius}
								dotSpacing={dotSpacing}
								speedRange={speedRange}
								opacity={opacity}
								blendMode={blendMode}
								backgroundColor={bg}
								className="absolute inset-0"
							/>
							<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,5,7,0.5)_100%)]" />
							<div className="absolute left-4 top-4 flex items-center gap-2 rounded-md border border-line/70 bg-ink-950/70 px-2.5 py-1 backdrop-blur-md">
								<MousePointer2 className="h-3 w-3 text-accent" />
								<span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-fog-300">
									live specimen
								</span>
							</div>
							<div className="absolute bottom-4 right-4 rounded-md border border-line/70 bg-ink-950/70 px-2.5 py-1 font-mono text-[0.62rem] tabular-nums text-fog-300 backdrop-blur-md">
								{dotsNum} cols · r{dotRadius}px · {blendMode}
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
								label="Columns"
								uniform="dotsNum"
								value={dotsNum}
								min={6}
								max={200}
								step={1}
								onChange={setDotsNum}
							/>
							<Fader
								label="Dot radius"
								uniform="dotRadius"
								value={dotRadius}
								min={2}
								max={28}
								step={1}
								unit="px"
								onChange={setDotRadius}
							/>
							<Fader
								label="Spacing"
								uniform="dotSpacing"
								value={dotSpacing}
								min={0}
								max={40}
								step={1}
								unit="px"
								onChange={setDotSpacing}
							/>
							<Fader
								label="Speed min"
								uniform="speedRange[0]"
								value={speedMin}
								min={0.2}
								max={10}
								step={0.2}
								onChange={setSpeedMin}
							/>
							<Fader
								label="Speed max"
								uniform="speedRange[1]"
								value={speedMax}
								min={0.4}
								max={16}
								step={0.2}
								onChange={setSpeedMax}
							/>
							<Fader
								label="Opacity"
								uniform="opacity"
								value={opacity}
								min={0.1}
								max={1}
								step={0.05}
								format={(v) => v.toFixed(2)}
								onChange={setOpacity}
							/>
						</div>

						{/* blend mode + background */}
						<div className="mt-6 border-t border-line pt-5">
							<div className="mb-2 flex items-center gap-2">
								<Layers className="h-3.5 w-3.5 text-accent" />
								<span className="font-display text-[0.7rem] font-600 uppercase tracking-[0.18em] text-fog-300">
									Blend mode
								</span>
							</div>
							<div className="flex flex-wrap gap-1.5">
								{BLEND_MODES.map((m) => (
									<button
										key={m}
										type="button"
										onClick={() => setBlendMode(m)}
										className={
											blendMode === m
												? "rounded-full border border-accent bg-accent/10 px-3 py-1.5 font-mono text-[0.66rem] lowercase tracking-wide text-accent transition-colors"
												: "rounded-full border border-line px-3 py-1.5 font-mono text-[0.66rem] lowercase tracking-wide text-fog-300 transition-colors hover:border-accent/40 hover:text-fog-200"
										}
									>
										{m}
									</button>
								))}
							</div>

							<div className="mt-5 mb-2 flex items-baseline justify-between">
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
									{["#050507", "#070510", "#0a0306", "#02030a", "#101018"].map(
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
								backgroundColor is repainted each frame — it both clears the
								canvas and tints the gaps between dots.
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
							Each preset snaps all eight props at once. &ldquo;Custom&rdquo;
							lights up the moment you nudge a fader off a named patch.
						</p>
					</Panel>

					<div>
						<div className="mb-2 flex items-center gap-2 px-1">
							<Droplets className="h-3.5 w-3.5 text-accent" />
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
						Drop it into a shadcn project in three steps.
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
								If your codebase doesn&apos;t already have shadcn + Tailwind +
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
								title="No dependencies to install"
							/>
							<p className="mb-4 text-sm leading-relaxed text-fog-400">
								Unlike a typical effect, this component has{" "}
								<span className="text-fog-200">no external runtime deps</span>. It
								uses only <code className="font-mono text-accent">react</code> and
								the native <code className="font-mono">&lt;canvas&gt;</code> 2D
								context — no three.js, no framer-motion, no context providers.
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
									It&apos;s the convention every shadcn import path assumes — the{" "}
									<code className="font-mono">
										@/components/ui/&lt;name&gt;
									</code>{" "}
									alias, the registry&apos;s copy targets, and tooling like the
									CLI&apos;s <code className="font-mono">add</code> command all
									resolve here. Keeping primitives in one predictable folder means
									the demo&apos;s{" "}
									<code className="font-mono">
										import {"{"} AnimatedDots {"}"} from
										&quot;@/components/ui/animated-dots&quot;
									</code>{" "}
									works untouched, and future shadcn components sit beside it
									without collisions.
								</p>
							</div>
							<div className="grid gap-6 lg:grid-cols-2">
								<div>
									<FileLabel path="src/components/ui/animated-dots.tsx" />
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
					Ten props, all optional &mdash; it renders bare.
				</SectionTitle>

				<div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
					{/* props table */}
					<Panel className="overflow-hidden">
						<div className="grid grid-cols-[1.1fr_0.9fr_0.6fr] gap-2 border-b border-line bg-ink-950/50 px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fog-400">
							<span>Prop</span>
							<span>Type</span>
							<span>Default</span>
						</div>
						<div className="divide-y divide-line/70">
							{PROPS.map((p) => (
								<div
									key={p.name}
									className="grid grid-cols-[1.1fr_0.9fr_0.6fr] items-start gap-2 px-5 py-3.5"
								>
									<div>
										<div className="font-mono text-sm text-accent">{p.name}</div>
										<div className="mt-1 text-[0.78rem] leading-snug text-fog-400">
											{p.desc}
										</div>
									</div>
									<span className="font-mono text-[0.72rem] text-fog-300">
										{p.type}
									</span>
									<span className="font-mono text-[0.72rem] text-fog-300">
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
							a="All ten props are optional with sensible defaults, so <AnimatedDots /> renders bare. You'll typically tune dotsNum, dotRadius, speedRange, blendMode, and backgroundColor; colors lets you swap the [channel, r, g, b] palette."
						/>
						<QA
							q="Any state-management requirements?"
							a="None external. The component owns its own refs (canvas, dot pool, the rAF handle) and runs a single requestAnimationFrame loop inside one useEffect. No Redux/Zustand/context, no providers to mount."
						/>
						<QA
							q="Any required assets (images, icons)?"
							a="Zero. The whole field is drawn with canvas arcs — no images, sprites, fonts, or icons to vendor. (The lucide-react icons on this page are showcase chrome, not part of the component.)"
						/>
						<QA
							q="Expected responsive behavior?"
							a="fullScreen={true} sizes to window.innerWidth/Height and re-seeds on resize. fullScreen={false} sizes to the parent's box, so wrap it in a relative, sized container (e.g. absolute inset-0) and it fills that — ideal for section backgrounds."
						/>
						<QA
							q="Best place to use it?"
							a="As a decorative background behind hero sections, splash/loading screens, auth or 404 pages, and event/launch landing pages. Place your content in a higher z-index sibling and add a scrim for legibility — exactly like the hero above."
						/>
						<QA
							q="One integration gotcha?"
							a="The colors palette's first tuple item is the channel that ramps with the fall — only 'red' | 'green' | 'blue' are recognised; the other two channel values stay fixed at their base. Keep that in mind when authoring custom stops."
						/>
					</div>
				</div>
			</section>

			{/* ============================ FOOTER ============================ */}
			<footer className="relative overflow-hidden border-t border-line">
				<div className="absolute inset-0 opacity-50">
					<AnimatedDots
						fullScreen={false}
						dotsNum={50}
						dotRadius={6}
						dotSpacing={10}
						speedRange={[0.6, 2]}
						backgroundColor="#050507"
						className="absolute inset-0"
					/>
				</div>
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/85 to-ink-950" />
				<div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-16 text-center">
					<span className="grid h-9 w-9 place-items-center rounded-lg border border-accent/40 bg-ink-950">
						<Droplets className="h-4 w-4 text-accent" />
					</span>
					<p className="font-display text-lg font-600 text-fog-200">
						animated-dots · a single drop-in for{" "}
						<code className="text-accent">@/components/ui</code>
					</p>
					<p className="max-w-md text-sm text-fog-400">
						Built as a Fable 5 experiment — shadcn structure, Tailwind CSS,
						TypeScript, zero runtime deps. Fonts vendored locally; runs fully
						offline.
					</p>
					<div className="mt-2 flex items-center gap-2">
						<Sparkles className="h-3 w-3 text-fog-400" />
						<span className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-fog-400">
							components / ui / animated-dots.tsx
						</span>
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
