import { useState } from "react";
import { Plus } from "lucide-react";
import { Eyebrow, Reveal, Section, SectionHeading, Shell } from "./primitives";

type QA = { q: string; a: string };

const ITEMS: QA[] = [
	{
		q: "Is this really shadow-everything?",
		a: "The opposite of flat — yes. Every interactive surface emits colored light through box-shadows, and headings glow via drop-shadow. Shadows here are neon, never dark drops.",
	},
	{
		q: "What stack does NEONWAVE OS target?",
		a: "It ships as React + TypeScript primitives over Tailwind v4, with every design value centralized as a CSS custom property. Drop the token sheet anywhere and the look comes along.",
	},
	{
		q: "Will the vibe survive on mobile?",
		a: "Non-negotiable. The perspective grid, blurred sun, and CRT scanlines all hold from 320px up. Only the glow intensity eases off slightly so small screens aren't overwhelmed.",
	},
	{
		q: "Is it accessible under all that neon?",
		a: "Semantic landmarks, focus-visible outlines, ARIA-correct accordion and menu, and a prefers-reduced-motion fallback that stills the scanlines and marquees. Chrome text clears AA contrast on the void.",
	},
	{
		q: "Can I retheme the colors?",
		a: "Edit the tokens once. --color-magenta, --color-cyan, --color-orange and the gradients cascade through buttons, borders, glows, text fills and the sun. No hunting for hard-coded hex.",
	},
];

function Item({
	qa,
	open,
	onToggle,
}: {
	qa: QA;
	open: boolean;
	onToggle: () => void;
}) {
	return (
		<div className="border-2 border-[var(--color-edge)] transition-colors duration-200 ease-linear hover:border-[var(--color-magenta)]/60">
			<h3>
				<button
					type="button"
					onClick={onToggle}
					aria-expanded={open}
					className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-mono uppercase tracking-wider text-[var(--color-chrome)] transition-colors duration-200 ease-linear hover:text-[var(--color-cyan)]"
				>
					<span className="flex items-baseline gap-3 text-base sm:text-lg">
						<span className="text-[var(--color-magenta)]">&gt;</span>
						{qa.q}
					</span>
					<Plus
						size={20}
						className={`shrink-0 text-[var(--color-cyan)] transition-transform duration-200 ease-linear ${
							open ? "rotate-45" : ""
						}`}
					/>
				</button>
			</h3>
			<div
				className={`grid transition-all duration-200 ease-linear ${
					open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
				}`}
			>
				<div className="overflow-hidden">
					<p className="border-t border-[var(--color-edge)] px-5 py-5 font-mono text-sm leading-relaxed text-[var(--color-chrome)]/75">
						{qa.a}
					</p>
				</div>
			</div>
		</div>
	);
}

export function Faq() {
	const [open, setOpen] = useState<number>(0);
	return (
		<Section id="faq" className="z-10 py-20 sm:py-32">
			<Shell className="max-w-4xl">
				<Reveal className="mb-12 text-center sm:mb-16">
					<Eyebrow>cat README.txt</Eyebrow>
					<SectionHeading className="mt-5">Readme</SectionHeading>
					<p className="mt-5 font-mono text-lg text-[var(--color-chrome)]/70">
						Frequently transmitted questions, decoded.
					</p>
				</Reveal>

				<Reveal className="space-y-4">
					{ITEMS.map((qa, i) => (
						<Item
							key={qa.q}
							qa={qa}
							open={open === i}
							onToggle={() => setOpen(open === i ? -1 : i)}
						/>
					))}
				</Reveal>
			</Shell>
		</Section>
	);
}
