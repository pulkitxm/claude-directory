import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { Shell, Reveal, Eyebrow } from "./primitives";

/* FAQ — the one place we use dividers: thick border-2 between items for
   structure. Accordion with snappy open/close. No shadow. */
const QA = [
	{
		q: "Is this really shadow-free?",
		a: "Completely. There is not a single box-shadow on any element — focus states use a high-contrast solid ring instead. Depth is replaced by scale, color contrast, and the layering of flat shapes.",
	},
	{
		q: "What stack does it target?",
		a: "Flatline is built on React, TypeScript, Vite and Tailwind CSS v4 with lucide-react icons and Motion for the snappy interactions. Tokens live in one CSS @theme block as the single source of truth.",
	},
	{
		q: "Can I retheme the colors?",
		a: "Yes. Every color, font and radius is a token. Change the seven palette values once and the entire system — buttons, cards, sections, focus rings — updates in lockstep. No hunting for hard-coded values.",
	},
	{
		q: "How does it stay accessible without shadows?",
		a: "Hierarchy reads through size and color, which keeps content scannable. Focus rings are solid high-contrast outlines, and every text-on-color pairing is chosen to pass WCAG AA contrast.",
	},
	{
		q: "Why no gradients on buttons or cards?",
		a: "Gradients imply depth and dilute the graphic, poster-like clarity. We reserve subtle directional gradients strictly for large background decoration — never on interactive surfaces.",
	},
];

function Item({
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
	return (
		<div className="border-b-2 border-[var(--color-hair)]">
			<button
				type="button"
				onClick={onToggle}
				aria-expanded={open}
				className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-[var(--color-brand)]"
			>
				<span className="text-lg font-bold tracking-tight sm:text-xl">{q}</span>
				<span
					className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-all duration-200 ${
						open
							? "bg-[var(--color-brand)] text-white"
							: "bg-[var(--color-fog)] text-[var(--color-ink)]"
					}`}
				>
					{open ? (
						<Minus size={20} strokeWidth={2.5} />
					) : (
						<Plus size={20} strokeWidth={2.5} />
					)}
				</span>
			</button>
			<AnimatePresence initial={false}>
				{open && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
						className="overflow-hidden"
					>
						<p className="max-w-2xl pb-6 leading-relaxed text-gray-600">{a}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export function Faq() {
	const [openIdx, setOpenIdx] = useState(0);

	return (
		<section id="faq" className="bg-[var(--color-canvas)] py-20 lg:py-28">
			<Shell className="grid gap-14 lg:grid-cols-12">
				<Reveal className="lg:col-span-4">
					<Eyebrow className="text-[var(--color-brand)]">FAQ</Eyebrow>
					<h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
						Questions, answered flat.
					</h2>
					<p className="mt-5 leading-relaxed text-gray-600">
						Everything you might ask before adopting a system this reductive.
						Thick rules give the list its structure — the one place we allow a
						divider.
					</p>
				</Reveal>

				<div className="lg:col-span-8">
					<Reveal>
						{/* top rule to complete the border-2 framing */}
						<div className="border-t-2 border-[var(--color-hair)]">
							{QA.map((item, i) => (
								<Item
									key={item.q}
									q={item.q}
									a={item.a}
									open={openIdx === i}
									onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
								/>
							))}
						</div>
					</Reveal>
				</div>
			</Shell>
		</section>
	);
}
