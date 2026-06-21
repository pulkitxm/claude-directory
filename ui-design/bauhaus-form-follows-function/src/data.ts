/* ----------------------------------------------------------------------------
   WERKBUND — content. Kept separate from presentation so copy can change
   without touching layout. WERKBUND is a fictional Bauhaus-flavoured design
   system / component toolkit (a nod to the Deutscher Werkbund).
---------------------------------------------------------------------------- */
import type { Accent } from "./ui";

export type ShapeKind = "circle" | "square" | "triangle";

export const NAV_LINKS = [
	{ label: "System", href: "#features" },
	{ label: "Process", href: "#process" },
	{ label: "Plans", href: "#pricing" },
	{ label: "Journal", href: "#journal" },
] as const;

export const STATS: {
	value: string;
	label: string;
	shape: ShapeKind;
	accent: Accent;
}[] = [
	{ value: "3", label: "Primary colours", shape: "circle", accent: "red" },
	{ value: "240+", label: "Composable parts", shape: "square", accent: "blue" },
	{ value: "0px", label: "Wasted ornament", shape: "triangle", accent: "red" },
	{ value: "1919", label: "Year of the idea", shape: "square", accent: "blue" },
];

export const FEATURES: {
	icon: "circle" | "square" | "triangle" | "grid" | "ruler" | "layers";
	title: string;
	body: string;
	accent: Accent;
}[] = [
	{
		icon: "circle",
		title: "Pure Geometry",
		body: "Every component is built from circles, squares and triangles. No decoration that doesn't earn its place on the grid.",
		accent: "red",
	},
	{
		icon: "layers",
		title: "Hard Layering",
		body: "Depth comes from honest 4px and 8px offset shadows — never a blur. Surfaces stack like cut paper on a workbench.",
		accent: "blue",
	},
	{
		icon: "grid",
		title: "Color Blocking",
		body: "Whole sections commit to a single primary. Red, blue and yellow do the structural work that gradients pretend to.",
		accent: "yellow",
	},
	{
		icon: "ruler",
		title: "Tokens, Not Guesses",
		body: "Spacing, type and radius are binary and deliberate. 0px or fully round. Bold or medium. Nothing in between.",
		accent: "blue",
	},
	{
		icon: "square",
		title: "Thick Borders",
		body: "A 2px and 4px black outline frames every element. The interface reads like a printed poster, not a soft web app.",
		accent: "red",
	},
	{
		icon: "triangle",
		title: "Asymmetric Balance",
		body: "Grids exist to be intentionally broken. Overlap, rotation and tension hold the composition together.",
		accent: "yellow",
	},
];

export const STEPS: { title: string; body: string }[] = [
	{
		title: "Compose",
		body: "Drop primitives onto the grid. Circle, square, triangle — the alphabet of the whole system.",
	},
	{
		title: "Constrain",
		body: "Snap to tokens. Colour blocks, thick borders and hard shadows do the rest automatically.",
	},
	{
		title: "Construct",
		body: "Assemble sections like poster panels. Overlap deliberately; let the asymmetry breathe.",
	},
	{
		title: "Ship",
		body: "Export accessible, responsive React. Mechanical motion, zero ornamental fat.",
	},
];

export const BENEFITS: string[] = [
	"Strict three-colour palette that can never drift",
	"Hard-shadow depth with no blur or guesswork",
	"Binary radii — squares and circles, nothing fuzzy",
	"Accessible focus rings and reduced-motion support",
	"Responsive from poster-scale desktop to mobile",
	"Every token defined once and reused everywhere",
];

export const PLANS: {
	name: string;
	price: string;
	cadence: string;
	blurb: string;
	features: string[];
	accent: Accent;
	featured?: boolean;
}[] = [
	{
		name: "Studio",
		price: "€0",
		cadence: "forever",
		blurb: "For tinkering and small constructions.",
		features: [
			"Core primitives",
			"Light + colour-block sections",
			"Community grid",
		],
		accent: "blue",
	},
	{
		name: "Werkstatt",
		price: "€24",
		cadence: "per month",
		blurb: "The full workshop for serious composition.",
		features: [
			"Everything in Studio",
			"240+ composed parts",
			"Token theming engine",
			"Figma + code parity",
			"Priority support",
		],
		accent: "red",
		featured: true,
	},
	{
		name: "Bauhaus",
		price: "€72",
		cadence: "per month",
		blurb: "For teams building at poster scale.",
		features: [
			"Everything in Werkstatt",
			"Unlimited seats",
			"Custom primitive sets",
			"Design audits",
		],
		accent: "yellow",
	},
];

export const TESTIMONIALS: {
	quote: string;
	name: string;
	role: string;
	img: string;
	accent: Accent;
}[] = [
	{
		quote:
			"It forced every decision onto the grid. Our product finally looks composed instead of decorated.",
		name: "Anni Brandt",
		role: "Head of Design, Form Co.",
		img: "/img/avatar-1.jpg",
		accent: "red",
	},
	{
		quote:
			"Three colours, two border widths, one font. The constraints did more for consistency than any 60-page guideline.",
		name: "Josef Klee",
		role: "Principal Engineer, Gropius Labs",
		img: "/img/avatar-2.jpg",
		accent: "blue",
	},
	{
		quote:
			"Hard shadows and thick borders read instantly. Our hand-off time to engineering basically halved.",
		name: "Lyonel Albers",
		role: "Design Systems Lead, Dessau",
		img: "/img/avatar-3.jpg",
		accent: "yellow",
	},
];

export const POSTS: {
	title: string;
	tag: string;
	read: string;
	img: string;
	round: boolean;
}[] = [
	{
		title: "Why a three-colour palette beats a hundred shades",
		tag: "Theory",
		read: "6 min",
		img: "/img/journal-1.jpg",
		round: true,
	},
	{
		title: "Hard shadows: depth without a single blur",
		tag: "Craft",
		read: "4 min",
		img: "/img/journal-2.jpg",
		round: false,
	},
	{
		title: "Breaking the grid on purpose, and getting away with it",
		tag: "Layout",
		read: "8 min",
		img: "/img/journal-3.jpg",
		round: true,
	},
];

export const FAQS: { q: string; a: string }[] = [
	{
		q: "Is this a real component library?",
		a: "WERKBUND is a fictional studio built to demonstrate a Bauhaus design system end to end. The tokens, primitives and patterns are real, working React — the product around them is the showcase.",
	},
	{
		q: "Why only three colours?",
		a: "Bauhaus theory ties form to the primaries: red, blue and yellow, grounded by black and white. Constraint is the feature. A strict palette can never drift into muddy, off-brand territory.",
	},
	{
		q: "How is depth handled without gradients or blur?",
		a: "Every elevated surface uses a hard offset shadow — a solid black rectangle nudged 4 to 8 pixels down and right. It reads like cut paper layered on a workbench, honest and instantly legible.",
	},
	{
		q: "Is it accessible and responsive?",
		a: "Yes. Type scales from mobile to poster-scale desktop, focus rings are visible and offset, colour pairings hold contrast, and the whole page respects prefers-reduced-motion.",
	},
];
