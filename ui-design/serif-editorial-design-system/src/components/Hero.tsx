import { ArrowDown } from "lucide-react";
import { hero, brand, marquee } from "../data/content";
import { Button } from "./Button";
import { PlateVolumes } from "./Plates";

export function Hero() {
	return (
		<section
			id="top"
			className="relative z-10 overflow-hidden pb-10 pt-32 md:pt-40 lg:pt-44"
		>
			<div className="container-reading">
				{/* eyebrow */}
				<div className="mx-auto mb-10 flex max-w-md items-center justify-center gap-4 animate-fade-in">
					<span
						className="rule w-10 origin-right animate-rule-grow"
						aria-hidden
					/>
					<span className="small-caps text-accent">{hero.eyebrow}</span>
					<span
						className="rule w-10 origin-left animate-rule-grow"
						aria-hidden
					/>
				</div>

				{/* headline */}
				<h1
					className="mx-auto max-w-4xl text-center font-display leading-[1.04] tracking-[-0.02em] text-foreground"
					style={{ fontSize: "clamp(2.5rem, 7.5vw, 4.75rem)" }}
				>
					<span className="block animate-fade-up [animation-delay:80ms]">
						{hero.titleTop}
					</span>
					<span className="block animate-fade-up italic text-accent [animation-delay:200ms]">
						{hero.titleEmphasis}
					</span>
					<span className="block animate-fade-up [animation-delay:320ms]">
						{hero.titleBottom}
					</span>
				</h1>

				{/* lede */}
				<p className="mx-auto mt-9 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground animate-fade-up [animation-delay:440ms]">
					{hero.lede}
				</p>

				{/* CTAs */}
				<div className="mt-11 flex flex-col items-center justify-center gap-4 animate-fade-up [animation-delay:560ms] sm:flex-row">
					<Button
						href="#pricing"
						variant="primary"
						className="w-full sm:w-auto"
					>
						{hero.primaryCta}
					</Button>
					<Button
						href="#benefits"
						variant="outline"
						className="w-full sm:w-auto"
					>
						{hero.secondaryCta}
					</Button>
				</div>

				{/* hero plate with offset decorative frame */}
				<div className="relative mx-auto mt-20 max-w-3xl animate-fade-in [animation-delay:700ms]">
					<span
						aria-hidden
						className="absolute -left-4 -top-4 h-full w-full rounded-lg border border-accent/40 md:-left-6 md:-top-6"
					/>
					<span
						aria-hidden
						className="absolute -bottom-4 -right-4 h-full w-full rounded-lg border border-border md:-bottom-6 md:-right-6"
					/>
					<div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-lg">
						<PlateVolumes className="h-[clamp(320px,52vw,520px)] w-full" />
						{/* caption bar */}
						<div className="flex items-center justify-between border-t border-border px-5 py-3">
							<span className="small-caps text-muted-foreground">
								Plate I &mdash; The Standing Volumes
							</span>
							<span className="small-caps text-accent">{brand.est}</span>
						</div>
					</div>
				</div>

				{/* scroll hint */}
				<div className="mt-14 flex items-center justify-center gap-3 text-muted-foreground animate-fade-in [animation-delay:900ms]">
					<span className="rule w-8" aria-hidden />
					<span className="small-caps">{hero.scrollHint}</span>
					<ArrowDown
						size={14}
						className="animate-bounce text-accent"
						strokeWidth={1.6}
					/>
				</div>
			</div>

			{/* marquee strip */}
			<div className="mt-16 overflow-hidden border-y border-border py-5">
				<div className="flex w-max animate-marquee items-center gap-10 will-change-transform">
					{[...marquee, ...marquee].map((word, i) => (
						<span key={i} className="flex items-center gap-10">
							<span className="font-display text-xl italic text-foreground/80">
								{word}
							</span>
							<span className="text-accent" aria-hidden>
								&#10038;
							</span>
						</span>
					))}
				</div>
			</div>
		</section>
	);
}
