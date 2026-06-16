import {
	ArrowRight,
	Sparkles,
	Heart,
	Star,
	Layers,
	Play,
} from "lucide-react";
import { ButtonLink, Shell, Badge, ClayShape, display } from "./primitives";

/* The hero. A big glass-clay "tray" container (rounded-[48px]+) cradled in a
   field of orbiting, floating clay shapes. Headline uses the multi-stop
   gradient text (kept large for readability). CTAs stack on mobile. The right
   side is an ABSTRACT 3D COMPOSITION of nested clay shapes — not an image. */
export function Hero() {
	return (
		<section id="top" className="relative overflow-hidden pb-10 pt-32 sm:pt-40">
			{/* Orbiting decorative shapes (hidden on small screens to keep it clean) */}
			<ClayShape
				hue="amber"
				className="left-[6%] top-[22%] hidden h-16 w-16 animate-clay-float-slow lg:block"
			/>
			<ClayShape
				hue="pink"
				round={false}
				className="right-[7%] top-[16%] hidden h-20 w-20 rotate-12 animate-clay-float lg:block"
			/>
			<ClayShape
				hue="sky"
				className="bottom-[12%] left-[3%] hidden h-12 w-12 animate-clay-float-delayed lg:block"
			/>

			<Shell>
				<div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
					{/* ---- Copy ---- */}
					<div className="flex flex-col items-center text-center lg:items-start lg:text-left">
						<div className="clay-reveal" data-shown="true">
							<Badge tone="violet">
								<Sparkles size={15} />
								High-Fidelity Claymorphism
							</Badge>
						</div>

						<h1
							style={display}
							className="clay-reveal mt-6 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
							data-shown="true"
						>
							<span className="clay-text-gradient">Interfaces</span>
							<br />
							you can almost
							<br />
							<span className="clay-text-gradient">squish.</span>
						</h1>

						<p
							className="clay-reveal mt-6 max-w-xl text-lg leading-relaxed text-clay-muted md:text-xl"
							data-shown="true"
						>
							Claymakers is a tactile design system built from premium digital
							clay — 4-layer shadow stacks, candy-shop color, and bouncy physics
							that make every button beg to be pressed.
						</p>

						<div
							className="clay-reveal mt-9 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center"
							data-shown="true"
						>
							<ButtonLink href="#cta" size="lg" className="w-full sm:w-auto">
								Start molding
								<ArrowRight size={20} />
							</ButtonLink>
							<ButtonLink
								href="#showcase"
								variant="secondary"
								size="lg"
								className="w-full sm:w-auto"
							>
								<Play size={18} className="text-clay-accent" />
								See it move
							</ButtonLink>
						</div>

						{/* Tiny trust row */}
						<div
							className="clay-reveal mt-9 flex items-center gap-4"
							data-shown="true"
						>
							<div className="flex -space-x-3">
								{(["violet", "pink", "sky", "emerald"] as const).map((h, i) => (
									<span
										key={h}
										className="grid h-10 w-10 place-items-center rounded-full text-white shadow-clay-orb ring-4 ring-clay-canvas"
										style={{
											backgroundImage: [
												"linear-gradient(135deg,#c4b5fd,#7c3aed)",
												"linear-gradient(135deg,#f9a8d4,#db2777)",
												"linear-gradient(135deg,#7dd3fc,#0284c7)",
												"linear-gradient(135deg,#6ee7b7,#059669)",
											][i],
										}}
									>
										<Heart size={14} fill="currentColor" />
									</span>
								))}
							</div>
							<div className="text-left">
								<div
									style={display}
									className="flex items-center gap-1 text-sm font-extrabold text-clay-foreground"
								>
									<Star size={14} className="text-clay-amber" fill="currentColor" />
									4.9/5 — loved by 12,000+ makers
								</div>
								<div className="text-xs font-medium text-clay-muted">
									Trusted across product, design & no-code teams
								</div>
							</div>
						</div>
					</div>

					{/* ---- Abstract 3D clay composition ---- */}
					<HeroComposition />
				</div>
			</Shell>
		</section>
	);
}

/* A nested-clay composition: a recessed tray cradling a big breathing orb, with
   smaller convex orbs floating in front. Pure shapes — the system's "abstract
   3D composition" pattern instead of a stock image. */
function HeroComposition() {
	return (
		<div
			className="clay-reveal relative mx-auto aspect-square w-full max-w-[480px]"
			data-shown="true"
		>
			{/* The recessed tray */}
			<div className="absolute inset-0 rounded-[56px] clay-tray shadow-clay-deep" />

			{/* Big central breathing orb */}
			<div className="absolute inset-[18%] animate-clay-breathe">
				<div
					className="grid h-full w-full place-items-center rounded-full text-white shadow-clay-orb"
					style={{
						backgroundImage: "linear-gradient(140deg,#c4b5fd,#7c3aed 70%)",
						// @ts-expect-error custom prop for the tinted orb shadow
						"--orb": "rgba(124,58,237,0.45)",
					}}
				>
					<Layers size={72} strokeWidth={1.6} className="drop-shadow" />
				</div>
			</div>

			{/* Floating satellite orbs */}
			<div
				className="absolute -right-2 top-6 h-24 w-24 animate-clay-float rounded-[28px] shadow-clay-orb"
				style={{
					backgroundImage: "linear-gradient(135deg,#f9a8d4,#db2777)",
					// @ts-expect-error custom prop for the tinted orb shadow
					"--orb": "rgba(219,39,119,0.4)",
				}}
			/>
			<div
				className="animation-delay-2000 absolute -left-3 bottom-10 h-20 w-20 animate-clay-float-delayed rounded-full shadow-clay-orb"
				style={{
					backgroundImage: "linear-gradient(135deg,#7dd3fc,#0284c7)",
					// @ts-expect-error custom prop for the tinted orb shadow
					"--orb": "rgba(2,132,199,0.4)",
				}}
			/>
			<div
				className="animation-delay-4000 absolute bottom-2 right-10 h-14 w-14 animate-clay-float rounded-full shadow-clay-orb"
				style={{
					backgroundImage: "linear-gradient(135deg,#6ee7b7,#059669)",
					// @ts-expect-error custom prop for the tinted orb shadow
					"--orb": "rgba(5,150,105,0.4)",
				}}
			/>

			{/* A little floating "pressed" status chip peeking in */}
			<div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 shadow-clay-button-soft backdrop-blur-xl">
				<span className="h-2.5 w-2.5 rounded-full bg-clay-emerald" />
				<span
					style={display}
					className="whitespace-nowrap text-sm font-bold text-clay-foreground"
				>
					Squish-ready
				</span>
			</div>
		</div>
	);
}
