import { motion } from "framer-motion";
import { Layers, PackageOpen, Smartphone, Wand2 } from "lucide-react";

const FEATURES = [
	{
		icon: Layers,
		title: "Layered geometric shapes",
		body: "Five blurred, gradient-filled pills drift on independent easing curves for an organic, never-looping parallax.",
		accent: "from-indigo-500/20",
	},
	{
		icon: Wand2,
		title: "Gradient headline type",
		body: "The second title line is painted with a clip-path text gradient — indigo through white to rose — set straight from props.",
		accent: "from-rose-500/20",
	},
	{
		icon: Smartphone,
		title: "Fully responsive",
		body: "Type scales from 4xl on mobile to 8xl on desktop, and every shape repositions with md: breakpoints. Nothing clips.",
		accent: "from-violet-500/20",
	},
	{
		icon: PackageOpen,
		title: "Drop-in, zero config",
		body: "One file in @/components/ui, the cn helper in @/lib/utils, and framer-motion + lucide-react. No providers required.",
		accent: "from-cyan-500/20",
	},
];

export default function Features() {
	return (
		<section
			id="features"
			className="relative border-t border-white/[0.06] bg-[#030303] py-24 md:py-32"
		>
			<div className="mx-auto max-w-6xl px-4 md:px-6">
				<div className="mb-14 max-w-2xl">
					<h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
						Built for the fold.
					</h2>
					<p className="mt-4 text-pretty text-white/45">
						Everything the hero needs to make a first impression — and nothing
						it doesn&apos;t. Pure CSS gradients and motion, no image payload.
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{FEATURES.map((feature, i) => (
						<motion.article
							key={feature.title}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-60px" }}
							transition={{ duration: 0.6, delay: i * 0.08 }}
							className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-white/[0.16]"
						>
							<div
								className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${feature.accent} to-transparent opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
							/>
							<div className="relative">
								<span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.1] bg-white/[0.04] text-white/85">
									<feature.icon className="h-5 w-5" strokeWidth={1.5} />
								</span>
								<h3 className="mt-5 text-lg font-medium text-white">
									{feature.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-white/45">
									{feature.body}
								</p>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
