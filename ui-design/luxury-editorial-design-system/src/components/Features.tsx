import { Overline, Emphasis, EditorialImage } from "./Primitives";
import { Button } from "./Button";
import { features } from "../data/content";

export function Features() {
	return (
		<section
			id="collections"
			className="relative border-t border-foreground/10 py-20 md:py-32"
		>
			<div className="mx-auto max-w-[1600px] px-8 md:px-16">
				{/* Intro — offset to column 2, drop cap on the lead paragraph */}
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
					<div className="lg:col-span-7 lg:col-start-2">
						<Overline>The House — On Making</Overline>
						<h2 className="mt-8 max-w-3xl font-serif text-4xl font-normal leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-7xl">
							Curated <Emphasis>Excellence</Emphasis>, kept deliberately small.
						</h2>
						<p className="dropcap mt-10 max-w-xl font-sans text-base leading-relaxed text-foreground md:text-lg">
							Three ateliers. A fixed roster of makers. No outsourcing, no
							shortcuts, and no season that exists only to sell the next one. We
							build a collection the way one builds a library — patiently, and
							with a long memory. Each line below is a discipline unto itself,
							and each refuses to be hurried.
						</p>
					</div>
				</div>

				{/* Feature rows — asymmetric, alternating side, offset column starts */}
				<div className="mt-20 flex flex-col gap-24 md:mt-28 md:gap-32">
					{features.map((f, i) => {
						const imageFirst = i % 2 === 0;
						return (
							<article
								key={f.index}
								className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16"
							>
								{/* Image */}
								<div
									className={[
										"lg:col-span-5",
										imageFirst
											? "lg:order-1 lg:col-start-2"
											: "lg:order-2 lg:col-start-7",
									].join(" ")}
								>
									<EditorialImage
										src={f.image}
										alt={f.alt}
										aspect="aspect-[3/4]"
										shadow="shadow-feature"
										verticalLabel={f.meta}
										labelSide={imageFirst ? "left" : "right"}
									/>
								</div>

								{/* Text */}
								<div
									className={[
										"lg:col-span-5",
										imageFirst
											? "lg:order-2 lg:col-start-8"
											: "lg:order-1 lg:col-start-2 lg:row-start-1",
									].join(" ")}
								>
									<span className="font-serif text-2xl italic text-muted-fg">
										— {f.index}
									</span>
									<h3 className="mt-4 font-serif text-3xl font-normal leading-[1] tracking-tight text-foreground md:text-5xl">
										{f.title.lead} <Emphasis>{f.title.emphasis}</Emphasis>
										{f.title.trail ? ` ${f.title.trail}` : ""}
									</h3>
									<p className="mt-6 max-w-md font-sans text-base leading-relaxed text-muted-fg">
										{f.body}
									</p>
									<div className="mt-8 flex items-center gap-3">
										<span aria-hidden className="h-px w-8 bg-foreground" />
										<span className="font-sans text-[10px] uppercase tracking-overline text-muted-fg">
											{f.meta}
										</span>
									</div>
									<div className="mt-8">
										<Button variant="link">Explore the line</Button>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
