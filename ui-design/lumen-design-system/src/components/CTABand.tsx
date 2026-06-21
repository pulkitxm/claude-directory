import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

/**
 * A high-emphasis closing band: an elevated, accent-washed surface with its own
 * glow, demonstrating the CTA shadow language at full strength.
 */
export function CTABand() {
	return (
		<section className="container-page py-12 sm:py-16">
			<Reveal mode="scale">
				<div className="edge-hi relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-b from-accent/[0.12] to-white/[0.02] px-6 py-12 text-center shadow-[0_0_0_1px_rgba(94,106,210,0.25),0_20px_80px_rgba(94,106,210,0.18)] sm:px-12 sm:py-16">
					{/* localized glow pool */}
					<div
						aria-hidden
						className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px]"
					/>
					<div className="relative">
						<h2 className="text-grad mx-auto max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
							Ship interfaces that feel expensive
						</h2>
						<p className="mx-auto mt-4 max-w-md text-base text-fg-muted">
							Drop Lumen into any React app and inherit the depth, the glow, and
							the precision — for free.
						</p>
						<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<Button variant="primary" size="lg" href="#">
								Get started <ArrowRight size={16} />
							</Button>
							<Button variant="secondary" size="lg" href="#components">
								Read the docs
							</Button>
						</div>
					</div>
				</div>
			</Reveal>
		</section>
	);
}
