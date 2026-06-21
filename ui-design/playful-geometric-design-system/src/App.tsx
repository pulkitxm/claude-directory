/**
 * Blobby — a working landing page that fully expresses the Playful Geometric
 * design system. Organisms here are composed entirely from the primitives in
 * ui.tsx and the ornaments in shapes.tsx, reading every value from the tokens
 * in index.css / tokens.ts. Concept: "stable grid, wild decoration".
 */
import { useEffect, useId, useRef, useState } from "react";
import {
	Menu,
	X,
	Star,
	ArrowUpRight,
	Heart,
	Quote,
	Check,
	Minus,
	Plus as PlusIcon,
} from "lucide-react";
import {
	Button,
	IconBadge,
	StickerCard,
	Field,
	Input,
	Textarea,
	Eyebrow,
	Squiggle,
	Marquee,
	Reveal,
	CheckRow,
	ICON,
} from "./ui.tsx";
import {
	Circle,
	Square,
	Triangle,
	Pill,
	Plus,
	Ring,
	Squig,
} from "./shapes.tsx";
import { HeroScene } from "./illustration.tsx";
import { palette, swatches, radii, typeScale } from "./tokens.ts";
import {
	nav,
	marqueeWords,
	features,
	steps,
	stats,
	pricing,
	testimonials,
	faqs,
	logos,
	footerCols,
	type Tone,
} from "./data.ts";

/* The four data tones (violet/pink/amber/mint) are a strict subset of Pop, so
   a tone can be used directly as a shadow color. A tiny lookup keeps the map
   from a content tone to the matching pop palette swatch readable. */
const TONE_HEX: Record<Tone, string> = {
	violet: palette.accent,
	pink: palette.secondary,
	amber: palette.tertiary,
	mint: palette.quaternary,
};

/* ===========================================================================
   NAV — pill-shaped sticker bar; collapses to a popping mobile sheet.
   =========================================================================== */
function Nav() {
	const [open, setOpen] = useState(false);
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
			<nav
				className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border-2 border-foreground bg-card/95 py-2.5 pl-4 pr-2.5 pop backdrop-blur-sm"
				style={{ ["--pop-x" as string]: "3px", ["--pop-y" as string]: "3px" }}
				aria-label="Primary"
			>
				<a href="#top" className="group flex items-center gap-2.5">
					<span className="grid size-9 place-items-center rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none border-2 border-foreground bg-accent text-white wiggle-hover">
						<Heart size={18} {...ICON} fill="currentColor" />
					</span>
					<span className="font-heading text-step-1 font-extrabold tracking-tight">
						Blobby
					</span>
				</a>

				<ul className="hidden items-center gap-1 md:flex">
					{nav.map((n) => (
						<li key={n.href}>
							<a
								href={n.href}
								className="rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-foreground transition-colors hover:bg-muted"
							>
								{n.label}
							</a>
						</li>
					))}
				</ul>

				<div className="hidden md:block">
					<Button as="a" href="#cta" size="md" icon>
						Start free
					</Button>
				</div>

				<button
					className="grid size-11 place-items-center rounded-full border-2 border-foreground bg-tertiary text-foreground md:hidden"
					aria-label={open ? "Close menu" : "Open menu"}
					aria-expanded={open}
					onClick={() => setOpen((v) => !v)}
				>
					{open ? <X size={20} {...ICON} /> : <Menu size={20} {...ICON} />}
				</button>
			</nav>

			{/* Mobile sheet */}
			{open && (
				<div className="mx-auto mt-3 max-w-6xl rounded-[var(--radius-lg)] border-2 border-foreground bg-card p-4 pop md:hidden">
					<ul className="flex flex-col gap-1.5">
						{nav.map((n) => (
							<li key={n.href}>
								<a
									href={n.href}
									onClick={() => setOpen(false)}
									className="flex items-center justify-between rounded-[var(--radius-md)] border-2 border-transparent px-4 py-3 text-step-1 font-bold hover:border-foreground hover:bg-muted"
								>
									{n.label}
									<ArrowUpRight size={18} {...ICON} />
								</a>
							</li>
						))}
					</ul>
					<div className="mt-3">
						<Button
							as="a"
							href="#cta"
							size="lg"
							icon
							className="w-full"
							onClick={() => setOpen(false)}
						>
							Start free
						</Button>
					</div>
				</div>
			)}
		</header>
	);
}

/* ===========================================================================
   HERO — text left, illustration right. Massive amber circle behind the
   copy; dotted pattern behind the blob illustration; confetti shapes float.
   =========================================================================== */
function Hero() {
	return (
		<section
			id="top"
			className="relative overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-40"
		>
			{/* Background pattern wash */}
			<div
				className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-60"
				aria-hidden="true"
			/>

			{/* Floating confetti — hidden on small screens to avoid text overlap */}
			<Triangle
				className="left-[4%] top-[22%] hidden lg:block"
				rotate={-18}
				float="float"
				size={50}
				color={palette.quaternary}
			/>
			<Ring
				className="right-[3%] top-[16%] hidden lg:block"
				float="slow"
				size={56}
				color={palette.secondary}
			/>
			<Plus
				className="left-[46%] top-[10%] hidden lg:block"
				rotate={12}
				float="float"
				size={38}
				color={palette.tertiary}
			/>
			<Square
				className="bottom-[8%] left-[8%] hidden size-7 lg:block"
				rotate={18}
				float="slow"
				color={palette.secondary}
			/>

			<div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-12 lg:gap-8">
				{/* Copy */}
				<div className="relative lg:col-span-6">
					{/* Massive yellow circle behind the text */}
					<div
						className="pointer-events-none absolute -left-24 -top-24 -z-10 hidden size-[520px] rounded-full sm:block"
						style={{ background: palette.tertiary, opacity: 0.32 }}
						aria-hidden="true"
					/>
					<Reveal>
						<Eyebrow tone="pink">Stable grid · wild decoration</Eyebrow>
					</Reveal>
					<Reveal delay={70}>
						<h1 className="mt-5 text-step-5 sm:text-step-6">
							Build sites that{" "}
							<span className="relative inline-block whitespace-nowrap">
								<span className="relative z-10">smile</span>
								<svg
									viewBox="0 0 220 20"
									className="absolute -bottom-2 left-0 z-0 w-full"
									fill="none"
									aria-hidden="true"
									preserveAspectRatio="none"
								>
									<path
										d="M3 13C40 3 70 3 110 12s70 10 107 0"
										stroke={palette.accent}
										strokeWidth="7"
										strokeLinecap="round"
									/>
								</svg>
							</span>{" "}
							back at you.
						</h1>
					</Reveal>
					<Reveal delay={140}>
						<p className="mt-6 max-w-xl text-step-1 leading-relaxed text-muted-foreground">
							Blobby is a no-code kit for playful, sticker-book brand sites.
							Snap geometric blocks onto a tidy grid, let the confetti palette
							and bouncy motion do the rest, and ship something tactile and fun.
						</p>
					</Reveal>
					<Reveal delay={210}>
						<div className="mt-8 flex flex-wrap items-center gap-4">
							<Button as="a" href="#cta" size="lg" icon>
								Start building free
							</Button>
							<Button as="a" href="#how" size="lg" variant="secondary">
								See how it works
							</Button>
						</div>
					</Reveal>
					<Reveal delay={280}>
						<div className="mt-8 flex items-center gap-3 text-step--1 font-medium text-muted-foreground">
							<span className="flex -space-x-2" aria-hidden="true">
								{[
									palette.accent,
									palette.secondary,
									palette.tertiary,
									palette.quaternary,
								].map((c, i) => (
									<span
										key={i}
										className="grid size-8 place-items-center rounded-full border-2 border-foreground text-[0.7rem] font-bold text-white"
										style={{ background: c }}
									>
										★
									</span>
								))}
							</span>
							Loved by 9,000+ tinkerers building happier pages.
						</div>
					</Reveal>
				</div>

				{/* Illustration */}
				<div className="relative lg:col-span-6">
					<Reveal delay={160}>
						<div className="relative mx-auto max-w-[460px]">
							{/* Dotted pattern behind the image */}
							<div
								className="pointer-events-none absolute -right-6 -top-6 -z-10 hidden size-[360px] rounded-[var(--radius-lg)] dot-grid-accent sm:block"
								aria-hidden="true"
							/>
							<HeroScene />
							{/* Floating sticker callout */}
							<div className="absolute -bottom-4 -left-2 sm:-left-6">
								<StickerCard
									pop="pink"
									interactive={false}
									className="px-4 py-3"
								>
									<div className="flex items-center gap-3">
										<IconBadge icon={Star} tone="amber" size={40} />
										<div className="leading-tight">
											<p className="font-heading text-step-0 font-extrabold">
												No-blur shadows
											</p>
											<p className="text-[0.78rem] text-muted-foreground">
												Pure sticker energy
											</p>
										</div>
									</div>
								</StickerCard>
							</div>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}

/* ===========================================================================
   LOGO MARQUEE + keyword marquee — infinite scrolling strips.
   =========================================================================== */
function MarqueeBand() {
	return (
		<section aria-label="Trusted by and keywords" className="relative py-10">
			{/* Keyword marquee on an accent band, color-inverted */}
			<div className="border-y-2 border-foreground bg-accent py-3">
				<Marquee>
					{marqueeWords.map((w, i) => (
						<span key={`${w}-${i}`} className="flex items-center">
							<span className="px-6 font-heading text-step-1 font-extrabold uppercase tracking-tight text-white">
								{w}
							</span>
							<Star
								size={16}
								className="text-tertiary"
								fill={palette.tertiary}
								{...ICON}
							/>
						</span>
					))}
				</Marquee>
			</div>

			{/* Logo marquee */}
			<div className="mx-auto mt-10 max-w-6xl px-5">
				<p className="mb-6 text-center text-step--1 font-bold uppercase tracking-[0.18em] text-muted-foreground">
					Sticker books shipped by
				</p>
				<Marquee reverse>
					{logos.map((l, i) => (
						<div
							key={`${l.name}-${i}`}
							className="mx-3 flex items-center gap-2.5 rounded-full border-2 border-foreground bg-card px-5 py-2.5"
						>
							<l.icon size={20} className="text-accent" {...ICON} />
							<span className="font-heading text-step-0 font-bold whitespace-nowrap">
								{l.name}
							</span>
						</div>
					))}
				</Marquee>
			</div>
		</section>
	);
}

/* ===========================================================================
   FEATURES — grid of 3 sticker cards connected by a dashed SVG line.
   Floating icon badges sit half-out of each card's top border.
   =========================================================================== */
function Features() {
	return (
		<section id="features" className="relative py-24">
			<div className="mx-auto max-w-6xl px-5">
				<div className="mx-auto max-w-2xl text-center">
					<Reveal>
						<Eyebrow tone="violet">What's in the kit</Eyebrow>
					</Reveal>
					<Reveal delay={70}>
						<h2 className="mt-5 text-step-4 sm:text-step-5">
							Everything pops, nothing chaotic
						</h2>
					</Reveal>
					<Reveal delay={140}>
						<p className="mx-auto mt-4 max-w-xl text-step-1 text-muted-foreground">
							Three building blocks carry the whole personality. Drop them in
							and the system keeps the energy tidy.
						</p>
					</Reveal>
					<Reveal delay={200} className="mt-6 flex justify-center">
						<Squiggle width={200} color={palette.secondary} />
					</Reveal>
				</div>

				<div className="relative mt-20">
					{/* Dashed connector line behind the cards (desktop only) */}
					<svg
						className="pointer-events-none absolute left-0 right-0 top-[40px] -z-0 hidden h-10 w-full lg:block"
						viewBox="0 0 1000 40"
						fill="none"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<path
							d="M170 20H500M500 20H830"
							stroke={palette.foreground}
							strokeWidth="3"
							strokeLinecap="round"
							strokeDasharray="2 12"
						/>
						<circle
							cx="170"
							cy="20"
							r="6"
							fill={palette.tertiary}
							stroke={palette.foreground}
							strokeWidth="3"
						/>
						<circle
							cx="500"
							cy="20"
							r="6"
							fill={palette.secondary}
							stroke={palette.foreground}
							strokeWidth="3"
						/>
						<circle
							cx="830"
							cy="20"
							r="6"
							fill={palette.quaternary}
							stroke={palette.foreground}
							strokeWidth="3"
						/>
					</svg>

					<div className="grid gap-10 sm:gap-8 lg:grid-cols-3">
						{features.map((f, i) => (
							<Reveal key={f.title} delay={i * 110}>
								<StickerCard
									pop={f.tone}
									large
									className="group h-full px-7 pb-7 pt-12"
								>
									{/* Floating icon, half-out of the top border */}
									<div className="absolute -top-7 left-7">
										<IconBadge
											icon={f.icon}
											tone={f.tone}
											size={56}
											shape="blob"
											className="wiggle-hover"
										/>
									</div>
									<h3 className="text-step-2 font-extrabold">{f.title}</h3>
									<p className="mt-3 text-step-0 leading-relaxed text-muted-foreground">
										{f.body}
									</p>
								</StickerCard>
							</Reveal>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

/* ===========================================================================
   HOW IT WORKS — four numbered steps. Squiggle dividers on desktop become
   vertical rules on mobile (responsive strategy).
   =========================================================================== */
function HowItWorks() {
	return (
		<section id="how" className="relative overflow-hidden py-24">
			<div
				className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-60"
				aria-hidden="true"
			/>
			<Pill
				className="left-[-40px] top-[12%] hidden h-16 w-40 lg:block"
				rotate={-16}
				float="slow"
				color={palette.accent}
				style={{ opacity: 0.9 }}
			/>
			<Triangle
				className="right-[2%] bottom-[8%] hidden lg:block"
				rotate={20}
				float="float"
				size={56}
				color={palette.tertiary}
			/>

			<div className="mx-auto max-w-6xl px-5">
				<div className="max-w-2xl">
					<Reveal>
						<Eyebrow tone="amber">Four happy moves</Eyebrow>
					</Reveal>
					<Reveal delay={70}>
						<h2 className="mt-5 text-step-4 sm:text-step-5">
							From blank to bouncy in minutes
						</h2>
					</Reveal>
				</div>

				<ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
					{steps.map((s, i) => (
						<Reveal as="li" key={s.title} delay={i * 90} className="relative">
							{/* Vertical rule between items on mobile; squiggle handles desktop */}
							<div className="flex flex-col gap-4">
								<div className="flex items-center gap-3">
									<IconBadge
										icon={s.icon}
										tone={s.tone}
										size={52}
										shape="squircle"
									/>
									<span className="font-heading text-step-4 font-extrabold text-foreground/15">
										{String(i + 1).padStart(2, "0")}
									</span>
								</div>
								<span className="text-step--1 font-bold uppercase tracking-[0.14em] text-muted-foreground">
									{s.kicker}
								</span>
								<h3 className="-mt-2 text-step-2 font-extrabold">{s.title}</h3>
								<p className="text-step-0 leading-relaxed text-muted-foreground">
									{s.body}
								</p>
							</div>
							{i < steps.length - 1 && (
								<Squig
									className="-right-6 top-8 hidden lg:block"
									color={palette.secondary}
									size={48}
								/>
							)}
						</Reveal>
					))}
				</ol>
			</div>
		</section>
	);
}

/* ===========================================================================
   STATS — a color-blocked band, one big number per pop color.
   =========================================================================== */
function Stats() {
	return (
		<section aria-label="By the numbers" className="px-4 py-10">
			<div className="mx-auto max-w-6xl rounded-[var(--radius-lg)] border-2 border-foreground bg-foreground p-8 sm:p-10">
				<div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
					{stats.map((s, i) => (
						<Reveal key={s.label} delay={i * 90} className="text-center">
							<div
								className="font-heading text-step-5 font-extrabold leading-none sm:text-step-6"
								style={{ color: TONE_HEX[s.tone] }}
							>
								{s.value}
							</div>
							<div className="mt-2 text-step-0 font-medium text-white/70">
								{s.label}
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

/* ===========================================================================
   PRICING — three tiers; the middle one scales up 1.1 and wears a rotated
   yellow star badge reading "MOST POPULAR".
   =========================================================================== */
function StarBadge() {
	return (
		<div className="absolute -right-4 -top-7 z-20 rotate-[15deg]">
			<div className="relative grid place-items-center">
				<svg viewBox="0 0 120 120" className="size-28" aria-hidden="true">
					<path
						d="M60 4l13 26 29 4-21 21 5 29-26-14-26 14 5-29L18 34l29-4L60 4Z"
						fill={palette.tertiary}
						stroke={palette.foreground}
						strokeWidth="4"
						strokeLinejoin="round"
					/>
				</svg>
				<span className="absolute text-center font-heading text-[0.62rem] font-extrabold uppercase leading-tight tracking-tight text-foreground">
					Most
					<br />
					popular
				</span>
			</div>
		</div>
	);
}

function Pricing() {
	return (
		<section id="pricing" className="relative overflow-hidden py-24">
			<Plus
				className="left-[5%] top-[14%] hidden lg:block"
				rotate={18}
				float="slow"
				size={36}
				color={palette.secondary}
			/>
			<Ring
				className="right-[6%] top-[20%] hidden lg:block"
				float="float"
				size={48}
				color={palette.quaternary}
			/>

			<div className="mx-auto max-w-6xl px-5">
				<div className="mx-auto max-w-2xl text-center">
					<Reveal>
						<Eyebrow tone="mint">Pick a sticker pack</Eyebrow>
					</Reveal>
					<Reveal delay={70}>
						<h2 className="mt-5 text-step-4 sm:text-step-5">
							Plans as cheerful as the pages
						</h2>
					</Reveal>
					<Reveal delay={140}>
						<p className="mx-auto mt-4 max-w-xl text-step-1 text-muted-foreground">
							Start free forever. Upgrade when your sticker book outgrows a
							single page. No blur, no fine print.
						</p>
					</Reveal>
				</div>

				<div className="mt-16 grid items-center gap-12 sm:gap-7 lg:grid-cols-3">
					{pricing.map((p, i) => {
						return (
							<Reveal
								key={p.name}
								delay={i * 110}
								className={p.featured ? "lg:z-10" : ""}
							>
								<StickerCard
									pop={p.featured ? "pink" : "soft"}
									large={p.featured}
									interactive={!p.featured}
									className={
										"relative h-full px-7 py-8 " +
										(p.featured ? "lg:scale-[1.08] bg-card" : "")
									}
								>
									{p.featured && <StarBadge />}
									<div className="flex items-center gap-3">
										<span
											className="size-4 rounded-full border-2 border-foreground"
											style={{ background: TONE_HEX[p.tone] }}
											aria-hidden="true"
										/>
										<h3 className="font-heading text-step-2 font-extrabold">
											{p.name}
										</h3>
									</div>
									<p className="mt-3 min-h-[3rem] text-step-0 text-muted-foreground">
										{p.blurb}
									</p>
									<div className="mt-4 flex items-end gap-1.5">
										<span className="font-heading text-step-5 font-extrabold leading-none">
											{p.price}
										</span>
										<span className="pb-1.5 text-step-0 font-medium text-muted-foreground">
											{p.cadence}
										</span>
									</div>

									<div
										className="my-6 h-0.5 w-full"
										style={{ background: palette.border }}
										aria-hidden="true"
									/>

									<ul className="flex flex-col gap-3">
										{p.includes.map((inc) => (
											<CheckRow key={inc} tone={p.tone}>
												{inc}
											</CheckRow>
										))}
									</ul>

									<div className="mt-8">
										<Button
											as="a"
											href="#cta"
											size="lg"
											icon={p.featured}
											variant={p.featured ? "primary" : "secondary"}
											className="w-full"
										>
											{p.cta}
										</Button>
									</div>
								</StickerCard>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}

/* ===========================================================================
   TESTIMONIALS — sticker quote cards, each with a colored avatar initial chip.
   =========================================================================== */
function Testimonials() {
	return (
		<section id="loved" className="relative py-24">
			<div className="mx-auto max-w-6xl px-5">
				<div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
					<div className="max-w-xl">
						<Reveal>
							<Eyebrow tone="pink">Smiles all round</Eyebrow>
						</Reveal>
						<Reveal delay={70}>
							<h2 className="mt-5 text-step-4 sm:text-step-5">
								People grin when it loads
							</h2>
						</Reveal>
					</div>
					<Reveal delay={140}>
						<div
							className="flex items-center gap-2 rounded-full border-2 border-foreground bg-tertiary px-4 py-2 font-heading text-step-0 font-bold pop"
							style={{
								["--pop-x" as string]: "3px",
								["--pop-y" as string]: "3px",
							}}
						>
							<Star size={18} {...ICON} fill={palette.foreground} />
							4.9 / 5 average
						</div>
					</Reveal>
				</div>

				<div className="mt-14 grid gap-8 lg:grid-cols-3">
					{testimonials.map((t, i) => (
						<Reveal key={t.name} delay={i * 110}>
							<StickerCard
								pop={t.tone}
								className="group flex h-full flex-col p-7"
							>
								<Quote
									size={34}
									className="text-foreground/20 wiggle-hover"
									{...ICON}
								/>
								<p className="mt-3 grow text-step-1 font-medium leading-relaxed text-foreground">
									“{t.quote}”
								</p>
								<div className="mt-6 flex items-center gap-3 border-t-2 border-dashed border-border pt-5">
									<span
										className="grid size-11 place-items-center rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none border-2 border-foreground font-heading text-step-0 font-extrabold"
										style={{
											background: TONE_HEX[t.tone],
											color:
												t.tone === "amber" || t.tone === "mint"
													? palette.foreground
													: "#fff",
										}}
										aria-hidden="true"
									>
										{t.initials}
									</span>
									<div className="leading-tight">
										<p className="font-heading text-step-0 font-bold">
											{t.name}
										</p>
										<p className="text-[0.82rem] text-muted-foreground">
											{t.role}
										</p>
									</div>
								</div>
							</StickerCard>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

/* ===========================================================================
   TOKEN GALLERY — the system shown to itself: swatches, radii, type scale,
   and a live primitive line-up. Makes the "centralized tokens" idea tangible.
   =========================================================================== */
function TokenGallery() {
	return (
		<section id="tokens" className="relative overflow-hidden py-24">
			<div
				className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-50"
				aria-hidden="true"
			/>
			<div className="mx-auto max-w-6xl px-5">
				<div className="max-w-2xl">
					<Reveal>
						<Eyebrow tone="violet">Under the hood</Eyebrow>
					</Reveal>
					<Reveal delay={70}>
						<h2 className="mt-5 text-step-4 sm:text-step-5">
							One token set, endless stickers
						</h2>
					</Reveal>
					<Reveal delay={140}>
						<p className="mt-4 max-w-xl text-step-1 text-muted-foreground">
							Every shape on this page reads from the same place: a warm paper
							base, a slate foreground, four pop colors, varied radii and a
							single hard shadow. Centralized, so a tweak ripples everywhere.
						</p>
					</Reveal>
				</div>

				<div className="mt-12 grid gap-7 lg:grid-cols-12">
					{/* Color tokens */}
					<Reveal className="lg:col-span-7">
						<StickerCard interactive={false} className="h-full p-7">
							<h3 className="text-step-1 font-extrabold">Color tokens</h3>
							<div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
								{swatches.map((s) => (
									<div key={s.name} className="group">
										<div
											className="aspect-square w-full rounded-[var(--radius-md)] border-2 border-foreground transition-transform duration-300 ease-bounce group-hover:-rotate-2 group-hover:scale-105"
											style={{ background: s.value }}
										/>
										<p className="mt-2 font-heading text-[0.82rem] font-bold">
											{s.name}
										</p>
										<p className="font-mono text-[0.68rem] uppercase text-muted-foreground">
											{s.value}
										</p>
									</div>
								))}
							</div>
						</StickerCard>
					</Reveal>

					{/* Radii + type */}
					<div className="grid gap-7 lg:col-span-5">
						<Reveal delay={90}>
							<StickerCard interactive={false} className="p-7">
								<h3 className="text-step-1 font-extrabold">Radii</h3>
								<div className="mt-5 flex items-end gap-4">
									{radii.map((r) => (
										<div key={r.name} className="text-center">
											<div
												className="size-14 border-2 border-foreground bg-accent"
												style={{
													borderRadius: r.px > 100 ? "9999px" : r.value,
												}}
											/>
											<p className="mt-2 font-heading text-[0.78rem] font-bold">
												{r.name}
											</p>
											<p className="text-[0.66rem] text-muted-foreground">
												{r.value}
											</p>
										</div>
									))}
								</div>
							</StickerCard>
						</Reveal>
						<Reveal delay={150}>
							<StickerCard interactive={false} className="p-7">
								<h3 className="text-step-1 font-extrabold">
									Type scale · 1.25
								</h3>
								<div className="mt-4 flex flex-col gap-2">
									{typeScale.map((t) => (
										<div
											key={t.step}
											className="flex items-baseline justify-between gap-3 border-b border-dashed border-border pb-1.5"
										>
											<span
												className="font-heading font-extrabold leading-none"
												style={{ fontSize: `min(${t.size}, 7vw)` }}
											>
												{t.sample}
											</span>
											<span className="shrink-0 font-mono text-[0.66rem] text-muted-foreground">
												{t.size}
											</span>
										</div>
									))}
								</div>
							</StickerCard>
						</Reveal>
					</div>

					{/* Live primitives line-up */}
					<Reveal delay={120} className="lg:col-span-12">
						<StickerCard interactive={false} className="p-7">
							<h3 className="text-step-1 font-extrabold">Live primitives</h3>
							<div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-8">
								<Button>Candy button</Button>
								<Button variant="secondary">Outline</Button>
								<Button icon>With chip</Button>
								<span className="relative inline-flex h-12 w-32">
									<Pill
										className="left-0 top-1 h-10 w-32"
										rotate={0}
										color={palette.accent}
										style={{ position: "relative" }}
									/>
								</span>
								<span
									className="relative inline-grid size-12 place-items-center rounded-full border-2 border-foreground"
									style={{ background: palette.tertiary }}
								>
									<Star size={20} {...ICON} />
								</span>
								<span className="relative inline-block">
									<Squiggle
										width={120}
										color={palette.secondary}
										className="block"
									/>
								</span>
								<span className="relative inline-block size-12">
									<Triangle
										rotate={0}
										size={48}
										color={palette.quaternary}
										style={{ position: "relative" }}
									/>
								</span>
							</div>
						</StickerCard>
					</Reveal>
				</div>
			</div>
		</section>
	);
}

/* ===========================================================================
   FAQ — accordion. First item open; high-contrast headers; rotating +/- icon.
   =========================================================================== */
function Faq() {
	const [open, setOpen] = useState(0);
	const baseId = useId();
	return (
		<section id="faq" className="py-24">
			<div className="mx-auto max-w-3xl px-5">
				<div className="text-center">
					<Reveal>
						<Eyebrow tone="amber">Good questions</Eyebrow>
					</Reveal>
					<Reveal delay={70}>
						<h2 className="mt-5 text-step-4 sm:text-step-5">
							The things people ask
						</h2>
					</Reveal>
				</div>

				<div className="mt-12 flex flex-col gap-4">
					{faqs.map((f, i) => {
						const isOpen = open === i;
						const panelId = `${baseId}-panel-${i}`;
						const btnId = `${baseId}-btn-${i}`;
						return (
							<Reveal key={f.q} delay={i * 70}>
								<div
									className="rounded-[var(--radius-lg)] border-2 border-foreground bg-card pop"
									style={{
										["--pop-x" as string]: "4px",
										["--pop-y" as string]: "4px",
										["--pop-color" as string]: isOpen
											? palette.accent
											: palette.border,
									}}
								>
									<h3>
										<button
											id={btnId}
											aria-expanded={isOpen}
											aria-controls={panelId}
											onClick={() => setOpen(isOpen ? -1 : i)}
											className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
										>
											<span className="font-heading text-step-1 font-extrabold">
												{f.q}
											</span>
											<span
												className={
													"grid size-9 shrink-0 place-items-center rounded-full border-2 border-foreground transition-all duration-300 ease-bounce " +
													(isOpen
														? "rotate-180 bg-accent text-white"
														: "bg-tertiary text-foreground")
												}
												aria-hidden="true"
											>
												{isOpen ? (
													<Minus size={18} {...ICON} />
												) : (
													<PlusIcon size={18} {...ICON} />
												)}
											</span>
										</button>
									</h3>
									<div
										id={panelId}
										role="region"
										aria-labelledby={btnId}
										hidden={!isOpen}
										className="px-6 pb-5"
									>
										<p className="text-step-0 leading-relaxed text-muted-foreground">
											{f.a}
										</p>
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

/* ===========================================================================
   CTA — bold accent block with the email-capture form. Inputs show the
   focus-only hard color shadow; submit gives a cheerful inline confirmation.
   =========================================================================== */
function Cta() {
	const [sent, setSent] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	return (
		<section id="cta" className="px-4 py-20">
			<div
				className="relative mx-auto max-w-6xl overflow-hidden rounded-[var(--radius-lg)] border-2 border-foreground bg-accent p-8 pop-lg sm:p-12 lg:p-16"
				style={{
					["--pop-color" as string]: palette.foreground,
					boxShadow: "10px 10px 0 0 " + palette.foreground,
				}}
			>
				{/* Decorative shapes inside the block (desktop) */}
				<div
					className="pointer-events-none absolute inset-0 dot-grid-accent opacity-30"
					aria-hidden="true"
				/>
				<Triangle
					className="right-6 top-6 hidden sm:block"
					rotate={20}
					float="float"
					size={48}
					color={palette.tertiary}
				/>
				<Circle
					className="bottom-6 left-8 hidden size-10 sm:block"
					float="slow"
					color={palette.secondary}
				/>

				<div className="relative grid items-center gap-10 lg:grid-cols-2">
					<div className="text-white">
						<Reveal>
							<span className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-3.5 py-1.5 text-step--1 font-bold uppercase tracking-[0.14em] text-foreground">
								<span
									className="size-2.5 rounded-full border-2 border-foreground bg-quaternary"
									aria-hidden="true"
								/>
								Free forever plan
							</span>
						</Reveal>
						<Reveal delay={70}>
							<h2 className="mt-5 text-step-4 text-white sm:text-step-5">
								Ready to make the web grin?
							</h2>
						</Reveal>
						<Reveal delay={140}>
							<p className="mt-4 max-w-md text-step-1 text-white/85">
								Drop your email and we’ll send a starter sticker book. No card,
								no blur, just bouncy little pages.
							</p>
						</Reveal>
						<Reveal delay={210}>
							<ul className="mt-6 flex flex-col gap-3 text-white">
								{[
									"No credit card",
									"Cancel anytime",
									"AAA accessible by default",
								].map((t) => (
									<li key={t} className="flex items-center gap-3">
										<span
											className="grid size-6 shrink-0 place-items-center rounded-full border-2 border-foreground bg-quaternary text-foreground"
											aria-hidden="true"
										>
											<Check size={14} strokeWidth={3.5} />
										</span>
										<span className="text-step-0 font-medium">{t}</span>
									</li>
								))}
							</ul>
						</Reveal>
					</div>

					<Reveal delay={160}>
						<StickerCard interactive={false} large className="p-7 sm:p-8">
							{sent ? (
								<div
									className="flex flex-col items-center gap-4 py-8 text-center"
									role="status"
									aria-live="polite"
								>
									<IconBadge icon={Check} tone="mint" size={64} shape="blob" />
									<h3 className="text-step-2 font-extrabold">
										You’re on the list!
									</h3>
									<p className="max-w-xs text-step-0 text-muted-foreground">
										Check your inbox — your starter sticker book is bouncing
										your way.
									</p>
									<Button variant="secondary" onClick={() => setSent(false)}>
										Send another
									</Button>
								</div>
							) : (
								<form
									ref={formRef}
									noValidate
									onSubmit={(e) => {
										e.preventDefault();
										if (formRef.current?.checkValidity()) setSent(true);
										else formRef.current?.reportValidity();
									}}
									className="flex flex-col gap-5"
								>
									<h3 className="font-heading text-step-2 font-extrabold">
										Grab your kit
									</h3>
									<Field label="Your name" htmlFor="cta-name">
										<Input
											id="cta-name"
											name="name"
											required
											placeholder="Ada Doodle"
											autoComplete="name"
										/>
									</Field>
									<Field
										label="Email"
										htmlFor="cta-email"
										hint="we'll never spam"
									>
										<Input
											id="cta-email"
											name="email"
											type="email"
											required
											placeholder="you@studio.com"
											autoComplete="email"
										/>
									</Field>
									<Field label="What are you building?" htmlFor="cta-note">
										<Textarea
											id="cta-note"
											name="note"
											rows={3}
											placeholder="A bouncy little portfolio…"
										/>
									</Field>
									<Button type="submit" size="lg" icon className="w-full">
										Send me the kit
									</Button>
									<p className="text-center text-[0.78rem] text-muted-foreground">
										By joining you agree to our perfectly friendly terms.
									</p>
								</form>
							)}
						</StickerCard>
					</Reveal>
				</div>
			</div>
		</section>
	);
}

/* ===========================================================================
   FOOTER — link columns + a final squiggle sign-off.
   =========================================================================== */
function Footer() {
	return (
		<footer className="border-t-2 border-foreground bg-card">
			<div className="mx-auto max-w-6xl px-5 py-16">
				<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
					<div>
						<a href="#top" className="flex items-center gap-2.5">
							<span className="grid size-9 place-items-center rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none border-2 border-foreground bg-accent text-white">
								<Heart size={18} {...ICON} fill="currentColor" />
							</span>
							<span className="font-heading text-step-1 font-extrabold">
								Blobby
							</span>
						</a>
						<p className="mt-4 max-w-xs text-step-0 text-muted-foreground">
							The playful geometric kit for sites that smile. Stable grid, wild
							decoration.
						</p>
						<div className="mt-5 flex gap-3" aria-hidden="true">
							{[
								palette.accent,
								palette.secondary,
								palette.tertiary,
								palette.quaternary,
							].map((c, i) => (
								<span
									key={i}
									className="size-6 rounded-full border-2 border-foreground"
									style={{ background: c }}
								/>
							))}
						</div>
					</div>
					{footerCols.map((col) => (
						<div key={col.title}>
							<h3 className="text-step--1 font-bold uppercase tracking-[0.14em] text-foreground">
								{col.title}
							</h3>
							<ul className="mt-4 flex flex-col gap-2.5">
								{col.links.map((l) => (
									<li key={l}>
										<a
											href="#top"
											className="group inline-flex items-center gap-1 text-step-0 text-muted-foreground transition-colors hover:text-foreground"
										>
											{l}
											<ArrowUpRight
												size={14}
												className="opacity-0 transition-opacity group-hover:opacity-100"
												{...ICON}
											/>
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-12 flex justify-center">
					<Squiggle width={260} color={palette.border} />
				</div>

				<div className="mt-8 flex flex-col items-center justify-between gap-4 border-t-2 border-dashed border-border pt-8 text-step--1 text-muted-foreground sm:flex-row">
					<p>
						© {new Date().getFullYear()} Blobby. A Playful Geometric showcase.
					</p>
					<p className="flex items-center gap-1.5">
						Made with
						<Heart
							size={14}
							className="text-secondary"
							fill={palette.secondary}
							{...ICON}
						/>
						and a lot of hard shadows.
					</p>
				</div>
			</div>
		</footer>
	);
}

/* ===========================================================================
   APP — composes the page. Sets data-ready for the headless verifier once the
   first paint settles.
   =========================================================================== */
export function App() {
	useEffect(() => {
		const id = requestAnimationFrame(() =>
			document.documentElement.setAttribute("data-ready", "true"),
		);
		return () => cancelAnimationFrame(id);
	}, []);

	return (
		<>
			<a
				href="#top"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:border-2 focus:border-foreground focus:bg-tertiary focus:px-4 focus:py-2 focus:font-bold"
			>
				Skip to content
			</a>
			<Nav />
			<main>
				<Hero />
				<MarqueeBand />
				<Features />
				<HowItWorks />
				<Stats />
				<Pricing />
				<Testimonials />
				<TokenGallery />
				<Faq />
				<Cta />
			</main>
			<Footer />
		</>
	);
}
