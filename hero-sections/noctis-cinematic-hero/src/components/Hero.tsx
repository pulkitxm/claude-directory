import Nav from "./Nav.tsx";
import Timecode from "./Timecode.tsx";

export default function Hero() {
	return (
		<section
			data-testid="hero"
			className="relative h-dvh min-h-[620px] overflow-hidden bg-ink text-bone"
		>
			{/* Atmosphere behind the stream — holds the frame while the video buffers. */}
			<div className="backdrop-aurora absolute inset-0" aria-hidden="true" />

			{/* Background video — implemented exactly as specified. */}
			<div aria-hidden="true">
				<video
					autoPlay
					loop
					muted
					playsInline
					className="absolute inset-0 w-full h-full object-cover z-0"
				>
					<source src="./assets/noctis-feature.mp4" type="video/mp4" />{" "}
				</video>
			</div>

			{/* Cinematic grade: vignette + legibility scrims. */}
			<div
				data-testid="vignette"
				className="vignette absolute inset-0 z-10"
				aria-hidden="true"
			/>

			{/* Film grain. */}
			<div
				className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
				aria-hidden="true"
			>
				<div data-testid="grain" className="film-grain" />
			</div>

			{/* Letterbox bars. */}
			<div
				data-testid="letterbox-top"
				className="letterbox-top absolute inset-x-0 top-0 z-40 h-5 bg-black md:h-8"
				aria-hidden="true"
			>
				<div className="absolute inset-x-0 bottom-0 h-px bg-champagne/15" />
			</div>
			<div
				data-testid="letterbox-bottom"
				className="letterbox-bottom absolute inset-x-0 bottom-0 z-40 h-5 bg-black md:h-8"
				aria-hidden="true"
			>
				<div className="absolute inset-x-0 top-0 h-px bg-champagne/15" />
			</div>

			{/* Viewfinder corner ticks. */}
			<div
				className="reveal-fade pointer-events-none absolute inset-x-5 top-11 bottom-11 z-30 hidden lg:block"
				style={{ animationDelay: "1.6s" }}
				aria-hidden="true"
			>
				<span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-champagne/40" />
				<span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-champagne/40" />
				<span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-champagne/40" />
				<span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-champagne/40" />
			</div>

			<Nav />

			{/* Side rails — film credit marginalia. */}
			<div
				data-testid="rail-left"
				className="reveal-fade absolute left-9 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
				style={{ animationDelay: "1.75s" }}
			>
				<p className="font-mono text-[0.58rem] font-light uppercase tracking-[0.42em] text-bone/45 [writing-mode:vertical-rl]">
					Feature Nº 03 — The Long Dark
				</p>
			</div>
			<div
				data-testid="rail-right"
				className="reveal-fade absolute right-9 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
				style={{ animationDelay: "1.75s" }}
			>
				<p className="font-mono text-[0.58rem] font-light uppercase tracking-[0.42em] text-bone/45 [writing-mode:vertical-rl]">
					World Premiere — Winter MMXXVI
				</p>
			</div>

			{/* Title card. */}
			<div className="absolute inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[1640px] px-6 pb-28 md:px-12 md:pb-36">
				<p
					className="reveal-tracking font-mono text-[0.6rem] font-light uppercase text-champagne md:text-[0.66rem]"
					style={{ animationDelay: "0.8s" }}
				>
					A Noctis Original Picture
				</p>

				<h1 className="mt-6 font-display leading-[0.94] tracking-[0.015em]">
					<span
						className="mask-line text-[clamp(3.4rem,10.5vw,9.75rem)]"
						style={{ animationDelay: "0.95s" }}
					>
						<span>Darkness,</span>
					</span>
					<span
						className="mask-line text-[clamp(3.4rem,10.5vw,9.75rem)]"
						style={{ animationDelay: "1.12s" }}
					>
						<span>
							<em className="font-serifit font-medium italic tracking-normal text-champagne">
								Composed.
							</em>
						</span>
					</span>
				</h1>

				<div className="mt-8 flex flex-col gap-10 md:mt-10 md:flex-row md:items-end md:justify-between">
					<p
						className="reveal-rise max-w-md font-serifit text-[1.18rem] font-normal leading-relaxed text-bone/75 md:text-[1.3rem]"
						style={{ animationDelay: "1.35s" }}
					>
						An independent picture house for the midnight hour — films graded in
						shadow, scored in silence, and cut to the rhythm of a held breath.
					</p>

					<div
						className="reveal-rise flex flex-wrap items-center gap-4"
						style={{ animationDelay: "1.5s" }}
					>
						<a
							href="#"
							className="cta-sheen group inline-flex items-center gap-3 bg-champagne px-8 py-4 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-ink transition-colors duration-500 hover:bg-bone"
						>
							<svg
								width="9"
								height="11"
								viewBox="0 0 9 11"
								fill="currentColor"
								aria-hidden="true"
								className="transition-transform duration-500 group-hover:translate-x-0.5"
							>
								<path d="M0 0L9 5.5L0 11V0Z" />
							</svg>
							Watch the Trailer
						</a>
						<a
							href="#"
							className="inline-flex items-center gap-3 border border-bone/25 px-8 py-4 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-bone/85 transition-all duration-500 hover:border-champagne hover:tracking-[0.36em] hover:text-champagne"
						>
							Explore the Films
						</a>
					</div>
				</div>

				<div
					className="rule-grow mt-12 hidden h-px bg-bone/15 md:block"
					style={{ animationDelay: "1.7s" }}
					aria-hidden="true"
				/>
			</div>

			{/* Bottom strip — projectionist's readout. */}
			<div
				data-testid="bottom-strip"
				className="reveal-rise absolute inset-x-0 bottom-8 z-30 md:bottom-12"
				style={{ animationDelay: "1.85s" }}
			>
				<div className="mx-auto flex w-full max-w-[1640px] items-center justify-between px-6 font-mono text-[0.58rem] font-light uppercase tracking-[0.26em] text-bone/50 md:px-12">
					<p className="flex items-center gap-3">
						<span className="text-champagne/80">TC</span>
						<Timecode />
						<span className="hidden text-bone/30 sm:inline">· Reel 03</span>
					</p>

					<div className="hidden items-center gap-3 md:flex">
						<span>Scroll for feature presentation</span>
						<span className="relative h-8 w-px overflow-hidden bg-bone/15">
							<span className="scroll-beam absolute inset-0 bg-champagne" />
						</span>
					</div>

					<p className="text-right">
						35MM <span className="text-bone/30">·</span> 2.39:1{" "}
						<span className="hidden sm:inline">
							<span className="text-bone/30">·</span> Dolby Atmos
						</span>
					</p>
				</div>
			</div>
		</section>
	);
}
