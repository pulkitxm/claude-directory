import type { CSSProperties } from "react";
import { Check, Shapes, Feather, Sparkles, ArrowRight } from "lucide-react";
import {
	Shell,
	Eyebrow,
	ButtonLink,
	Reveal,
	IconOrb,
	display,
} from "./primitives";

/* A 50/50 split. Left: copy + benefit pills that lift on hover. Right: an
   ABSTRACT 3D composition of nested clay shapes (a recessed tray cradling a
   stack of convex tablets) — the system's "product detail" pattern, no image.
   Stacks vertically on mobile, side-by-side on desktop. */

const BENEFITS = [
	{
		icon: <Shapes size={22} />,
		hue: "violet" as const,
		title: "Drop-in primitives",
		body: "Button, Card, Input, orbs and blobs ship pre-molded. Compose, don't re-style.",
	},
	{
		icon: <Feather size={22} />,
		hue: "sky" as const,
		title: "Featherweight motion",
		body: "Pure CSS keyframes and transforms — buttery on mobile, with a reduced-motion off-switch.",
	},
	{
		icon: <Sparkles size={22} />,
		hue: "pink" as const,
		title: "Tokens, not guesses",
		body: "One @theme block holds the palette, fonts, radii and shadow stacks. Change once, ripple everywhere.",
	},
];

export function Benefits() {
	return (
		<section id="benefits" className="py-16 sm:py-24">
			<Shell>
				<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
					{/* ---- Copy + pills ---- */}
					<Reveal>
						<div>
							<Eyebrow>Why clay</Eyebrow>
							<h2
								style={display}
								className="mt-4 text-3xl font-extrabold tracking-tight text-clay-foreground sm:text-4xl md:text-5xl"
							>
								Warmth and depth,{" "}
								<span className="clay-text-gradient">without the weight.</span>
							</h2>
							<p className="mt-5 max-w-xl text-lg leading-relaxed text-clay-muted">
								Most "soft UI" feels like flat vector art. Claymakers commits to
								the bit — real multi-layer lighting that makes the screen feel
								like a tray of premium silicone toys.
							</p>

							<ul className="mt-8 flex flex-col gap-4">
								{BENEFITS.map((b, i) => (
									<li
										key={b.title}
										className="clay-reveal flex items-start gap-4 rounded-[24px] bg-clay-cardBg p-4 shadow-clay-card backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-clay-card-hover"
										data-shown="true"
										style={{ animationDelay: `${i * 90}ms` }}
									>
										<IconOrb hue={b.hue} size="sm">
											{b.icon}
										</IconOrb>
										<div>
											<h3
												style={display}
												className="text-lg font-bold tracking-tight text-clay-foreground"
											>
												{b.title}
											</h3>
											<p className="mt-1 text-sm leading-relaxed text-clay-muted">
												{b.body}
											</p>
										</div>
									</li>
								))}
							</ul>

							<ButtonLink href="#pricing" className="mt-8">
								Get the kit
								<ArrowRight size={18} />
							</ButtonLink>
						</div>
					</Reveal>

					{/* ---- Abstract clay composition ---- */}
					<Reveal delay={120}>
						<BenefitComposition />
					</Reveal>
				</div>
			</Shell>
		</section>
	);
}

function tablet(hue: string, tint: string): CSSProperties {
	return {
		backgroundImage: hue,
		// @ts-expect-error custom prop for the tinted orb shadow
		"--orb": tint,
	};
}

function BenefitComposition() {
	return (
		<div className="relative mx-auto aspect-[5/4] w-full max-w-[520px]">
			{/* recessed tray */}
			<div className="absolute inset-0 rounded-[52px] clay-tray shadow-clay-deep" />

			{/* a fanned stack of convex clay tablets */}
			<div
				className="absolute left-[14%] top-[18%] h-[36%] w-[58%] -rotate-6 rounded-[28px] shadow-clay-orb"
				style={tablet(
					"linear-gradient(135deg,#7dd3fc,#0284c7)",
					"rgba(2,132,199,0.35)",
				)}
			/>
			<div
				className="absolute left-[24%] top-[30%] h-[36%] w-[58%] rotate-3 rounded-[28px] shadow-clay-orb"
				style={tablet(
					"linear-gradient(135deg,#f9a8d4,#db2777)",
					"rgba(219,39,119,0.35)",
				)}
			/>
			<div
				className="absolute left-[19%] top-[42%] h-[36%] w-[58%] -rotate-2 rounded-[28px] shadow-clay-orb"
				style={tablet(
					"linear-gradient(135deg,#c4b5fd,#7c3aed)",
					"rgba(124,58,237,0.38)",
				)}
			>
				<div className="flex h-full items-center justify-between px-6 text-white">
					<span style={display} className="text-lg font-black">
						clay-card
					</span>
					<span className="grid h-9 w-9 place-items-center rounded-full bg-white/25">
						<Check size={18} strokeWidth={3} />
					</span>
				</div>
			</div>

			{/* floating satellite orbs */}
			<div
				className="absolute -right-3 top-6 h-16 w-16 animate-clay-float rounded-full shadow-clay-orb"
				style={tablet(
					"linear-gradient(135deg,#fcd34d,#d97706)",
					"rgba(217,119,6,0.4)",
				)}
			/>
			<div
				className="animation-delay-2000 absolute -bottom-3 left-8 h-12 w-12 animate-clay-float-delayed rounded-full shadow-clay-orb"
				style={tablet(
					"linear-gradient(135deg,#6ee7b7,#059669)",
					"rgba(5,150,105,0.4)",
				)}
			/>
		</div>
	);
}
