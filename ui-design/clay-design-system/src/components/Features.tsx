import type { ReactNode } from "react";
import {
	Layers,
	Wand2,
	Fingerprint,
	Palette,
	Boxes,
	Gauge,
	Check,
} from "lucide-react";
import {
	Card,
	Shell,
	SectionHeading,
	IconOrb,
	Reveal,
	display,
	type OrbHue,
} from "./primitives";

/* The Bento feature grid — the centerpiece of the card system. A large hero
   card (col-span-2 row-span-2) anchors the asymmetric layout; the rest are
   standard clay cards with varied gradient icon orbs. Single column on mobile
   → bento on desktop. Every card floats up on hover. */

function FeatureCard({
	hue,
	icon,
	title,
	children,
	className = "",
	scaleOnHover = false,
}: {
	hue: OrbHue;
	icon: ReactNode;
	title: string;
	children: ReactNode;
	className?: string;
	scaleOnHover?: boolean;
}) {
	return (
		<Card
			as="article"
			className={`${className} ${scaleOnHover ? "hover:scale-[1.02]" : ""}`}
		>
			<IconOrb hue={hue}>{icon}</IconOrb>
			<h3
				style={display}
				className="mt-5 text-xl font-extrabold tracking-tight text-clay-foreground sm:text-2xl"
			>
				{title}
			</h3>
			<p className="mt-2.5 text-base leading-relaxed text-clay-muted">
				{children}
			</p>
		</Card>
	);
}

export function Features() {
	return (
		<section id="features" className="py-16 sm:py-24">
			<Shell>
				<SectionHeading
					eyebrow="The toolkit"
					title="Everything molded from one material"
					lead="A complete component kit where the physics of clay — convex bulges, concave presses, and zero-gravity float — are baked into every primitive."
				/>

				<div className="mt-14 grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{/* HERO FEATURE CARD — spans 2x2 on desktop, with a peeking panel */}
					<Reveal className="md:col-span-2 md:row-span-2" delay={0}>
						<Card as="article" className="h-full hover:scale-[1.02] sm:p-10">
							<IconOrb hue="violet" size="lg" round>
								<Layers size={36} strokeWidth={1.8} />
							</IconOrb>
							<h3
								style={display}
								className="mt-6 text-3xl font-black tracking-tight text-clay-foreground sm:text-4xl"
							>
								4-layer shadow stacks
							</h3>
							<p className="mt-3 max-w-md text-lg leading-relaxed text-clay-muted">
								The engine behind the whole world. Outer colored drop, top-left
								highlight, inner bounce light, and an inner rim — every surface
								gets all four, so clay reads as dense and physical instead of a
								flat decoration.
							</p>

							{/* "peeking" panel that emerges from the card bottom */}
							<div className="relative mt-auto pt-10">
								<div className="-mx-6 -mb-6 rounded-[24px] bg-white/70 p-5 shadow-clay-button-soft backdrop-blur-xl sm:-mx-10 sm:-mb-10">
									<div className="flex flex-wrap items-center gap-2.5">
										{[
											"Deep clay",
											"Clay card",
											"Clay button",
											"Clay pressed",
										].map((label, i) => (
											<span
												key={label}
												style={display}
												className="inline-flex items-center gap-1.5 rounded-full bg-clay-recess px-3.5 py-1.5 text-xs font-bold text-clay-foreground shadow-clay-pressed-sm"
											>
												<span
													className="h-2 w-2 rounded-full"
													style={{
														background: [
															"#7c3aed",
															"#db2777",
															"#0ea5e9",
															"#10b981",
														][i],
													}}
												/>
												{label}
											</span>
										))}
									</div>
								</div>
							</div>
						</Card>
					</Reveal>

					<Reveal delay={80}>
						<FeatureCard
							hue="pink"
							icon={<Fingerprint size={28} />}
							title="Squish-on-press"
							className="h-full"
						>
							Buttons scale to 0.92 and flip to a recessed shadow when clicked —
							a physical compression you feel, not just a color change.
						</FeatureCard>
					</Reveal>

					<Reveal delay={160}>
						<FeatureCard
							hue="sky"
							icon={<Wand2 size={28} />}
							title="Zero-gravity float"
							className="h-full"
						>
							Cards lift toward you on hover; background blobs drift on two
							axes. Nothing is statically stuck to the grid — it all breathes.
						</FeatureCard>
					</Reveal>

					<Reveal delay={240}>
						<FeatureCard
							hue="emerald"
							icon={<Palette size={28} />}
							title="Candy-shop palette"
							className="h-full"
						>
							Vivid violet, hot pink, sky, emerald and amber — saturated joy,
							kept readable with a strict charcoal/lavender-gray text floor.
						</FeatureCard>
					</Reveal>

					<Reveal delay={320}>
						<FeatureCard
							hue="amber"
							icon={<Boxes size={28} />}
							title="Super-rounded only"
							className="h-full"
						>
							Zero sharp corners anywhere. Radii run 20px → 60px, nested 8px
							apart, so safety and approachability are felt before they're read.
						</FeatureCard>
					</Reveal>

					{/* Wide card spanning 2 cols on the bottom row (desktop) */}
					<Reveal className="md:col-span-2" delay={400}>
						<Card as="article" className="h-full hover:scale-[1.01] sm:p-9">
							<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
								<div className="flex-1">
									<IconOrb hue="indigo">
										<Gauge size={28} />
									</IconOrb>
									<h3
										style={display}
										className="mt-5 text-xl font-extrabold tracking-tight text-clay-foreground sm:text-2xl"
									>
										Accessible by construction
									</h3>
									<p className="mt-2.5 max-w-md text-base leading-relaxed text-clay-muted">
										WCAG-AA contrast, 44px+ tap targets, visible focus rings,
										and a full{" "}
										<span className="font-bold">prefers-reduced-motion</span>{" "}
										fallback that stills the entire world.
									</p>
								</div>
								<ul className="grid shrink-0 gap-2.5">
									{[
										"WCAG-AA text contrast",
										"44px minimum targets",
										"Reduced-motion safe",
									].map((item) => (
										<li
											key={item}
											className="flex items-center gap-2.5 text-sm font-semibold text-clay-foreground"
										>
											<span className="grid h-6 w-6 place-items-center rounded-full bg-clay-emerald/15 text-clay-emerald">
												<Check size={14} strokeWidth={3} />
											</span>
											{item}
										</li>
									))}
								</ul>
							</div>
						</Card>
					</Reveal>
				</div>
			</Shell>
		</section>
	);
}
