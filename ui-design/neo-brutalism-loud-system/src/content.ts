/* ----------------------------------------------------------------------------
   Centralized copy + data for the LOUDHOUSE showcase. Keeping content out of
   the JSX keeps the section components focused on layout/behaviour and makes
   the page easy to retune.
   -------------------------------------------------------------------------- */
import type { LucideIcon } from "lucide-react";
import {
	Boxes,
	Layers,
	MousePointerClick,
	Palette,
	Ruler,
	Sparkles,
	Type,
	Zap,
} from "lucide-react";

export const NAV_LINKS = [
	{ label: "Tokens", href: "#tokens" },
	{ label: "Components", href: "#components" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "FAQ", href: "#faq" },
] as const;

export const MARQUEE_TOP = [
	"NO BLUR",
	"NO GRADIENTS",
	"NO SUBTLE GRAYS",
	"HARD SHADOWS ONLY",
	"BORDER-4 OR BUST",
	"UGLY-COOL",
	"SCREAMS / NEVER WHISPERS",
	"WEB 1.0 HOMAGE",
] as const;

export type Feature = {
	icon: LucideIcon;
	title: string;
	body: string;
	/** card background token class */
	bg: string;
	/** sticker rotation utility */
	rotate: string;
};

export const FEATURES: Feature[] = [
	{
		icon: Layers,
		title: "Hard Offset Shadows",
		body: "Solid ink rectangles. Zero blur, zero spread, locked to the bottom-right at four discrete sizes. Light diffusion is a lie.",
		bg: "bg-neo-white",
		rotate: "-rotate-1",
	},
	{
		icon: Type,
		title: "Typography As Texture",
		body: "Space Grotesk, heavy only. Hollow text-stroke display heads, all-caps labels with extreme tracking, leading cranked to nothing.",
		bg: "bg-neo-secondary",
		rotate: "rotate-1",
	},
	{
		icon: Boxes,
		title: "Sticker Layering",
		body: "Cards, badges and text blocks are rotated and slapped on at angles, casting hard shadows onto the layers beneath them.",
		bg: "bg-neo-white",
		rotate: "rotate-2",
	},
	{
		icon: MousePointerClick,
		title: "Mechanical Interactions",
		body: "Buttons click DOWN onto their shadow. Cards lift UP. Badges spin further. Everything snaps — nothing fades.",
		bg: "bg-neo-muted",
		rotate: "-rotate-2",
	},
	{
		icon: Palette,
		title: "Highlighter Palette",
		body: "Hot Red, Vivid Yellow, Soft Violet on a cream canvas, structured by pure black. Unmixed paint, not brand pastels.",
		bg: "bg-neo-accent",
		rotate: "rotate-1",
	},
	{
		icon: Zap,
		title: "Maximal Density",
		body: "More borders. More uppercase. Halftone, grid and noise on every field. This isn't clutter — it's energy and urgency.",
		bg: "bg-neo-white",
		rotate: "-rotate-1",
	},
];

export const STATS = [
	{ value: 4, suffix: "PX", label: "Border Width" },
	{ value: 0, suffix: "PX", label: "Corner Radius" },
	{ value: 3, suffix: "", label: "Highlighter Colors" },
	{ value: 100, suffix: "%", label: "Hard Shadows" },
] as const;

export type Token = {
	name: string;
	hex: string;
	/** swatch background class */
	swatch: string;
	/** text color that reads on the swatch */
	on: string;
	note: string;
};

export const COLOR_TOKENS: Token[] = [
	{
		name: "Canvas",
		hex: "#FFFDF5",
		swatch: "bg-neo-bg",
		on: "text-neo-ink",
		note: "Cream paper",
	},
	{
		name: "Ink",
		hex: "#000000",
		swatch: "bg-neo-ink",
		on: "text-neo-white",
		note: "Borders + text",
	},
	{
		name: "Accent",
		hex: "#FF6B6B",
		swatch: "bg-neo-accent",
		on: "text-neo-ink",
		note: "Hot red CTA",
	},
	{
		name: "Secondary",
		hex: "#FFD93D",
		swatch: "bg-neo-secondary",
		on: "text-neo-ink",
		note: "Vivid yellow",
	},
	{
		name: "Muted",
		hex: "#C4B5FD",
		swatch: "bg-neo-muted",
		on: "text-neo-ink",
		note: "Soft violet",
	},
	{
		name: "White",
		hex: "#FFFFFF",
		swatch: "bg-neo-white",
		on: "text-neo-ink",
		note: "Contrast panel",
	},
];

export type Plan = {
	name: string;
	price: string;
	cadence: string;
	blurb: string;
	features: string[];
	cta: string;
	featured: boolean;
	/** card background token */
	bg: string;
	rotate: string;
};

export const PLANS: Plan[] = [
	{
		name: "Sticker",
		price: "$0",
		cadence: "forever",
		blurb: "For one loud landing page.",
		features: [
			"All 6 color tokens",
			"Button + card + badge",
			"Halftone + grid textures",
			"MIT-ish license",
		],
		cta: "Grab It",
		featured: false,
		bg: "bg-neo-white",
		rotate: "-rotate-1",
	},
	{
		name: "Zine",
		price: "$24",
		cadence: "/ month",
		blurb: "The whole component shop.",
		features: [
			"Everything in Sticker",
			"Marquee + FAQ + forms",
			"Reduced-motion fallbacks",
			"Figma token mirror",
			"Priority issue replies",
		],
		cta: "Go Loud",
		featured: true,
		bg: "bg-neo-accent",
		rotate: "rotate-1",
	},
	{
		name: "Riot",
		price: "$99",
		cadence: "/ month",
		blurb: "For teams that ship in caps.",
		features: [
			"Everything in Zine",
			"5 brand recolors",
			"Custom shape motifs",
			"Onboarding workshop",
			"A human, on call",
		],
		cta: "Start A Riot",
		featured: false,
		bg: "bg-neo-muted",
		rotate: "rotate-2",
	},
];

export type Testimonial = {
	quote: string;
	name: string;
	role: string;
	bg: string;
};

export const TESTIMONIALS: Testimonial[] = [
	{
		quote:
			"Our bounce rate dropped the second we stopped whispering. The buttons literally click down. Customers noticed.",
		name: "RIVA OKONKWO",
		role: "Head of Brand, PUNCHLINE",
		bg: "bg-neo-secondary",
	},
	{
		quote:
			"I shipped a landing page in an afternoon and it looks like a flyer stapled to a telephone pole. In a good way.",
		name: "DESH PATEL",
		role: "Solo Founder, TAPEDECK",
		bg: "bg-neo-white",
	},
	{
		quote:
			"Finally a system that has an opinion. Border-4 on everything is a personality, and it is mine now.",
		name: "MAE LINDQVIST",
		role: "Design Lead, HARDCOPY",
		bg: "bg-neo-muted",
	},
	{
		quote:
			"We A/B tested 'soft & clean' against LOUDHOUSE. Loud won by a mile. The CFO has stopped emailing me about it.",
		name: "TOBI ADEYEMI",
		role: "Growth, MEGAPHONE",
		bg: "bg-neo-accent",
	},
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
	{
		q: "Isn't this just... ugly?",
		a: "Ugly by polished-SaaS standards, cool by intention. Neo-brutalism is ugly-cool — it trades invisible elegance for visual weight, presence and confidence. If it doesn't have a border, it doesn't exist.",
	},
	{
		q: "Is it accessible?",
		a: "High contrast is built into the palette — black on cream, white on black, black on yellow all clear WCAG AA. Focus states are thick black rings (or a yellow input flood), targets are 44px+, and every loop respects prefers-reduced-motion.",
	},
	{
		q: "Where are the gradients and blur?",
		a: "Gone. No blur, no backdrop-blur, no soft shadows, no smooth gradient fades. Depth comes from hard offset shadows and texture — halftone dots, graph-paper grids, and SVG noise.",
	},
	{
		q: "Can I recolor it for my brand?",
		a: "Yes. Every color, the radius, and the shadow scale are centralized as design tokens in one @theme block. Swap the three highlighter values and the entire system retunes — components never hardcode a hex.",
	},
	{
		q: "What's the tech under the hood?",
		a: "React + TypeScript + Vite with Tailwind CSS v4, Space Grotesk vendored locally, Lucide icons stroked at 3px, and react-fast-marquee for the rails. Fully self-contained — clone it and it runs offline.",
	},
];

export const PROCESS = [
	{
		icon: Palette,
		step: "01",
		title: "Drop The Tokens",
		body: "Paste one @theme block. Six colors, zero radius, a five-step shadow scale. One source of truth.",
	},
	{
		icon: Boxes,
		step: "02",
		title: "Slap On Components",
		body: "Buttons, cards, badges, inputs and marquees — all reading from the tokens, all bordered, all loud.",
	},
	{
		icon: Ruler,
		step: "03",
		title: "Break The Grid",
		body: "Rotate the stickers. Overlap the badges. Favor 60/40 splits. Controlled chaos, never random.",
	},
	{
		icon: Sparkles,
		step: "04",
		title: "Ship It Screaming",
		body: "Mechanical hovers, hard clicks, count-ups. Verify contrast + reduced motion. Push.",
	},
];
