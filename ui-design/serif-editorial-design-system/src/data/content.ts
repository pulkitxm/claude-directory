/* ----------------------------------------------------------------------------
   All copy for the Roman & Quill showcase, kept apart from presentation.
   Brand: a private publishing house for considered writing.
---------------------------------------------------------------------------- */

export const brand = {
  name: "Roman & Quill",
  short: "R&Q",
  tagline: "A house for considered writing",
  est: "Est. MCMXX1",
};

export const nav = [
  { label: "The House", href: "#features" },
  { label: "Craft", href: "#benefits" },
  { label: "Readers", href: "#testimonials" },
  { label: "Membership", href: "#pricing" },
  { label: "Journal", href: "#journal" },
];

export const hero = {
  eyebrow: "The Serif Design System",
  titleTop: "Words, given",
  titleEmphasis: "the room",
  titleBottom: "to be read.",
  lede:
    "Roman & Quill is a private publishing house for writers who believe a sentence deserves fine paper, generous margins, and an unhurried reader. We set, bind, and circulate work made to be kept.",
  primaryCta: "Request an invitation",
  secondaryCta: "Read the manifesto",
  scrollHint: "Turn the page",
};

export const marquee = [
  "Letterpress",
  "Slow Reading",
  "Fine Binding",
  "The Long Form",
  "Marginalia",
  "Quiet Type",
  "Archival Paper",
  "First Editions",
];

export const stats = [
  { value: "1,742", label: "Volumes set", note: "in the house hand" },
  { value: "38", label: "Years in print", note: "uninterrupted" },
  { value: "94", label: "Countries", note: "on the reading list" },
  { value: "100%", label: "Acid-free", note: "archival stock" },
];

export const features = [
  {
    kicker: "I.",
    title: "Composed by hand",
    body:
      "Every manuscript is set in Playfair Display and read aloud before it is bound. Kerning is corrected by eye, widows are chased from the page, and nothing leaves the room until the rhythm is right.",
    plate: "specimen" as const,
  },
  {
    kicker: "II.",
    title: "Printed to last",
    body:
      "We commit each title to cotton-rag, acid-free stock with a deckle edge. Gilt is applied sparingly — a single thread of gold leaf where the eye should rest, never more.",
    plate: "letter" as const,
  },
  {
    kicker: "III.",
    title: "Circulated with care",
    body:
      "Members receive a numbered volume by post each season, wrapped in glassine and accompanied by a letter from the editor on the choices behind the issue.",
    plate: "quill" as const,
  },
];

export const benefits = {
  label: "The Craft",
  title: "An atelier, not an algorithm.",
  lede:
    "We resist the temptation to publish quickly. Each issue passes through the same five hands it has for nearly four decades — a reader, an editor, a compositor, a binder, and a proof.",
  points: [
    {
      title: "The reading",
      body: "A first reader sits with the manuscript for a full week with nothing else on the desk.",
    },
    {
      title: "The setting",
      body: "Type is composed line by line, then printed as a galley proof and read against the original.",
    },
    {
      title: "The binding",
      body: "Sewn signatures, a cloth spine stamped in gold, and an endpaper chosen for the season.",
    },
    {
      title: "The proof",
      body: "A final, slow proof — read backwards, word by word — before a single copy is sent.",
    },
  ],
  marginNote:
    "“We have never met a deadline we preferred to a sentence.”",
  marginAttribution: "— House motto, pressed inside the cover",
};

export const testimonials = [
  {
    quote:
      "I have kept every volume Roman & Quill has sent me. They are the only things on my shelf I would carry out of a fire.",
    name: "Margaux Lefèvre",
    role: "Novelist · Paris",
    seed: 0,
  },
  {
    quote:
      "In an age that mistakes speed for craft, they have the nerve to be slow. The result feels less like a magazine and more like a letter from a friend who writes beautifully.",
    name: "Julian Aldous",
    role: "Essayist · Edinburgh",
    seed: 1,
  },
  {
    quote:
      "The paper alone makes you read differently. You slow down. You finish the paragraph. You think it was written for you, because it was.",
    name: "Inès Moreau",
    role: "Critic · Montréal",
    seed: 2,
  },
];

export const pricing = {
  label: "Membership",
  title: "Three ways to keep good company.",
  lede:
    "Every membership is annual, renewable by hand, and may be passed to a friend. No tier is louder than the others — only more generous.",
  tiers: [
    {
      name: "The Reader",
      price: "$96",
      cadence: "per year",
      blurb: "For the quiet evening and the long train.",
      features: [
        "Four numbered volumes by post",
        "Glassine wrap & editor's letter",
        "Access to the digital reading room",
        "A bookplate in your name",
      ],
      cta: "Become a Reader",
      featured: false,
    },
    {
      name: "The Subscriber",
      price: "$180",
      cadence: "per year",
      blurb: "For the collector who reads in the margins.",
      features: [
        "Everything in The Reader",
        "Signed first-edition printings",
        "Quarterly letterpress broadside",
        "Two guest invitations each season",
        "Name pressed in the annual register",
      ],
      cta: "Become a Subscriber",
      featured: true,
      ribbon: "Most chosen",
    },
    {
      name: "The Patron",
      price: "$640",
      cadence: "per year",
      blurb: "For those who would keep the press running.",
      features: [
        "Everything in The Subscriber",
        "A hand-bound annual omnibus",
        "Your dedication in one issue",
        "An evening at the press, by arrangement",
      ],
      cta: "Become a Patron",
      featured: false,
    },
  ],
};

export const journal = {
  label: "From the Journal",
  title: "Notes from the composing room.",
  lede: "Occasional writing on type, paper, and the unhurried sentence.",
  posts: [
    {
      category: "On Type",
      date: "Spring · No. 41",
      title: "In defence of the long descender",
      excerpt:
        "Why we still set body text in a face designed for the page, and what a tall window has to do with a comfortable line.",
      read: "8 min",
      seed: 0,
    },
    {
      category: "On Paper",
      date: "Spring · No. 41",
      title: "The deckle edge, and other useless beauties",
      excerpt:
        "A defence of the untrimmed margin — the part of the page that does nothing, and is therefore essential.",
      read: "6 min",
      seed: 1,
    },
    {
      category: "On Reading",
      date: "Winter · No. 40",
      title: "How to read a single paragraph slowly",
      excerpt:
        "An argument for the reread, the margin note, and the pleasure of finishing a thought before beginning the next.",
      read: "11 min",
      seed: 2,
    },
  ],
};

export const faqs = [
  {
    q: "How often will I receive a volume?",
    a: "Four times a year — one numbered volume each season, posted in glassine with a letter from the editor explaining the choices behind the issue.",
  },
  {
    q: "Is everything printed, or is there a digital edition?",
    a: "Both. Every member has access to a quiet digital reading room, but the volume itself is always printed on cotton-rag, acid-free stock and sewn by hand.",
  },
  {
    q: "Can I give a membership as a gift?",
    a: "Yes. Memberships are renewable by hand and may be passed to a friend at any time. We will send a written note in your name with the first volume.",
  },
  {
    q: "Who decides what gets published?",
    a: "A single reader, then an editor, then a proof. Nothing is published by committee, and nothing is published quickly.",
  },
  {
    q: "Do you accept submissions?",
    a: "We read submissions by post twice a year, in spring and autumn. We reply to every one, by hand, whether or not the work finds a place in the house.",
  },
];

export const footer = {
  blurb:
    "A private publishing house for considered writing. Set, printed, and circulated by hand since 1921.",
  columns: [
    {
      heading: "The House",
      links: ["About", "The Press", "The Editors", "Submissions", "Stockists"],
    },
    {
      heading: "Membership",
      links: ["The Reader", "The Subscriber", "The Patron", "Gift a Membership", "Renew"],
    },
    {
      heading: "Correspond",
      links: ["Contact", "Visit the Press", "Press Enquiries", "Lost a Volume?"],
    },
  ],
  address: ["Roman & Quill", "14 Foundry Lane", "London EC1 · United Kingdom"],
};
