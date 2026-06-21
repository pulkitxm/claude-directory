import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface Testimonial {
	quote: string;
	name: string;
	role: string;
	initials: string;
	feature?: boolean;
}

const TESTIMONIALS: Testimonial[] = [
	{
		quote:
			"We cut a full respin off our last sensor board. The live DRC caught an acid trap and an impedance miss that would have cost us three weeks and a fab run.",
		name: "Priya Raman",
		role: "Lead EE, Cobalt Sensors",
		initials: "PR",
		feature: true,
	},
	{
		quote:
			"Schematic-to-layout sync is the thing I never knew I needed. No more chasing net mismatches at 1am before tape-out.",
		name: "Marcus Vela",
		role: "Hardware founder, Driftwood IoT",
		initials: "MV",
	},
	{
		quote:
			"Ordering assembled boards from inside the editor turned a two-day procurement chore into a coffee break.",
		name: "Lena Osei",
		role: "Ops, Northbridge Labs",
		initials: "LO",
	},
	{
		quote:
			"The push-and-shove router actually respects my rules. It feels like pair-routing with someone who never gets tired.",
		name: "Tomás Iglesias",
		role: "Sr. PCB designer, Atlas Avionics",
		initials: "TI",
	},
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
	return (
		<section
			aria-label="What hardware teams say"
			className="relative px-5 py-24 sm:py-32"
		>
			<div className="mx-auto max-w-6xl">
				<SectionLabel designator="C7" label="Field reports" />
				<motion.h2
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.6, ease }}
					className="mt-5 max-w-xl text-balance font-display text-3xl font-bold leading-tight tracking-tightest text-silk sm:text-[2.6rem]"
				>
					Trusted on boards that have to work the first time.
				</motion.h2>

				<div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
					{TESTIMONIALS.map((t, i) => (
						<motion.figure
							key={t.name}
							initial={{ opacity: 0, y: 22 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.55, ease, delay: (i % 2) * 0.08 }}
							className={cn(
								"relative flex flex-col rounded-2xl border p-6 sm:p-7",
								t.feature
									? "border-copper/30 bg-gradient-to-br from-copper/[0.07] to-substrate-800/40 md:col-span-2"
									: "border-substrate-600/70 bg-substrate-800/40",
							)}
						>
							<Quote
								className={cn(
									"h-6 w-6",
									t.feature ? "text-copper" : "text-silk-faint",
								)}
								strokeWidth={1.5}
							/>
							<blockquote
								className={cn(
									"mt-4 text-pretty leading-relaxed text-silk",
									t.feature
										? "text-xl sm:text-2xl font-display tracking-tight"
										: "text-base",
								)}
							>
								{t.quote}
							</blockquote>
							<figcaption className="mt-6 flex items-center gap-3">
								<span className="grid h-10 w-10 place-items-center rounded-full border border-copper/40 bg-substrate-900 font-mono text-xs font-semibold text-copper">
									{t.initials}
								</span>
								<span>
									<span className="block text-sm font-semibold text-silk">
										{t.name}
									</span>
									<span className="block text-xs text-silk-faint">
										{t.role}
									</span>
								</span>
							</figcaption>
						</motion.figure>
					))}
				</div>
			</div>
		</section>
	);
}
