import { useCallback, useMemo, useState } from "react";
import { ArrowUpRight, Code, Grid3x3, Layers } from "lucide-react";
import Wrapper from "@/components/ui/background-shaders";
import { PROMPT_WARP, WARP_PRESETS, type WarpConfig } from "@/lib/warp";
import { useTelemetry } from "@/lib/useTelemetry";
import { Chip, Glass, Kicker } from "@/components/lab/primitives";
import { ControlDeck } from "@/components/lab/control-deck";
import { PropsApi } from "@/components/lab/props-api";
import { IntegrationNotes } from "@/components/lab/integration-notes";
import { SideRail } from "@/components/lab/side-rail";
import { TelemetryStrip } from "@/components/lab/telemetry-strip";

const STACK = [
	"React 19",
	"TypeScript",
	"Vite",
	"Tailwind v4",
	"@paper-design/shaders-react",
	"shadcn",
];

/** Shallow-equal two Warp configs (colours compared positionally). */
function sameConfig(a: WarpConfig, b: WarpConfig): boolean {
	return (
		a.proportion === b.proportion &&
		a.softness === b.softness &&
		a.distortion === b.distortion &&
		a.swirl === b.swirl &&
		a.swirlIterations === b.swirlIterations &&
		a.shapeScale === b.shapeScale &&
		a.scale === b.scale &&
		a.rotation === b.rotation &&
		a.speed === b.speed &&
		a.shape === b.shape &&
		a.colors.every((c, i) => c === b.colors[i])
	);
}

export default function App() {
	// Boots on the prompt's EXACT configuration.
	const [config, setConfig] = useState<WarpConfig>(PROMPT_WARP);
	const telemetry = useTelemetry(true);

	const patch = useCallback((p: Partial<WarpConfig>) => {
		setConfig((prev) => ({ ...prev, ...p }));
	}, []);

	const applyPreset = useCallback((id: string) => {
		const preset = WARP_PRESETS.find((p) => p.id === id);
		if (preset) setConfig(preset.config);
	}, []);

	const reset = useCallback(() => setConfig(PROMPT_WARP), []);

	const dirty = useMemo(() => !sameConfig(config, PROMPT_WARP), [config]);
	const activePreset = useMemo(() => {
		const hit = WARP_PRESETS.find((p) => sameConfig(p.config, config));
		return hit?.id ?? null;
	}, [config]);

	return (
		// The verbatim component: live `config` drives the fixed shader background,
		// and the rail + children fill the slots the prompt left empty.
		<Wrapper config={config} rail={<SideRail config={config} />}>
			{/* ----------------------------------------------------------------- *
			 * Top bar
			 * ----------------------------------------------------------------- */}
			<header className="mx-auto flex max-w-7xl items-center justify-between gap-4 pt-1">
				<div className="flex items-center gap-2.5">
					<span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-black/40 backdrop-blur-md">
						<Grid3x3 className="h-4 w-4 text-white/85" aria-hidden />
					</span>
					<span className="font-mono text-[12px] uppercase tracking-[0.2em] text-white/80">
						Warp Checks
						<span className="text-white/35"> // Background Lab</span>
					</span>
				</div>
				<nav className="hidden items-center gap-2 sm:flex">
					<Chip tone="outline">@paper-design/shaders-react</Chip>
					<a
						href="https://github.com/paper-design/shaders"
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md transition hover:bg-white/15"
					>
						<Code className="h-3.5 w-3.5" aria-hidden />
						Shaders
					</a>
				</nav>
			</header>

			{/* ----------------------------------------------------------------- *
			 * Hero + deck
			 * ----------------------------------------------------------------- */}
			<main className="mx-auto mt-10 grid max-w-7xl gap-8 lg:mt-16 lg:grid-cols-[1fr_minmax(340px,400px)]">
				{/* Hero lockup */}
				<section className="flex flex-col justify-center gap-7">
					<div className="flex flex-wrap items-center gap-2">
						<Chip tone="live">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
							shape = &quot;checks&quot;
						</Chip>
						<Chip>fixed inset-0 -z-10</Chip>
					</div>

					<h1 className="max-w-3xl text-balance text-5xl font-light leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl">
						A living{" "}
						<span className="bg-gradient-to-r from-sky-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
							checks-warp
						</span>{" "}
						field, behind your whole app.
					</h1>

					<p className="max-w-xl text-lg font-light leading-relaxed text-white/75">
						The brief&apos;s{" "}
						<code className="font-mono text-[15px] text-white/90">
							background-shaders.tsx
						</code>{" "}
						component, dropped verbatim into shadcn&apos;s{" "}
						<code className="font-mono text-[15px] text-white/90">
							components/ui
						</code>
						. One{" "}
						<code className="font-mono text-[15px] text-white/90">
							&lt;Warp&gt;
						</code>{" "}
						in a fixed, full-viewport layer — then real, legible product UI
						floated on top of it. Drive every prop on the right; the page
						background updates live.
					</p>

					<div className="flex flex-wrap items-center gap-3">
						<a
							href="#integration"
							className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
						>
							Read the integration
							<ArrowUpRight
								className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								aria-hidden
							/>
						</a>
						<a
							href="#api"
							className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
						>
							<Layers className="h-4 w-4" aria-hidden />
							Inspect props
						</a>
					</div>

					<div className="flex flex-wrap gap-2 pt-1">
						{STACK.map((s) => (
							<span
								key={s}
								className="rounded-full border border-white/10 bg-black/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55 backdrop-blur-sm"
							>
								{s}
							</span>
						))}
					</div>

					<div className="max-w-md pt-2">
						<TelemetryStrip telemetry={telemetry} config={config} />
					</div>
				</section>

				{/* Live control deck */}
				<ControlDeck
					config={config}
					activePreset={activePreset}
					dirty={dirty}
					onChange={patch}
					onPreset={applyPreset}
					onReset={reset}
				/>
			</main>

			{/* ----------------------------------------------------------------- *
			 * Props API
			 * ----------------------------------------------------------------- */}
			<section id="api" className="mx-auto mt-20 max-w-7xl scroll-mt-8">
				<div className="mb-5 flex flex-col gap-1">
					<Kicker>Reference</Kicker>
					<h2 className="text-2xl font-medium text-white">Props, live</h2>
				</div>
				<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
					<PropsApi config={config} />
					<Glass
						as="section"
						className="flex flex-col justify-between gap-6 p-6"
					>
						<div className="flex flex-col gap-3">
							<Kicker>The drop-in</Kicker>
							<h3 className="text-xl font-medium text-white">
								Exactly the brief&apos;s component
							</h3>
							<p className="text-sm leading-relaxed text-white/65">
								The shader sits in the{" "}
								<code className="font-mono text-[12px] text-white/90">
									fixed inset-0 -z-10
								</code>{" "}
								layer the prompt specified. The default export takes no props
								and renders the prompt&apos;s literal configuration — this lab
								simply threads live state through the same component.
							</p>
						</div>
						<pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/55 p-4 font-mono text-[12px] leading-relaxed text-white/80">
							{`// src/components/ui/demo.tsx
import Wrapper from "@/components/ui/background-shaders";

export default function DemoOne() {
  return <Wrapper/>;
}`}
						</pre>
					</Glass>
				</div>
			</section>

			{/* ----------------------------------------------------------------- *
			 * Integration write-up
			 * ----------------------------------------------------------------- */}
			<section id="integration" className="mx-auto mt-20 max-w-7xl scroll-mt-8">
				<IntegrationNotes />
			</section>

			{/* ----------------------------------------------------------------- *
			 * Footer
			 * ----------------------------------------------------------------- */}
			<footer className="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pb-4 pt-8 sm:flex-row">
				<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
					Warp Checks // Background Lab — a Fable shader experiment
				</p>
				<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
					Procedural · no images · fonts vendored locally
				</p>
			</footer>
		</Wrapper>
	);
}
