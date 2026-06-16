import { ArrowUpRight, Boxes } from "lucide-react";
import { motion } from "motion/react";
import {
	Section,
	Shell,
	Eyebrow,
	Card,
	IconTile,
	Reveal,
	RevealGroup,
	Blob,
} from "./primitives";
import { FEATURE_CARDS } from "../lib/content";
import { fadeUp } from "../lib/motion";

/* The compact 3-up feature grid. Cards lift on hover (the system's elevated-card
   behavior) and each tile carries a soft indigo icon chip. */
export function Features() {
	return (
		<Section id="platform" className="overflow-hidden">
			<Blob
				tone="indigo"
				className="left-1/2 top-0 h-80 w-80 -translate-x-1/2 opacity-40"
			/>
			<Shell>
				<Reveal className="mx-auto max-w-2xl text-center">
					<Eyebrow icon={Boxes}>Everything in one platform</Eyebrow>
					<h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
						One surface for your <span className="text-gradient">entire operation</span>
					</h2>
					<p className="mx-auto mt-5 max-w-xl text-lg text-slate-500">
						Stop stitching together scripts, spreadsheets, and a dozen disconnected
						tools. Northwind brings the whole workflow into one trusted, observable
						place.
					</p>
				</Reveal>

				<RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{FEATURE_CARDS.map((f) => (
						<motion.div key={f.title} variants={fadeUp} className="[perspective:1200px]">
							<Card className="group h-full p-7 transition-transform duration-300 hover:[transform:rotateY(4deg)]">
								<IconTile icon={f.icon} size="lg" />
								<h3 className="mt-5 text-xl font-bold text-slate-900">{f.title}</h3>
								<p className="mt-2.5 text-[0.9375rem] leading-relaxed text-slate-500">
									{f.body}
								</p>
								<span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
									Learn more
									<ArrowUpRight
										className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
										aria-hidden="true"
									/>
								</span>
							</Card>
						</motion.div>
					))}
				</RevealGroup>
			</Shell>
		</Section>
	);
}
