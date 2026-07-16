import {
	Aperture,
	ArrowDown,
	Boxes,
	Crosshair,
	FileCode2,
	Gauge,
	Image as ImageIcon,
	Layers,
	Maximize2,
	Pause,
	Play,
	RotateCcw,
	SlidersHorizontal,
	X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import {
	ApertureCanvas,
	type ApertureFrame,
} from "@/components/aperture-canvas";
import { CodeBlock } from "@/components/code-block";
import DemoOne from "@/components/ui/demo";
import { SHADER_SRC, ShaderCanvas } from "@/components/ui/raidal-2";
import {
	DEMO_SRC,
	SCAFFOLD_SRC,
	TAILWIND_SRC,
	USAGE_SRC,
} from "@/source-snippets";

const IMPORT_LINE = `import Component from "@/components/ui/raidal-2";`;

interface Settings {
	blades: number;
	spin: number;
	gain: number;
	hue: number;
}

const PRESETS: { name: string; s: Settings }[] = [
	{ name: "ORIGIN", s: { blades: 9, spin: 1, gain: 1, hue: 0 } },
	{ name: "CORONA", s: { blades: 6, spin: 1.1, gain: 1.6, hue: 0.6 } },
	{ name: "IRIS", s: { blades: 12, spin: 0.7, gain: 0.9, hue: 2.2 } },
	{ name: "EMBER", s: { blades: 4, spin: 1.4, gain: 1.35, hue: 4.4 } },
	{ name: "HALO", s: { blades: 14, spin: 0.5, gain: 0.7, hue: 3.3 } },
];

const SPECIMENS = [
	{ slug: "origin", name: "ORIGIN", blades: 9, gain: 1.0, hue: 0.0 },
	{ slug: "corona", name: "CORONA", blades: 6, gain: 1.6, hue: 0.6 },
	{ slug: "iris", name: "IRIS", blades: 12, gain: 0.9, hue: 2.2 },
	{ slug: "ember", name: "EMBER", blades: 4, gain: 1.35, hue: 4.4 },
	{ slug: "halo", name: "HALO", blades: 14, gain: 0.7, hue: 3.3 },
	{ slug: "spectre", name: "SPECTRE", blades: 8, gain: 1.2, hue: 5.2 },
];

export default function App() {
	const [settings, setSettings] = useState<Settings>(PRESETS[1].s);
	const [paused, setPaused] = useState(false);
	const [fullscreen, setFullscreen] = useState(false);

	const heroFps = useRef<HTMLSpanElement>(null);
	const heroUptime = useRef<HTMLSpanElement>(null);
	const heroFrame = useRef<HTMLSpanElement>(null);
	const heroDpr = useRef<HTMLSpanElement>(null);
	const heroRes = useRef<HTMLSpanElement>(null);
	const deckFps = useRef<HTMLSpanElement>(null);

	const onHeroFrame = useCallback((f: ApertureFrame) => {
		if (heroFps.current)
			heroFps.current.textContent = f.fps.toFixed(0).padStart(2, "0");
		if (heroFrame.current)
			heroFrame.current.textContent = String(f.frame).padStart(6, "0");
		if (heroDpr.current) heroDpr.current.textContent = f.dpr.toFixed(2);
		if (heroRes.current) heroRes.current.textContent = `${f.width}×${f.height}`;
		if (heroUptime.current) {
			const s = Math.floor(f.time);
			heroUptime.current.textContent = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
		}
	}, []);

	const onDeckFrame = useCallback((f: ApertureFrame) => {
		if (deckFps.current)
			deckFps.current.textContent = f.fps.toFixed(0).padStart(2, "0");
	}, []);

	const set = <K extends keyof Settings>(k: K, v: Settings[K]) =>
		setSettings((p) => ({ ...p, [k]: v }));

	const activePreset = PRESETS.find(
		(p) =>
			p.s.blades === settings.blades &&
			p.s.spin === settings.spin &&
			p.s.gain === settings.gain &&
			p.s.hue === settings.hue,
	)?.name;

	return (
		<div className="relative min-h-screen bg-base font-sans text-ash">
			<Nav />

			<section
				id="top"
				className="relative isolate min-h-[100svh] overflow-hidden"
			>
				<div className="absolute inset-0 -z-10">
					<ApertureCanvas
						blades={9}
						spin={0.9}
						gain={1.15}
						hue={0.25}
						onFrame={onHeroFrame}
					/>
				</div>
				<div className="pointer-events-none absolute inset-0 -z-10 vignette" />
				<div className="pointer-events-none absolute inset-0 -z-10 scrim-left" />
				<Reticle />

				<div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-28 pt-28 sm:px-8">
					<div className="max-w-2xl">
						<span className="inline-flex items-center gap-2 rounded-full border border-line/80 bg-base/40 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.22em] text-dim backdrop-blur-sm">
							<Crosshair className="h-3 w-3 text-ember" />
							WebGL2 · zero-dependency · components/ui
						</span>

						<h1 className="mt-6 font-display text-[19vw] font-bold leading-[0.82] tracking-tight text-ash glow-ember sm:text-8xl md:text-9xl">
							APERTURE
						</h1>

						<p className="mt-6 max-w-xl text-pretty text-[1rem] leading-relaxed text-ash/85 copy-legible sm:text-lg">
							A drop-in radial-bloom shader for shadcn/ui, nine accumulating
							blades, an angular smoothstep gate and a{" "}
							<code className="font-mono text-ember2">tanh</code> tone-map, all
							on a single full-screen triangle. No three.js. Open the instrument
							and tune its blades, spin, gain and hue live.
						</p>

						<div className="mt-8 flex flex-wrap items-center gap-3">
							<a
								href="#deck"
								className="inline-flex items-center gap-2 rounded-lg bg-ember px-4 py-2.5 text-sm font-semibold text-base transition-transform hover:-translate-y-0.5"
							>
								<SlidersHorizontal className="h-4 w-4" />
								Open the control deck
							</a>
							<CopyButton text={IMPORT_LINE} label="Copy import" />
						</div>
					</div>
				</div>

				<div className="pointer-events-none absolute inset-x-0 bottom-0">
					<div className="mx-auto max-w-6xl px-5 pb-5 sm:px-8">
						<div className="flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-line/60 pt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
							<span className="inline-flex items-center gap-1.5 text-ember">
								<Gauge className="h-3.5 w-3.5" /> live
							</span>
							<Telem label="fps" inner={heroFps} />
							<Telem label="uptime" inner={heroUptime} />
							<Telem label="frame" inner={heroFrame} />
							<Telem label="dpr" inner={heroDpr} />
							<Telem label="res" inner={heroRes} />
						</div>
					</div>
				</div>

				<a
					href="#deck"
					className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 animate-bounce text-dim transition-colors hover:text-ember sm:block"
					aria-label="Scroll to control deck"
				>
					<ArrowDown className="h-5 w-5" />
				</a>
			</section>

			<section
				id="deck"
				className="relative border-t border-line bg-base bg-grid"
			>
				<div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
					<SectionLabel
						icon={<SlidersHorizontal className="h-3.5 w-3.5" />}
						index="01"
					>
						control deck
					</SectionLabel>
					<div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
						<h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ash sm:text-4xl">
							The field's baked-in constants, promoted to live uniforms.
						</h2>
						<p className="max-w-md text-sm leading-relaxed text-dim">
							The original hard-codes{" "}
							<code className="font-mono text-ember2">9</code> blades, a{" "}
							<code className="font-mono text-ember2">0.03</code> gain and a
							fixed hue phase. Here they are real-time controls.
						</p>
					</div>

					<div className="mt-10 grid gap-6 lg:grid-cols-[1.45fr_1fr]">
						<div className="relative aspect-[16/11] overflow-hidden rounded-xl border border-line bg-black">
							<ApertureCanvas
								blades={settings.blades}
								spin={settings.spin}
								gain={settings.gain}
								hue={settings.hue}
								paused={paused}
								onFrame={onDeckFrame}
							/>
							<CornerBrackets />
							<div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ash/80">
								<span className="rounded bg-base/55 px-2 py-1 backdrop-blur-sm">
									{activePreset ?? "custom"}
								</span>
								<span className="rounded bg-base/55 px-2 py-1 backdrop-blur-sm">
									<span ref={deckFps} className="tabular-nums text-ember">
										60
									</span>{" "}
									fps
								</span>
							</div>
							<div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-4 p-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ash/75">
								<span className="rounded bg-base/55 px-2 py-1 backdrop-blur-sm tabular-nums">
									blades {settings.blades.toFixed(0)}
								</span>
								<span className="rounded bg-base/55 px-2 py-1 backdrop-blur-sm tabular-nums">
									gain {settings.gain.toFixed(2)}
								</span>
								<span className="rounded bg-base/55 px-2 py-1 backdrop-blur-sm tabular-nums">
									hue {settings.hue.toFixed(2)}
								</span>
							</div>
						</div>

						<div className="flex flex-col gap-5 rounded-xl border border-line bg-panel/70 p-5">
							<Slider
								label="Blades"
								value={settings.blades}
								min={3}
								max={14}
								step={1}
								onChange={(v) => set("blades", v)}
							/>
							<Slider
								label="Spin"
								value={settings.spin}
								min={0}
								max={2.5}
								step={0.05}
								suffix="×"
								onChange={(v) => set("spin", v)}
							/>
							<Slider
								label="Gain"
								value={settings.gain}
								min={0.4}
								max={2.2}
								step={0.05}
								suffix="×"
								onChange={(v) => set("gain", v)}
							/>
							<Slider
								label="Hue"
								value={settings.hue}
								min={0}
								max={6.28}
								step={0.02}
								suffix=" rad"
								onChange={(v) => set("hue", v)}
							/>

							<div className="flex items-center gap-2">
								<button
									onClick={() => setPaused((p) => !p)}
									className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-panel2 px-3 py-2 text-sm font-medium text-ash transition-colors hover:border-ember/60"
								>
									{paused ? (
										<Play className="h-4 w-4 text-ember" />
									) : (
										<Pause className="h-4 w-4 text-ember" />
									)}
									{paused ? "Resume" : "Freeze"}
								</button>
								<button
									onClick={() => {
										setSettings(PRESETS[0].s);
										setPaused(false);
									}}
									className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-panel2 px-3 py-2 text-sm font-medium text-dim transition-colors hover:border-ember/60 hover:text-ash"
									aria-label="Reset to original"
								>
									<RotateCcw className="h-4 w-4" />
									Reset
								</button>
							</div>

							<div>
								<div className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
									presets
								</div>
								<div className="flex flex-wrap gap-2">
									{PRESETS.map((p) => (
										<button
											key={p.name}
											onClick={() => setSettings(p.s)}
											className={`rounded-md border px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
												activePreset === p.name
													? "border-ember/70 bg-ember/10 text-ember"
													: "border-line text-dim hover:border-ember/50 hover:text-ash"
											}`}
										>
											{p.name}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="anatomy" className="border-t border-line bg-base">
				<div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
					<SectionLabel icon={<Layers className="h-3.5 w-3.5" />} index="02">
						anatomy
					</SectionLabel>
					<h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ash sm:text-4xl">
						How the bloom is drawn.
					</h2>
					<p className="mt-3 max-w-2xl text-sm leading-relaxed text-dim">
						The whole image is one fragment shader over a single oversized
						triangle, with no meshes, textures, or passes.
					</p>

					<div className="mt-10 grid gap-4 sm:grid-cols-2">
						{ANATOMY.map((a) => (
							<div
								key={a.n}
								className="min-w-0 rounded-xl border border-line bg-panel/60 p-5"
							>
								<div className="flex items-center gap-3">
									<span className="grid h-7 w-7 place-items-center rounded-md border border-line font-mono text-[12px] text-ember">
										{a.n}
									</span>
									<h3 className="font-display text-lg font-semibold text-ash">
										{a.title}
									</h3>
								</div>
								<p className="mt-3 text-sm leading-relaxed text-dim">
									{a.body}
								</p>
								<pre className="mt-4 overflow-x-auto rounded-lg border border-line/70 bg-base/70 px-3 py-2.5 font-mono text-[11.5px] leading-relaxed text-ember2/90">
									<code>{a.code}</code>
								</pre>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="field" className="border-t border-line bg-base bg-rings">
				<div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
					<SectionLabel icon={<ImageIcon className="h-3.5 w-3.5" />} index="03">
						field captures
					</SectionLabel>
					<div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
						<h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ash sm:text-4xl">
							Six exposures of the same field.
						</h2>
						<p className="max-w-md text-xs leading-relaxed text-faint">
							Real frames rendered headless from this very component and
							vendored locally. External photo CDNs are blocked in this build
							sandbox, so the gallery is sourced from the shader itself.
						</p>
					</div>

					<div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
						{SPECIMENS.map((sp) => (
							<figure
								key={sp.slug}
								className="group relative overflow-hidden rounded-xl border border-line bg-black"
							>
								<img
									src={`./assets/specimens/${sp.slug}.jpg`}
									alt={`Radial bloom preset ${sp.name}: ${sp.blades} blades, gain ${sp.gain}, hue ${sp.hue}`}
									loading="lazy"
									className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-base/90 to-transparent px-3 pb-2.5 pt-8 font-mono text-[10.5px] uppercase tracking-[0.14em]">
									<span className="text-ash">{sp.name}</span>
									<span className="tabular-nums text-dim">
										{sp.blades}b · {sp.gain}g
									</span>
								</figcaption>
							</figure>
						))}
					</div>
				</div>
			</section>

			<section id="install" className="border-t border-line bg-base">
				<div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
					<SectionLabel icon={<FileCode2 className="h-3.5 w-3.5" />} index="04">
						integration
					</SectionLabel>
					<h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ash sm:text-4xl">
						Drop it into a shadcn project.
					</h2>

					<div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
						<div className="min-w-0 space-y-6 text-sm leading-relaxed text-dim">
							<p>
								This project already satisfies the brief's stack, so nothing
								needed bootstrapping:
							</p>
							<ul className="space-y-3">
								<Check>
									<b className="text-ash">shadcn structure</b>:{" "}
									<code className="font-mono text-ember2">components.json</code>{" "}
									is present, the{" "}
									<code className="font-mono text-ember2">@</code> alias
									resolves to{" "}
									<code className="font-mono text-ember2">./src</code> (in both{" "}
									<code className="font-mono text-ember2">vite.config.ts</code>{" "}
									and tsconfig), and{" "}
									<code className="font-mono text-ember2">cn()</code> lives in{" "}
									<code className="font-mono text-ember2">
										src/lib/utils.ts
									</code>
									.
								</Check>
								<Check>
									<b className="text-ash">Tailwind CSS v4</b> via{" "}
									<code className="font-mono text-ember2">
										@tailwindcss/vite
									</code>
									; <code className="font-mono text-ember2">src/index.css</code>{" "}
									starts with{" "}
									<code className="font-mono text-ember2">
										@import "tailwindcss"
									</code>
									.
								</Check>
								<Check>
									<b className="text-ash">TypeScript</b>: strict mode with
									project references.
								</Check>
							</ul>

							<div className="rounded-xl border border-ember/25 bg-ember/[0.06] p-4">
								<div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ember">
									<Boxes className="h-3.5 w-3.5" /> why components/ui
								</div>
								<p className="mt-2 text-sm leading-relaxed text-dim">
									shadcn pins the{" "}
									<code className="font-mono text-ember2">ui</code> alias to{" "}
									<code className="font-mono text-ember2">@/components/ui</code>
									. Every ecosystem import is written as{" "}
									<code className="font-mono text-ember2">
										@/components/ui/&lt;name&gt;
									</code>
									, and{" "}
									<code className="font-mono text-ember2">npx shadcn add</code>{" "}
									writes new primitives there. Keeping that exact folder means
									the brief's{" "}
									<code className="font-mono text-ember2">{IMPORT_LINE}</code>{" "}
									resolves unchanged.
								</p>
							</div>

							<p>
								The drop-in itself pulls in{" "}
								<b className="text-ash">no dependencies</b> beyond React. It is
								raw WebGL2. The icons,{" "}
								<code className="font-mono text-ember2">cn()</code> and copy
								buttons used by <i>this page</i> are the only extras.
							</p>
						</div>

						<div className="min-w-0 space-y-4">
							<CodeBlock label="terminal, from scratch" code={SCAFFOLD_SRC} />
							<CodeBlock label="src/components/ui/demo.tsx" code={DEMO_SRC} />
							<CodeBlock label="embed anywhere" code={USAGE_SRC} />
							<CodeBlock label="src/index.css" code={TAILWIND_SRC} />
						</div>
					</div>
				</div>
			</section>

			<section id="dropin" className="border-t border-line bg-base bg-grid">
				<div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
					<SectionLabel icon={<Boxes className="h-3.5 w-3.5" />} index="05">
						the verbatim drop-in
					</SectionLabel>
					<div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
						<h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ash sm:text-4xl">
							The unmodified component, rendered live.
						</h2>
						<button
							onClick={() => setFullscreen(true)}
							className="inline-flex items-center gap-2 self-start rounded-lg border border-line bg-panel2 px-4 py-2.5 text-sm font-medium text-ash transition-colors hover:border-ember/60"
						>
							<Maximize2 className="h-4 w-4 text-ember" />
							Open fullscreen
						</button>
					</div>
					<p className="mt-3 max-w-2xl text-sm leading-relaxed text-dim">
						Below is the exact GLSL from{" "}
						<code className="font-mono text-ember2">raidal-2.tsx</code> via its
						exported{" "}
						<code className="font-mono text-ember2">&lt;ShaderCanvas&gt;</code>{" "}
						with no promoted uniforms. "Open fullscreen" mounts the literal
						default export{" "}
						<code className="font-mono text-ember2">&lt;Component /&gt;</code>{" "}
						exactly as the brief's{" "}
						<code className="font-mono text-ember2">demo.tsx</code> ships it.
					</p>

					<div className="relative mt-10 h-[460px] overflow-hidden rounded-xl border border-line bg-black sm:h-[560px]">
						<ShaderCanvas fragSource={SHADER_SRC} />
						<CornerBrackets />
						<span className="pointer-events-none absolute left-4 top-4 rounded bg-base/55 px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ash/80 backdrop-blur-sm">
							raidal-2 · default
						</span>
					</div>
				</div>
			</section>

			<section id="api" className="border-t border-line bg-base">
				<div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
					<SectionLabel icon={<Gauge className="h-3.5 w-3.5" />} index="06">
						api
					</SectionLabel>

					<div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
						<div className="min-w-0">
							<h3 className="font-display text-xl font-semibold text-ash">
								&lt;ApertureCanvas /&gt; props
							</h3>
							<p className="mt-1.5 text-sm text-dim">
								Additive conveniences. The verbatim drop-in takes none.
							</p>
							<div className="mt-5 overflow-hidden rounded-xl border border-line">
								{PROPS.map((p, i) => (
									<div
										key={p.name}
										className={`grid grid-cols-[1fr] gap-1 px-4 py-3.5 sm:grid-cols-[150px_1fr] sm:gap-4 ${
											i === 0 ? "" : "border-t border-line"
										}`}
									>
										<div className="flex items-center gap-2">
											<code className="font-mono text-[13px] text-ember">
												{p.name}
											</code>
										</div>
										<div>
											<div className="font-mono text-[11px] text-iris">
												{p.type}
											</div>
											<p className="mt-1 text-[13px] leading-relaxed text-dim">
												{p.desc}{" "}
												<span className="text-faint">· default {p.def}</span>
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="min-w-0">
							<h3 className="font-display text-xl font-semibold text-ash">
								Uniforms
							</h3>
							<p className="mt-1.5 text-sm text-dim">
								What the GLSL receives each frame.
							</p>
							<div className="mt-5 overflow-hidden rounded-xl border border-line">
								{UNIFORMS.map((u, i) => (
									<div
										key={u.name}
										className={`px-4 py-3.5 ${i === 0 ? "" : "border-t border-line"}`}
									>
										<div className="flex items-center gap-2">
											<code className="font-mono text-[13px] text-ember">
												{u.name}
											</code>
											<span className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
												{u.glsl}
											</span>
										</div>
										<p className="mt-1.5 text-[13px] leading-relaxed text-dim">
											{u.desc}
										</p>
									</div>
								))}
							</div>

							<h3 className="mt-10 font-display text-xl font-semibold text-ash">
								Integration notes
							</h3>
							<dl className="mt-4 space-y-3 text-[13px] leading-relaxed">
								{QA.map((q) => (
									<div
										key={q.q}
										className="rounded-lg border border-line bg-panel/50 px-4 py-3"
									>
										<dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ember">
											{q.q}
										</dt>
										<dd className="mt-1 text-dim">{q.a}</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
				</div>
			</section>

			<Footer />

			{fullscreen && (
				<>
					<DemoOne />
					<button
						onClick={() => setFullscreen(false)}
						className="fixed right-4 top-4 z-[60] inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/55 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors hover:border-white/50"
						aria-label="Close fullscreen"
					>
						<X className="h-4 w-4" />
						close
					</button>
				</>
			)}
		</div>
	);
}

function Nav() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-base/70 backdrop-blur-md">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
				<a href="#top" className="flex items-center gap-2.5">
					<span className="grid h-7 w-7 place-items-center rounded-md border border-line bg-panel2 text-ember">
						<Aperture className="h-4 w-4" />
					</span>
					<span className="font-mono text-[13px] tracking-[0.2em] text-ash">
						APER<span className="text-ember">·</span>TURE
					</span>
				</a>
				<nav className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.14em] text-dim md:flex">
					<a href="#deck" className="transition-colors hover:text-ash">
						Deck
					</a>
					<a href="#anatomy" className="transition-colors hover:text-ash">
						Anatomy
					</a>
					<a href="#field" className="transition-colors hover:text-ash">
						Field
					</a>
					<a href="#install" className="transition-colors hover:text-ash">
						Install
					</a>
					<a href="#api" className="transition-colors hover:text-ash">
						API
					</a>
				</nav>
				<a
					href="#deck"
					className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim transition-colors hover:border-ember/60 hover:text-ember"
				>
					<SlidersHorizontal className="h-3.5 w-3.5" />
					Tune
				</a>
			</div>
		</header>
	);
}

function Footer() {
	return (
		<footer className="border-t border-line bg-base">
			<div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
				<div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-faint">
					<Aperture className="h-3.5 w-3.5 text-ember" />
					APERTURE · components/ui · webgl2 · one triangle
				</div>
				<span className="font-mono text-[11px] tracking-[0.14em] text-faint">
					drop-in · zero required props · self-cleaning
				</span>
			</div>
		</footer>
	);
}

function SectionLabel({
	icon,
	index,
	children,
}: {
	icon: React.ReactNode;
	index: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex items-center gap-4">
			<span className="grid h-7 w-7 place-items-center rounded-md border border-line bg-panel2 text-ember">
				{icon}
			</span>
			<span className="font-mono text-[11px] uppercase tracking-[0.24em] text-dim">
				{index} <span className="mx-1.5 text-line">/</span>{" "}
				<span className="text-ash/80">{children}</span>
			</span>
		</div>
	);
}

function Telem({
	label,
	inner,
}: {
	label: string;
	inner: React.RefObject<HTMLSpanElement>;
}) {
	return (
		<span className="inline-flex items-center gap-1.5">
			{label}
			<span ref={inner} className="tabular-nums text-ash">
				...
			</span>
		</span>
	);
}

function Slider({
	label,
	value,
	min,
	max,
	step,
	suffix = "",
	onChange,
}: {
	label: string;
	value: number;
	min: number;
	max: number;
	step: number;
	suffix?: string;
	onChange: (v: number) => void;
}) {
	return (
		<label className="block">
			<div className="flex items-baseline justify-between">
				<span className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
					{label}
				</span>
				<span className="font-mono text-[12px] tabular-nums text-ember">
					{step < 1 ? value.toFixed(2) : value.toFixed(0)}
					{suffix}
				</span>
			</div>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(parseFloat(e.target.value))}
				className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-ember"
			/>
		</label>
	);
}

function CornerBrackets() {
	const base = "pointer-events-none absolute h-4 w-4 border-ember/70";
	return (
		<>
			<span className={`${base} left-2 top-2 border-l border-t`} />
			<span className={`${base} right-2 top-2 border-r border-t`} />
			<span className={`${base} bottom-2 left-2 border-b border-l`} />
			<span className={`${base} bottom-2 right-2 border-b border-r`} />
		</>
	);
}

function Reticle() {
	return (
		<svg
			className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 text-ash/[0.07]"
			viewBox="0 0 200 200"
			fill="none"
			stroke="currentColor"
			aria-hidden
		>
			<circle cx="100" cy="100" r="40" strokeWidth="0.4" />
			<circle cx="100" cy="100" r="62" strokeWidth="0.4" />
			<circle
				cx="100"
				cy="100"
				r="84"
				strokeWidth="0.4"
				strokeDasharray="1 3"
			/>
			<line x1="100" y1="6" x2="100" y2="22" strokeWidth="0.5" />
			<line x1="100" y1="178" x2="100" y2="194" strokeWidth="0.5" />
			<line x1="6" y1="100" x2="22" y2="100" strokeWidth="0.5" />
			<line x1="178" y1="100" x2="194" y2="100" strokeWidth="0.5" />
		</svg>
	);
}

function CopyButton({ text, label }: { text: string; label: string }) {
	const [copied, setCopied] = useState(false);
	return (
		<button
			onClick={async () => {
				try {
					await navigator.clipboard.writeText(text);
				} catch {}
				setCopied(true);
				window.setTimeout(() => setCopied(false), 1400);
			}}
			className="inline-flex items-center gap-2 rounded-lg border border-line bg-base/40 px-4 py-2.5 text-sm font-medium text-ash backdrop-blur-sm transition-colors hover:border-ember/60"
		>
			<FileCode2 className="h-4 w-4 text-ember" />
			{copied ? "Copied!" : label}
		</button>
	);
}

function Check({ children }: { children: React.ReactNode }) {
	return (
		<li className="flex gap-3">
			<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
			<span className="min-w-0">{children}</span>
		</li>
	);
}

const ANATOMY = [
	{
		n: "1",
		title: "One full-screen triangle",
		body: "The vertex shader emits a single oversized triangle that covers the viewport. Every pixel then runs the fragment program, so there is no geometry to speak of.",
		code: "gl.drawArrays(gl.TRIANGLES, 0, 3);",
	},
	{
		n: "2",
		title: "Nine accumulating blades",
		body: "A loop runs i = 1…9. Each step adds a thin sliver of light whose radial falloff comes from a max()-guarded denominator, so the energy never blows up at the centre.",
		code: "denom = max(a, -a*3.) + 2./r.y;\no += .03/denom * sm * …;",
	},
	{
		n: "3",
		title: "Angular smoothstep gate",
		body: "atan(p.y, p.x) turns position into an angle; a smoothstep on cos(angle + i·i) carves each blade into a soft radial wedge that sweeps as time advances.",
		code: "sm = smoothstep(cos(i-t), 2.,\n        cos(atan(p.y,p.x)+…));",
	},
	{
		n: "4",
		title: "tanh tone-map + hue",
		body: "Per-channel sine offsets (0, 2, 4) tint each blade; the accumulated colour is compressed with tanh so highlights roll off cleanly instead of clipping to white.",
		code: "o += … * (1.2 + sin(a+i+vec4(0,2,4,0)));\no = tanh(o);",
	},
];

const PROPS = [
	{
		name: "blades",
		type: "number",
		def: "9",
		desc: "Accumulating blades (loop count). The brief bakes in 9.",
	},
	{
		name: "spin",
		type: "number",
		def: "1",
		desc: "Time multiplier for the rotation; 0 freezes.",
	},
	{
		name: "gain",
		type: "number",
		def: "1",
		desc: "Per-blade accumulation gain / exposure (×0.03).",
	},
	{
		name: "hue",
		type: "number",
		def: "0",
		desc: "Hue phase (radians) added inside the colour sine.",
	},
	{
		name: "paused",
		type: "boolean",
		def: "false",
		desc: "Freeze the clock, keep the last frame visible.",
	},
	{
		name: "pointerReact",
		type: "boolean",
		def: "true",
		desc: "Ease the bloom centre toward the cursor.",
	},
	{
		name: "pixelRatio",
		type: "number",
		def: "auto",
		desc: "Clamp the drawing-buffer DPR (1–2).",
	},
	{
		name: "onFrame",
		type: "(f: ApertureFrame) => void",
		def: "None",
		desc: "Per-frame telemetry: fps, time, frame, dpr, size.",
	},
	{
		name: "className / style",
		type: "string / CSSProperties",
		def: "None",
		desc: "Forwarded to the <canvas>.",
	},
];

const UNIFORMS = [
	{
		name: "iResolution",
		glsl: "uniform vec3",
		desc: "Drawing-buffer width, height and dpr.",
	},
	{
		name: "iTime",
		glsl: "uniform float",
		desc: "Seconds, already scaled by spin and pausable on the CPU.",
	},
	{
		name: "iFrame",
		glsl: "uniform int",
		desc: "Monotonic frame counter (drop-in only).",
	},
	{
		name: "iMouse",
		glsl: "uniform vec4",
		desc: "Drop-in: raw pointer + buttons. Showcase: smoothed centre offset.",
	},
	{
		name: "uBlades",
		glsl: "uniform float",
		desc: "Promoted from the literal 9.0.",
	},
	{
		name: "uGain",
		glsl: "uniform float",
		desc: "Promoted from the literal 0.03 gain.",
	},
	{ name: "uHue", glsl: "uniform float", desc: "Promoted hue phase." },
];

const QA = [
	{
		q: "Props / data",
		a: "None required. The drop-in is fully self-contained; the showcase adds optional tuning props only.",
	},
	{
		q: "State management",
		a: "Local refs/useState only, with no context or store. Telemetry is written to DOM refs to avoid per-frame re-renders.",
	},
	{
		q: "Assets",
		a: "Two vendored woff2 fonts, an SVG favicon, and six locally-rendered specimen frames. lucide-react for all icons.",
	},
	{
		q: "Responsive",
		a: "Full-bleed at every breakpoint; the canvas tracks its box via ResizeObserver and clamps DPR. No horizontal overflow.",
	},
	{
		q: "Best placement",
		a: "A hero / section background, or any positioned box. The default export is fixed inset-0 for a full-viewport backdrop.",
	},
];
