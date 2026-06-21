/* ============================================================================
   Content layer for VERDANT.

   All page copy and structured content lives here, away from the JSX, so the
   organisms in App.tsx stay declarative and the design system stays the focus.
   ========================================================================== */

import {
	Leaf,
	Sprout,
	Flower2,
	Sun,
	Droplets,
	Wind,
	Scissors,
	HandHeart,
	type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
	{ label: "Rituals", href: "#rituals" },
	{ label: "Atelier", href: "#atelier" },
	{ label: "Garden", href: "#garden" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Journal", href: "#journal" },
] as const;

/* ---- Features: "Rituals" ------------------------------------------------- */
export interface Feature {
	icon: LucideIcon;
	title: string;
	body: string;
}
export const FEATURES: Feature[] = [
	{
		icon: Sprout,
		title: "Slow Propagation",
		body: "We start everything from cutting and seed, coaxing roots in spring water until they are ready to be potted by hand.",
	},
	{
		icon: Droplets,
		title: "Mindful Watering",
		body: "A measured ritual, not a chore. Each plant is read by the weight of its soil and the lean of its leaves toward the light.",
	},
	{
		icon: Sun,
		title: "Sun-Warmed Soil",
		body: "Terracotta breathes. Our blends are mixed with fired clay and leaf mould so roots stay warm, aerated, and unhurried.",
	},
	{
		icon: Wind,
		title: "Open-Window Air",
		body: "Foliage that has felt a real breeze grows sturdier. We harden every plant in fresh morning air before it comes home.",
	},
	{
		icon: Scissors,
		title: "Considered Pruning",
		body: "We shape with restraint — encouraging an organic, asymmetric silhouette rather than forcing anything into a tidy box.",
	},
	{
		icon: HandHeart,
		title: "Hand-Thrown Pots",
		body: "Every vessel is wheel-thrown in our studio, glazed in sage and clay, and left with the gentle imperfection of the maker's hand.",
	},
];

/* ---- Collections: arched feature cards ----------------------------------- */
export interface Collection {
	tag: string;
	title: string;
	emphasis: string;
	body: string;
	image: string;
	alt: string;
}
export const COLLECTIONS: Collection[] = [
	{
		tag: "Ceramics",
		title: "The Atelier",
		emphasis: "Vessels",
		body: "Wheel-thrown planters and footed bowls, glazed by hand in mushroom, moss, and warm terracotta.",
		image: "/images/feature-ceramics.svg",
		alt: "An illustrated trio of potted plants on a clay shelf in the ceramics atelier.",
	},
	{
		tag: "Living",
		title: "The Garden",
		emphasis: "Greenery",
		body: "A curated meadow of foliage — ferns, olive, and trailing ivy — grown slowly and chosen for their easy temperament.",
		image: "/images/feature-garden.svg",
		alt: "An illustrated botanical garden meadow of mixed fronds and seed-heads.",
	},
	{
		tag: "Botanicals",
		title: "The Canopy",
		emphasis: "Foliage",
		body: "Statement leaves for the corners that ask for them — broad, architectural, and quietly dramatic against rice-paper walls.",
		image: "/images/feature-foliage.svg",
		alt: "An illustrated dense canopy of overlapping botanical leaves.",
	},
];

/* ---- Stats band ---------------------------------------------------------- */
export interface Stat {
	value: number;
	suffix: string;
	label: string;
}
export const STATS: Stat[] = [
	{ value: 240, suffix: "+", label: "Species nurtured in the glasshouse" },
	{ value: 12, suffix: "yr", label: "Seasons tending the same soil" },
	{ value: 98, suffix: "%", label: "Plants that arrive thriving" },
	{ value: 30, suffix: "k", label: "Roots propagated by hand" },
];

/* ---- Pricing: "Memberships" ---------------------------------------------- */
export interface Plan {
	name: string;
	price: string;
	cadence: string;
	blurb: string;
	features: string[];
	featured: boolean;
	icon: LucideIcon;
}
export const PLANS: Plan[] = [
	{
		name: "Sprig",
		price: "$24",
		cadence: "/ season",
		blurb:
			"A single hand-chosen plant and its vessel, delivered as the season turns.",
		features: [
			"One potted plant each season",
			"Hand-thrown terracotta vessel",
			"Illustrated care card",
			"Access to the Journal",
		],
		featured: false,
		icon: Leaf,
	},
	{
		name: "Grove",
		price: "$58",
		cadence: "/ season",
		blurb:
			"Our most-loved ritual — a curated trio with a studio glaze of your choosing.",
		features: [
			"Three plants, styled to pair",
			"Glaze chosen from the studio palette",
			"Seasonal repotting soil blend",
			"Priority on small-batch releases",
			"Two studio workshop seats",
		],
		featured: true,
		icon: Sprout,
	},
	{
		name: "Glasshouse",
		price: "$140",
		cadence: "/ season",
		blurb:
			"For the devoted — a full arrangement, bespoke vessels, and a tending visit.",
		features: [
			"A full seasonal arrangement",
			"Bespoke wheel-thrown vessels",
			"In-home tending visit",
			"Unlimited workshop access",
			"First look at the archive collection",
		],
		featured: false,
		icon: Flower2,
	},
];

/* ---- Testimonials -------------------------------------------------------- */
export interface Testimonial {
	quote: string;
	name: string;
	role: string;
	avatar: string;
}
export const TESTIMONIALS: Testimonial[] = [
	{
		quote:
			"My apartment finally breathes. The fern arrived in a pot so beautiful I rearranged a whole shelf around it.",
		name: "Marin Okafor",
		role: "Grove member, two seasons",
		avatar: "/images/avatar-01.svg",
	},
	{
		quote:
			"It feels less like a subscription and more like a friend who happens to be very good with plants leaving something on your step.",
		name: "Elise Tremblay",
		role: "Glasshouse member",
		avatar: "/images/avatar-02.svg",
	},
	{
		quote:
			"The glaze on my planter has tiny imperfections and I love every one of them. Nothing here feels mass-made.",
		name: "Theo Lindqvist",
		role: "Sprig member, first season",
		avatar: "/images/avatar-03.svg",
	},
];

/* ---- Journal ------------------------------------------------------------- */
export interface Post {
	category: string;
	title: string;
	excerpt: string;
	date: string;
	read: string;
	image: string;
	alt: string;
}
export const POSTS: Post[] = [
	{
		category: "Field Notes",
		title: "On the patience of propagation",
		excerpt:
			"Why we let roots take their time in spring water, and what a fortnight of waiting teaches us about tending anything well.",
		date: "May 2026",
		read: "6 min",
		image: "/images/journal-01.svg",
		alt: "An illustrated botanical sprig laid across a pale ground.",
	},
	{
		category: "Studio",
		title: "Glazing in sage & clay",
		excerpt:
			"A walk through the kiln, the palette we mix by hand, and why a little imperfection makes a vessel feel alive.",
		date: "Apr 2026",
		read: "8 min",
		image: "/images/journal-02.svg",
		alt: "An illustrated scatter of dried flowers in terracotta and wheat tones.",
	},
	{
		category: "Care",
		title: "Reading a plant by its lean",
		excerpt:
			"Forget the watering schedule. Learn to read the weight of the soil and the tilt of the leaves toward the morning light.",
		date: "Mar 2026",
		read: "5 min",
		image: "/images/journal-03.svg",
		alt: "An illustrated potted plant with trailing vines spilling over the rim.",
	},
];

/* ---- FAQ ----------------------------------------------------------------- */
export interface Faq {
	q: string;
	a: string;
}
export const FAQS: Faq[] = [
	{
		q: "How are the plants delivered?",
		a: "Each plant travels potted in its vessel, cushioned in shredded recycled paper, inside a box we design to stand upright. Nothing is shipped bare-root unless you ask.",
	},
	{
		q: "What if a plant arrives unhappy?",
		a: "Send us a photo within ten days and we will replace it, no questions. Living things travel imperfectly sometimes, and that is on us, not on you.",
	},
	{
		q: "Can I choose the glaze on my vessel?",
		a: "Grove and Glasshouse members choose from the studio palette each season — sage, mushroom, moss, or warm terracotta. Sprig vessels are styled by the studio.",
	},
	{
		q: "Do you ship outside the city?",
		a: "We currently tend deliveries within the region so plants spend as little time in transit as possible. Join the waitlist and we will write the moment your area opens.",
	},
	{
		q: "Can I pause between seasons?",
		a: "Always. This is a ritual, not an obligation — pause, skip, or resume from your account whenever the season asks you to.",
	},
];

/* ---- Footer -------------------------------------------------------------- */
export const FOOTER_GROUPS = [
	{
		title: "Explore",
		links: ["Rituals", "The Atelier", "The Garden", "Memberships"],
	},
	{
		title: "Studio",
		links: ["Our Story", "Workshops", "Visit the Glasshouse", "Stockists"],
	},
	{
		title: "Care",
		links: ["Plant Library", "Watering Guide", "Repotting", "Contact"],
	},
] as const;
