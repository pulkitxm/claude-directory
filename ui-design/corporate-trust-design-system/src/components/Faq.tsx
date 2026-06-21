import { ChevronDown, HelpCircle } from "lucide-react";
import { Section, Shell, Eyebrow, Reveal, RevealGroup } from "./primitives";
import { FAQS } from "../lib/content";
import { fadeUp } from "../lib/motion";
import { motion } from "motion/react";

/* Accessible accordion built on native <details>/<summary>. The chevron rotates
   via the group-open variant; the answer is always in the DOM (good for SEO and
   screen readers) and simply revealed by the native disclosure. */
export function Faq() {
	return (
		<Section id="faq">
			<Shell>
				<div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
					<Reveal>
						<Eyebrow icon={HelpCircle}>Questions, answered</Eyebrow>
						<h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
							Everything you need to{" "}
							<span className="text-gradient">feel sure</span>
						</h2>
						<p className="mt-5 max-w-md text-lg text-slate-500">
							Can't find what you're looking for? Our team replies in under an
							hour, every business day.
						</p>
						<a href="#cta" className="btn btn-secondary mt-7">
							Contact support
						</a>
					</Reveal>

					<RevealGroup className="space-y-4" stag={0.07}>
						{FAQS.map((item) => (
							<motion.details
								key={item.q}
								variants={fadeUp}
								className="group card !rounded-xl overflow-hidden p-0 [&_summary::-webkit-details-marker]:hidden"
							>
								<summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left">
									<span className="text-base font-semibold text-slate-900">
										{item.q}
									</span>
									<span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition-transform duration-300 group-open:rotate-180">
										<ChevronDown className="h-4 w-4" aria-hidden="true" />
									</span>
								</summary>
								<div className="px-6 pb-5 pt-0">
									<p className="max-w-prose text-[0.9375rem] leading-relaxed text-slate-500">
										{item.a}
									</p>
								</div>
							</motion.details>
						))}
					</RevealGroup>
				</div>
			</Shell>
		</Section>
	);
}
