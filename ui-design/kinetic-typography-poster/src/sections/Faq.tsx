import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionLabel } from "../components/SectionLabel";
import { FAQS } from "../content";
import { usePrefersReducedMotion } from "../hooks";

function FaqItem({
	q,
	a,
	open,
	onToggle,
}: {
	q: string;
	a: string;
	open: boolean;
	onToggle: () => void;
}) {
	const reduced = usePrefersReducedMotion();
	const panelId = useId();
	const btnId = useId();

	return (
		<div className="bg-ink">
			<h3>
				<button
					id={btnId}
					type="button"
					aria-expanded={open}
					aria-controls={panelId}
					onClick={onToggle}
					className="group flex w-full items-center justify-between gap-6 p-6 text-left transition-colors duration-300 hover:bg-acid md:p-8"
				>
					<span className="font-bold uppercase tracking-tighter text-bone transition-colors duration-300 group-hover:text-acid-foreground text-xl md:text-3xl lg:text-4xl">
						{q}
					</span>
					{/* Plus/minus mark — rotates to an × when open. */}
					<span
						aria-hidden="true"
						className={[
							"grid h-11 w-11 shrink-0 place-items-center border-2 text-2xl font-bold transition-all duration-300 md:h-14 md:w-14 md:text-3xl",
							"border-line text-bone group-hover:border-acid-foreground group-hover:text-acid-foreground",
							open ? "rotate-45" : "rotate-0",
						].join(" ")}
					>
						+
					</span>
				</button>
			</h3>

			{/* The region wrapper stays mounted so the button's aria-controls
			    always resolves to a real element; AnimatePresence animates the
			    inner content in/out (preserving the spring exit on close). When
			    collapsed the region is simply empty. */}
			<div id={panelId} role="region" aria-labelledby={btnId}>
				<AnimatePresence initial={false}>
					{open && (
						<motion.div
							key="content"
							initial={reduced ? false : { height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
							transition={
								reduced
									? { duration: 0 }
									: { type: "spring", stiffness: 320, damping: 30 }
							}
							className="overflow-hidden"
						>
							<p className="max-w-3xl px-6 pb-8 text-base leading-relaxed text-muted-foreground md:px-8 md:text-lg lg:text-xl">
								{a}
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

/**
 * Accordion FAQ. At most one panel is open at a time — opening a row closes any
 * other, and clicking the open row collapses it (all-closed is allowed). Full
 * keyboard support (each header is a real <button>, so Enter/Space toggle
 * natively), with aria-expanded / aria-controls wiring so screen readers
 * announce state. Spring-driven height/opacity, initial={false} so nothing
 * animates on mount.
 */
export function Faq() {
	const [openIndex, setOpenIndex] = useState<number>(0);

	return (
		<section id="faq" className="border-b-2 border-line py-24 md:py-32">
			<div className="mx-auto max-w-[95vw]">
				<div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
					<div className="lg:col-span-4">
						<SectionLabel index="07">Questions</SectionLabel>
						<h2 className="mt-8 font-bold uppercase leading-[0.85] tracking-tighter text-5xl md:text-7xl">
							Read The
							<br />
							<span className="text-acid">Fine Print.</span>
						</h2>
					</div>

					<div className="grid gap-px grid-hairline self-start border-2 border-line lg:col-span-8">
						{FAQS.map((faq, i) => (
							<FaqItem
								key={faq.q}
								q={faq.q}
								a={faq.a}
								open={openIndex === i}
								onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
