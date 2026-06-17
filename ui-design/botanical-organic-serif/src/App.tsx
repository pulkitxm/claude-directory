/* ============================================================================
   VERDANT — a Botanical / Organic Serif design-system showcase, rendered as a
   living wellness + ceramics landing page.

   The page is assembled from the primitives in ui.tsx and the content in
   data.ts. Every visual rule (arch imagery, paper grain, Playfair italics,
   staggered grid, terracotta hovers, vine dividers, soft halos, eased reveals)
   is expressed here through centralized tokens — never one-off hex/shadows.
   ========================================================================== */

import { useEffect, useRef, useState } from "react";
import {
	Menu,
	X,
	ArrowUpRight,
	ArrowRight,
	Quote,
	Check,
	Star,
	Plus,
	Leaf,
	Sprout,
	MapPin,
	Instagram,
	Send,
} from "lucide-react";
import {
	NAV_LINKS,
	FEATURES,
	COLLECTIONS,
	STATS,
	PLANS,
	TESTIMONIALS,
	POSTS,
	FAQS,
	FOOTER_GROUPS,
} from "./data";
import {
	Button,
	ButtonLink,
	Eyebrow,
	IconHalo,
	ArchImage,
	Reveal,
	SectionHeading,
	VineDivider,
	useCountUp,
} from "./ui";

/* ========================================================================== */
/* Paper grain — the mandatory, soul-giving texture. Fixed, full-screen.       */
/* ========================================================================== */
function PaperGrain() {
	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 z-[60] opacity-[0.04]"
			style={{
				backgroundImage:
					"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
				backgroundRepeat: "repeat",
			}}
		/>
	);
}

/* ========================================================================== */
/* Brand mark                                                                  */
/* ========================================================================== */
function Wordmark({ tone = "forest" }: { tone?: "forest" | "paper" }) {
	const color = tone === "paper" ? "text-paper" : "text-forest";
	const accent = tone === "paper" ? "text-sage-soft" : "text-sage";
	return (
		<a
			href="#top"
			className={`group inline-flex items-center gap-2.5 ${color}`}
			aria-label="Verdant — home"
		>
			<Leaf
				strokeWidth={1.5}
				size={22}
				className={`${accent} transition-transform duration-500 ease-organic group-hover:rotate-[10deg]`}
				aria-hidden
			/>
			<span className="font-display text-2xl font-semibold tracking-tight">
				Verdant
			</span>
		</a>
	);
}

/* ========================================================================== */
/* Navbar — desktop horizontal nav + full-screen mobile overlay                */
/* ========================================================================== */
function Navbar() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Lock body scroll + close on Escape while the mobile menu is open.
	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [open]);

	return (
		<header className="fixed inset-x-0 top-0 z-50">
			<div
				className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 ease-organic sm:px-8 ${
					scrolled
						? "my-2.5 rounded-full border border-stone bg-paper/80 py-2.5 shadow-soft backdrop-blur-md sm:my-3"
						: "border border-transparent py-5"
				}`}
			>
				<Wordmark />

				<nav
					className="hidden items-center gap-9 md:flex"
					aria-label="Primary"
				>
					{NAV_LINKS.map((l) => (
						<a
							key={l.href}
							href={l.href}
							className="group relative text-sm font-medium text-forest/75 transition-colors duration-300 hover:text-forest"
						>
							{l.label}
							<span className="absolute -bottom-1.5 left-0 h-px w-0 bg-terracotta transition-all duration-300 ease-organic group-hover:w-full" />
						</a>
					))}
				</nav>

				<div className="hidden items-center gap-3 md:flex">
					<a
						href="#top"
						className="text-sm font-medium text-forest/75 transition-colors duration-300 hover:text-forest"
					>
						Sign in
					</a>
					<ButtonLink href="#pricing" className="h-11 px-6">
						Join
					</ButtonLink>
				</div>

				<button
					type="button"
					onClick={() => setOpen(true)}
					className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone text-forest transition-colors duration-300 hover:bg-clay-soft md:hidden"
					aria-label="Open menu"
					aria-expanded={open}
				>
					<Menu strokeWidth={1.5} size={22} />
				</button>
			</div>

			{/* Mobile overlay — slides down from the top with a backdrop. */}
			<div
				className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
				aria-hidden={!open}
			>
				<div
					className={`absolute inset-0 bg-forest/20 backdrop-blur-sm transition-opacity duration-500 ${
						open ? "opacity-100" : "opacity-0"
					}`}
					onClick={() => setOpen(false)}
				/>
				<div
					className={`absolute inset-x-0 top-0 origin-top rounded-b-[2.5rem] border-b border-stone bg-paper px-6 pb-10 pt-6 shadow-bloom transition-all duration-500 ease-organic ${
						open
							? "translate-y-0 opacity-100"
							: "-translate-y-6 opacity-0"
					}`}
				>
					<div className="flex items-center justify-between">
						<Wordmark />
						<button
							type="button"
							onClick={() => setOpen(false)}
							className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone text-forest transition-colors duration-300 hover:bg-clay-soft"
							aria-label="Close menu"
						>
							<X strokeWidth={1.5} size={22} />
						</button>
					</div>
					<nav className="mt-8 flex flex-col" aria-label="Mobile">
						{NAV_LINKS.map((l, i) => (
							<a
								key={l.href}
								href={l.href}
								onClick={() => setOpen(false)}
								className="border-b border-stone/70 py-4 font-display text-2xl text-forest transition-colors duration-300 hover:text-terracotta"
								style={{
									transitionDelay: open ? `${120 + i * 50}ms` : "0ms",
								}}
							>
								{l.label}
							</a>
						))}
					</nav>
					<ButtonLink
						href="#pricing"
						onClick={() => setOpen(false)}
						className="mt-8 w-full"
					>
						Join Verdant
					</ButtonLink>
				</div>
			</div>
		</header>
	);
}

/* ========================================================================== */
/* Hero — overlapping serif headline, arch image, floating quote card          */
/* ========================================================================== */
function Hero() {
	return (
		<section id="top" className="relative overflow-hidden px-5 pt-32 sm:px-8">
			{/* soft ambient blobs behind everything */}
			<div
				aria-hidden
				className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-sage/15 blur-3xl"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -right-16 top-72 h-80 w-80 rounded-full bg-clay/40 blur-3xl"
			/>

			<div className="mx-auto grid max-w-7xl items-center gap-12 pt-6 md:grid-cols-[1.05fr_0.95fr] lg:gap-20">
				{/* Left: copy */}
				<div className="relative z-10">
					<div className="animate-bloom" style={{ animationDelay: "0.05s" }}>
						<Eyebrow>Slow-grown · Hand-potted</Eyebrow>
					</div>
					<h1
						className="animate-bloom mt-7 text-[clamp(3rem,9vw,6.5rem)] leading-[0.98] tracking-[-0.02em]"
						style={{ animationDelay: "0.15s" }}
					>
						Let your home
						<br />
						<span className="em text-terracotta">breathe</span> again.
					</h1>
					<p
						className="animate-bloom mt-7 max-w-md text-lg text-forest/70"
						style={{ animationDelay: "0.3s" }}
					>
						A seasonal ritual of slow-grown plants and hand-thrown vessels,
						delivered from our glasshouse to your windowsill — warm, tactile,
						and quietly alive.
					</p>
					<div
						className="animate-bloom mt-9 flex flex-wrap items-center gap-4"
						style={{ animationDelay: "0.45s" }}
					>
						<ButtonLink href="#pricing">Begin your ritual</ButtonLink>
						<ButtonLink href="#garden" variant="secondary">
							Wander the garden
						</ButtonLink>
					</div>

					{/* tiny trust row */}
					<div
						className="animate-bloom mt-12 flex items-center gap-4"
						style={{ animationDelay: "0.6s" }}
					>
						<div className="flex -space-x-3">
							{TESTIMONIALS.map((t) => (
								<img
									key={t.avatar}
									src={t.avatar}
									alt=""
									className="h-10 w-10 rounded-full border-2 border-paper object-cover"
									loading="eager"
								/>
							))}
						</div>
						<div className="text-sm leading-tight text-forest/70">
							<span className="flex text-terracotta" aria-hidden>
								{Array.from({ length: 5 }).map((_, i) => (
									<Star key={i} size={14} fill="currentColor" strokeWidth={0} />
								))}
							</span>
							Loved by <span className="font-semibold text-forest">3,400+</span>{" "}
							quiet homes
						</div>
					</div>
				</div>

				{/* Right: arch image + floating quote card */}
				<div className="relative">
					<div
						className="animate-bloom relative mx-auto aspect-[3/4] w-full max-w-md md:aspect-[4/5]"
						style={{ animationDelay: "0.25s" }}
					>
						<ArchImage
							src="/images/hero.svg"
							alt="An illustrated arched greenhouse window filled with light and a grand potted plant."
							priority
							className="h-full w-full"
						/>

						{/* floating glass quote card, slightly overlapping the image */}
						<div className="absolute -bottom-7 -left-5 w-60 rounded-3xl border border-stone/80 bg-paper/70 p-5 shadow-bloom backdrop-blur-md sm:-left-10">
							<Quote
								size={22}
								strokeWidth={1.5}
								className="text-sage"
								aria-hidden
							/>
							<p className="mt-2 font-display text-lg italic leading-snug text-forest">
								“To plant a garden is to believe in tomorrow.”
							</p>
							<p className="mt-2 text-xs uppercase tracking-[0.2em] text-forest/50">
								— Audrey Hepburn
							</p>
						</div>

						{/* small swaying leaf accent, top-right */}
						<div
							className="animate-sway absolute -right-3 -top-3 hidden rounded-full border border-stone bg-clay-soft p-3 shadow-soft sm:block"
							aria-hidden
						>
							<Sprout size={26} strokeWidth={1.5} className="text-sage" />
						</div>
					</div>
				</div>
			</div>

			{/* logo / values marquee */}
			<Marquee />
		</section>
	);
}

/* ========================================================================== */
/* Marquee — quiet, slow scroll of brand values                                */
/* ========================================================================== */
function Marquee() {
	const items = [
		"Peat-free soil",
		"Spring-water roots",
		"Wheel-thrown vessels",
		"Carbon-neutral delivery",
		"Slow propagation",
		"Hand-glazed in studio",
	];
	const row = [...items, ...items];
	return (
		<div className="relative mx-auto mt-24 max-w-7xl overflow-hidden border-y border-stone py-6">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent"
			/>
			<ul className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap pr-12">
				{row.map((t, i) => (
					<li
						key={i}
						className="flex items-center gap-12 text-sm font-medium uppercase tracking-[0.22em] text-forest/55"
					>
						{t}
						<Leaf size={14} strokeWidth={1.5} className="text-sage" aria-hidden />
					</li>
				))}
			</ul>
		</div>
	);
}

/* ========================================================================== */
/* Rituals — staggered feature grid (every 2nd card drops on md+)              */
/* ========================================================================== */
function Rituals() {
	return (
		<section id="rituals" className="px-5 py-24 sm:px-8 md:py-32">
			<div className="mx-auto max-w-7xl">
				<SectionHeading
					centered
					eyebrow="The Rituals"
					title={
						<>
							Tended with <span className="em text-terracotta">intention</span>,
							not haste.
						</>
					}
					intro="Six unhurried practices behind every plant that reaches your door — the small, deliberate acts that let green things settle and thrive."
				/>

				<div className="mt-16 grid gap-6 sm:grid-cols-2 md:mt-20 md:grid-cols-3 md:gap-8">
					{FEATURES.map((f, i) => (
						<Reveal
							key={f.title}
							delay={(i % 3) * 90}
							as="article"
							// stagger: every 2nd card in a row floats down on md+
							className={i % 2 === 1 ? "md:translate-y-12" : ""}
						>
							<div className="group h-full rounded-3xl border border-stone bg-white/70 p-8 shadow-soft transition-all duration-500 ease-organic hover:-translate-y-1.5 hover:border-clay hover:shadow-bloom">
								<IconHalo
									icon={f.icon}
									tone={i % 3 === 2 ? "terracotta" : "sage"}
								/>
								<h3 className="mt-6 text-2xl">{f.title}</h3>
								<p className="mt-3 text-forest/70">{f.body}</p>
								<span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-sage transition-colors duration-300 group-hover:text-terracotta">
									Learn the craft
									<ArrowRight
										size={15}
										strokeWidth={2}
										className="transition-transform duration-300 group-hover:translate-x-1"
										aria-hidden
									/>
								</span>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

/* ========================================================================== */
/* Collections — arched image cards (the "atelier")                            */
/* ========================================================================== */
function Collections() {
	return (
		<section id="atelier" className="bg-cream px-5 py-24 sm:px-8 md:py-32">
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
					<SectionHeading
						eyebrow="The Collections"
						title={
							<>
								Three ways to <span className="em text-terracotta">grow</span>.
							</>
						}
						className="md:max-w-xl"
					/>
					<Reveal delay={120}>
						<ButtonLink href="#pricing" variant="secondary">
							See all memberships
						</ButtonLink>
					</Reveal>
				</div>

				<div className="mt-16 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-10">
					{COLLECTIONS.map((c, i) => (
						<Reveal
							key={c.title}
							delay={i * 110}
							as="article"
							className={i === 1 ? "md:translate-y-14" : ""}
						>
							<a
								href="#pricing"
								className="group block focus-visible:outline-none"
							>
								<ArchImage
									src={c.image}
									alt={c.alt}
									className="aspect-[3/4] w-full"
								/>
								<div className="mt-6">
									<Eyebrow>{c.tag}</Eyebrow>
									<h3 className="mt-3 flex items-baseline gap-2 text-3xl">
										{c.title}{" "}
										<span className="em text-terracotta">{c.emphasis}</span>
									</h3>
									<p className="mt-3 text-forest/70">{c.body}</p>
									<span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-forest transition-colors duration-300 group-hover:text-terracotta">
										Explore
										<ArrowUpRight
											size={16}
											strokeWidth={2}
											className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
											aria-hidden
										/>
									</span>
								</div>
							</a>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

/* ========================================================================== */
/* Stats band — count-up numbers in a clay panel                               */
/* ========================================================================== */
function StatItem({
	value,
	suffix,
	label,
}: {
	value: number;
	suffix: string;
	label: string;
}) {
	const { value: shown, ref } = useCountUp(value);
	return (
		<div className="text-center">
			<div className="font-display text-5xl font-semibold text-forest sm:text-6xl">
				<span ref={ref}>{shown}</span>
				<span className="text-terracotta">{suffix}</span>
			</div>
			<p className="mx-auto mt-3 max-w-[14rem] text-sm text-forest/65">{label}</p>
		</div>
	);
}

function Stats() {
	return (
		<section id="garden" className="px-5 py-24 sm:px-8 md:py-32">
			<div className="mx-auto max-w-7xl">
				<Reveal>
					<div className="relative overflow-hidden rounded-[2.5rem] border border-stone bg-clay/45 px-6 py-16 shadow-medium sm:px-12">
						{/* faint arch watermark */}
						<div
							aria-hidden
							className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border border-sage/30"
						/>
						<div
							aria-hidden
							className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full border border-sage/20"
						/>
						<div className="relative grid grid-cols-2 gap-y-12 gap-x-6 md:grid-cols-4">
							{STATS.map((s) => (
								<StatItem key={s.label} {...s} />
							))}
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}

/* ========================================================================== */
/* Story — overlapping headline + arch image + checklist                       */
/* ========================================================================== */
function Story() {
	const points = [
		"Grown in our own peat-free glasshouse",
		"Vessels thrown & glazed by hand",
		"Delivered upright, never bare-root",
		"Replaced free if it travels unhappy",
	];
	return (
		<section className="px-5 py-24 sm:px-8 md:py-32">
			<div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2 md:gap-20">
				{/* image with overlapping headline */}
				<Reveal className="relative">
					<ArchImage
						src="/images/story.svg"
						alt="An illustrated ceramics-studio windowsill lined with hand-thrown pots and plants."
						rounded="soft"
						className="aspect-[5/6] w-full"
					/>
					{/* a small badge overlapping the image's lower edge */}
					<div className="absolute -bottom-6 right-6 flex items-center gap-3 rounded-full border border-stone bg-paper/80 px-5 py-3 shadow-bloom backdrop-blur-md">
						<MapPin size={18} strokeWidth={1.5} className="text-terracotta" />
						<span className="text-sm font-medium text-forest">
							From our glasshouse
						</span>
					</div>
				</Reveal>

				<div>
					<Reveal>
						<Eyebrow>Our Story</Eyebrow>
					</Reveal>
					<Reveal delay={90}>
						<h2 className="mt-5 text-4xl sm:text-5xl">
							A small studio that
							<br />
							believes in <span className="em text-terracotta">slowness</span>.
						</h2>
					</Reveal>
					<Reveal delay={150}>
						<p className="mt-6 text-lg text-forest/70">
							Verdant began on a single sun-warmed sill with a cutting in a jam
							jar. A decade later we still propagate by hand, throw our own
							vessels, and refuse to rush a living thing. Every box that leaves
							us carries a little of that patience.
						</p>
					</Reveal>
					<ul className="mt-8 space-y-3.5">
						{points.map((p, i) => (
							<Reveal key={p} as="li" delay={200 + i * 70}>
								<span className="flex items-center gap-3 text-forest">
									<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sage/20">
										<Check size={14} strokeWidth={2.5} className="text-sage" />
									</span>
									{p}
								</span>
							</Reveal>
						))}
					</ul>
					<Reveal delay={520}>
						<ButtonLink href="#journal" className="mt-10">
							Read our journal
						</ButtonLink>
					</Reveal>
				</div>
			</div>
		</section>
	);
}

/* ========================================================================== */
/* Pricing — memberships, the middle plan featured (forest, lifted)            */
/* ========================================================================== */
function Pricing() {
	return (
		<section id="pricing" className="bg-cream px-5 py-24 sm:px-8 md:py-32">
			<div className="mx-auto max-w-7xl">
				<SectionHeading
					centered
					eyebrow="Memberships"
					title={
						<>
							Choose your <span className="em text-terracotta">season</span>.
						</>
					}
					intro="No lock-in, ever. Pause, skip, or change tiers whenever the season asks you to."
				/>

				<div className="mt-16 grid items-start gap-8 md:mt-20 lg:grid-cols-3">
					{PLANS.map((p, i) => {
						const featured = p.featured;
						return (
							<Reveal key={p.name} delay={i * 110} as="article">
								<div
									className={`relative flex h-full flex-col rounded-[2rem] border p-8 transition-all duration-500 ease-organic sm:p-9 ${
										featured
											? "border-forest bg-forest text-paper shadow-lift lg:-translate-y-4 lg:scale-[1.02]"
											: "border-stone bg-white/70 shadow-soft hover:-translate-y-1.5 hover:shadow-bloom"
									}`}
								>
									{featured && (
										<span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-terracotta px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-paper shadow-soft">
											Most loved
										</span>
									)}

									<div className="flex items-center gap-3">
										<span
											className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${
												featured ? "bg-paper/10" : "bg-sage/15"
											}`}
										>
											<p.icon
												size={22}
												strokeWidth={1.5}
												className={featured ? "text-paper" : "text-forest"}
												aria-hidden
											/>
										</span>
										<h3
											className={`text-2xl ${featured ? "text-paper" : "text-forest"}`}
										>
											{p.name}
										</h3>
									</div>

									<p
										className={`mt-5 text-sm ${featured ? "text-paper/75" : "text-forest/65"}`}
									>
										{p.blurb}
									</p>

									<div className="mt-7 flex items-baseline gap-1.5">
										<span
											className={`font-display text-5xl font-semibold ${featured ? "text-paper" : "text-forest"}`}
										>
											{p.price}
										</span>
										<span
											className={`text-sm ${featured ? "text-paper/60" : "text-forest/55"}`}
										>
											{p.cadence}
										</span>
									</div>

									<div
										className={`my-7 h-px w-full ${featured ? "bg-paper/15" : "bg-stone"}`}
									/>

									<ul className="space-y-3.5">
										{p.features.map((feat) => (
											<li key={feat} className="flex items-start gap-3">
												<span
													className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
														featured ? "bg-terracotta/30" : "bg-sage/20"
													}`}
												>
													<Check
														size={12}
														strokeWidth={2.5}
														className={
															featured ? "text-paper" : "text-sage"
														}
													/>
												</span>
												<span
													className={`text-sm ${featured ? "text-paper/85" : "text-forest/75"}`}
												>
													{feat}
												</span>
											</li>
										))}
									</ul>

									<div className="mt-auto pt-9">
										{featured ? (
											<ButtonLink
												href="#top"
												className="w-full bg-paper text-forest hover:bg-terracotta hover:text-paper"
											>
												Begin the Grove
											</ButtonLink>
										) : (
											<ButtonLink
												href="#top"
												variant="secondary"
												className="w-full"
											>
												Choose {p.name}
											</ButtonLink>
										)}
									</div>
								</div>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}

/* ========================================================================== */
/* Testimonials — soft clay cards with arch-ish avatars                        */
/* ========================================================================== */
function Testimonials() {
	return (
		<section className="px-5 py-24 sm:px-8 md:py-32">
			<div className="mx-auto max-w-7xl">
				<SectionHeading
					centered
					eyebrow="Kind Words"
					title={
						<>
							Homes that finally <span className="em text-terracotta">exhale</span>.
						</>
					}
				/>
				<div className="mt-16 grid gap-8 md:mt-20 md:grid-cols-3">
					{TESTIMONIALS.map((t, i) => (
						<Reveal
							key={t.name}
							delay={i * 110}
							as="article"
							className={i % 2 === 1 ? "md:translate-y-10" : ""}
						>
							<figure className="flex h-full flex-col rounded-3xl border border-stone bg-clay-soft p-8 shadow-soft transition-all duration-500 ease-organic hover:-translate-y-1.5 hover:shadow-bloom">
								<Quote
									size={30}
									strokeWidth={1.5}
									className="text-sage"
									aria-hidden
								/>
								<blockquote className="mt-4 flex-1 font-display text-xl italic leading-relaxed text-forest">
									“{t.quote}”
								</blockquote>
								<figcaption className="mt-7 flex items-center gap-3.5">
									<img
										src={t.avatar}
										alt=""
										className="h-12 w-12 rounded-full border border-stone object-cover"
										loading="lazy"
									/>
									<div className="leading-tight">
										<div className="font-semibold text-forest">{t.name}</div>
										<div className="text-sm text-forest/60">{t.role}</div>
									</div>
								</figcaption>
							</figure>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

/* ========================================================================== */
/* Journal — blog cards: lift card, scale image, arrow translates right        */
/* ========================================================================== */
function Journal() {
	return (
		<section id="journal" className="bg-cream px-5 py-24 sm:px-8 md:py-32">
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
					<SectionHeading
						eyebrow="The Journal"
						title={
							<>
								Notes from the <span className="em text-terracotta">glasshouse</span>.
							</>
						}
						className="md:max-w-xl"
					/>
					<Reveal delay={120}>
						<ButtonLink href="#journal" variant="secondary">
							All field notes
						</ButtonLink>
					</Reveal>
				</div>

				<div className="mt-16 grid gap-8 md:mt-20 md:grid-cols-3">
					{POSTS.map((post, i) => (
						<Reveal key={post.title} delay={i * 110} as="article">
							<a
								href="#journal"
								className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone bg-white/70 shadow-soft transition-all duration-500 ease-organic hover:-translate-y-1.5 hover:shadow-bloom"
							>
								<div className="overflow-hidden">
									<img
										src={post.image}
										alt={post.alt}
										loading="lazy"
										decoding="async"
										className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-organic group-hover:scale-105"
									/>
								</div>
								<div className="flex flex-1 flex-col p-7">
									<div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
										{post.category}
										<span className="h-1 w-1 rounded-full bg-clay" aria-hidden />
										<span className="text-forest/45">{post.read} read</span>
									</div>
									<h3 className="mt-4 text-2xl leading-snug">{post.title}</h3>
									<p className="mt-3 flex-1 text-forest/70">{post.excerpt}</p>
									<div className="mt-6 flex items-center justify-between">
										<span className="text-sm text-forest/50">{post.date}</span>
										<span className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-forest transition-colors duration-300 group-hover:text-terracotta">
											Read
											<ArrowRight
												size={15}
												strokeWidth={2}
												className="transition-transform duration-300 group-hover:translate-x-1"
												aria-hidden
											/>
										</span>
									</div>
								</div>
							</a>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

/* ========================================================================== */
/* FAQ — accordion with smooth height + opacity, sage focus, rotating plus      */
/* ========================================================================== */
function FaqItem({
	q,
	a,
	open,
	onToggle,
	id,
}: {
	q: string;
	a: string;
	open: boolean;
	onToggle: () => void;
	id: number;
}) {
	const panelRef = useRef<HTMLDivElement>(null);
	const [maxH, setMaxH] = useState(0);
	useEffect(() => {
		const el = panelRef.current;
		if (!el) return;
		setMaxH(open ? el.scrollHeight : 0);
	}, [open]);

	return (
		<div
			className={`rounded-3xl border bg-white/70 px-7 transition-colors duration-500 ${
				open ? "border-clay shadow-soft" : "border-stone"
			}`}
		>
			<h3>
				<button
					type="button"
					onClick={onToggle}
					aria-expanded={open}
					aria-controls={`faq-panel-${id}`}
					id={`faq-trigger-${id}`}
					className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl text-forest transition-colors duration-300 hover:text-terracotta"
				>
					{q}
					<span
						className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-organic ${
							open ? "rotate-45 bg-terracotta text-paper" : "bg-sage/15 text-forest"
						}`}
					>
						<Plus size={18} strokeWidth={2} aria-hidden />
					</span>
				</button>
			</h3>
			<div
				id={`faq-panel-${id}`}
				role="region"
				aria-labelledby={`faq-trigger-${id}`}
				ref={panelRef}
				style={{ maxHeight: maxH }}
				className={`overflow-hidden transition-all duration-500 ease-organic ${
					open ? "opacity-100" : "opacity-0"
				}`}
			>
				<p className="pb-7 pr-12 text-forest/70">{a}</p>
			</div>
		</div>
	);
}

function Faq() {
	const [openId, setOpenId] = useState(0);
	return (
		<section className="px-5 py-24 sm:px-8 md:py-32">
			<div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
				<div>
					<SectionHeading
						eyebrow="Questions"
						title={
							<>
								Before you <span className="em text-terracotta">begin</span>.
							</>
						}
						intro="Everything you might wonder about how Verdant arrives and grows with you."
					/>
					<Reveal delay={200}>
						<div className="mt-8 rounded-3xl border border-stone bg-clay-soft p-6">
							<p className="text-sm text-forest/70">
								Still curious? Write to us at{" "}
								<a
									href="#top"
									className="font-semibold text-terracotta underline-offset-4 hover:underline"
								>
									hello@verdant.studio
								</a>{" "}
								— a real person, usually within a day.
							</p>
						</div>
					</Reveal>
				</div>

				<Reveal delay={120}>
					<div className="space-y-4">
						{FAQS.map((f, i) => (
							<FaqItem
								key={f.q}
								id={i}
								q={f.q}
								a={f.a}
								open={openId === i}
								onToggle={() => setOpenId(openId === i ? -1 : i)}
							/>
						))}
					</div>
				</Reveal>
			</div>
		</section>
	);
}

/* ========================================================================== */
/* CTA + newsletter — arch-topped forest panel with underlined input           */
/* ========================================================================== */
function CtaNewsletter() {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);
	return (
		<section className="px-5 pb-24 sm:px-8 md:pb-32">
			<Reveal>
				<div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-forest-deep bg-forest px-6 py-20 text-center text-paper shadow-lift sm:px-12 md:py-28">
					{/* decorative arch + leaves in the corners */}
					<div
						aria-hidden
						className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full border border-paper/10"
					/>
					<div
						aria-hidden
						className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full border border-paper/10"
					/>
					<div
						aria-hidden
						className="animate-sway-slow pointer-events-none absolute right-10 top-10 hidden text-sage-soft/40 md:block"
					>
						<Leaf size={60} strokeWidth={1} />
					</div>

					<div className="relative mx-auto max-w-2xl">
						<Eyebrow centered className="text-sage-soft">
							Join the glasshouse
						</Eyebrow>
						<h2 className="mt-6 text-4xl text-paper sm:text-5xl md:text-6xl">
							Let something quiet
							<br />
							<span className="em text-terracotta">grow</span> on your sill.
						</h2>
						<p className="mx-auto mt-6 max-w-lg text-lg text-paper/70">
							Begin your seasonal ritual, or simply join the letter for slow
							notes on tending, glazing, and growing.
						</p>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								if (email.trim()) setSent(true);
							}}
							className="mx-auto mt-10 flex max-w-md flex-col items-stretch gap-4 sm:flex-row sm:items-end"
						>
							<label className="flex-1 text-left">
								<span className="sr-only">Email address</span>
								<input
									type="email"
									required
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
										setSent(false);
									}}
									placeholder="you@home.com"
									className="w-full border-0 border-b border-paper/30 bg-transparent pb-2.5 text-paper placeholder:text-paper/40 transition-colors duration-300 focus:border-sage-soft focus:outline-none"
								/>
							</label>
							<Button
								type="submit"
								className="bg-paper text-forest hover:bg-terracotta hover:text-paper sm:px-6"
							>
								{sent ? (
									<>
										Welcome <Check size={16} strokeWidth={2.5} />
									</>
								) : (
									<>
										Subscribe <Send size={15} strokeWidth={2} />
									</>
								)}
							</Button>
						</form>
						<p
							className="mt-4 text-sm text-paper/50"
							aria-live="polite"
						>
							{sent
								? "You're on the list — watch for a little green hello."
								: "Seasonal letters only. Unsubscribe with one tap."}
						</p>
					</div>
				</div>
			</Reveal>
		</section>
	);
}

/* ========================================================================== */
/* Footer — forest, 4-column, wordmark + groups + fine print                   */
/* ========================================================================== */
function Footer() {
	return (
		<footer className="border-t border-forest-deep/40 bg-forest-deep px-5 pb-12 pt-20 text-paper/80 sm:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
					<div>
						<Wordmark tone="paper" />
						<p className="mt-5 max-w-xs text-paper/60">
							A small studio of slow-grown plants and hand-thrown vessels.
							Tended with intention; delivered with care.
						</p>
						<div className="mt-7 flex items-center gap-3">
							{[Instagram, Leaf, Send].map((Icon, i) => (
								<a
									key={i}
									href="#top"
									className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-sage-soft hover:text-paper"
									aria-label="Social link"
								>
									<Icon size={17} strokeWidth={1.5} />
								</a>
							))}
						</div>
					</div>

					{FOOTER_GROUPS.map((g) => (
						<div key={g.title}>
							<h4 className="font-display text-lg text-paper">{g.title}</h4>
							<ul className="mt-5 space-y-3">
								{g.links.map((l) => (
									<li key={l}>
										<a
											href="#top"
											className="text-paper/60 transition-colors duration-300 hover:text-terracotta"
										>
											{l}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-8 text-sm text-paper/50 sm:flex-row">
					<p>© {new Date().getFullYear()} Verdant Studio. Grown by hand.</p>
					<div className="flex items-center gap-6">
						<a href="#top" className="transition-colors hover:text-paper">
							Privacy
						</a>
						<a href="#top" className="transition-colors hover:text-paper">
							Terms
						</a>
						<a href="#top" className="transition-colors hover:text-paper">
							Stockists
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

/* ========================================================================== */
/* App                                                                         */
/* ========================================================================== */
export default function App() {
	// Signal to the verifier that the React tree mounted & first paint is done.
	useEffect(() => {
		document.documentElement.setAttribute("data-ready", "true");
	}, []);

	return (
		<>
			<PaperGrain />
			<Navbar />
			<main>
				<Hero />
				<Rituals />
				<VineDivider className="px-5" />
				<Collections />
				<Stats />
				<Story />
				<Pricing />
				<Testimonials />
				<VineDivider className="px-5" />
				<Journal />
				<Faq />
				<CtaNewsletter />
			</main>
			<Footer />
		</>
	);
}
