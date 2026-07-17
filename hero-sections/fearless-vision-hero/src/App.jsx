import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";

const VIDEO_URL = `${import.meta.env.BASE_URL}assets/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4`;

const EASE = [0.22, 1, 0.36, 1];

const NAV_LINKS = ["Story", "Expertise", "Studios", "Feedback"];

const STATS = [
	{ value: "300", label: "Crafted\nBrands" },
	{ value: "200", label: "Digital\nProducts" },
	{ value: "100", label: "Ventures\nFunded" },
];

const HEADING_WORDS = ["Fearless", "Vision", "Delivered"];

const fadeDown = {
	hidden: { opacity: 0, y: -20 },
	visible: (i) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.1, duration: 0.5, ease: EASE },
	}),
};

const fadeUp = {
	hidden: { opacity: 0, y: 32 },
	visible: (i) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.12, duration: 0.6, ease: EASE },
	}),
};

function Logo() {
	return (
		<div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent">
			<span className="h-2.5 w-2.5 rounded-full bg-accent" />
		</div>
	);
}

function WorkWithUsLink({ className, iconClassName, onClick }) {
	return (
		<a
			href="#contact"
			onClick={onClick}
			className={`group inline-flex items-center font-semibold uppercase tracking-widest text-accent ${className}`}
		>
			Work With Us
			<ArrowUpRight
				className={`transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${iconClassName}`}
			/>
		</a>
	);
}

function MobileMenu({ onClose }) {
	return (
		<motion.div
			className="fixed inset-0 z-50 flex flex-col bg-white px-5 pb-8 pt-5 sm:px-8 md:px-12 md:pt-6"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3, ease: EASE }}
		>
			<div className="flex items-center justify-between">
				<Logo />
				<button
					type="button"
					onClick={onClose}
					aria-label="Close menu"
					className="flex h-9 w-9 items-center justify-center rounded-full bg-black"
				>
					<X size={18} className="text-white" />
				</button>
			</div>

			<nav className="mt-16 flex flex-col gap-8" aria-label="Mobile">
				{NAV_LINKS.map((link, i) => (
					<motion.a
						key={link}
						href={`#${link.toLowerCase()}`}
						onClick={onClose}
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: EASE }}
						className="text-3xl font-semibold uppercase tracking-widest text-black"
					>
						{link}
					</motion.a>
				))}
			</nav>

			<motion.div
				className="mt-auto"
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.36, duration: 0.4, ease: EASE }}
			>
				<WorkWithUsLink
					className="gap-2 text-xl"
					iconClassName="h-[22px] w-[22px]"
					onClick={onClose}
				/>
			</motion.div>
		</motion.div>
	);
}

export default function App() {
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	useEffect(() => {
		if (!menuOpen) return undefined;
		const onKey = (e) => {
			if (e.key === "Escape") setMenuOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [menuOpen]);

	return (
		<div
			id="story"
			className="relative flex min-h-screen flex-col overflow-hidden text-black"
			style={{ fontFamily: "'Inter', sans-serif" }}
		>
			<video
				className="pointer-events-none absolute inset-0 h-full w-full object-cover"
				src={VIDEO_URL}
				autoPlay
				loop
				muted
				playsInline
				aria-hidden="true"
				tabIndex={-1}
			/>

			<header className="relative z-10 flex items-center justify-between px-5 pt-5 sm:px-8 md:px-12 md:pt-6">
				<motion.div
					variants={fadeDown}
					initial="hidden"
					animate="visible"
					custom={0}
				>
					<Logo />
				</motion.div>

				<nav
					className="hidden items-center gap-10 md:flex"
					aria-label="Primary"
				>
					{NAV_LINKS.map((link, i) => (
						<motion.a
							key={link}
							href={`#${link.toLowerCase()}`}
							variants={fadeDown}
							initial="hidden"
							animate="visible"
							custom={i + 1}
							className="text-sm font-semibold uppercase tracking-widest text-black"
						>
							{link}
						</motion.a>
					))}
				</nav>

				<motion.button
					type="button"
					variants={fadeDown}
					initial="hidden"
					animate="visible"
					custom={5}
					onClick={() => setMenuOpen(true)}
					aria-label="Open menu"
					aria-expanded={menuOpen}
					className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full bg-black"
				>
					<span className="h-0.5 w-4 bg-white" />
					<span className="h-0.5 w-4 bg-white" />
					<span className="h-0.5 w-4 bg-white" />
				</motion.button>
			</header>

			<section
				id="expertise"
				className="relative z-10 flex flex-1 items-center justify-end px-5 py-8 sm:px-8 md:px-12 md:py-0"
			>
				<div className="flex items-center gap-5 sm:gap-8 md:gap-10">
					{STATS.map((stat, i) => (
						<motion.div
							key={stat.label}
							variants={fadeUp}
							initial="hidden"
							animate="visible"
							custom={i + 2}
							className="text-right"
						>
							<p
								className="font-semibold text-black"
								style={{
									fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
									lineHeight: 1.05,
								}}
							>
								<span className="text-accent" style={{ fontSize: "0.5em" }}>
									+
								</span>
								{stat.value}
							</p>
							<p className="mt-1 whitespace-pre-line text-[10px] font-semibold uppercase leading-tight tracking-widest text-black sm:text-xs md:text-sm">
								{stat.label}
							</p>
						</motion.div>
					))}
				</div>
			</section>

			<footer
				id="contact"
				className="relative z-10 flex flex-col gap-6 px-5 pb-8 sm:px-8 md:gap-12 md:px-12 md:pb-12"
			>
				<div className="flex items-center justify-between gap-4">
					<motion.p
						id="feedback"
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						custom={5}
						className="max-w-[130px] text-[10px] font-semibold uppercase tracking-widest text-black sm:max-w-[160px] sm:text-xs md:max-w-xs md:text-sm"
					>
						Shaping Bold
						<br />
						Visions Into Power
						<br />
						For Your Tribe
					</motion.p>

					<motion.div
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						custom={6}
					>
						<WorkWithUsLink
							className="gap-1 whitespace-nowrap text-base sm:gap-2 sm:text-xl md:text-2xl"
							iconClassName="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]"
						/>
					</motion.div>
				</div>

				<div className="flex items-end justify-between gap-3 sm:gap-4">
					<motion.div
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						custom={7}
						className="w-[120px] shrink-0 sm:w-[180px] md:w-[280px]"
					>
						<p className="text-left text-[9px] font-semibold uppercase tracking-widest text-black sm:text-xs md:text-right md:text-sm">
							Creative Studios Built Around Elevating Your Vision Into Striking
							Reality
						</p>
					</motion.div>

					<h1
						id="studios"
						className="text-right font-semibold uppercase text-black"
						style={{ fontSize: "clamp(2rem, 9vw, 9rem)", lineHeight: 0.88 }}
					>
						{HEADING_WORDS.map((word, i) => (
							<span key={word} className="block overflow-hidden">
								<motion.span
									className="block"
									initial={{ y: "110%" }}
									animate={{ y: 0 }}
									transition={{
										delay: 0.4 + i * 0.14,
										duration: 0.7,
										ease: EASE,
									}}
								>
									{word}
								</motion.span>
							</span>
						))}
					</h1>
				</div>
			</footer>

			<AnimatePresence>
				{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
			</AnimatePresence>
		</div>
	);
}
