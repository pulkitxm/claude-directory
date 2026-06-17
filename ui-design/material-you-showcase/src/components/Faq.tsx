import { useId, useState } from "react";
import { Reveal, SectionHead, Shell } from "./primitives";
import { Plus } from "./icons";

const FAQS: { q: string; a: string }[] = [
	{
		q: "Is Lumi a component library or just tokens?",
		a: "Both. At its core Lumi is a tonal token engine, but it ships React, Vue and native primitives that consume those tokens out of the box — pills, cards, filled text fields and FABs included.",
	},
	{
		q: "Does it follow the real Material Design 3 spec?",
		a: "Yes. The tonal algorithm mirrors Material You: a seed color expands into 13 tones per key color, mapped to the official MD3 roles. We layer enhancements like richer micro-interactions on top, but never break the spec.",
	},
	{
		q: "How does contrast stay accessible?",
		a: "Every generated on-color pairing is checked against WCAG at build time. On-primary and on-tertiary text clear AA automatically, and you can opt into AAA enforcement that fails CI if a token regresses.",
	},
	{
		q: "Can I export to my existing stack?",
		a: "Tokens export as CSS custom properties, a Tailwind theme, a design-token JSON, or synced straight into Figma and native (iOS/Android) — so there's a single source of truth wherever you ship.",
	},
	{
		q: "What about dark mode?",
		a: "A dark scheme is derived from the same seed, so you never maintain two palettes. Flip the scheme and every surface, container and on-color re-tones in one motion.",
	},
];

function Item({ q, a }: { q: string; a: string }) {
	const [open, setOpen] = useState(false);
	const id = useId();
	return (
		<div
			className={`overflow-hidden rounded-[var(--radius-md-lg)] transition-colors duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
				open
					? "bg-[var(--color-md-container)]"
					: "bg-transparent hover:bg-[var(--color-md-surface)]"
			}`}
		>
			<h3>
				<button
					type="button"
					className="focus-ring flex w-full items-center justify-between gap-4 rounded-[var(--radius-md-lg)] px-6 py-5 text-left"
					aria-expanded={open}
					aria-controls={`${id}-panel`}
					id={`${id}-btn`}
					onClick={() => setOpen((v) => !v)}
				>
					<span className="text-lg font-medium text-[var(--color-md-on-bg)]">
						{q}
					</span>
					<span
						className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
							open
								? "rotate-45 bg-[var(--color-md-primary)] text-[var(--color-md-on-primary)]"
								: "bg-[var(--color-md-secondary-container)] text-[var(--color-md-on-secondary-container)]"
						}`}
					>
						<Plus size={20} />
					</span>
				</button>
			</h3>
			<div
				id={`${id}-panel`}
				role="region"
				aria-labelledby={`${id}-btn`}
				className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
					open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
				}`}
			>
				<div className="overflow-hidden">
					<p className="px-6 pb-6 leading-relaxed text-[var(--color-md-on-variant)]">
						{a}
					</p>
				</div>
			</div>
		</div>
	);
}

export function Faq() {
	return (
		<section
			id="faq"
			className="relative scroll-mt-20 bg-[var(--color-md-bg)] py-20 sm:py-28"
		>
			<Shell className="max-w-3xl">
				<SectionHead
					eyebrow="FAQ"
					title="Questions, answered"
					lead="Everything you might want to know before seeding your first theme."
				/>
				<div className="mt-12 flex flex-col gap-2">
					{FAQS.map((f, i) => (
						<Reveal key={f.q} delay={i * 60}>
							<Item q={f.q} a={f.a} />
						</Reveal>
					))}
				</div>
			</Shell>
		</section>
	);
}
