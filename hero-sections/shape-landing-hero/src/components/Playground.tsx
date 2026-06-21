import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

type Field = {
	key: "badge" | "title1" | "title2";
	label: string;
	hint: string;
};

const FIELDS: Field[] = [
	{ key: "badge", label: "badge", hint: "Small pill above the headline" },
	{ key: "title1", label: "title1", hint: "First headline line (solid)" },
	{ key: "title2", label: "title2", hint: "Second line (gradient)" },
];

export default function Playground() {
	const [props, setProps] = useState({
		badge: "Kokonut UI",
		title1: "Elevate Your",
		title2: "Digital Vision",
	});

	const code = `<HeroGeometric
  badge="${props.badge}"
  title1="${props.title1}"
  title2="${props.title2}"
/>`;

	return (
		<section
			id="playground"
			className="relative border-t border-white/[0.06] bg-[#030303] py-24 md:py-32"
		>
			<div className="mx-auto max-w-6xl px-4 md:px-6">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs tracking-wide text-white/60">
						<Sparkles className="h-3 w-3 text-indigo-300" />
						Live props
					</span>
					<h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
						Three props. Infinite headlines.
					</h2>
					<p className="mt-4 text-pretty text-white/45">
						<code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-white/70">
							HeroGeometric
						</code>{" "}
						takes <span className="text-white/70">badge</span>,{" "}
						<span className="text-white/70">title1</span> and{" "}
						<span className="text-white/70">title2</span>. Edit them and watch
						the live preview update.
					</p>
				</div>

				<div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
					{/* Controls + generated code */}
					<div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
						<div className="space-y-5">
							{FIELDS.map((field) => (
								<label key={field.key} className="block">
									<span className="mb-1.5 flex items-baseline justify-between">
										<span className="font-mono text-sm text-indigo-200/90">
											{field.label}
										</span>
										<span className="text-[11px] text-white/35">
											{field.hint}
										</span>
									</span>
									<input
										value={props[field.key]}
										onChange={(e) =>
											setProps((p) => ({ ...p, [field.key]: e.target.value }))
										}
										className="w-full rounded-xl border border-white/[0.1] bg-[#070707] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20"
										placeholder={`Enter ${field.label}…`}
									/>
								</label>
							))}
						</div>

						<div className="mt-7">
							<div className="mb-2 text-[11px] uppercase tracking-widest text-white/35">
								Generated usage
							</div>
							<pre className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#070707] p-4 text-[13px] leading-relaxed text-white/80">
								<code>{code}</code>
							</pre>
						</div>
					</div>

					{/* Live preview — the actual component, scaled to fit a card */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-80px" }}
						transition={{ duration: 0.7 }}
						className="overflow-hidden rounded-3xl border border-white/[0.08] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
					>
						<div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-[#070707] px-4 py-3">
							<span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
							<span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
							<span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
							<span className="ml-3 font-mono text-[11px] text-white/40">
								shape-landing-hero.tsx
							</span>
						</div>
						<div className="relative aspect-[4/3] w-full overflow-hidden bg-[#030303]">
							{/* The hero is min-h-screen; scale it down so it lives inside the card */}
							<div className="absolute left-1/2 top-1/2 h-[760px] w-[1100px] -translate-x-1/2 -translate-y-1/2 origin-center scale-[0.42] md:scale-[0.5]">
								<HeroGeometric
									key={`${props.badge}|${props.title1}|${props.title2}`}
									badge={props.badge || " "}
									title1={props.title1 || " "}
									title2={props.title2 || " "}
								/>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
