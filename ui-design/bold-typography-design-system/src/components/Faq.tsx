import { useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "../data/content";
import { Reveal, SectionLabel } from "./Primitives";

// ─────────────────────────────────────────────────────────────────────────────
// FAQ — a hairline-divided accordion. Panels animate height: auto with an opacity
// fade over 200ms ease-out; the toggle swaps Plus ↔ Minus instantly. Full ARIA:
// each trigger is a <button> controlling its region with aria-expanded/-controls.
// ─────────────────────────────────────────────────────────────────────────────

function Item({
	q,
	a,
	defaultOpen,
}: {
	q: string;
	a: string;
	defaultOpen?: boolean;
}) {
	const [open, setOpen] = useState(!!defaultOpen);
	const id = useId();
	const panelId = `faq-panel-${id}`;
	const btnId = `faq-btn-${id}`;
	const Icon = open ? Minus : Plus;

	return (
		<div className="border-b border-border">
			<h3>
				<button
					id={btnId}
					type="button"
					onClick={() => setOpen((v) => !v)}
					aria-expanded={open}
					aria-controls={panelId}
					className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
				>
					<span className="text-xl font-bold tracking-tight text-foreground transition-colors duration-150 group-hover:text-accent md:text-2xl">
						{q}
					</span>
					<span className="shrink-0 text-accent" aria-hidden>
						<Icon size={24} strokeWidth={1.5} />
					</span>
				</button>
			</h3>
			<AnimatePresence initial={false}>
				{open && (
					<motion.div
						id={panelId}
						role="region"
						aria-labelledby={btnId}
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="overflow-hidden"
					>
						<p className="max-w-2xl pb-7 text-base leading-relaxed text-muted-foreground md:text-lg">
							{a}
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export function Faq() {
	return (
		<section
			id="faq"
			className="border-b border-border bg-muted py-20 md:py-28 lg:py-32"
		>
			<div className="container-bold grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
				<Reveal className="lg:col-span-4">
					<SectionLabel>Questions</SectionLabel>
					<h2 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
						Answered <span className="text-accent">plainly.</span>
					</h2>
				</Reveal>

				<Reveal className="lg:col-span-7 lg:col-start-6">
					<div className="border-t border-border">
						{faqs.map((f, i) => (
							<Item key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
						))}
					</div>
				</Reveal>
			</div>
		</section>
	);
}
