import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { Shell, SectionHeading, Reveal, display } from "./primitives";

/* Accordion FAQ. Closed items are convex clay cards; an OPEN item presses INTO
   the surface (shadow-clay-pressed) to read as recessed — the concavity rule.
   The plus icon rotates to an x. Fully ARIA-wired (button + region). */

const FAQS = [
	{
		q: "Is this really just shadows and rounded corners?",
		a: "The corners and color get you in the door, but the depth is the point. Each surface stacks four shadows — a colored outer drop, a top-left highlight, an inner bounce light, and an inner rim — so clay reads as a dense, lit object rather than a flat sticker.",
	},
	{
		q: "What stack does Claymakers target?",
		a: "React with Tailwind CSS v4. The entire system is a single @theme token block plus a handful of shadow utilities, consumed by composable primitives (Card, Button, Input, IconOrb, Blobs). Drop them into any Vite or Next project.",
	},
	{
		q: "Won't all this depth hurt performance?",
		a: "No. Everything is CSS box-shadow, transform and backdrop-blur — GPU-friendly and paint-cheap. There are no images or canvases behind the clay. Background blobs animate on transform only, and motion respects prefers-reduced-motion.",
	},
	{
		q: "Is it accessible?",
		a: "By construction. Text never goes lighter than a WCAG-AA lavender-gray, interactive targets are 44px or larger, focus rings are always visible, and a reduced-motion media query stills the entire world for users who ask for calm.",
	},
	{
		q: "Can I retheme the candy-shop palette?",
		a: "Yes. Because every color is a token in one place, you can swap the accent, pink, sky, emerald and amber values and the whole system — buttons, orbs, blobs, gradients and tinted shadows — re-tints in one shot.",
	},
];

export function Faq() {
	const [open, setOpen] = useState<number | null>(0);
	const baseId = useId();

	return (
		<section id="faq" className="py-16 sm:py-24">
			<Shell className="max-w-3xl">
				<SectionHeading
					eyebrow="Questions"
					title="The things makers ask"
					lead="Still curious after poking around? Here's what comes up most."
				/>

				<div className="mt-12 flex flex-col gap-4">
					{FAQS.map((item, i) => {
						const isOpen = open === i;
						const btnId = `${baseId}-q-${i}`;
						const panelId = `${baseId}-a-${i}`;
						return (
							<Reveal key={item.q} delay={i * 60}>
								<div
									className={`overflow-hidden rounded-[24px] backdrop-blur-xl transition-all duration-300 ${
										isOpen
											? "bg-clay-recess shadow-clay-pressed"
											: "bg-clay-cardBg shadow-clay-card hover:-translate-y-0.5 hover:shadow-clay-card-hover"
									}`}
								>
									<h3 style={display}>
										<button
											id={btnId}
											type="button"
											aria-expanded={isOpen}
											aria-controls={panelId}
											onClick={() => setOpen(isOpen ? null : i)}
											className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left outline-none focus-visible:ring-4 focus-visible:ring-clay-accent/30 sm:px-7"
										>
											<span className="text-lg font-bold tracking-tight text-clay-foreground">
												{item.q}
											</span>
											<span
												className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-white shadow-clay-orb transition-transform duration-300 ${
													isOpen ? "rotate-[135deg]" : ""
												}`}
												style={{
													backgroundImage:
														"linear-gradient(135deg,#c4b5fd,#7c3aed)",
													// @ts-expect-error custom prop for tinted orb shadow
													"--orb": "rgba(124,58,237,0.35)",
												}}
											>
												<Plus size={18} strokeWidth={3} />
											</span>
										</button>
									</h3>
									<div
										id={panelId}
										role="region"
										aria-labelledby={btnId}
										className={`grid transition-all duration-300 ease-out ${
											isOpen
												? "grid-rows-[1fr] opacity-100"
												: "grid-rows-[0fr] opacity-0"
										}`}
									>
										<div className="overflow-hidden">
											<p className="px-6 pb-6 text-base leading-relaxed text-clay-muted sm:px-7">
												{item.a}
											</p>
										</div>
									</div>
								</div>
							</Reveal>
						);
					})}
				</div>
			</Shell>
		</section>
	);
}
