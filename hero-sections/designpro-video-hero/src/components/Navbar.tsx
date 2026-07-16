import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
	"Home",
	"About Us",
	"Courses",
	"Instructors",
	"Testimonials",
	"Blog",
];

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="relative z-20">
			<motion.nav
				initial={{ opacity: 0, y: -16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
				className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 md:py-6 lg:px-8"
				aria-label="Primary"
			>
				<a href="#home" className="group flex items-center gap-2.5">
					<span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white transition-transform duration-300 group-hover:rotate-90">
						<span className="h-3.5 w-3.5 rounded-full bg-white transition-transform duration-300 group-hover:scale-110" />
					</span>
					<span className="text-lg font-medium tracking-tight text-white">
						DesignPro
					</span>
				</a>

				<div className="hidden items-center gap-1 rounded-full border border-gray-700 bg-black/30 p-1.5 backdrop-blur-md lg:flex">
					{NAV_LINKS.map((link) => (
						<a
							key={link}
							href="#home"
							className="rounded-full px-4 py-2 text-sm text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-white"
						>
							{link}
						</a>
					))}
					<a
						href="mailto:hello@designpro.example"
						className="group/contact flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-white"
					>
						Contact us
						<ArrowUpRight
							className="h-4 w-4 transition-transform duration-300 group-hover/contact:translate-x-0.5 group-hover/contact:-translate-y-0.5"
							aria-hidden
						/>
					</a>
				</div>

				<button
					type="button"
					onClick={() => setMenuOpen((open) => !open)}
					aria-expanded={menuOpen}
					aria-label={menuOpen ? "Close menu" : "Open menu"}
					className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-black/30 text-white/80 backdrop-blur-md transition-colors duration-300 hover:text-white lg:hidden"
				>
					{menuOpen ? (
						<X className="h-5 w-5" aria-hidden />
					) : (
						<Menu className="h-5 w-5" aria-hidden />
					)}
				</button>
			</motion.nav>

			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -12, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -12, scale: 0.98 }}
						transition={{ duration: 0.25, ease: "easeOut" }}
						className="absolute inset-x-4 top-full rounded-3xl border border-gray-700 bg-black/80 p-3 backdrop-blur-xl sm:inset-x-6 lg:hidden"
					>
						<ul>
							{NAV_LINKS.map((link, index) => (
								<motion.li
									key={link}
									initial={{ opacity: 0, x: -8 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.04 * index, duration: 0.25 }}
								>
									<a
										href="#home"
										onClick={() => setMenuOpen(false)}
										className="block rounded-2xl px-4 py-3 text-sm text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-white"
									>
										{link}
									</a>
								</motion.li>
							))}
							<motion.li
								initial={{ opacity: 0, x: -8 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.04 * NAV_LINKS.length, duration: 0.25 }}
							>
								<a
									href="mailto:hello@designpro.example"
									onClick={() => setMenuOpen(false)}
									className="flex items-center gap-1.5 rounded-2xl px-4 py-3 text-sm text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-white"
								>
									Contact us
									<ArrowUpRight className="h-4 w-4" aria-hidden />
								</a>
							</motion.li>
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
