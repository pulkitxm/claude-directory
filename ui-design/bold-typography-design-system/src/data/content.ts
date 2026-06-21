// ─────────────────────────────────────────────────────────────────────────────
// All page copy lives here so sections stay presentational and data-driven.
// `icon` keys map to the lucide icon set in Features (see iconMap there).
// ─────────────────────────────────────────────────────────────────────────────

import journal01 from "../../assets/images/journal-01.svg";
import journal02 from "../../assets/images/journal-02.svg";
import journal03 from "../../assets/images/journal-03.svg";

export const brand = {
	name: "OBELISK",
	tagline: "A type-first design system",
};

export const nav = [
	{ label: "Manifesto", href: "#manifesto" },
	{ label: "System", href: "#features" },
	{ label: "Process", href: "#process" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Journal", href: "#journal" },
];

export const hero = {
	kicker: "Design System / 001",
	// Headline is split so the accent word can be colored independently.
	headline: ["TYPE", "IS THE", "INTERFACE."],
	accentLine: 1, // index of the line rendered in accent
	lead: "OBELISK is a poster discipline for the web. No stock photography, no gradients to hide behind — only letterforms, negative space, and a single act of color.",
	primaryCta: "Read the manifesto",
	secondaryCta: "View specimen",
};

export const marquee = [
	"DELIBERATE",
	"EDITORIAL",
	"CONFIDENT",
	"SHARP EDGES",
	"EXTREME SCALE",
	"ONE ACCENT",
];

export const stats = [
	{ value: "160", unit: "px", label: "Display ceiling" },
	{ value: "6:1", unit: "", label: "Scale contrast" },
	{ value: "1", unit: "", label: "Accent, used sparingly" },
	{ value: "0", unit: "px", label: "Border radius" },
];

export const manifesto = {
	kicker: "The Manifesto",
	title: "We set type like it matters,",
	titleAccent: "because it does.",
	body: [
		"Most interfaces treat typography as a final coat of paint. We treat it as the structure. A headline at 128 points is not decoration — it is the argument, the hierarchy and the mood all at once.",
		"Color exists only to create contrast. Space exists only to frame letterforms. Interaction exists only to reveal a typographic detail. Everything else is noise we choose not to make.",
	],
};

export const features = [
	{
		icon: "Zap",
		title: "Scale as voice",
		body: "A 6:1 ratio between headline and body. The eye knows the rank instantly; nothing competes.",
	},
	{
		icon: "Link",
		title: "Underline affordance",
		body: "Links and primary actions are text with a 2px accent rule that grows on hover. No buttons pretending to be boxes.",
	},
	{
		icon: "BarChart3",
		title: "Token-driven",
		body: "Every color, size and tracking value is a single token. Flip a theme by swapping variables, not classes.",
	},
	{
		icon: "Globe",
		title: "Edge-to-edge",
		body: "On small screens, headlines bleed to the margin. The page reads like a printed broadsheet, not a card stack.",
	},
	{
		icon: "Shield",
		title: "Accessible by default",
		body: "18:1 body contrast, 44px touch targets, a visible 2px focus ring, and motion that respects your settings.",
	},
	{
		icon: "Headphones",
		title: "Quiet motion",
		body: "Fast, crisp, decisive. Fades and underlines at 150–500ms on one easing curve. Never bouncy, never slow.",
	},
];

export const process = [
	{
		n: "01",
		title: "Establish the ramp",
		body: "Pick a display ceiling and a body size. The gap between them is the entire system's drama.",
	},
	{
		n: "02",
		title: "Frame with space",
		body: "Generous, deliberate margins turn a headline into a statement. Empty space is the page doing work.",
	},
	{
		n: "03",
		title: "Spend one color",
		body: "Reserve the accent for the few moments that earn it — a key word, a single CTA, an underline.",
	},
];

export const pricing = [
	{
		name: "Studio",
		price: "$0",
		cadence: "forever",
		blurb: "The full token set and primitives for one project.",
		features: [
			"All design tokens",
			"Type & motion primitives",
			"Light + inverted themes",
			"MIT licensed",
		],
		cta: "Start free",
		featured: false,
	},
	{
		name: "Press",
		price: "$24",
		cadence: "per editor / mo",
		blurb: "Everything in Studio, plus the editorial component library.",
		features: [
			"Everything in Studio",
			"40+ poster components",
			"Figma type specimen kit",
			"Theme builder",
			"Priority support",
		],
		cta: "Choose Press",
		featured: true,
		badge: "Most chosen",
	},
	{
		name: "Atelier",
		price: "Let's talk",
		cadence: "annual",
		blurb: "White-glove rollout and a bespoke type ramp for your brand.",
		features: [
			"Everything in Press",
			"Custom type ramp",
			"Brand accent system",
			"Dedicated designer",
			"SLA",
		],
		cta: "Contact us",
		featured: false,
	},
];

export const testimonials = [
	{
		quote:
			"We deleted every gradient and every drop shadow. What was left was the strongest the brand has ever looked.",
		author: "Mara Eisen",
		role: "Design Director, Folio",
	},
	{
		quote:
			"OBELISK made our headlines load-bearing. The page finally argues for itself instead of decorating around the copy.",
		author: "Idris Calloway",
		role: "Principal, Northbound",
	},
	{
		quote:
			"One accent. Sharp edges. It feels like a gallery wall, and it shipped in a weekend.",
		author: "Yuki Sato",
		role: "Founder, Quiet Press",
	},
];

export const faqs = [
	{
		q: "Is this only for dark mode?",
		a: "No. The dark theme is canonical, but every token has an inverted set. The Final CTA below is the same components rendered on a warm-white ground — nothing is hard-coded.",
	},
	{
		q: "Why no rounded corners or shadows?",
		a: "Sharp edges match sharp typography, and depth comes from layered type, underlines and full-width rules instead of soft elevation. It keeps the focus on letterforms.",
	},
	{
		q: "Which typefaces does it ship with?",
		a: "Inter Tight for headlines and UI, Playfair Display for pull quotes only, and JetBrains Mono for labels and stats. All three are vendored and run offline.",
	},
	{
		q: "How do you handle accessibility?",
		a: "Body contrast is 18:1, touch targets are at least 44px, the focus ring is a visible 2px accent outline, color is never the only signal, and all motion respects prefers-reduced-motion.",
	},
];

export const journal = [
	{
		image: journal01,
		kicker: "Essay",
		title: "Scale is meaning, not decoration",
		date: "Jun 2026",
		read: "6 min",
	},
	{
		image: journal02,
		kicker: "Field notes",
		title: "Kern everything, then kern it again",
		date: "May 2026",
		read: "4 min",
	},
	{
		image: journal03,
		kicker: "Interview",
		title: "On the discipline of white space",
		date: "Apr 2026",
		read: "9 min",
	},
];

export const finalCta = {
	kicker: "Set in motion",
	headline: ["MAKE", "TYPE", "MATTER."],
	body: "Join the studios setting their interfaces like posters. One email gets you the token kit and the first three lessons.",
	placeholder: "you@studio.com",
	button: "Get the kit",
	note: "No spam. Unsubscribe with a single, well-kerned click.",
};

export const footer = {
	blurb:
		"A poster discipline for the web. Letterforms first, everything else in service of them.",
	columns: [
		{
			title: "System",
			links: ["Tokens", "Type ramp", "Components", "Themes"],
		},
		{
			title: "Resources",
			links: ["Manifesto", "Journal", "Specimen", "Changelog"],
		},
		{
			title: "Company",
			links: ["About", "Studio", "Careers", "Press kit"],
		},
		{
			title: "Legal",
			links: ["License", "Terms", "Privacy"],
		},
	],
};
