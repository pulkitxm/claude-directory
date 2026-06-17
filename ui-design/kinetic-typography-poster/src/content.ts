/* Centralised copy + data. Keeping content out of the markup makes the
   sections easy to re-skin and keeps the JSX focused on layout/motion. */

export const STATS = [
	{ value: "200", label: "Speakers" },
	{ value: "3", label: "Days / Nonstop" },
	{ value: "48", label: "Live Sessions" },
	{ value: "12K", label: "Attendees" },
	{ value: "∞", label: "Ideas In Motion" },
	{ value: "1", label: "Acid Color" },
] as const;

export const FEATURES = [
	{
		index: "01",
		title: "Type In Motion",
		body: "Headlines that breathe, stretch, and march across the viewport. We treat the letterform as the primary actor — never a caption to something else.",
		tag: "Kinetic",
	},
	{
		index: "02",
		title: "Scale As Voice",
		body: "When the gap between the loudest and quietest element is ten to one, hierarchy stops being decoration and becomes meaning. Big means urgent. We mean it.",
		tag: "Brutalist",
	},
	{
		index: "03",
		title: "Contrast Or Nothing",
		body: "Near-black, off-white, one acid accent. No gradients, no soft shadows, no mid-tone hedging. Every edge is a decision, and every decision is sharp.",
		tag: "Swiss",
	},
] as const;

export const PROCESS = [
	{
		number: "01",
		title: "Strip",
		body: "Remove the gradients, the rounded corners, the polite spacing. What survives is structure.",
	},
	{
		number: "02",
		title: "Scale",
		body: "Push the headline to the edges. Let the number tower behind it. Let the body stay quiet and readable.",
	},
	{
		number: "03",
		title: "Move",
		body: "Set the marquees running, wire the scroll, flip the colors on hover. Now the poster is alive.",
	},
] as const;

export const BENEFITS = [
	{
		index: "01",
		title: "Loud By Default",
		body: "No second-guessing whether the headline is big enough. It is. It fills the screen on purpose.",
	},
	{
		index: "02",
		title: "Readable Anyway",
		body: "Body copy stays left-aligned at 20–24px on a 15:1 contrast field. Drama up top, clarity down here.",
	},
	{
		index: "03",
		title: "Never Still",
		body: "Three layers of motion — perpetual marquees, reactive hovers, scroll-driven transforms — keep the page alive.",
	},
	{
		index: "04",
		title: "Accessible",
		body: "Prefers-reduced-motion freezes every animation, focus rings glow acid, and touch targets clear 44px.",
	},
] as const;

export const TESTIMONIALS = [
	{
		quote: "It stopped whispering and started shouting. Conversions followed the volume.",
		name: "Dana Okonkwo",
		role: "Creative Director, FORMAT",
	},
	{
		quote: "The marquees never stop. Neither does the attention they pull.",
		name: "Léo Marchetti",
		role: "Founder, RIOT STUDIO",
	},
	{
		quote: "Swiss precision with the volume turned all the way up. Exactly what the brand needed.",
		name: "Priya Nair",
		role: "Head of Brand, AXIS",
	},
	{
		quote: "We replaced six gradients with one acid yellow and the page finally had a spine.",
		name: "Tomas Vega",
		role: "Design Lead, PULSE",
	},
] as const;

export const PRICING = [
	{
		name: "Floor",
		price: "00",
		cadence: "Free",
		features: ["Full program", "Standing room", "Day passes", "Zine drop"],
		featured: false,
	},
	{
		name: "Front Row",
		price: "240",
		cadence: "/ pass",
		features: [
			"Reserved seating",
			"Workshop access",
			"Speaker dinners",
			"Print archive",
			"Backstage marquee",
		],
		featured: true,
	},
	{
		name: "Studio",
		price: "900",
		cadence: "/ team",
		features: ["Six seats", "Private session", "Brand teardown", "On-site critique"],
		featured: false,
	},
] as const;

export const FAQS = [
	{
		q: "Is this just dark mode with yellow?",
		a: "No. Dark mode is a palette swap. This is a system: viewport-scale type, perpetual marquees, hard color inversions, and scroll-driven transforms. Remove those and yes, it collapses into generic dark mode — which is exactly why they stay.",
	},
	{
		q: "Why is everything uppercase?",
		a: "Display text only — headings, buttons, labels. Body copy stays sentence case so it remains comfortable to read. Uppercase display creates the poster-like, confrontational lockup the style is built on.",
	},
	{
		q: "Won't all this motion hurt accessibility?",
		a: "It would, if it were unconditional. Every marquee, scroll transform, and entrance animation is gated behind prefers-reduced-motion. Turn the setting on and the page goes completely still while keeping its layout, contrast, and hierarchy intact.",
	},
	{
		q: "Can I use more than one accent color?",
		a: "Resist it. A single acid yellow against near-black and off-white is what makes the system instantly recognisable. A second accent dilutes the contrast and the identity at the same time.",
	},
] as const;
