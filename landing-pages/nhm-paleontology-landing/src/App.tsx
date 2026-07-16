import {
	ArrowRight,
	ArrowUpRight,
	Bone,
	BookOpen,
	Dna,
	Gem,
	Leaf,
	Plus,
} from "lucide-react";
import type { Variants } from "motion/react";
import { AnimatePresence, motion, usePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

const VIDEO_URL =
	"./assets/magnific_use-img-2-as-the-exact-ba_Piu3X0W42C_wnrc8f.mp4";

const PTERODACTYL_URL =
	"./assets/ChatGPT_Image_May_23_2026_12_24_44_PM_1_lv1dne.png";

const chaptersData = [
	{
		name: "Age of Dinosaurs",
		image: "./assets/01_udnber.png",
	},
	{
		name: "Fossils of Ancient Life",
		image: "./assets/02_pmvxxl.png",
	},
	{
		name: "Reptiles of the Mesozoic",
		image: "./assets/03_hcp3jc.png",
	},
	{
		name: "Marine Fossil Gallery",
		image: "./assets/04_get63z.png",
	},
	{
		name: "Prehistoric Giants",
		image: "./assets/05_kz1tyu.png",
	},
];

const NAV_LINKS = ["Visit", "Exhibitions", "Discover", "Learn", "About"];

const ACTION_PILLS = [
	{ icon: Bone, label: "Dinosaurs" },
	{ icon: Dna, label: "Ancient Life" },
	{ icon: Gem, label: "Minerals" },
	{ icon: Leaf, label: "Fossils" },
	{ icon: BookOpen, label: "Learn More" },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
};

const fadeUpTransition = { duration: 0.8, ease: "easeOut" as const };

const letterBlock: Variants = {
	initial: { y: 120, opacity: 0 },
	animate: {
		y: 0,
		opacity: 1,
		transition: { duration: 1.2, ease: EASE },
	},
};

const logoVariants: Variants = {
	initial: { scale: 1.03 },
	animate: {
		scale: 1,
		transition: {
			duration: 1.2,
			ease: EASE,
			staggerChildren: 0.06,
			delayChildren: 0.1,
		},
	},
};

const staggerHeader: Variants = {
	animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const staggerLeft: Variants = {
	animate: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } },
};

const staggerRight: Variants = {
	animate: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } },
};

const staggerPills: Variants = {
	animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

/* ------------------------------------------------------------------ */
/* SandTransitionImage — SVG-filter based sand/particle dissolve       */
/* ------------------------------------------------------------------ */

let sandFilterInstance = 0;

function SandTransitionImage({
	src,
	alt,
	className,
}: {
	src: string;
	alt: string;
	className?: string;
}) {
	const [isPresent, safeToRemove] = usePresence();
	const filterId = useRef(`sand-filter-${++sandFilterInstance}`).current;
	const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
	const offsetRef = useRef<SVGFEOffsetElement>(null);
	const blurRef = useRef<SVGFEGaussianBlurElement>(null);
	const colorRef = useRef<SVGFEColorMatrixElement>(null);

	useEffect(() => {
		const DURATION = 900;
		const entering = isPresent;
		let start: number | null = null;
		let frame = 0;

		// dissolve: 0 = fully resolved image, 1 = fully scattered into sand
		const applyDissolve = (dissolve: number) => {
			const alpha = Math.max(0, 1 - dissolve * 1.2);
			displacementRef.current?.setAttribute("scale", String(150 * dissolve));
			offsetRef.current?.setAttribute(
				"dx",
				String((entering ? -30 : 30) * dissolve),
			);
			offsetRef.current?.setAttribute(
				"dy",
				String((entering ? -80 : 120) * dissolve),
			);
			blurRef.current?.setAttribute("stdDeviation", String(6 * dissolve));
			colorRef.current?.setAttribute(
				"values",
				`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${alpha} 0`,
			);
		};

		const tick = (now: number) => {
			if (start === null) start = now;
			const t = Math.min(1, (now - start) / DURATION);
			const eased = entering ? 1 - (1 - t) ** 4 : t ** 3;
			applyDissolve(entering ? 1 - eased : eased);
			if (t < 1) {
				frame = requestAnimationFrame(tick);
			} else if (!entering) {
				safeToRemove();
			}
		};

		applyDissolve(entering ? 1 : 0);
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [isPresent, safeToRemove]);

	return (
		<>
			<svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
				<defs>
					<filter
						id={filterId}
						x="-50%"
						y="-50%"
						width="200%"
						height="200%"
						colorInterpolationFilters="sRGB"
					>
						<feTurbulence
							type="fractalNoise"
							baseFrequency="1.8"
							numOctaves="4"
							result="sandNoise"
						/>
						<feDisplacementMap
							ref={displacementRef}
							in="SourceGraphic"
							in2="sandNoise"
							scale="0"
							xChannelSelector="R"
							yChannelSelector="G"
							result="displaced"
						/>
						<feOffset
							ref={offsetRef}
							in="displaced"
							dx="0"
							dy="0"
							result="drifted"
						/>
						<feGaussianBlur
							ref={blurRef}
							in="drifted"
							stdDeviation="0"
							result="softened"
						/>
						<feColorMatrix
							ref={colorRef}
							in="softened"
							type="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
						/>
					</filter>
				</defs>
			</svg>
			<img
				src={src}
				alt={alt}
				crossOrigin="anonymous"
				referrerPolicy="no-referrer"
				className={className}
				style={{ filter: `url(#${filterId})` }}
			/>
		</>
	);
}

/* ------------------------------------------------------------------ */
/* Custom leaf icon for the CTA button (4 paths, stylized leaf)        */
/* ------------------------------------------------------------------ */

function LeafIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<path d="M12 21V9" />
			<path d="M12 13C8.2 13 5.2 10.6 4.5 6.5C8.6 5.9 11.5 8.4 12 13Z" />
			<path d="M12 13C15.8 13 18.8 10.6 19.5 6.5C15.4 5.9 12.5 8.4 12 13Z" />
			<path d="M12 9C12 5.8 13.2 3.8 15.5 2.8" />
		</svg>
	);
}

/* ------------------------------------------------------------------ */
/* NHM logotype — geometric polygon letterforms                        */
/* ------------------------------------------------------------------ */

const LOGO_LETTERS: { translate: string; polygons: string[] }[] = [
	{
		// N
		translate: "translate(0,0)",
		polygons: [
			"0,0 14,0 14,100 0,100",
			"200,0 214,0 214,100 200,100",
			"0,0 33,0 214,100 181,100",
		],
	},
	{
		// H
		translate: "translate(280,0)",
		polygons: [
			"0,0 14,0 14,100 0,100",
			"200,0 214,0 214,100 200,100",
			"14,43 200,43 200,57 14,57",
		],
	},
	{
		// M
		translate: "translate(560,0)",
		polygons: [
			"0,0 14,0 14,100 0,100",
			"266,0 280,0 280,100 266,100",
			"0,0 26,0 153,100 127,100",
			"254,0 280,0 153,100 127,100",
		],
	},
];

/* ------------------------------------------------------------------ */
/* App                                                                  */
/* ------------------------------------------------------------------ */

export default function App() {
	const [showVideo, setShowVideo] = useState(false);
	const [activeChapter, setActiveChapter] = useState(2); // starts at "Reptiles of the Mesozoic"
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setShowVideo(true), 2800);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const interval = setInterval(
			() => setActiveChapter((prev) => (prev + 1) % 5),
			3500,
		);
		return () => clearInterval(interval);
	}, []);

	return (
		<main className="w-full">
			{/* ============================================================ */}
			{/* SECTION 1 — HERO                                             */}
			{/* ============================================================ */}
			<section className="relative flex min-h-screen w-full flex-col overflow-hidden">
				{/* 1D. Background video */}
				<AnimatePresence>
					{showVideo && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1.4, ease: "easeOut" }}
							className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full"
						>
							<video
								autoPlay
								loop
								muted
								playsInline
								src={VIDEO_URL}
								className="h-full w-full object-cover"
							/>
						</motion.div>
					)}
				</AnimatePresence>

				{/* 1A. Header — NHM logotype */}
				<motion.header
					initial="initial"
					animate="animate"
					variants={staggerHeader}
					className="relative z-20 px-6 pt-6 md:px-16"
				>
					<motion.h1 variants={logoVariants} className="w-full">
						<span className="sr-only">NHM — Natural History Museum</span>
						<svg
							viewBox="0 0 840 100"
							className="w-full overflow-hidden fill-[#111]"
							aria-hidden="true"
						>
							{LOGO_LETTERS.map((letter) => (
								<g key={letter.translate} transform={letter.translate}>
									{letter.polygons.map((points) => (
										<motion.polygon
											key={points}
											variants={letterBlock}
											points={points}
										/>
									))}
								</g>
							))}
						</svg>
					</motion.h1>

					{/* 1B. Sub-nav bar */}
					<motion.div
						variants={fadeUp}
						transition={fadeUpTransition}
						className="mt-8 flex items-start justify-between gap-3 font-mono text-[10px] tracking-[0.2em] uppercase md:text-[11px]"
					>
						<div className="w-[15%]">
							<p>Natura</p>
							<p>History</p>
							<p>Museum</p>
						</div>

						<div className="hidden w-[5%] justify-center md:flex">
							<ArrowRight size={14} strokeWidth={1} className="text-gray-400" />
						</div>

						<div className="flex-1 leading-relaxed font-mono text-gray-800 md:flex-none md:w-[30%]">
							<p className="hidden md:block">
								Exploring the story of life
								<br />
								on earth through science,
								<br />
								discovery and wonder.
							</p>
							<p className="md:hidden">
								Exploring the story
								<br />
								of life on earth
								<br />
								through science,
								<br />
								discovery and wonder.
							</p>
						</div>

						<div className="hidden w-[5%] justify-center md:flex">
							<ArrowRight size={14} strokeWidth={1} className="text-gray-400" />
						</div>

						<nav className="hidden w-[15%] md:block">
							<ul className="space-y-1 text-gray-800">
								{NAV_LINKS.map((link) => (
									<li key={link}>
										<a
											href="#"
											className="transition-colors hover:text-black hover:underline"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</nav>

						<button
							type="button"
							aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
							aria-expanded={isMobileMenuOpen}
							onClick={() => setIsMobileMenuOpen((open) => !open)}
							className="group z-60 flex flex-col items-end gap-[6px] py-2 pl-4 md:hidden"
						>
							<span
								className={`h-[1.5px] bg-black transition-all duration-300 ${
									isMobileMenuOpen
										? "w-8 translate-y-[3.75px] rotate-45"
										: "w-8 group-hover:w-6"
								}`}
							/>
							<span
								className={`h-[1.5px] bg-black transition-all duration-300 ${
									isMobileMenuOpen
										? "w-8 -translate-y-[3.75px] -rotate-45"
										: "w-8 group-hover:w-10"
								}`}
							/>
						</button>
					</motion.div>

					{/* 1C. Mobile menu overlay */}
					<AnimatePresence>
						{isMobileMenuOpen && (
							<motion.div
								initial={{ y: -20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: -20, opacity: 0 }}
								transition={{ duration: 0.4, ease: EASE }}
								className="absolute top-full right-0 left-0 z-50 border-b border-gray-200 bg-[#fcfcfc] shadow-xl md:hidden"
							>
								<nav className="px-6 py-10">
									<ul className="space-y-6 font-mono text-sm tracking-[0.2em] uppercase">
										{NAV_LINKS.map((link) => (
											<li key={link}>
												<a
													href="#"
													onClick={() => setIsMobileMenuOpen(false)}
													className="transition-colors hover:text-black hover:underline"
												>
													{link}
												</a>
											</li>
										))}
									</ul>
								</nav>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.header>

				{/* Hero body — left + right sidebars */}
				<div className="relative z-10 flex w-full flex-1 items-start justify-between">
					{/* 1E. Left sidebar content */}
					<motion.div
						initial="initial"
						animate="animate"
						variants={staggerLeft}
						className="mt-20 w-[320px] px-10 sm:mt-28 md:mt-32 md:px-16"
					>
						<motion.div
							variants={fadeUp}
							transition={fadeUpTransition}
							className="flex items-center gap-4 font-mono text-xs"
						>
							<span>01</span>
							<span className="h-[1.5px] w-16 bg-black/20" />
						</motion.div>

						<motion.h2
							variants={fadeUp}
							transition={fadeUpTransition}
							className="mt-6 text-[3.5rem] leading-[1] font-normal tracking-tight md:text-[5rem]"
						>
							TIMELESS
							<br />
							WONDERS
						</motion.h2>

						<motion.p
							variants={fadeUp}
							transition={fadeUpTransition}
							className="mt-6 w-[240px] text-[13px] leading-[1.6] text-gray-700 md:text-[14px]"
						>
							Step into the natural world and
							<br />
							discover the stories written
							<br />
							millions of years ago.
						</motion.p>

						<motion.div
							variants={fadeUp}
							transition={fadeUpTransition}
							className="mt-10"
						>
							<button
								type="button"
								className="group relative overflow-hidden rounded-md border border-[#1a1a1a] bg-[#1a1a1a] px-6 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-[0.5px] hover:shadow-[3px_3px_0px_rgba(17,17,17,0.5)] active:translate-y-0 active:shadow-sm"
							>
								<span
									aria-hidden="true"
									className="absolute inset-0 -translate-x-[101%] bg-[#fcfcfc] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
								/>
								<span className="relative flex items-center gap-3">
									<LeafIcon className="h-5 w-5 text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 group-hover:-translate-y-1 group-hover:text-[#111]" />
									<span className="text-[15px] font-medium text-white transition-colors duration-500 group-hover:text-[#111]">
										Explore Now
									</span>
								</span>
							</button>
						</motion.div>
					</motion.div>

					{/* 1F. Right sidebar (hidden on mobile) */}
					<motion.div
						initial="initial"
						animate="animate"
						variants={staggerRight}
						className="mt-12 mr-10 hidden w-[200px] flex-col gap-10 md:mt-20 md:mr-16 md:flex"
					>
						<motion.div variants={fadeUp} transition={fadeUpTransition}>
							<h3 className="font-mono text-[10px] font-bold tracking-widest uppercase">
								Tyrannosaurus Rex
							</h3>
							<p className="mt-2 text-[12px] leading-[1.6] text-gray-600">
								Late Cretaceous period
								<br />
								68-66 million years ago
							</p>
						</motion.div>

						<motion.div
							variants={fadeUp}
							transition={fadeUpTransition}
							className="flex gap-10"
						>
							<div>
								<p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">
									Length
								</p>
								<p className="mt-1 text-[13px] font-medium">12.3 m</p>
							</div>
							<div>
								<p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">
									Height
								</p>
								<p className="mt-1 text-[13px] font-medium">4.0 m</p>
							</div>
						</motion.div>

						<motion.button
							type="button"
							variants={fadeUp}
							transition={fadeUpTransition}
							className="group flex items-center gap-4"
						>
							<span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 transition-colors duration-300 group-hover:border-black group-hover:bg-[#111]">
								<Plus
									size={16}
									strokeWidth={1.5}
									className="transition-colors duration-300 group-hover:text-white"
								/>
							</span>
							<span className="font-mono text-[10px] font-bold tracking-widest uppercase">
								View Details
							</span>
						</motion.button>
					</motion.div>
				</div>

				{/* 1G. Bottom-left "Scroll to explore" */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
					className="absolute bottom-10 left-[2.5rem] z-10 hidden items-center gap-4 md:left-[4rem] md:flex"
				>
					<span className="flex h-12 w-12 items-center justify-center gap-[4px] rounded-full border border-gray-300">
						<span className="h-[12px] w-[1px] bg-gray-600" />
						<span className="h-[12px] w-[1px] bg-gray-600" />
					</span>
					<span className="font-mono text-[10px] font-semibold tracking-widest text-gray-500 uppercase">
						Scroll to explore
					</span>
				</motion.div>
			</section>

			{/* ============================================================ */}
			{/* SECTION 2 — EXPLORE OUR WORLD                                */}
			{/* ============================================================ */}
			<section className="relative z-20 flex min-h-[75vh] w-full flex-col items-center bg-[#fcfcfc] pt-24 pb-0 md:min-h-screen md:pt-32">
				{/* 2A. Section label */}
				<p className="mb-12 font-mono text-[10px] tracking-[0.2em] md:text-[11px]">
					<span className="text-gray-500">[ 02 ]</span>{" "}
					<span className="font-bold text-gray-900 uppercase">
						Explore Our World
					</span>
				</p>

				{/* 2B. Main heading */}
				<motion.h2
					initial={{ y: 40, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 1, ease: EASE }}
					className="mb-12 max-w-[1000px] px-6 text-center text-[2.2rem] leading-[1.1] font-medium tracking-tight text-[#111] md:mb-16 md:text-[3.5rem] lg:text-[4.2rem]"
				>
					Unearth the stories of our planet's past
					<br className="hidden md:block" /> through fossils, minerals, and
					ancient wonders.
				</motion.h2>

				{/* 2C. Action pills */}
				<motion.div
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
					variants={staggerPills}
					className="mb-10 flex flex-wrap justify-center gap-3 px-6 md:mb-24 md:gap-4"
				>
					{ACTION_PILLS.map(({ icon: Icon, label }) => (
						<motion.button
							key={label}
							type="button"
							variants={fadeUp}
							transition={fadeUpTransition}
							className="flex items-center gap-2 rounded-full border border-gray-300 bg-white/50 px-5 py-2.5 text-[11px] font-medium tracking-wider text-gray-800 uppercase backdrop-blur-sm transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
						>
							<Icon size={14} strokeWidth={2} />
							{label}
						</motion.button>
					))}
				</motion.div>

				{/* 2D. Spacer — room for the pterodactyl overlap */}
				<div className="min-h-[220px] w-full md:min-h-[450px]" />

				{/* 2E. Bottom text */}
				<div className="pointer-events-none absolute bottom-0 left-0 flex w-full justify-between px-8 pb-8 md:px-16 md:pb-12">
					<p className="hidden font-mono text-[10px] font-medium tracking-widest text-gray-500 uppercase md:block">
						WE DON'T JUST TELL STORIES.
					</p>
					<p className="hidden font-mono text-[10px] font-medium tracking-widest text-gray-500 uppercase md:block">
						PALEONTOLOGY (C) 2026
					</p>
				</div>
			</section>

			{/* ============================================================ */}
			{/* SECTION 3 — ANCIENT COLLECTION (dark)                        */}
			{/* ============================================================ */}
			<section className="relative z-30 flex w-full flex-col overflow-hidden bg-[#0a0a0a] text-white">
				{/* 3A. Pterodactyl image, overlapping upward */}
				<motion.img
					src={PTERODACTYL_URL}
					alt="Pterodactyl fossil skeleton in flight"
					initial={{ y: "-65%", x: "-50%", opacity: 0 }}
					whileInView={{ y: "-78%", x: "-50%", opacity: 1 }}
					viewport={{ once: true, margin: "100px" }}
					transition={{ duration: 1.4, ease: "easeOut" }}
					className="pointer-events-none absolute top-0 left-1/2 z-0 w-[160vw] max-w-none md:w-[1100px]"
				/>

				{/* 3B. Heading area */}
				<div className="z-10 mb-16 flex flex-col justify-between gap-12 px-8 pt-32 md:px-16 md:pt-48 xl:flex-row">
					<h2 className="max-w-[860px] text-[1.8rem] leading-[1.15] font-medium tracking-tight text-white md:text-[3rem] lg:text-[3.8rem] xl:text-[4rem]">
						Curated from millions of years of wonder
						<span className="mx-2 inline-flex translate-y-[-4px] gap-2 align-middle md:mx-4 md:gap-3">
							{[Bone, Dna, Leaf].map((Icon, index) => (
								<span
									key={index}
									className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 bg-black text-gray-400 transition-colors duration-300 hover:border-white hover:bg-white hover:text-black md:h-14 md:w-14"
								>
									<Icon size={22} strokeWidth={1.5} />
								</span>
							))}
						</span>
						& discovery.
					</h2>

					<div className="shrink-0 xl:text-right">
						<p className="mb-6 font-mono text-[9px] leading-relaxed tracking-widest text-gray-400 uppercase md:text-[10px]">
							WE DON'T JUST DISPLAY FOSSILS
							<br />
							WE SHARE EARTH'S STORY
						</p>
						<div className="flex flex-wrap gap-3 xl:justify-end">
							{["Educational", "Authentic", "Inspiring"].map((pill) => (
								<button
									key={pill}
									type="button"
									className="rounded-full border border-gray-600 px-5 py-2 font-mono text-[9px] tracking-widest text-gray-300 uppercase transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
								>
									{pill}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* 3C. Two-column panel */}
				<div className="z-10 h-[1px] w-full bg-gray-800" />
				<div className="z-10 flex w-full flex-col md:flex-row">
					{/* Left panel — specimen viewer */}
					<div className="relative flex min-h-[400px] w-full flex-col justify-between border-b border-gray-800 p-8 md:min-h-[500px] md:w-[35%] md:border-r md:border-b-0">
						<p className="relative z-10 text-xl tracking-[0.3em] text-gray-500">
							***
						</p>

						<div className="absolute inset-0">
							<AnimatePresence mode="wait">
								<SandTransitionImage
									key={chaptersData[activeChapter].image}
									src={chaptersData[activeChapter].image}
									alt={chaptersData[activeChapter].name}
									className="absolute inset-0 m-auto h-[80%] w-[80%] object-contain mix-blend-lighten"
								/>
							</AnimatePresence>
						</div>

						<div className="relative z-10 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
							<span className="relative block h-[14px] w-[18px] overflow-hidden text-[#888]">
								<AnimatePresence mode="wait">
									<motion.div
										key={activeChapter}
										initial={{ y: 14 }}
										animate={{ y: 0 }}
										exit={{ y: -14 }}
										transition={{ duration: 0.4, ease: EASE }}
										className="absolute inset-0 leading-[14px]"
									>
										0{activeChapter + 1}
									</motion.div>
								</AnimatePresence>
							</span>
							<span className="text-[#333]">/</span>
							<span className="text-[#888]">05</span>
						</div>
					</div>

					{/* Right panel — chapter list */}
					<div className="w-full md:w-[65%]">
						<div className="flex items-center justify-between border-b border-gray-800 p-8 font-mono text-[10px] tracking-widest text-gray-400 uppercase">
							<span>Explore the past. Understand the present.</span>
							<span className="relative block h-[14px] w-[72px] overflow-hidden text-right">
								<AnimatePresence mode="wait">
									<motion.span
										key={activeChapter}
										initial={{ y: 14 }}
										animate={{ y: 0 }}
										exit={{ y: -14 }}
										transition={{ duration: 0.4, ease: EASE }}
										className="absolute inset-0 leading-[14px]"
									>
										Chapter 0{activeChapter + 1}
									</motion.span>
								</AnimatePresence>
							</span>
						</div>

						<div>
							{chaptersData.map((chapter, index) => (
								<button
									key={chapter.name}
									type="button"
									onClick={() => setActiveChapter(index)}
									className={`flex w-full items-center justify-between border-b border-gray-800/80 px-8 py-8 text-left transition-colors duration-300 ${
										index === activeChapter
											? "text-white"
											: "text-[#444] hover:text-[#999]"
									}`}
								>
									<span className="text-2xl font-medium tracking-tight md:text-[2rem]">
										{chapter.name}
									</span>
									<AnimatePresence>
										{index === activeChapter && (
											<motion.span
												initial={{ opacity: 0, scale: 0.6 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{ opacity: 0, scale: 0.6 }}
												transition={{ duration: 0.3, ease: "easeOut" }}
											>
												<ArrowUpRight
													size={22}
													strokeWidth={1}
													className="text-gray-400"
												/>
											</motion.span>
										)}
									</AnimatePresence>
								</button>
							))}
						</div>
					</div>
				</div>

				{/* 3D. Bottom footer */}
				<div className="z-10 h-[1px] w-full bg-gray-800" />
				<p className="z-10 bg-[#0a0a0a] px-8 py-8 font-mono text-[10px] tracking-widest text-gray-500 uppercase">
					DIGGING INTO OUR PLANET'S PAST
				</p>
			</section>
		</main>
	);
}
