import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
	"service",
	"patient resources",
	"about us",
	"education center",
];

function CloverIcon({ className = "w-6 h-6" }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" className={className} aria-hidden="true">
			<g fill="#1a1a1a">
				<circle cx="12" cy="7.1" r="4.9" />
				<circle cx="12" cy="16.9" r="4.9" />
				<circle cx="7.1" cy="12" r="4.9" />
				<circle cx="16.9" cy="12" r="4.9" />
			</g>
		</svg>
	);
}

export default function Navbar() {
	const [open, setOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 w-full z-50 py-6 md:py-10 bg-gradient-to-b from-[#f1f1f1]/80 to-transparent backdrop-blur-[2px]">
			<nav
				aria-label="Primary"
				className="grid grid-cols-12 max-w-7xl mx-auto items-center gap-x-4 md:gap-x-8 px-8 md:px-16 lg:px-20"
			>
				<a
					href="#home"
					className="col-span-6 md:col-span-3 flex items-center gap-2.5 group"
					aria-label="mėntality home"
				>
					<CloverIcon className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-500 ease-out group-hover:rotate-90" />
					<span className="font-display text-xl md:text-2xl font-medium tracking-tight text-[#1a1a1a]">
						mėntality
					</span>
				</a>

				<ul className="hidden md:flex col-span-6 items-center justify-center gap-6 lg:gap-9">
					{NAV_LINKS.map((link) => (
						<li key={link}>
							<a
								href="#home"
								className="text-[13px] lowercase tracking-wide text-zinc-600 hover:text-[#1a1a1a] transition-colors duration-200 whitespace-nowrap"
							>
								{link}
							</a>
						</li>
					))}
				</ul>

				<div className="col-span-6 md:col-span-3 flex items-center justify-end gap-4 lg:gap-6">
					<a
						href="#home"
						className="hidden md:inline-block text-[13px] lowercase tracking-wide text-zinc-600 hover:text-[#1a1a1a] transition-colors duration-200 whitespace-nowrap"
					>
						find help
					</a>
					<a
						href="#home"
						className="hidden sm:inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-[13px] lowercase tracking-wide rounded-full pl-5 pr-4 py-2.5 transition-all duration-300 hover:bg-black hover:gap-3 whitespace-nowrap"
					>
						get started
						<span aria-hidden="true">&rarr;</span>
					</a>

					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						aria-expanded={open}
						aria-controls="mobile-drawer"
						aria-label={open ? "Close menu" : "Open menu"}
						className="md:hidden relative w-10 h-10 -mr-2 flex flex-col items-center justify-center gap-[7px]"
					>
						<motion.span
							animate={open ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
							transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
							className="block w-6 h-[2px] bg-[#1a1a1a] rounded-full origin-center"
						/>
						<motion.span
							animate={open ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
							transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
							className="block w-6 h-[2px] bg-[#1a1a1a] rounded-full origin-center"
						/>
					</button>
				</div>
			</nav>

			<AnimatePresence>
				{open && (
					<motion.div
						id="mobile-drawer"
						initial={{ opacity: 0, y: -16 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -16 }}
						transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
						className="md:hidden absolute top-full left-0 w-full px-4"
					>
						<div className="rounded-2xl bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_24px_48px_-16px_rgba(26,26,26,0.18)] p-6">
							<ul className="flex flex-col">
								{[...NAV_LINKS, "find help"].map((link, i) => (
									<motion.li
										key={link}
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.06 * i + 0.08, duration: 0.3 }}
										className="border-b border-black/[0.06] last:border-none"
									>
										<a
											href="#home"
											onClick={() => setOpen(false)}
											className="block py-3.5 font-display text-lg lowercase text-[#1a1a1a]"
										>
											{link}
										</a>
									</motion.li>
								))}
							</ul>
							<motion.a
								href="#home"
								onClick={() => setOpen(false)}
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4, duration: 0.3 }}
								className="mt-5 flex items-center justify-center gap-2 bg-[#1a1a1a] text-white text-sm lowercase tracking-wide rounded-full py-3.5"
							>
								get started <span aria-hidden="true">&rarr;</span>
							</motion.a>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
