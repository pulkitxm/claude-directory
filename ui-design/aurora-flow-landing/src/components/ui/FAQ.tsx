import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Eyebrow, Section } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const QA = [
	{
		q: "Is this just another Pomodoro timer?",
		a: "No. Pomodoro chops your day into fixed blocks and treats every kind of work the same. Tide builds one continuous session around a single intention, matches a soundscape to it, and keeps the rhythm going so you stay in the current instead of watching a clock.",
	},
	{
		q: "What makes the soundscapes different from a playlist?",
		a: "They're generated in real time, not recorded. A bed never repeats the same sequence, so your ear never learns the pattern and stops noticing it — the way a real harbor or rainstorm never loops. Twelve of them, each tuned to a kind of work.",
	},
	{
		q: "Do I need to wear headphones?",
		a: "It helps, but it isn't required. The beds are mixed to sit quietly on laptop speakers too, and you can run a session in silence and just use the ring if sound isn't your thing.",
	},
	{
		q: "What happens to my session history?",
		a: "It's yours. Everything lives on your device by default and syncs end-to-end encrypted if you turn sync on. On any paid plan you can export your full history as plain text or CSV whenever you like.",
	},
	{
		q: "Can my whole team use it?",
		a: "Yes — the Fleet plan adds shared quiet hours and a focus rhythm board, so a team can protect each other's deep-work time without a single extra meeting about it.",
	},
];

function Item({
	item,
	open,
	onToggle,
	index,
}: {
	item: (typeof QA)[number];
	open: boolean;
	onToggle: () => void;
	index: number;
}) {
	const id = `faq-${index}`;
	return (
		<div
			className={cn(
				"rounded-card border transition-colors duration-300",
				open ? "border-line-bright bg-deep/60" : "border-line bg-deep/30",
			)}
		>
			<h3>
				<button
					type="button"
					onClick={onToggle}
					aria-expanded={open}
					aria-controls={`${id}-panel`}
					id={`${id}-button`}
					className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
				>
					<span className="font-display text-lg font-medium text-foam sm:text-xl">
						{item.q}
					</span>
					<span
						className={cn(
							"flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-tide",
							open
								? "rotate-45 border-tide/50 bg-tide/15 text-tide"
								: "border-line-bright text-mist",
						)}
					>
						<Plus className="h-4 w-4" strokeWidth={2} />
					</span>
				</button>
			</h3>
			<AnimatePresence initial={false}>
				{open && (
					<motion.div
						id={`${id}-panel`}
						role="region"
						aria-labelledby={`${id}-button`}
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
						className="overflow-hidden"
					>
						<p className="px-6 pb-6 text-[0.975rem] leading-relaxed text-mist">
							{item.a}
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export function FAQ() {
	const [open, setOpen] = useState<number | null>(0);

	return (
		<Section id="faq" className="py-24 sm:py-32">
			<div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
				<div>
					<Eyebrow marker="?">Questions</Eyebrow>
					<h2 className="font-display mt-5 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-foam">
						Before you
						<br />
						<span className="text-mist">dive in.</span>
					</h2>
					<p className="mt-5 max-w-xs text-[0.975rem] leading-relaxed text-mist">
						Still wondering about something? Write to the two people who build
						Tide at{" "}
						<a
							href="mailto:hello@tide.audio"
							className="text-foam underline decoration-tide/50 underline-offset-4 transition-colors hover:text-glow"
						>
							hello@tide.audio
						</a>
						.
					</p>
				</div>

				<div className="space-y-3">
					{QA.map((item, i) => (
						<Item
							key={i}
							item={item}
							index={i}
							open={open === i}
							onToggle={() => setOpen(open === i ? null : i)}
						/>
					))}
				</div>
			</div>
		</Section>
	);
}
