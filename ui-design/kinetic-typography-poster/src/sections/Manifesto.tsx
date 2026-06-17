import { SectionLabel } from "../components/SectionLabel";
import { Reveal } from "../components/Reveal";
import { BackgroundNumber } from "../components/BackgroundNumber";

/**
 * The manifesto. An ultra-massive heading on the left, a quiet readable column
 * on the right, and a towering background number anchoring the depth layer.
 */
export function Manifesto() {
	return (
		<section
			id="program"
			className="relative overflow-hidden border-b-2 border-line py-24 md:py-32"
		>
			{/* Depth number */}
			<BackgroundNumber className="absolute -left-[3vw] bottom-0 leading-[0.7] text-muted/50 text-[34vw]">
				01
			</BackgroundNumber>

			<div className="relative z-10 mx-auto max-w-[95vw]">
				<SectionLabel index="01">The Manifesto</SectionLabel>

				<div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
					<div className="lg:col-span-7">
						<Reveal>
							<h2 className="font-bold uppercase leading-[0.85] tracking-tighter text-[clamp(2.5rem,8vw,6rem)]">
								Typography
								<br />
								Is The
								<br />
								<span className="text-acid">Structure.</span>
							</h2>
						</Reveal>
					</div>

					<div className="flex flex-col gap-8 lg:col-span-5 lg:pt-4">
						<Reveal delay={0.05}>
							<p className="text-lg font-medium leading-tight text-bone md:text-xl lg:text-2xl">
								Text is not decoration. Headline becomes hero, number becomes
								shape, motion becomes rhythm. We reject the static layout
								completely.
							</p>
						</Reveal>
						<Reveal delay={0.1}>
							<p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
								Where traditional design uses a 2× scale difference between
								headline and body, we use ten. Where others reach for a subtle
								shadow, we stay brutally flat — sharp borders, hard edges, a
								single acid accent. The page should scream, not whisper.
							</p>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
}
