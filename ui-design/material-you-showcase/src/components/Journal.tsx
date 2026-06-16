import { Reveal, SectionHead, Shell } from "./primitives";
import { ArrowRight, Clock } from "./icons";

type Post = {
	tag: string;
	title: string;
	excerpt: string;
	read: string;
	art: "a" | "b" | "c";
};

const POSTS: Post[] = [
	{
		tag: "Color",
		title: "Why tonal beats accent-only color",
		excerpt:
			"A single accent leaves 90% of your UI stark. Here's how tonal surfaces carry mood through the whole screen.",
		read: "6 min",
		art: "a",
	},
	{
		tag: "Motion",
		title: "The one easing curve that fixes your UI",
		excerpt:
			"Emphasized decelerate — cubic-bezier(0.2, 0, 0, 1) — and why it makes every transition feel intentional.",
		read: "4 min",
		art: "b",
	},
	{
		tag: "Systems",
		title: "Shipping one token set to four platforms",
		excerpt:
			"Web, iOS, Android, Figma. A practical pipeline for keeping a single source of truth honest across them all.",
		read: "8 min",
		art: "c",
	},
];

/* Procedurally drawn, fully local "cover art" — organic blobs in the tonal
   palette, no stock photos, no CDN. Each variant gets a distinct composition.
   The whole art layer zooms on card hover (group-hover:scale-105). */
function CoverArt({ variant }: { variant: "a" | "b" | "c" }) {
	const palettes = {
		a: {
			bg: "var(--color-md-primary-container)",
			b1: "var(--color-md-primary)",
			b2: "var(--color-md-tertiary)",
		},
		b: {
			bg: "var(--color-md-tertiary-container)",
			b1: "var(--color-md-tertiary)",
			b2: "var(--color-md-primary)",
		},
		c: {
			bg: "var(--color-md-secondary-container)",
			b1: "var(--color-md-secondary)",
			b2: "var(--color-md-primary)",
		},
	} as const;
	const p = palettes[variant];
	return (
		<svg
			viewBox="0 0 400 240"
			className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-105"
			aria-hidden
			preserveAspectRatio="xMidYMid slice"
		>
			<rect width="400" height="240" fill={p.bg} />
			{variant === "a" && (
				<>
					<circle cx="120" cy="90" r="120" fill={p.b1} opacity="0.85" />
					<rect
						x="210"
						y="120"
						width="180"
						height="180"
						rx="56"
						fill={p.b2}
						opacity="0.7"
					/>
					<circle cx="300" cy="60" r="36" fill="#ffffff" opacity="0.5" />
				</>
			)}
			{variant === "b" && (
				<>
					<rect
						x="-30"
						y="-30"
						width="220"
						height="220"
						rx="80"
						fill={p.b1}
						opacity="0.8"
					/>
					<circle cx="320" cy="180" r="130" fill={p.b2} opacity="0.65" />
					<circle cx="120" cy="190" r="28" fill="#ffffff" opacity="0.45" />
				</>
			)}
			{variant === "c" && (
				<>
					<circle cx="330" cy="70" r="140" fill={p.b1} opacity="0.75" />
					<rect
						x="-20"
						y="120"
						width="200"
						height="200"
						rx="64"
						fill={p.b2}
						opacity="0.7"
					/>
					<circle cx="220" cy="180" r="30" fill="#ffffff" opacity="0.5" />
				</>
			)}
		</svg>
	);
}

/* Blog cards: tonal surface, large radius, image zoom on hover, lift + shadow. */
export function Journal() {
	return (
		<section
			id="journal"
			className="relative scroll-mt-20 bg-[var(--color-md-surface)] py-20 sm:py-28"
		>
			<Shell>
				<div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
					<SectionHead
						align="left"
						eyebrow="Journal"
						title="Notes from the tonal frontier"
						lead="Field notes on color, motion and shipping design systems people actually feel."
					/>
					<Reveal delay={120}>
						<a
							href="#"
							className="btn btn-outlined focus-ring shrink-0"
						>
							All articles
							<ArrowRight size={18} />
						</a>
					</Reveal>
				</div>

				<div className="mt-14 grid gap-6 md:grid-cols-3">
					{POSTS.map((post, i) => (
						<Reveal as="article" key={post.title} delay={i * 90}>
							<a
								href="#"
								className="group focus-ring block h-full overflow-hidden rounded-[var(--radius-md-lg)] bg-[var(--color-md-container)] shadow-[var(--shadow-md-1)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-md-2)]"
							>
								<div className="relative aspect-[5/3] overflow-hidden">
									<CoverArt variant={post.art} />
									<span className="absolute left-4 top-4 rounded-full bg-[var(--color-md-bg)]/85 px-3 py-1 text-xs font-medium text-[var(--color-md-primary)] backdrop-blur-sm">
										{post.tag}
									</span>
								</div>
								<div className="p-6">
									<h3 className="t-title leading-snug text-[var(--color-md-on-bg)] transition-colors duration-200 group-hover:text-[var(--color-md-primary)]">
										{post.title}
									</h3>
									<p className="mt-2.5 text-[0.95rem] leading-relaxed text-[var(--color-md-on-variant)]">
										{post.excerpt}
									</p>
									<div className="mt-5 flex items-center gap-1.5 text-sm text-[var(--color-md-on-variant)]">
										<Clock size={15} />
										{post.read} read
									</div>
								</div>
							</a>
						</Reveal>
					))}
				</div>
			</Shell>
		</section>
	);
}
