import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import {
	Section,
	Shell,
	Eyebrow,
	Card,
	Reveal,
	RevealGroup,
} from "./primitives";
import { TESTIMONIALS } from "../lib/content";
import { fadeUp } from "../lib/motion";

/* Social proof — three elevated quote cards with gradient avatars and a 5-star
   rating row. Cards lift on hover like the rest of the system. */
export function Testimonials() {
	return (
		<Section className="overflow-hidden">
			<Shell>
				<Reveal className="mx-auto max-w-2xl text-center">
					<Eyebrow icon={Star}>Loved by operators</Eyebrow>
					<h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
						Teams don't just use Northwind.{" "}
						<span className="text-gradient">They rely on it.</span>
					</h2>
				</Reveal>

				<RevealGroup className="mt-14 grid gap-6 md:grid-cols-3" stag={0.1}>
					{TESTIMONIALS.map((t) => (
						<motion.div key={t.name} variants={fadeUp}>
							<Card className="flex h-full flex-col p-7">
								<Quote className="h-8 w-8 text-indigo-200" aria-hidden="true" />
								<div
									className="mt-4 flex gap-0.5 text-amber-400"
									aria-label="Rated 5 out of 5"
								>
									{Array.from({ length: 5 }).map((_, i) => (
										<Star
											key={i}
											className="h-4 w-4 fill-current"
											aria-hidden="true"
										/>
									))}
								</div>
								<blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-slate-700">
									“{t.quote}”
								</blockquote>
								<figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
									<span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white">
										{t.initials}
									</span>
									<span>
										<span className="block text-sm font-bold text-slate-900">
											{t.name}
										</span>
										<span className="block text-xs text-slate-500">
											{t.role}
										</span>
									</span>
								</figcaption>
							</Card>
						</motion.div>
					))}
				</RevealGroup>
			</Shell>
		</Section>
	);
}
