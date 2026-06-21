import {
	Droplets,
	HeartHandshake,
	Leaf,
	type LucideIcon,
	Recycle,
	Sprout,
	Sun,
} from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { features } from "../lib/content";
import { Blob } from "./Blob";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const icons: Record<string, LucideIcon> = {
	Sprout,
	Sun,
	Droplets,
	Leaf,
	Recycle,
	HeartHandshake,
};

// Six asymmetric corner patterns the cards cycle through, mixing big organic
// corner curves with the standard 2rem radius so the grid never reads
// mechanically uniform.
const cardShapes = [
	"rounded-[2rem] rounded-tl-[4.5rem]",
	"rounded-[2rem] rounded-br-[4.5rem]",
	"rounded-[2rem] rounded-tr-[5rem]",
	"rounded-[2rem] rounded-bl-[5rem]",
	"rounded-[2rem] rounded-tr-[4rem] rounded-bl-[4rem]",
	"rounded-[2rem] rounded-tl-[4rem] rounded-br-[4rem]",
];

export function Features() {
	const reduced = useReducedMotion();
	return (
		<section
			id="features"
			className="relative overflow-hidden px-4 py-32 sm:px-6 lg:px-8"
		>
			<Blob
				shape={1}
				color="bg-accent/40"
				className="-right-32 top-20 h-[24rem] w-[24rem]"
				animate={!reduced}
			/>
			<Blob
				shape={3}
				color="bg-primary/10"
				className="-left-28 bottom-10 h-80 w-80"
				animate={!reduced}
			/>

			<div className="relative mx-auto max-w-7xl">
				<SectionHeading
					eyebrow="What's in the tin"
					title={
						<>
							Small hands, slow methods,{" "}
							<span className="italic text-primary">honest plants.</span>
						</>
					}
					intro="Everything we make answers to one rule: there are no straight lines in nature. From the foraging to the folding of the wrapper, every step is shaped by hand."
				/>

				<div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{features.map((f, i) => {
						const Icon = icons[f.icon] ?? Leaf;
						return (
							<Reveal
								key={f.title}
								delay={(i % 3) * 0.1}
								className="h-full"
								as="div"
							>
								<article
									className={`group h-full border border-border/50 bg-card p-8 shadow-soft transition-all duration-500 ease-organic hover:-translate-y-1.5 hover:shadow-soft-lg ${cardShapes[i % cardShapes.length]}`}
								>
									{/* icon container fills to solid moss on hover, icon turns white */}
									<span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors duration-500 ease-organic group-hover:bg-primary group-hover:text-primary-foreground">
										<Icon size={28} strokeWidth={2} />
									</span>
									<h3 className="mt-6 text-2xl font-semibold text-foreground">
										{f.title}
									</h3>
									<p className="mt-3 text-base leading-relaxed text-muted-foreground">
										{f.body}
									</p>
								</article>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
