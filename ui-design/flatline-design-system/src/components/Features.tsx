import {
	Layers,
	Palette,
	Type,
	Square as SquareIcon,
	Zap,
	Accessibility,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Shell, Reveal, Eyebrow, Blob } from "./primitives";

/* FEATURES — "Color Block" cards on soft tints. Icons live in solid colored
   circles. Hover intensifies the tint, scales the card, scales the icon.
   No shadow, no border. This is the canonical card pattern. */
type Feature = {
	icon: LucideIcon;
	title: string;
	body: string;
	/* tint = resting card bg, hover = intensified bg, circle/ink = icon chip */
	tint: string;
	hover: string;
	circle: string;
};

const FEATURES: Feature[] = [
	{
		icon: Palette,
		title: "Color as structure",
		body: "Bold solid blocks define every section and grouping. Transitions are sharp — never blurred, never a gradient.",
		tint: "bg-blue-50",
		hover: "group-hover:bg-blue-100",
		circle: "bg-[var(--color-brand)]",
	},
	{
		icon: Type,
		title: "Typography as interface",
		body: "Size and weight carry the hierarchy. Geometric, bold, tightly tracked — type that demands attention.",
		tint: "bg-amber-50",
		hover: "group-hover:bg-amber-100",
		circle: "bg-[var(--color-sun)]",
	},
	{
		icon: SquareIcon,
		title: "Geometric purity",
		body: "Rectangles, circles, squares — consistent moderate radii. No organic blobs, no fussy shapes.",
		tint: "bg-emerald-50",
		hover: "group-hover:bg-emerald-100",
		circle: "bg-[var(--color-grass)]",
	},
	{
		icon: Layers,
		title: "Zero artificial depth",
		body: "The Z-axis doesn't exist. Hierarchy comes from scale, contrast, and the strategic layering of flat shapes.",
		tint: "bg-blue-50",
		hover: "group-hover:bg-blue-100",
		circle: "bg-[var(--color-brand)]",
	},
	{
		icon: Zap,
		title: "Snappy feedback",
		body: "Every interaction answers in 200ms — color shifts, scale, and fills. Direct and digital, never a fade into shadow.",
		tint: "bg-amber-50",
		hover: "group-hover:bg-amber-100",
		circle: "bg-[var(--color-sun)]",
	},
	{
		icon: Accessibility,
		title: "Accessible by default",
		body: "High-contrast solid focus rings stand in for shadows. Color pairings are checked to pass WCAG AA.",
		tint: "bg-emerald-50",
		hover: "group-hover:bg-emerald-100",
		circle: "bg-[var(--color-grass)]",
	},
];

export function Features() {
	return (
		<section
			id="features"
			className="relative overflow-hidden bg-[var(--color-fog)] py-20 lg:py-28"
		>
			{/* subtle directional gradient decoration (allowed for backgrounds only) */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white to-transparent"
			/>
			<Blob className="-right-24 top-40 h-72 w-72 bg-[var(--color-brand)]/5" />

			<Shell className="relative">
				<Reveal className="max-w-2xl">
					<Eyebrow className="text-[var(--color-brand)]">
						The principles
					</Eyebrow>
					<h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
						Six rules. One coherent system.
					</h2>
					<p className="mt-5 text-lg leading-relaxed text-gray-600">
						Every component in Flatline is built from the same small set of
						convictions. Reduction isn't the absence of design — it's the
						discipline of it.
					</p>
				</Reveal>

				<div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((f, i) => (
						<Reveal key={f.title} delay={(i % 3) * 0.08}>
							<article
								className={`group h-full cursor-pointer rounded-lg ${f.tint} ${f.hover} p-8 transition-all duration-200 hover:scale-[1.02]`}
							>
								<span
									className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full ${f.circle} text-white transition-transform duration-200 group-hover:scale-110`}
								>
									<f.icon size={28} strokeWidth={2.25} />
								</span>
								<h3 className="text-xl font-bold tracking-tight">{f.title}</h3>
								<p className="mt-3 leading-relaxed text-gray-600">{f.body}</p>
							</article>
						</Reveal>
					))}
				</div>
			</Shell>
		</section>
	);
}
