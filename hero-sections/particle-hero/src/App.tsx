import { useMemo, useState } from "react";
import {
	ArrowUpRight,
	Sparkles,
	Sun,
	Moon,
	Github,
	Gauge,
	Layers,
	MousePointerClick,
	Copy,
	Check,
} from "lucide-react";
import { ParticleHero } from "@/components/ui/particle-hero";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Small presentational helpers                                              */
/* -------------------------------------------------------------------------- */

function Eyebrow({ index, label }: { index: string; label: string }) {
	return (
		<div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-haze">
			<span className="text-gold">{index}</span>
			<span className="h-px w-8 bg-hairline" />
			<span>{label}</span>
		</div>
	);
}

function StatPill({ value, label }: { value: string; label: string }) {
	return (
		<div className="flex flex-col gap-1 border-l border-hairline pl-4">
			<span className="font-display text-2xl font-medium text-ice-3">{value}</span>
			<span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
				{label}
			</span>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  App                                                                        */
/* -------------------------------------------------------------------------- */

const DEFAULT_TITLE = "Gold Design";
const DEFAULT_SUBTITLE = "The world's best platform for Designs,\npowered by Dalim";

export default function App() {
	// Showcase state that drives the integrated <ParticleHero /> live.
	const [title, setTitle] = useState(DEFAULT_TITLE);
	const [subtitle, setSubtitle] = useState(DEFAULT_SUBTITLE);
	const [gold, setGold] = useState(false);
	const [copied, setCopied] = useState(false);

	// The exact JSX a developer would paste to reproduce the live preview.
	const generatedCode = useMemo(() => {
		const titleProp = title === DEFAULT_TITLE ? "" : `\n  title="${title}"`;
		const subtitleProp =
			subtitle === DEFAULT_SUBTITLE
				? ""
				: `\n  subtitle={${JSON.stringify(subtitle)}}`;
		const goldProp = gold ? "\n  defaultGold" : "";
		const props = `${titleProp}${subtitleProp}${goldProp}`;
		return props
			? `<ParticleHero${props}\n/>`
			: `<ParticleHero />`;
	}, [title, subtitle, gold]);

	const copyCode = async () => {
		try {
			await navigator.clipboard.writeText(generatedCode);
		} catch {
			/* clipboard unavailable in some headless contexts — non-fatal */
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 1600);
	};

	return (
		<div className="relative min-h-screen">
			{/* Ambient starfield behind everything */}
			<div className="starfield pointer-events-none fixed inset-0 -z-10 opacity-50" />

			{/* ---- Navbar ------------------------------------------------------ */}
			<header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-night/70 backdrop-blur-xl">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
					<a href="#top" className="flex items-center gap-2.5">
						<span className="grid h-7 w-7 place-items-center rounded-md border border-hairline bg-panel">
							<Sparkles className="h-3.5 w-3.5 text-ice-2" />
						</span>
						<span className="font-display text-[15px] font-semibold tracking-tight text-ice-3">
							Dalim
						</span>
						<span className="ml-1 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:inline">
							/ particle-hero
						</span>
					</a>

					<nav className="hidden items-center gap-7 font-mono text-[12px] uppercase tracking-[0.18em] text-haze md:flex">
						<a className="transition-colors hover:text-ice-3" href="#anatomy">
							Anatomy
						</a>
						<a className="transition-colors hover:text-ice-3" href="#playground">
							Playground
						</a>
						<a className="transition-colors hover:text-ice-3" href="#install">
							Install
						</a>
					</nav>

					<a
						href="https://ui.shadcn.com"
						target="_blank"
						rel="noreferrer"
						className="group inline-flex items-center gap-1.5 rounded-md border border-hairline bg-panel px-3.5 py-1.5 font-mono text-[12px] text-ice-3 transition-colors hover:border-ice-2/40"
					>
						<Github className="h-3.5 w-3.5" />
						<span className="hidden sm:inline">Source</span>
						<ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
					</a>
				</div>
			</header>

			<main id="top">
				{/* ---- Hero: the integrated component ------------------------- */}
				<section className="relative pt-16">
					{/* Exactly the prompt's demo.tsx usage, with the showcase wiring
					    props + the gold-mode orb back into this page. */}
					<ParticleHero
						title={title}
						subtitle={subtitle}
						defaultGold={gold}
						onGoldModeChange={setGold}
					/>

					{/* Caption strip pinned under the hero canvas */}
					<div className="mx-auto -mt-12 max-w-6xl px-5 sm:px-8">
						<div className="flex flex-col gap-6 rounded-xl border border-hairline bg-night-2/80 p-6 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-7">
							<div className="max-w-md">
								<Eyebrow index="00" label="Component" />
								<p className="mt-3 text-[15px] leading-relaxed text-ice/80">
									A single{" "}
									<code className="rounded bg-panel px-1.5 py-0.5 font-mono text-[12.5px] text-ice-2">
										&lt;canvas&gt;
									</code>{" "}
									of upward-drifting embers, three rotating conic spotlights, and a
									pulsing radial-reveal headline.{" "}
									<span className="text-ice-3">Click the orb at the top</span> to flip
									the whole scene into gold.
								</p>
							</div>
							<div className="flex flex-wrap gap-7">
								<StatPill value="w·h / 6000" label="particle count" />
								<StatPill value="60 fps" label="rAF loop" />
								<StatPill value="1 toggle" label="invert filter" />
							</div>
						</div>
					</div>
				</section>

				{/* ---- Anatomy ------------------------------------------------ */}
				<section
					id="anatomy"
					className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8"
				>
					<Eyebrow index="01" label="Anatomy" />
					<h2 className="mt-5 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-ice-3 sm:text-4xl">
						Four layers, one canvas, zero dependencies.
					</h2>
					<p className="mt-4 max-w-xl text-[15px] leading-relaxed text-haze">
						The hero is pure DOM and Canvas 2D — no WebGL, no animation library.
						Everything below composes inside a single relatively-positioned shell.
					</p>

					<div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-2">
						{[
							{
								icon: Gauge,
								tag: "z-1",
								title: "The particle field",
								body: "Each ember is a 0.4px-wide rectangle drifting upward at a random speed, fading after a randomized delay and resetting to the bottom. Count scales with the canvas area divided by 6000, recalculated by a ResizeObserver.",
							},
							{
								icon: Layers,
								tag: "z-0",
								title: "Spotlights & accent lines",
								body: "Three blurred conic-gradient cones rotate on independent 14–21s loops, throwing a soft stage light. Behind them, faint hairline rules fade and scale in to frame the headline.",
							},
							{
								icon: Sparkles,
								tag: "--p",
								title: "Radial-reveal headline",
								body: "The title is gradient-clipped text. A registered @property --p animates a radial mask from 0% to 300%, sweeping a bright highlight across the letters every ten seconds.",
							},
							{
								icon: MousePointerClick,
								tag: "invert",
								title: "The gold-mode orb",
								body: "Clicking the glowing orb adds .gold-mode, which inverts and over-brightens the entire scene and drops two gold drop-shadows on the canvas — turning the cold night into warm gold with one filter.",
							},
						].map((card) => (
							<article
								key={card.title}
								className="group bg-panel p-7 transition-colors hover:bg-panel-2"
							>
								<div className="flex items-center justify-between">
									<span className="grid h-10 w-10 place-items-center rounded-lg border border-hairline bg-night-2 text-ice-2">
										<card.icon className="h-4.5 w-4.5" />
									</span>
									<span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold/80">
										{card.tag}
									</span>
								</div>
								<h3 className="mt-5 font-display text-lg font-medium text-ice-3">
									{card.title}
								</h3>
								<p className="mt-2.5 text-[14px] leading-relaxed text-haze">
									{card.body}
								</p>
							</article>
						))}
					</div>
				</section>

				{/* ---- Playground --------------------------------------------- */}
				<section
					id="playground"
					className="scroll-mt-24 border-y border-hairline bg-night-2/60 py-24"
				>
					<div className="mx-auto max-w-6xl px-5 sm:px-8">
						<Eyebrow index="02" label="Playground" />
						<h2 className="mt-5 font-display text-3xl font-medium tracking-tight text-ice-3 sm:text-4xl">
							Drive the props, read the JSX.
						</h2>
						<p className="mt-4 max-w-xl text-[15px] leading-relaxed text-haze">
							Edit the headline and tagline, flip the palette, and the snippet below
							updates to exactly what you'd paste into your app. Changes apply to the
							hero at the top of the page too.
						</p>

						<div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.05fr]">
							{/* Controls */}
							<div className="space-y-7 rounded-xl border border-hairline bg-panel p-7">
								<label className="block">
									<span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
										title
									</span>
									<input
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										className="mt-2 w-full rounded-lg border border-hairline bg-night px-4 py-3 font-display text-lg text-ice-3 outline-none transition-colors focus:border-ice-2/50"
										placeholder="Gold Design"
									/>
								</label>

								<label className="block">
									<span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
										subtitle
									</span>
									<textarea
										value={subtitle}
										onChange={(e) => setSubtitle(e.target.value)}
										rows={2}
										className="mt-2 w-full resize-none rounded-lg border border-hairline bg-night px-4 py-3 text-[14px] leading-relaxed text-ice/90 outline-none transition-colors focus:border-ice-2/50"
										placeholder={DEFAULT_SUBTITLE}
									/>
									<span className="mt-1.5 block font-mono text-[10.5px] text-muted">
										newline (↵) becomes a &lt;br /&gt;
									</span>
								</label>

								<div className="flex items-center justify-between rounded-lg border border-hairline bg-night px-4 py-3.5">
									<div className="flex items-center gap-3">
										{gold ? (
											<Sun className="h-4.5 w-4.5 text-gold" />
										) : (
											<Moon className="h-4.5 w-4.5 text-ice-2" />
										)}
										<div>
											<p className="font-display text-[15px] text-ice-3">
												{gold ? "Gold palette" : "Night palette"}
											</p>
											<p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
												defaultGold = {String(gold)}
											</p>
										</div>
									</div>
									<button
										type="button"
										role="switch"
										aria-checked={gold}
										aria-label="Toggle gold mode"
										onClick={() => setGold((v) => !v)}
										className={cn(
											"relative h-7 w-12 rounded-full border transition-colors",
											gold
												? "border-gold/50 bg-gold/25"
												: "border-hairline bg-panel-2",
										)}
									>
										<span
											className={cn(
												"absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full transition-all",
												gold
													? "left-[calc(100%-1.4rem)] bg-gold"
													: "left-1 bg-ice-2",
											)}
										/>
									</button>
								</div>

								<button
									type="button"
									onClick={() => {
										setTitle(DEFAULT_TITLE);
										setSubtitle(DEFAULT_SUBTITLE);
										setGold(false);
									}}
									className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted underline-offset-4 transition-colors hover:text-ice-2 hover:underline"
								>
									Reset to defaults
								</button>
							</div>

							{/* Generated code */}
							<div className="flex flex-col overflow-hidden rounded-xl border border-hairline bg-night">
								<div className="flex items-center justify-between border-b border-hairline px-5 py-3">
									<span className="font-mono text-[11.5px] text-muted">
										app/page.tsx
									</span>
									<button
										type="button"
										onClick={copyCode}
										className="inline-flex items-center gap-1.5 rounded-md border border-hairline px-2.5 py-1 font-mono text-[11px] text-ice-2 transition-colors hover:border-ice-2/40"
									>
										{copied ? (
											<>
												<Check className="h-3.5 w-3.5 text-gold" /> Copied
											</>
										) : (
											<>
												<Copy className="h-3.5 w-3.5" /> Copy
											</>
										)}
									</button>
								</div>
								<pre className="codeblock flex-1 overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed text-ice-3">
									<code>
										<span className="text-haze">{`import { ParticleHero } from "@/components/ui/particle-hero";`}</span>
										{"\n\n"}
										<span className="text-haze">{"export default function Page() {"}</span>
										{"\n  return "}
										<span className="whitespace-pre text-ice-2">{generatedCode}</span>
										{"\n"}
										<span className="text-haze">{"}"}</span>
									</code>
								</pre>
							</div>
						</div>
					</div>
				</section>

				{/* ---- Install ------------------------------------------------ */}
				<section
					id="install"
					className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8"
				>
					<Eyebrow index="03" label="Install" />
					<h2 className="mt-5 font-display text-3xl font-medium tracking-tight text-ice-3 sm:text-4xl">
						Drop it into any shadcn project.
					</h2>

					<div className="mt-12 grid gap-10 md:grid-cols-[0.85fr_1.15fr]">
						<ol className="space-y-7">
							{[
								{
									n: "1",
									t: "Set up the shadcn structure",
									d: "Tailwind CSS + TypeScript with the @ → ./src alias and a /components/ui folder — the canonical place shadcn primitives live so imports stay portable.",
								},
								{
									n: "2",
									t: "Add the component files",
									d: "Copy particle-hero.tsx and its co-located particle-hero.css into components/ui. The styled-jsx block from the source becomes a scoped stylesheet here.",
								},
								{
									n: "3",
									t: "Render it",
									d: "Import and drop <ParticleHero /> at the top of a page. No props are required; everything else is optional theming.",
								},
							].map((step) => (
								<li key={step.n} className="flex gap-4">
									<span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-hairline bg-panel font-mono text-[13px] text-gold">
										{step.n}
									</span>
									<div>
										<h3 className="font-display text-[16px] font-medium text-ice-3">
											{step.t}
										</h3>
										<p className="mt-1.5 text-[14px] leading-relaxed text-haze">
											{step.d}
										</p>
									</div>
								</li>
							))}
						</ol>

						<div className="space-y-4">
							<div className="overflow-hidden rounded-xl border border-hairline bg-night">
								<div className="border-b border-hairline px-5 py-3 font-mono text-[11.5px] text-muted">
									Terminal — dependencies
								</div>
								<pre className="codeblock overflow-x-auto px-5 py-4 font-mono text-[13px] text-ice-3">
									<code>
										<span className="text-gold">$</span> npm install lucide-react
										clsx tailwind-merge
									</code>
								</pre>
							</div>
							<div className="overflow-hidden rounded-xl border border-hairline bg-night">
								<div className="border-b border-hairline px-5 py-3 font-mono text-[11.5px] text-muted">
									Component files
								</div>
								<pre className="codeblock overflow-x-auto px-5 py-4 font-mono text-[13px] leading-relaxed text-ice-3">
									<code>
										src/
										{"\n"}
										<span className="text-haze">└─ </span>components/ui/
										{"\n   "}
										<span className="text-haze">├─ </span>
										<span className="text-ice-2">particle-hero.tsx</span>
										{"\n   "}
										<span className="text-haze">└─ </span>
										<span className="text-ice-2">particle-hero.css</span>
									</code>
								</pre>
							</div>
							<p className="rounded-xl border border-hairline bg-panel px-5 py-4 text-[13.5px] leading-relaxed text-haze">
								The orb toggles a single{" "}
								<code className="font-mono text-ice-2">.gold-mode</code> class — no theme
								provider, no context. State lives in one{" "}
								<code className="font-mono text-ice-2">useState</code> inside the
								component.
							</p>
						</div>
					</div>
				</section>
			</main>

			{/* ---- Footer ----------------------------------------------------- */}
			<footer className="border-t border-hairline">
				<div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
					<div className="flex items-center gap-2.5">
						<span className="grid h-6 w-6 place-items-center rounded border border-hairline bg-panel">
							<Sparkles className="h-3 w-3 text-ice-2" />
						</span>
						<span className="font-display text-[14px] text-ice-3">Dalim</span>
						<span className="font-mono text-[11px] text-muted">— Particle Hero</span>
					</div>
					<p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
						React · Tailwind · Canvas 2D · shadcn
					</p>
				</div>
			</footer>
		</div>
	);
}
