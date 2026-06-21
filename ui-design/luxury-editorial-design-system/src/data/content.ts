// All editorial copy + data, kept out of the components for maintainability.
import { images } from "../assets";

export interface FeatureItem {
	index: string;
	image: string;
	alt: string;
	/** Headline split so a single word can be italic/gold. */
	title: { lead: string; emphasis: string; trail?: string };
	body: string;
	meta: string;
	colStart: string; // asymmetric offset
}

export const features: FeatureItem[] = [
	{
		index: "01",
		image: images.featureAtelier,
		alt: "Folded garments and fabric swatches arranged on a studio table",
		title: { lead: "Curated", emphasis: "Excellence" },
		body: "Every artefact in the house collection is selected for the way it ages — the patina it earns, the weight it carries in the hand. We measure value not in seasons but in decades.",
		meta: "Atelier No. 1 — Materials",
		colStart: "lg:col-start-2",
	},
	{
		index: "02",
		image: images.featureArchitecture,
		alt: "Minimal modernist architecture with rhythmic concrete columns",
		title: { lead: "The", emphasis: "Details" },
		body: "Restraint is the loudest statement we make. A single seam, a cut edge, the precise temperature of a colour — these are the places where intention becomes unmistakable.",
		meta: "Atelier No. 2 — Form",
		colStart: "lg:col-start-3",
	},
	{
		index: "03",
		image: images.featureStillLife,
		alt: "Still-life arrangement of sculptural objects in soft daylight",
		title: { lead: "The", emphasis: "Process" },
		body: "Nothing is rushed. A piece may rest, unfinished, for months until the hand and the eye agree. Slowness is not an inconvenience — it is the method.",
		meta: "Atelier No. 3 — Craft",
		colStart: "lg:col-start-4",
	},
];

export interface StatItem {
	value: string;
	label: string;
}

export const stats: StatItem[] = [
	{ value: "1924", label: "Founded in Paris" },
	{ value: "08", label: "Permanent ateliers" },
	{ value: "240+", label: "Master artisans" },
	{ value: "∞", label: "Editions, never repeated" },
];

export interface Testimonial {
	quote: string;
	author: string;
	role: string;
	avatar: string;
}

export const testimonials: Testimonial[] = [
	{
		quote:
			"There is a quietness to the work that I have never found elsewhere. It does not ask for attention — it simply earns it, slowly, over years.",
		author: "Isolde Marchetti",
		role: "Editor-at-Large, Vellum Quarterly",
		avatar: images.avatar01,
	},
	{
		quote:
			"MAISON understands that luxury is a verb. Each object insists you slow down, look closer, and reconsider what permanence means.",
		author: "Henri Castellane",
		role: "Curator, Atelier Modern",
		avatar: images.avatar02,
	},
	{
		quote:
			"I have collected for thirty years. Nothing has held its presence in a room the way these pieces do. They are, in the truest sense, considered.",
		author: "Beatrix Lindqvist",
		role: "Private Collector, Stockholm",
		avatar: images.avatar03,
	},
];

export interface FaqItem {
	id: string;
	question: string;
	answer: string;
}

export const faqs: FaqItem[] = [
	{
		id: "commission",
		question: "How does a commission begin?",
		answer:
			"Every commission opens with a conversation — never a catalogue. We meet to understand the room, the ritual, and the life the piece will join. Only then does a maker begin. Expect the first proposal within three weeks.",
	},
	{
		id: "materials",
		question: "Where do the materials come from?",
		answer:
			"We work with a small, fixed circle of mills, foundries, and tanneries — most of them family-held for generations. Provenance is documented for every component, and we decline anything we cannot trace to its source.",
	},
	{
		id: "timeline",
		question: "Why does it take so long?",
		answer:
			"Because the alternative is worse. A finish that should cure for ninety days will not be hurried to thirty. We would rather deliver one object that endures than ten that merely arrive on time.",
	},
	{
		id: "care",
		question: "How should a piece be cared for?",
		answer:
			"Each edition arrives with a hand-bound care record specific to its materials. Our atelier remains available for restoration and refinishing for the lifetime of the piece — and, in most cases, well beyond it.",
	},
];

export interface BlogPost {
	image: string;
	alt: string;
	category: string;
	date: string;
	title: string;
	readTime: string;
}

export const posts: BlogPost[] = [
	{
		image: images.blog01,
		alt: "Editorial fashion figure in motion under directional light",
		category: "The Journal",
		date: "May 2024",
		title: "On the patience of well-made things",
		readTime: "6 min",
	},
	{
		image: images.blog02,
		alt: "A figure carrying objects through a sunlit boulevard",
		category: "Field Notes",
		date: "Apr 2024",
		title: "A morning inside the Marais atelier",
		readTime: "9 min",
	},
	{
		image: images.blog03,
		alt: "Interior of a refined boutique with soft daylight",
		category: "Conversations",
		date: "Mar 2024",
		title: "The room remembers what you choose",
		readTime: "5 min",
	},
];

export const navLinks = ["Collections", "Atelier", "Journal", "Contact"];
