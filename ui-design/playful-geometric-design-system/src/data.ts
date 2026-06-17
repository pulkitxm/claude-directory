/**
 * Content for the Blobby landing page. Kept out of the components so copy and
 * structure are easy to scan and edit in one place.
 *
 * "Blobby" is a fictional product — a no-code kit for building playful,
 * sticker-book style brand sites — used here purely as a vehicle to exercise
 * every part of the Playful Geometric design system.
 */
import {
	Blocks,
	MousePointerClick,
	Sparkles,
	Palette,
	Wand2,
	Shapes,
	Rocket,
	Layers,
	type LucideIcon,
} from "lucide-react";

export const nav = [
	{ label: "Features", href: "#features" },
	{ label: "How it works", href: "#how" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Tokens", href: "#tokens" },
];

/** Marquee keywords — the "confetti of words" strip under the hero. */
export const marqueeWords = [
	"STICKER CARDS",
	"HARD SHADOWS",
	"POLKA DOTS",
	"BOUNCY MOTION",
	"BLOB MASKS",
	"PILL BUTTONS",
	"CONFETTI SHAPES",
	"SQUIGGLES",
	"DIAGONAL STRIPES",
	"VARIED RADII",
];

export type Tone = "violet" | "pink" | "amber" | "mint";

export const features: {
	icon: LucideIcon;
	tone: Tone;
	title: string;
	body: string;
}[] = [
	{
		icon: Shapes,
		tone: "violet",
		title: "Shape library",
		body: "Circles, triangles, pills and squiggles — drag primitives onto any canvas and snap them to a tidy grid.",
	},
	{
		icon: Palette,
		tone: "pink",
		title: "Confetti palette",
		body: "Four pop colors that rotate themselves across decorations, so every page feels alive without you fiddling.",
	},
	{
		icon: Sparkles,
		tone: "amber",
		title: "Bouncy by default",
		body: "Every element pops in with an elastic overshoot. Motion ships on, and respects reduced-motion automatically.",
	},
];

export const steps: {
	icon: LucideIcon;
	tone: Tone;
	kicker: string;
	title: string;
	body: string;
}[] = [
	{
		icon: Blocks,
		tone: "violet",
		kicker: "Step 1",
		title: "Drop a block",
		body: "Pick a hero, a feature grid or a pricing wall. Each block lands pre-styled with the sticker look.",
	},
	{
		icon: MousePointerClick,
		tone: "pink",
		kicker: "Step 2",
		title: "Tap to remix",
		body: "Click any shape to re-roll its color, radius and shadow. The grid stays stable while decoration goes wild.",
	},
	{
		icon: Wand2,
		tone: "amber",
		kicker: "Step 3",
		title: "Sprinkle motion",
		body: "Toggle pop-in, wiggle and marquee. Dial the bounce up for a party or down for a calmer room.",
	},
	{
		icon: Rocket,
		tone: "mint",
		kicker: "Step 4",
		title: "Ship it smiling",
		body: "Export a fast, accessible static site. AAA contrast and focus rings come baked in, no audit required.",
	},
];

export const stats: { value: string; label: string; tone: Tone }[] = [
	{ value: "120+", label: "Sticker blocks", tone: "violet" },
	{ value: "4", label: "Pop colors", tone: "pink" },
	{ value: "0px", label: "Shadow blur", tone: "amber" },
	{ value: "AAA", label: "Text contrast", tone: "mint" },
];

export const pricing: {
	name: string;
	price: string;
	cadence: string;
	blurb: string;
	tone: Tone;
	featured?: boolean;
	cta: string;
	includes: string[];
}[] = [
	{
		name: "Doodle",
		price: "$0",
		cadence: "forever",
		blurb: "For one playful page and a weekend of tinkering.",
		tone: "mint",
		cta: "Start doodling",
		includes: [
			"1 published page",
			"60 sticker blocks",
			"Confetti palette",
			"Community templates",
		],
	},
	{
		name: "Studio",
		price: "$18",
		cadence: "/ month",
		blurb: "For makers shipping bouncy little brand sites all year.",
		tone: "violet",
		featured: true,
		cta: "Get Studio",
		includes: [
			"Unlimited pages",
			"All 120+ blocks",
			"Custom token themes",
			"Motion + wiggle controls",
			"Remove Blobby badge",
		],
	},
	{
		name: "Crew",
		price: "$49",
		cadence: "/ month",
		blurb: "For teams keeping a whole sticker book in sync.",
		tone: "pink",
		cta: "Talk to us",
		includes: [
			"Everything in Studio",
			"5 editor seats",
			"Shared shape library",
			"Brand lock & roles",
		],
	},
];

export const testimonials: {
	quote: string;
	name: string;
	role: string;
	tone: Tone;
	initials: string;
}[] = [
	{
		quote:
			"It finally feels like our brand smiles back. We replaced a sterile template and engagement doubled.",
		name: "Mara Okafor",
		role: "Founder, Pinwheel",
		tone: "violet",
		initials: "MO",
	},
	{
		quote:
			"The pop shadows and bouncy reveals do all the personality work. I just pick blocks and ship.",
		name: "Devon Reyes",
		role: "Designer, Tinker Co.",
		tone: "pink",
		initials: "DR",
	},
	{
		quote:
			"Reduced-motion support and AAA contrast out of the box meant accessibility review was a non-event.",
		name: "Priya Nair",
		role: "Eng lead, Mosaic",
		tone: "mint",
		initials: "PN",
	},
];

export const faqs: { q: string; a: string }[] = [
	{
		q: "Is the playful look accessible?",
		a: "Yes. Body text is slate-800 on warm white (AAA), color is never the only signal — shapes and labels carry meaning too — and focus states are a thick accent border plus a hard shadow.",
	},
	{
		q: "What about people who dislike motion?",
		a: "Every bounce, wiggle, float and marquee is wrapped in prefers-reduced-motion. Turn it on in your OS and the page becomes calm and static while staying fully usable.",
	},
	{
		q: "Where do the colors come from?",
		a: "A single token set: a warm paper background, slate foreground, and four pop colors — violet, hot pink, amber and mint — used rotationally for a confetti effect.",
	},
	{
		q: "Can I make it less loud?",
		a: "Absolutely. The concept is 'stable grid, wild decoration' — keep the tidy grid and dial the decoration down. Swap pop colors for muted, shrink shadows, and hide floating shapes.",
	},
];

export const logos: { name: string; icon: LucideIcon }[] = [
	{ name: "Pinwheel", icon: Shapes },
	{ name: "Tinker Co.", icon: Blocks },
	{ name: "Mosaic", icon: Layers },
	{ name: "Confetti", icon: Sparkles },
	{ name: "Doodlebug", icon: Palette },
	{ name: "Bouncehouse", icon: Rocket },
];

export const footerCols: { title: string; links: string[] }[] = [
	{ title: "Product", links: ["Features", "Pricing", "Blocks", "Changelog"] },
	{ title: "Resources", links: ["Docs", "Templates", "Tokens", "Status"] },
	{ title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
];
