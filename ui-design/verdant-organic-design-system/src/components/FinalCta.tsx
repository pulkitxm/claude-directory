import { ArrowRight, Check, Leaf } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

/**
 * Closing call-to-action on a warm terracotta field (the design system's
 * clay-toned "varied section background"). Intimate max-w-5xl card with a
 * pill-shaped, semi-transparent email capture whose focus ring is a soft moss
 * glow rather than a hard outline. Submitting swaps to a gentle confirmation.
 */
export function FinalCta() {
	const reduced = useReducedMotion();
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		if (!email.trim()) return;
		setSent(true);
	}

	return (
		<section className="relative overflow-hidden bg-secondary px-4 py-32 text-secondary-foreground sm:px-6 lg:px-8">
			<div className="grain-soft" />
			{/* organic blobs in the clay field */}
			<div
				aria-hidden
				className="pointer-events-none absolute -left-24 -top-10 h-96 w-96 rounded-full bg-white/10 blur-3xl"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -bottom-20 -right-16 h-[26rem] w-[26rem] rounded-full bg-primary/30 blur-3xl"
			/>
			{/* swaying leaf motif */}
			<Leaf
				aria-hidden
				size={120}
				className={`pointer-events-none absolute -right-4 top-10 text-white/10 ${reduced ? "" : "animate-sway"}`}
			/>

			<div className="relative mx-auto max-w-5xl text-center">
				<Reveal>
					<Eyebrow onDark icon={<Leaf size={13} />}>
						Join the slow mornings
					</Eyebrow>
				</Reveal>
				<Reveal delay={0.08}>
					<h2 className="mx-auto mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[1.05] text-secondary-foreground md:text-6xl">
						Let the seasons arrive at your door.
					</h2>
				</Reveal>
				<Reveal delay={0.14}>
					<p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-secondary-foreground/85">
						Subscribe for a hand-foraged blend each season, the year's rarest
						harvests first, and a tree planted in your name with every delivery.
					</p>
				</Reveal>

				<Reveal delay={0.2}>
					{sent ? (
						<div className="mx-auto mt-10 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/15 px-7 py-4 backdrop-blur-sm">
							<span className="grid h-9 w-9 place-items-center rounded-full bg-card text-primary">
								<Check size={20} strokeWidth={2.6} />
							</span>
							<p className="text-left font-semibold text-secondary-foreground">
								Welcome to the meadow. We&rsquo;ll write soon, slowly.
							</p>
						</div>
					) : (
						<form
							onSubmit={onSubmit}
							className="mx-auto mt-10 flex w-full max-w-lg flex-col gap-3 sm:flex-row"
						>
							<label htmlFor="cta-email" className="sr-only">
								Email address
							</label>
							<input
								id="cta-email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="you@stillmorning.com"
								className="h-14 flex-1 rounded-full border border-white/30 bg-white/20 px-6 text-base font-semibold text-secondary-foreground placeholder:text-secondary-foreground/60 backdrop-blur-sm transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
							/>
							<Button
								type="submit"
								size="lg"
								className="group bg-card text-foreground hover:bg-background"
							>
								Subscribe
								<ArrowRight
									size={18}
									className="transition-transform duration-300 ease-organic group-hover:translate-x-1"
								/>
							</Button>
						</form>
					)}
				</Reveal>

				<Reveal delay={0.28}>
					<p className="mt-5 text-sm font-semibold text-secondary-foreground/70">
						No spam, ever. Pause or leave with one click. Unsubscribing plants a
						tree too.
					</p>
				</Reveal>
			</div>
		</section>
	);
}
