import { Blob, ButtonLink, Reveal, Shell } from "./primitives";
import { ArrowRight, PlayCircle, Sparkle, Star } from "./icons";

/* A compact preview of the app theming itself — a tonal "card" with a seed
   swatch row, a faux waveform and pill controls. It demonstrates the tonal
   surface system and pills inside the hero, not just around it. */
function ThemePreview() {
	const seeds = [
		"var(--color-md-primary)",
		"var(--color-md-tertiary)",
		"var(--color-md-secondary)",
		"var(--color-md-primary-container)",
		"var(--color-md-tertiary-container)",
	];
	return (
		<div className="card relative w-full overflow-hidden rounded-[var(--radius-md-2xl)] !bg-[var(--color-md-bg)] p-6 shadow-[var(--shadow-md-3)]">
			{/* header row */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-md-primary)] text-[var(--color-md-on-primary)]">
						<Sparkle size={18} />
					</span>
					<div className="leading-tight">
						<p className="text-sm font-medium text-[var(--color-md-on-bg)]">
							Today's palette
						</p>
						<p className="t-label-s text-[var(--color-md-on-variant)]">
							Seeded from your day
						</p>
					</div>
				</div>
				<span className="chip" aria-pressed="true">
					Live
				</span>
			</div>

			{/* extracted seed swatches */}
			<div className="mt-5 flex gap-2.5">
				{seeds.map((c, i) => (
					<span
						key={i}
						className="h-12 flex-1 rounded-2xl ring-1 ring-black/5 ring-inset"
						style={{ background: c }}
						aria-hidden
					/>
				))}
			</div>

			{/* tonal "now generating" tile with a faux equalizer */}
			<div className="mt-4 flex items-center gap-4 rounded-[var(--radius-md-md)] bg-[var(--color-md-primary-container)] p-4">
				<button
					type="button"
					className="btn btn-filled !h-12 !w-12 !px-0"
					aria-label="Play theme transition"
				>
					<PlayCircle size={24} />
				</button>
				<div className="flex h-10 flex-1 items-end gap-1" aria-hidden>
					{[7, 13, 9, 18, 12, 22, 16, 26, 14, 20, 10, 24, 8, 16].map((h, i) => (
						<span
							key={i}
							className="flex-1 rounded-full bg-[var(--color-md-primary)]"
							style={{ height: `${h * 1.4}px`, opacity: 0.35 + (h / 26) * 0.65 }}
						/>
					))}
				</div>
			</div>

			{/* meta row */}
			<div className="mt-4 flex items-center justify-between">
				<div className="flex items-center gap-1.5 text-[var(--color-md-tertiary)]">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star key={i} size={16} />
					))}
				</div>
				<p className="t-label-s text-[var(--color-md-on-variant)]">
					Contrast checked · AAA
				</p>
			</div>
		</div>
	);
}

export function Hero() {
	return (
		<section id="top" className="relative px-3 pt-4 sm:px-5">
			{/* The hero lives in a single architectural rounded-[48px] surface. */}
			<div className="relative mx-auto max-w-[80rem] overflow-hidden rounded-[28px] bg-[var(--color-md-container)] sm:rounded-[40px] lg:rounded-[var(--radius-md-3xl)]">
				{/* Atmosphere: layered organic blur shapes + radial gradient washes. */}
				<div
					aria-hidden
					className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_color-mix(in_srgb,var(--color-md-tertiary-container)_70%,transparent)_0%,_transparent_45%),radial-gradient(circle_at_bottom_left,_color-mix(in_srgb,var(--color-md-primary-container)_80%,transparent)_0%,_transparent_50%)]"
				/>
				<Blob
					float="a"
					className="-left-24 -top-24 h-96 w-96 bg-[var(--color-md-primary-container)] opacity-70"
				/>
				<Blob
					float="b"
					className="-right-28 top-10 h-[26rem] w-[26rem] bg-[var(--color-md-tertiary-container)] opacity-70"
				/>
				<Blob
					float="c"
					className="-bottom-32 left-1/3 h-80 w-80 bg-[var(--color-md-secondary-container)] opacity-60"
				/>

				<Shell className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
					{/* Copy column */}
					<div className="flex flex-col items-start gap-7">
						<Reveal>
							<span className="eyebrow">
								<Sparkle size={14} />
								Material Design 3 · Expressive
							</span>
						</Reveal>

						<Reveal delay={70}>
							<h1 className="t-display text-[var(--color-md-on-bg)]">
								Interfaces that feel{" "}
								<span className="relative whitespace-nowrap text-[var(--color-md-primary)]">
									personal
									<svg
										aria-hidden
										viewBox="0 0 320 24"
										className="absolute -bottom-2 left-0 h-3 w-full text-[var(--color-md-tertiary)]"
										preserveAspectRatio="none"
									>
										<path
											d="M3 17C70 7 250 5 317 13"
											fill="none"
											stroke="currentColor"
											strokeWidth="5"
											strokeLinecap="round"
										/>
									</svg>
								</span>{" "}
								again.
							</h1>
						</Reveal>

						<Reveal delay={130}>
							<p className="t-body-l max-w-xl text-[var(--color-md-on-variant)]">
								Lumi is a theming toolkit built on Material You. Seed one color
								and watch a whole tonal system bloom — soft surfaces, pill
								controls, and motion that feels alive. No more stark white
								dashboards.
							</p>
						</Reveal>

						<Reveal delay={190}>
							<div className="flex flex-wrap items-center gap-3">
								<ButtonLink href="#cta" variant="filled" size="lg">
									Start theming
									<ArrowRight size={20} />
								</ButtonLink>
								<ButtonLink href="#how" variant="tonal" size="lg">
									<PlayCircle size={20} />
									See how it works
								</ButtonLink>
							</div>
						</Reveal>

						<Reveal delay={250}>
							<div className="flex items-center gap-4 pt-2">
								<div className="flex -space-x-3">
									{[
										"var(--color-md-primary)",
										"var(--color-md-tertiary)",
										"var(--color-md-secondary)",
										"var(--color-md-primary-container)",
									].map((c, i) => (
										<span
											key={i}
											className="grid h-10 w-10 place-items-center rounded-full ring-3 ring-[var(--color-md-container)]"
											style={{ background: c }}
											aria-hidden
										/>
									))}
								</div>
								<p className="text-sm text-[var(--color-md-on-variant)]">
									<span className="font-medium text-[var(--color-md-on-bg)]">
										12,000+
									</span>{" "}
									designers ship with Lumi
								</p>
							</div>
						</Reveal>
					</div>

					{/* Preview column */}
					<Reveal delay={200} className="relative">
						<div className="relative mx-auto max-w-md">
							<ThemePreview />
						</div>
					</Reveal>
				</Shell>
			</div>
		</section>
	);
}
