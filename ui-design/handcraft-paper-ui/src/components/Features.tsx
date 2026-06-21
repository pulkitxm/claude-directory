import { StickyNote, PenTool, Users, Wand2, Undo2, Share2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, StickyTag, IconCircle } from "./primitives";
import { useReveal } from "../lib/reveal";

type Feature = {
	icon: LucideIcon;
	title: string;
	body: string;
	decoration: "tape" | "tack" | "none";
	tone: "ink" | "accent" | "pen";
	tilt: string;
};

const FEATURES: Feature[] = [
	{
		icon: StickyNote,
		title: "Infinite sticky notes",
		body: "Slap a note anywhere. Drag it, recolor it, crumple it up. The wall never fills, so no idea gets thrown out for space.",
		decoration: "tack",
		tone: "accent",
		tilt: "-rotate-2",
	},
	{
		icon: PenTool,
		title: "Real felt-tip ink",
		body: "Draw arrows, circle the good bits, scribble in the margins. Pressure-aware strokes that look hand-drawn, because they are.",
		decoration: "tape",
		tone: "ink",
		tilt: "rotate-1",
	},
	{
		icon: Users,
		title: "Crowd around it",
		body: "Everyone's cursor is a little pencil. Watch teammates sketch in real time and pile onto the same messy idea together.",
		decoration: "tape",
		tone: "pen",
		tilt: "-rotate-1",
	},
	{
		icon: Wand2,
		title: "Tidy-up, on demand",
		body: "Hit the magic broom and Scribbly aligns your chaos into something presentable — then lets you mess it right back up.",
		decoration: "tack",
		tone: "accent",
		tilt: "rotate-2",
	},
	{
		icon: Undo2,
		title: "Endless undo",
		body: "Every board remembers its whole life. Rewind to that version from last Tuesday when the idea was somehow better.",
		decoration: "tape",
		tone: "ink",
		tilt: "-rotate-1",
	},
	{
		icon: Share2,
		title: "Pin it anywhere",
		body: "Export the board as a poster, drop a live link in chat, or pin a read-only snapshot. Your scribbles, your call.",
		decoration: "tack",
		tone: "pen",
		tilt: "rotate-1",
	},
];

export function Features() {
	const { ref, shown } = useReveal<HTMLDivElement>();
	return (
		<section id="features" className="px-6 py-20">
			<div ref={ref} className="mx-auto max-w-5xl">
				<div className="mb-14 text-center">
					<StickyTag color="pen" tilt="rotate-2">
						What's in the box
					</StickyTag>
					<h2 className="mt-6 text-4xl text-ink md:text-5xl">
						Everything you'd grab from the
						<br className="hidden md:block" /> supply closet
					</h2>
					<p className="mx-auto mt-5 max-w-xl text-lg text-ink/70 md:text-xl">
						Six tools that feel like physical stationery, minus the drawer
						that's permanently jammed shut.
					</p>
				</div>

				<div className="grid gap-9 md:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((f, i) => (
						<div
							key={f.title}
							className="transition-all duration-500"
							style={{
								opacity: shown ? 1 : 0,
								transform: shown ? "translateY(0)" : "translateY(28px)",
								transitionDelay: `${i * 70}ms`,
							}}
						>
							<Card
								decoration={f.decoration}
								postit={i % 2 === 1}
								tilt={f.tilt}
								className="h-full p-7"
							>
								<IconCircle icon={f.icon} tone={f.tone} className="mb-5" />
								<h3 className="text-2xl text-ink md:text-[1.6rem]">
									{f.title}
								</h3>
								<p className="mt-3 text-lg text-ink/75">{f.body}</p>
							</Card>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
