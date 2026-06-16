import { useEffect, useState } from "react";
import {
	ArrowRight,
	ArrowUpRight,
	Check,
	ChevronDown,
	Circle,
	Grid2x2,
	Layers,
	Menu,
	Quote,
	Ruler,
	Square,
	Triangle,
	X,
} from "lucide-react";
import {
	ACCENT_BG,
	ACCENT_TEXT_ON,
	BrandMark,
	Btn,
	Card,
	Container,
	cx,
	Eyebrow,
	Section,
	Shape,
} from "./ui";
import {
	BENEFITS,
	FAQS,
	FEATURES,
	NAV_LINKS,
	PLANS,
	POSTS,
	STATS,
	STEPS,
	TESTIMONIALS,
} from "./data";

/* Maps a feature's icon key to a lucide component. */
const FEATURE_ICON = {
	circle: Circle,
	square: Square,
	triangle: Triangle,
	grid: Grid2x2,
	ruler: Ruler,
	layers: Layers,
} as const;

/* ============================================================== Navbar === */

function Navbar() {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-b-2 border-ink bg-canvas/95 backdrop-blur-sm sm:border-b-4">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
				<a
					href="#top"
					className="flex items-center gap-3"
					aria-label="WERKBUND home"
				>
					<BrandMark size={34} />
					<span className="text-xl font-black uppercase tracking-tighter sm:text-2xl">
						Werkbund
					</span>
				</a>

				<nav className="hidden items-center gap-8 md:flex">
					{NAV_LINKS.map((l) => (
						<a
							key={l.href}
							href={l.href}
							className="text-sm font-bold uppercase tracking-wider transition-colors duration-200 hover:text-bauhaus-red"
						>
							{l.label}
						</a>
					))}
				</nav>

				<div className="hidden md:block">
					<Btn variant="red">
						Start Building
						<ArrowRight className="size-4" strokeWidth={3} />
					</Btn>
				</div>

				<button
					className="flex size-11 items-center justify-center border-2 border-ink bg-bauhaus-yellow shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none md:hidden"
					onClick={() => setOpen((v) => !v)}
					aria-label={open ? "Close menu" : "Open menu"}
					aria-expanded={open}
				>
					{open ? (
						<X className="size-5" strokeWidth={3} />
					) : (
						<Menu className="size-5" strokeWidth={3} />
					)}
				</button>
			</div>

			{open && (
				<div className="border-t-2 border-ink bg-canvas md:hidden">
					<nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
						{NAV_LINKS.map((l) => (
							<a
								key={l.href}
								href={l.href}
								onClick={() => setOpen(false)}
								className="flex items-center justify-between border-b-2 border-ink/15 py-3 text-sm font-bold uppercase tracking-wider last:border-b-0"
							>
								{l.label}
								<ArrowUpRight className="size-4" strokeWidth={3} />
							</a>
						))}
						<div className="py-3">
							<Btn variant="red" className="w-full">
								Start Building
								<ArrowRight className="size-4" strokeWidth={3} />
							</Btn>
						</div>
					</nav>
				</div>
			)}
		</header>
	);
}

/* =============================================================== Hero ==== */

function Hero() {
	return (
		<Section id="top">
			<div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
				{/* Left — type-driven manifesto */}
				<div className="flex flex-col justify-center gap-7 px-4 py-14 sm:px-6 sm:py-20 lg:border-r-4 lg:border-ink lg:px-12 lg:py-28">
					<div className="animate-rise" style={{ animationDelay: "60ms" }}>
						<Eyebrow accent="red">Bauhaus Design System · Est. 1919</Eyebrow>
					</div>

					<h1 className="animate-rise text-5xl font-black uppercase leading-[0.86] tracking-tighter sm:text-7xl lg:text-8xl"
						style={{ animationDelay: "140ms" }}>
						Form
						<br />
						Follows
						<br />
						<span className="relative inline-block">
							<span className="relative z-10">Function</span>
							<span
								aria-hidden
								className="absolute -bottom-1 left-0 -z-0 h-4 w-full bg-bauhaus-yellow sm:h-6"
							/>
						</span>
					</h1>

					<p className="animate-rise max-w-md text-lg font-medium leading-relaxed text-ink/80"
						style={{ animationDelay: "220ms" }}>
						A design system built like a 1920s poster. Three primary colours,
						thick black borders, hard offset shadows — every screen{" "}
						<span className="font-bold">constructed</span>, never merely
						decorated.
					</p>

					<div className="animate-rise flex flex-wrap items-center gap-4"
						style={{ animationDelay: "300ms" }}>
						<Btn variant="red">
							Start Building
							<ArrowRight className="size-4" strokeWidth={3} />
						</Btn>
						<Btn variant="outline">View the Grid</Btn>
					</div>

					<div className="animate-rise flex items-center gap-6 pt-2"
						style={{ animationDelay: "380ms" }}>
						<div className="flex -space-x-2">
							{TESTIMONIALS.map((t) => (
								<img
									key={t.name}
									src={t.img}
									alt=""
									className="size-9 rounded-full border-2 border-ink object-cover grayscale"
								/>
							))}
						</div>
						<p className="text-sm font-bold uppercase tracking-wider">
							Trusted by 6,000+ builders
						</p>
					</div>
				</div>

				{/* Right — blue color-blocked geometric composition */}
				<div className="relative min-h-[460px] overflow-hidden bg-bauhaus-blue bg-dotgrid-light lg:min-h-0">
					{/* big spinning ring */}
					<Shape
						kind="circle"
						className="animate-spin-slower absolute -left-20 -top-20 size-72 border-[10px] border-ink/20"
					/>
					{/* rotated outline square */}
					<span
						aria-hidden
						className="absolute right-8 top-12 size-32 rotate-12 border-4 border-ink bg-bauhaus-yellow shadow-hard-md sm:size-40"
					/>
					{/* big red circle */}
					<Shape
						kind="circle"
						className="absolute -bottom-10 -left-8 size-52 border-4 border-ink bg-bauhaus-red shadow-hard-md sm:size-64"
					/>
					{/* centerpiece: square holding a triangle, slightly rotated */}
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
						<div className="relative grid size-44 -rotate-6 place-items-center border-4 border-ink bg-white shadow-hard-lg sm:size-56">
							<span
								aria-hidden
								className="clip-triangle size-28 bg-bauhaus-blue sm:size-36"
							/>
							<Shape
								kind="circle"
								className="absolute bottom-5 right-5 size-7 border-2 border-ink bg-bauhaus-yellow"
							/>
						</div>
					</div>
					{/* floating ticket: poster credit */}
					<div className="absolute bottom-5 right-5 max-w-[210px] border-2 border-ink bg-white px-4 py-3 shadow-hard-sm">
						<p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink/60">
							Composition № 01
						</p>
						<p className="text-sm font-bold leading-tight">
							Circle · Square · Triangle
						</p>
					</div>
				</div>
			</div>
		</Section>
	);
}

/* ============================================================= Marquee === */

function Marquee() {
	const words = [
		"GEOMETRY",
		"FUNCTION",
		"PRIMARIES",
		"HARD SHADOW",
		"THICK BORDER",
		"ASYMMETRY",
		"CONSTRUCTED",
	];
	const row = [...words, ...words];
	return (
		<Section className="overflow-hidden bg-ink py-4">
			<div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
				{row.map((w, i) => (
					<span key={i} className="flex items-center gap-8">
						<span className="text-xl font-black uppercase tracking-tight text-canvas sm:text-2xl">
							{w}
						</span>
						<Shape
							kind={i % 3 === 0 ? "circle" : i % 3 === 1 ? "square" : "triangle"}
							className={cx(
								"size-4",
								i % 3 === 0
									? "bg-bauhaus-red"
									: i % 3 === 1
										? "bg-bauhaus-blue"
										: "bg-bauhaus-yellow",
							)}
						/>
					</span>
				))}
			</div>
		</Section>
	);
}

/* =============================================================== Stats === */

function Stats() {
	return (
		<Section className="bg-bauhaus-yellow bg-dotgrid-dark">
			<div className="mx-auto grid max-w-7xl grid-cols-1 divide-y-2 divide-ink sm:grid-cols-2 sm:divide-x-2 lg:grid-cols-4 lg:divide-y-0">
				{STATS.map((s, i) => (
					<div
						key={s.label}
						className={cx(
							"group flex flex-col items-center gap-4 px-6 py-12 text-center",
							i >= 2 && "sm:border-t-2 sm:border-ink lg:border-t-0",
						)}
					>
						<div className="grid place-items-center">
							{s.shape === "triangle" ? (
								<span className="relative grid size-20 place-items-center">
									<Shape
										kind="triangle"
										className="absolute inset-0 size-20 bg-bauhaus-red transition-transform duration-300 group-hover:scale-110"
									/>
									<span className="relative z-10 mt-3 text-2xl font-black text-white">
										{s.value}
									</span>
								</span>
							) : (
								<span
									className={cx(
										"grid size-20 place-items-center border-4 border-ink text-2xl font-black transition-transform duration-300 group-hover:scale-110",
										s.shape === "circle" ? "rounded-full" : "rotate-6",
										ACCENT_BG[s.accent],
										ACCENT_TEXT_ON[s.accent],
									)}
								>
									{s.value}
								</span>
							)}
						</div>
						<p className="text-sm font-bold uppercase tracking-widest text-ink/80">
							{s.label}
						</p>
					</div>
				))}
			</div>
		</Section>
	);
}

/* ============================================================ Features === */

function Features() {
	return (
		<Section id="features">
			<Container>
				<div className="mb-12 flex flex-col gap-5 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
					<div className="flex flex-col gap-4">
						<Eyebrow accent="blue">The System</Eyebrow>
						<h2 className="max-w-2xl text-4xl font-black uppercase leading-[0.9] tracking-tighter sm:text-5xl lg:text-6xl">
							Built from
							<br />
							first principles
						</h2>
					</div>
					<p className="max-w-sm text-lg font-medium leading-relaxed text-ink/75">
						Six structural rules. No subtle effects, no guesswork — only honest,
						declarative composition.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((f) => {
						const Icon = FEATURE_ICON[f.icon];
						return (
							<Card
								key={f.title}
								corner={f.accent}
								cornerKind={
									f.accent === "red"
										? "circle"
										: f.accent === "blue"
											? "square"
											: "triangle"
								}
								className="group flex flex-col gap-5 p-7"
							>
								<span
									className={cx(
										"grid size-14 place-items-center border-2 border-ink shadow-hard-sm transition-transform duration-300 group-hover:scale-105",
										ACCENT_BG[f.accent],
									)}
								>
									<Icon
										className={cx(
											"size-7",
											ACCENT_TEXT_ON[f.accent],
										)}
										strokeWidth={2.5}
									/>
								</span>
								<h3 className="text-2xl font-black uppercase tracking-tight">
									{f.title}
								</h3>
								<p className="text-base font-medium leading-relaxed text-ink/75">
									{f.body}
								</p>
							</Card>
						);
					})}
				</div>
			</Container>
		</Section>
	);
}

/* ============================================================= Process === */

function Process() {
	return (
		<Section id="process" className="bg-bauhaus-blue bg-dotgrid-light">
			<Container>
				<div className="mb-14 flex flex-col gap-4 text-center">
					<div className="flex justify-center">
						<Eyebrow accent="yellow" onDark>
							How It Works
						</Eyebrow>
					</div>
					<h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white sm:text-5xl lg:text-6xl">
						Four moves to a poster
					</h2>
				</div>

				<div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
					{/* connecting line (desktop only) */}
					<div
						aria-hidden
						className="absolute left-0 right-0 top-10 hidden h-1 bg-white/40 md:block"
					/>
					{STEPS.map((s, i) => (
						<div key={s.title} className="relative flex flex-col items-center gap-5 text-center">
							<div
								className={cx(
									"relative z-10 grid size-20 place-items-center border-4 border-ink bg-white shadow-hard-md",
									i % 3 === 2 ? "rotate-45" : "rotate-0",
								)}
							>
								<span
									className={cx(
										"text-3xl font-black",
										i % 3 === 2 && "-rotate-45",
									)}
								>
									{i + 1}
								</span>
							</div>
							<h3 className="text-xl font-black uppercase tracking-tight text-white">
								{s.title}
							</h3>
							<p className="text-base font-medium leading-relaxed text-white/80">
								{s.body}
							</p>
						</div>
					))}
				</div>
			</Container>
		</Section>
	);
}

/* ============================================================ Benefits === */

function Benefits() {
	return (
		<Section className="bg-bauhaus-red bg-hatch">
			<Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
				<div className="flex flex-col gap-6">
					<Eyebrow accent="yellow" onDark>
						Why Constraints Win
					</Eyebrow>
					<h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white sm:text-5xl lg:text-6xl">
						Less to decide.
						<br />
						More to ship.
					</h2>
					<p className="max-w-md text-lg font-medium leading-relaxed text-white/90">
						A rigid system is a creative engine, not a cage. When the palette,
						borders and shadows are fixed, you spend your energy on
						composition — where it counts.
					</p>
					<div className="pt-2">
						<Btn variant="ondark">
							Read the Manifesto
							<ArrowRight className="size-4" strokeWidth={3} />
						</Btn>
					</div>
				</div>

				<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{BENEFITS.map((b) => (
						<li
							key={b}
							className="flex items-start gap-3 border-2 border-ink bg-white p-4 shadow-hard-sm"
						>
							<span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border-2 border-ink bg-bauhaus-yellow">
								<Check className="size-4" strokeWidth={3} />
							</span>
							<span className="text-sm font-bold leading-snug">{b}</span>
						</li>
					))}
				</ul>
			</Container>
		</Section>
	);
}

/* ============================================================= Pricing === */

function Pricing() {
	return (
		<Section id="pricing">
			<Container>
				<div className="mb-14 flex flex-col items-center gap-4 text-center">
					<Eyebrow accent="red">Plans</Eyebrow>
					<h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter sm:text-5xl lg:text-6xl">
						Pick a workbench
					</h2>
					<p className="max-w-md text-lg font-medium leading-relaxed text-ink/75">
						Flat, honest pricing. No tiers hidden behind a sales call.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					{PLANS.map((p) => (
						<div
							key={p.name}
							className={cx(
								"relative flex flex-col border-2 border-ink bg-white sm:border-4",
								p.featured
									? "shadow-hard-xl lg:-translate-y-4"
									: "shadow-hard-md",
							)}
						>
							{p.featured && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2 border-2 border-ink bg-bauhaus-red px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-hard-sm">
									Most Built
								</div>
							)}

							<div
								className={cx(
									"flex items-center justify-between border-b-2 border-ink p-7 sm:border-b-4",
									ACCENT_BG[p.accent],
								)}
							>
								<div>
									<h3
										className={cx(
											"text-2xl font-black uppercase tracking-tight",
											ACCENT_TEXT_ON[p.accent],
										)}
									>
										{p.name}
									</h3>
									<p
										className={cx(
											"text-sm font-bold",
											p.accent === "yellow"
												? "text-ink/70"
												: "text-white/80",
										)}
									>
										{p.blurb}
									</p>
								</div>
								<Shape
									kind={
										p.accent === "red"
											? "circle"
											: p.accent === "blue"
												? "square"
												: "triangle"
									}
									className={cx(
										"size-8 shrink-0",
										p.accent === "yellow" ? "" : "border-2 border-ink",
										"bg-white",
									)}
								/>
							</div>

							<div className="flex flex-1 flex-col gap-6 p-7">
								<div className="flex items-end gap-2">
									<span className="text-5xl font-black tracking-tighter">
										{p.price}
									</span>
									<span className="pb-1.5 text-sm font-bold uppercase tracking-wider text-ink/60">
										/ {p.cadence}
									</span>
								</div>
								<ul className="flex flex-col gap-3">
									{p.features.map((f) => (
										<li key={f} className="flex items-start gap-3">
											<span
												className={cx(
													"mt-0.5 grid size-5 shrink-0 place-items-center rounded-none border-2 border-ink",
													ACCENT_BG[p.accent],
												)}
											>
												<Check
													className={cx(
														"size-3",
														ACCENT_TEXT_ON[p.accent],
													)}
													strokeWidth={4}
												/>
											</span>
											<span className="text-sm font-medium leading-snug text-ink/85">
												{f}
											</span>
										</li>
									))}
								</ul>
								<div className="mt-auto pt-2">
									<Btn
										variant={p.featured ? "red" : "outline"}
										className="w-full"
									>
										Choose {p.name}
									</Btn>
								</div>
							</div>
						</div>
					))}
				</div>
			</Container>
		</Section>
	);
}

/* ========================================================= Testimonials == */

function Testimonials() {
	return (
		<Section className="bg-muted">
			<Container>
				<div className="mb-12 flex flex-col gap-4">
					<Eyebrow accent="blue">From the Workshop</Eyebrow>
					<h2 className="max-w-3xl text-4xl font-black uppercase leading-[0.9] tracking-tighter sm:text-5xl lg:text-6xl">
						Builders on the grid
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{TESTIMONIALS.map((t) => (
						<Card
							key={t.name}
							corner={t.accent}
							cornerKind={
								t.accent === "red"
									? "circle"
									: t.accent === "blue"
										? "square"
										: "triangle"
							}
							className="flex flex-col gap-5 p-7"
						>
							<Quote
								className={cx(
									"size-9",
									t.accent === "red"
										? "text-bauhaus-red"
										: t.accent === "blue"
											? "text-bauhaus-blue"
											: "text-bauhaus-yellow",
								)}
								strokeWidth={2.5}
								fill="currentColor"
							/>
							<p className="text-lg font-bold leading-snug">"{t.quote}"</p>
							<div className="mt-auto flex items-center gap-3 border-t-2 border-ink/15 pt-5">
								<img
									src={t.img}
									alt={t.name}
									className="size-12 rounded-full border-2 border-ink object-cover grayscale transition-all duration-300 hover:grayscale-0"
								/>
								<div>
									<p className="text-sm font-black uppercase tracking-tight">
										{t.name}
									</p>
									<p className="text-xs font-bold uppercase tracking-wider text-ink/55">
										{t.role}
									</p>
								</div>
							</div>
						</Card>
					))}
				</div>
			</Container>
		</Section>
	);
}

/* ============================================================= Journal === */

function Journal() {
	return (
		<Section id="journal" className="bg-bauhaus-blue bg-dotgrid-light">
			<Container>
				<div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
					<div className="flex flex-col gap-4">
						<Eyebrow accent="yellow" onDark>
							Journal
						</Eyebrow>
						<h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white sm:text-5xl lg:text-6xl">
							Notes from the press
						</h2>
					</div>
					<a
						href="#journal"
						className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:text-bauhaus-yellow"
					>
						All articles
						<ArrowUpRight
							className="size-4 transition-transform group-hover:translate-x-0.5"
							strokeWidth={3}
						/>
					</a>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{POSTS.map((p) => (
						<article
							key={p.title}
							className="group flex flex-col border-2 border-ink bg-white shadow-hard-md transition-transform duration-200 ease-out hover:-translate-y-1.5 sm:border-4"
						>
							<div className="overflow-hidden border-b-2 border-ink sm:border-b-4">
								<img
									src={p.img}
									alt=""
									className={cx(
										"h-48 w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0",
										p.round && "scale-105",
									)}
								/>
							</div>
							<div className="flex flex-1 flex-col gap-4 p-6">
								<div className="flex items-center gap-3">
									<span className="border-2 border-ink bg-bauhaus-yellow px-2.5 py-1 text-xs font-bold uppercase tracking-widest">
										{p.tag}
									</span>
									<span className="text-xs font-bold uppercase tracking-widest text-ink/55">
										{p.read} read
									</span>
								</div>
								<h3 className="text-xl font-black uppercase leading-tight tracking-tight">
									{p.title}
								</h3>
								<a
									href="#journal"
									className="mt-auto inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-bauhaus-red transition-colors group-hover:text-ink"
								>
									Read
									<ArrowRight className="size-4" strokeWidth={3} />
								</a>
							</div>
						</article>
					))}
				</div>
			</Container>
		</Section>
	);
}

/* ================================================================ FAQ ==== */

function Faq() {
	const [openIdx, setOpenIdx] = useState<number | null>(0);
	return (
		<Section>
			<Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
				<div className="flex flex-col gap-4">
					<Eyebrow accent="red">Questions</Eyebrow>
					<h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter sm:text-5xl">
						Frequently
						<br />
						constructed
					</h2>
					<p className="max-w-sm text-lg font-medium leading-relaxed text-ink/75">
						Everything you might ask before laying the first shape on the grid.
					</p>
					<div
						aria-hidden
						className="mt-4 hidden items-center gap-3 lg:flex"
					>
						<Shape kind="circle" className="size-8 border-2 border-ink bg-bauhaus-red" />
						<Shape kind="square" className="size-8 border-2 border-ink bg-bauhaus-blue" />
						<Shape kind="triangle" className="size-9 bg-bauhaus-yellow" />
					</div>
				</div>

				<div className="flex flex-col gap-4">
					{FAQS.map((f, i) => {
						const isOpen = openIdx === i;
						return (
							<div
								key={f.q}
								className={cx(
									"border-2 border-ink shadow-hard-sm transition-colors duration-200 sm:border-4",
									isOpen ? "bg-bauhaus-red" : "bg-white",
								)}
							>
								<button
									className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
									onClick={() => setOpenIdx(isOpen ? null : i)}
									aria-expanded={isOpen}
								>
									<span
										className={cx(
											"text-lg font-black uppercase tracking-tight sm:text-xl",
											isOpen ? "text-white" : "text-ink",
										)}
									>
										{f.q}
									</span>
									<ChevronDown
										className={cx(
											"size-6 shrink-0 transition-transform duration-300",
											isOpen ? "rotate-180 text-white" : "text-ink",
										)}
										strokeWidth={3}
									/>
								</button>
								<div
									className={cx(
										"grid transition-all duration-300 ease-out",
										isOpen
											? "grid-rows-[1fr] opacity-100"
											: "grid-rows-[0fr] opacity-0",
									)}
								>
									<div className="overflow-hidden">
										<p className="border-t-2 border-ink bg-faq-cream px-5 py-4 text-base font-medium leading-relaxed sm:border-t-4 sm:px-6 sm:py-5">
											{f.a}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</Container>
		</Section>
	);
}

/* ============================================================ Final CTA == */

function FinalCta() {
	return (
		<Section className="relative overflow-hidden bg-bauhaus-yellow">
			{/* large decorative shapes at low opacity in the corners */}
			<Shape
				kind="circle"
				className="absolute -left-24 -top-24 size-72 border-[12px] border-ink/40"
			/>
			<span
				aria-hidden
				className="absolute -bottom-24 -right-20 size-72 rotate-12 border-[12px] border-ink/40"
			/>
			<Container className="relative z-10 flex flex-col items-center gap-8 text-center">
				<div className="flex items-center gap-3">
					<Shape kind="circle" className="size-6 border-2 border-ink bg-bauhaus-red" />
					<Shape kind="square" className="size-6 border-2 border-ink bg-bauhaus-blue" />
					<Shape kind="triangle" className="size-7 bg-ink" />
				</div>
				<h2 className="max-w-4xl text-4xl font-black uppercase leading-[0.86] tracking-tighter sm:text-6xl lg:text-7xl">
					Stop decorating.
					<br />
					Start constructing.
				</h2>
				<p className="max-w-xl text-lg font-medium leading-relaxed text-ink/80">
					Lay your first shape on the grid today. Free to start, no card, no
					ornament you don't need.
				</p>
				<div className="flex flex-wrap items-center justify-center gap-4">
					<Btn variant="red">
						Start Building
						<ArrowRight className="size-4" strokeWidth={3} />
					</Btn>
					<Btn variant="outline">Book a Walkthrough</Btn>
				</div>
			</Container>
		</Section>
	);
}

/* ============================================================== Footer === */

function Footer() {
	const cols = [
		{ title: "System", links: ["Primitives", "Tokens", "Color", "Typography"] },
		{ title: "Studio", links: ["Process", "Plans", "Journal", "Manifesto"] },
		{ title: "Company", links: ["About", "Careers", "Contact", "Press"] },
	];
	return (
		<footer className="bg-ink text-canvas">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
				<div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
					<div className="flex flex-col gap-5">
						<div className="flex items-center gap-3">
							<BrandMark size={34} />
							<span className="text-2xl font-black uppercase tracking-tighter">
								Werkbund
							</span>
						</div>
						<p className="max-w-xs text-sm font-medium leading-relaxed text-canvas/70">
							A Bauhaus design system rendered as a working landing page. Form
							follows function — circle, square, triangle.
						</p>
						<div className="flex items-center gap-2 pt-1">
							<Shape kind="circle" className="size-5 bg-bauhaus-red" />
							<Shape kind="square" className="size-5 bg-bauhaus-blue" />
							<Shape kind="triangle" className="size-6 bg-bauhaus-yellow" />
						</div>
					</div>
					{cols.map((c) => (
						<div key={c.title} className="flex flex-col gap-4">
							<p className="text-xs font-bold uppercase tracking-widest text-canvas/50">
								{c.title}
							</p>
							<ul className="flex flex-col gap-2.5">
								{c.links.map((l) => (
									<li key={l}>
										<a
											href="#top"
											className="text-sm font-bold uppercase tracking-wide text-canvas/85 transition-colors hover:text-bauhaus-yellow"
										>
											{l}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-12 flex flex-col items-start justify-between gap-4 border-t-2 border-canvas/20 pt-6 sm:flex-row sm:items-center">
					<p className="text-xs font-bold uppercase tracking-widest text-canvas/55">
						© {new Date().getFullYear()} Werkbund. A design-system demo.
					</p>
					<p className="text-xs font-bold uppercase tracking-widest text-canvas/55">
						Form Follows Function
					</p>
				</div>
			</div>
		</footer>
	);
}

/* =============================================================== App ===== */

export default function App() {
	// Mark page ready so the recorder's load wait resolves predictably.
	useEffect(() => {
		document.documentElement.dataset.ready = "true";
	}, []);

	return (
		<div className="min-h-screen bg-canvas text-ink">
			<Navbar />
			<main>
				<Hero />
				<Marquee />
				<Stats />
				<Features />
				<Process />
				<Benefits />
				<Pricing />
				<Testimonials />
				<Journal />
				<Faq />
				<FinalCta />
			</main>
			<Footer />
		</div>
	);
}
