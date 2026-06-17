// ─────────────────────────────────────────────────────────────────────────────
// All page copy & structured data for the Verdant botanical apothecary, kept in
// one place so sections stay declarative and free of inline content.
// ─────────────────────────────────────────────────────────────────────────────

export const brand = {
  name: "Verdant",
  tagline: "Small-batch botanical apothecary",
} as const;

export const nav = [
  { label: "Apothecary", href: "#features" },
  { label: "The ritual", href: "#how" },
  { label: "Blends", href: "#product" },
  { label: "Journal", href: "#journal" },
  { label: "Pricing", href: "#pricing" },
] as const;

export type StatItem = { value: string; label: string };
export const stats: StatItem[] = [
  { value: "38", label: "Wild-foraged botanicals" },
  { value: "100%", label: "Compostable packaging" },
  { value: "6,200+", label: "Slow mornings brewed" },
  { value: "1.4k", label: "Trees planted with you" },
];

export type Feature = {
  icon: string; // lucide icon name
  title: string;
  body: string;
};
export const features: Feature[] = [
  {
    icon: "Sprout",
    title: "Wild-foraged, never rushed",
    body: "Every leaf and root is gathered by hand at the moment it's ripest, then air-dried slowly so nothing of the plant is lost.",
  },
  {
    icon: "Sun",
    title: "Sun-cured in small batches",
    body: "We blend forty jars at a time on a worn oak table — small enough that a human nose decides when a blend is finished.",
  },
  {
    icon: "Droplets",
    title: "Steeped for stillness",
    body: "Each tin is built around a feeling, not a flavour chart: a tea to slow the morning, a tonic to soften the dusk.",
  },
  {
    icon: "Leaf",
    title: "Rooted in the season",
    body: "The collection breathes with the year — elderflower in spring, rosehip in the cold — so what you steep is always alive.",
  },
  {
    icon: "Recycle",
    title: "Returns to the earth",
    body: "Unbleached paper, seed-paper labels, and tins you'll keep. Plant the wrapper and watch a little of it grow back.",
  },
  {
    icon: "HeartHandshake",
    title: "Made by hands you know",
    body: "Three of us, one kettle, no machines between the field and your shelf. Your name goes on the tin in pencil.",
  },
];

export type Step = {
  number: string;
  title: string;
  body: string;
  icon: string;
};
export const steps: Step[] = [
  {
    number: "01",
    title: "Forage",
    body: "We walk the same hedgerows and high meadows our grandmothers did, taking only what the season offers.",
    icon: "Footprints",
  },
  {
    number: "02",
    title: "Cure",
    body: "Botanicals rest on linen racks in a warm, dim room until their oils settle and their colour deepens.",
    icon: "Wind",
  },
  {
    number: "03",
    title: "Blend",
    body: "By hand, by smell, by the season's mood — forty tins at a time, each one tasted before it's sealed.",
    icon: "FlaskConical",
  },
  {
    number: "04",
    title: "Steep",
    body: "It arrives in compostable paper. You boil the kettle, breathe in, and the slow part begins.",
    icon: "CupSoda",
  },
];

export type Benefit = { title: string; body: string };
export const benefits: Benefit[] = [
  {
    title: "Whole-leaf, never dust",
    body: "We tear nothing into teabag powder — full leaves and petals unfurl in the pot the way the plant intended.",
  },
  {
    title: "Nothing you can't pronounce",
    body: "No flavourings, no fillers, no fixatives. If it isn't a plant, it isn't in the tin.",
  },
  {
    title: "Caffeine on your terms",
    body: "A clearly marked sun-and-moon scale on every label so you know what wakes you and what lets you rest.",
  },
  {
    title: "Kind to the ground it came from",
    body: "Regenerative foraging, carbon-light shipping, and a tree planted for every order you place.",
  },
];

export type Product = {
  name: string;
  latin: string;
  note: string;
  price: string;
  /** Label for the caffeine scale, e.g. "Low caffeine". */
  caffeineLabel: string;
  /** Where the blend sits on the sun→moon scale, 0 (none) to 1 (full). */
  caffeineLevel: number;
};
export const featuredProduct: Product = {
  name: "Morning Meadow",
  latin: "Camellia · Calendula · Lemon balm",
  note: "Our most-steeped blend — a soft, golden cup that tastes like first light over wet grass. Whole green tea leaf lifted with hand-picked calendula petals and a breath of lemon balm. Enough to wake you, gentle enough to let you stay a while.",
  price: "$24",
  caffeineLabel: "Low caffeine",
  caffeineLevel: 0.34,
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initial: string;
};
export const testimonials: Testimonial[] = [
  {
    quote:
      "It doesn't taste like a product. It tastes like a window left open in spring. I've stopped buying anything else.",
    name: "Maren Holt",
    role: "Ceramicist, Portland",
    initial: "M",
  },
  {
    quote:
      "The tin arrived wrapped in paper with my name in pencil. I planted the label and it sprouted. Who does that anymore?",
    name: "Idris Bah",
    role: "Architect, Lisbon",
    initial: "I",
  },
  {
    quote:
      "I steep the Dusk Tonic at the end of every difficult day. It has quietly become the most reliable part of my week.",
    name: "Sofia Reyes",
    role: "Midwife, Oaxaca",
    initial: "S",
  },
];

export type Post = {
  category: string;
  title: string;
  excerpt: string;
  read: string;
  art: "elderflower" | "rosehip" | "chamomile";
};
export const posts: Post[] = [
  {
    category: "From the field",
    title: "A slow guide to foraging elderflower",
    excerpt:
      "When the hedgerows turn to lace in late May, the window to gather is only a fortnight wide. Here is how we read it.",
    read: "6 min",
    art: "elderflower",
  },
  {
    category: "The ritual",
    title: "Why we never brew tea in a hurry",
    excerpt:
      "Temperature, patience, and a little silence. The difference between a drink and a ritual is mostly the waiting.",
    read: "4 min",
    art: "chamomile",
  },
  {
    category: "Stewardship",
    title: "What it means to take only what is offered",
    excerpt:
      "Regenerative foraging isn't a marketing word for us — it's the difference between a meadow that returns and one that doesn't.",
    read: "8 min",
    art: "rosehip",
  },
];

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  perks: string[];
  highlighted?: boolean;
  cta: string;
};
export const plans: Plan[] = [
  {
    name: "The Taster",
    price: "$18",
    cadence: "one tin",
    blurb: "A single blend of your choosing, wrapped by hand. The gentlest way to begin.",
    perks: ["One 60g tin", "Compostable wrapping", "Brewing card included", "No commitment"],
    cta: "Choose a blend",
  },
  {
    name: "The Ritual",
    price: "$32",
    cadence: "per month",
    blurb: "Two seasonal tins at your door each month, chosen to follow the turning year.",
    perks: [
      "Two tins, every month",
      "Seasonal & limited blends first",
      "A tree planted each delivery",
      "Pause or skip any time",
      "Handwritten field notes",
    ],
    highlighted: true,
    cta: "Begin the ritual",
  },
  {
    name: "The Hearth",
    price: "$58",
    cadence: "per month",
    blurb: "For households that brew all day — four tins, plus the year's rarest harvests.",
    perks: [
      "Four tins, every month",
      "First pick of rare harvests",
      "Two trees planted each delivery",
      "Annual stoneware gift",
    ],
    cta: "Stock the hearth",
  },
];

export type Faq = { q: string; a: string };
export const faqs: Faq[] = [
  {
    q: "How long will my blends stay fresh?",
    a: "Because we cure slowly and seal in airtight tins, our blends keep their character for around a year. We print the harvest month, not a generic best-before, so you always know how alive your tea is.",
  },
  {
    q: "Is everything really compostable?",
    a: "The wrapping, the inner paper, and the seed-paper label all return to the soil — plant the label and it grows wildflowers. The tin is built to be refilled and kept; we'll happily top it up forever.",
  },
  {
    q: "Can I steep these if I'm avoiding caffeine?",
    a: "Yes. Every label carries a small sun-and-moon scale showing exactly where a blend sits, and roughly half the apothecary is naturally caffeine-free — built for the evening rather than the morning.",
  },
  {
    q: "What does 'a tree planted with you' mean?",
    a: "For every order, we fund the planting of a native tree through our regional rewilding partners. The Ritual and Hearth plans plant one and two trees respectively with every single delivery.",
  },
  {
    q: "Can I pause or skip a delivery?",
    a: "Always, and without a conversation. Pause, skip, or change your blends from a single page whenever life asks you to. Nothing about slowing down should feel like a hassle.",
  },
];
