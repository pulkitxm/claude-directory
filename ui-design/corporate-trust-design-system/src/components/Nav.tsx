import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { Shell, cx } from "./primitives";
import { NAV_LINKS } from "../lib/content";
import { EASE_REFINED } from "../lib/motion";

export function Nav() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	/* Frost the bar once the user scrolls past the hero's top. */
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	/* Lock body scroll while the mobile drawer is open. */
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<header className="fixed inset-x-0 top-0 z-50">
			<div
				className={cx(
					"transition-all duration-300",
					scrolled
						? "border-b border-slate-200/70 bg-white/80 backdrop-blur-xl shadow-soft"
						: "border-b border-transparent bg-transparent",
				)}
			>
				<Shell>
					<nav
						className="flex h-16 items-center justify-between lg:h-[4.5rem]"
						aria-label="Primary"
					>
						<a
							href="#top"
							className="rounded-lg"
							aria-label="Northwind — home"
						>
							<Logo />
						</a>

						{/* Desktop links */}
						<ul className="hidden items-center gap-1 lg:flex">
							{NAV_LINKS.map((link) => (
								<li key={link.href}>
									<a
										href={link.href}
										className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-indigo-50 hover:text-indigo-700"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>

						{/* Desktop actions — sign-in hidden on mobile per the spec. */}
						<div className="hidden items-center gap-2 lg:flex">
							<a href="#top" className="btn btn-ghost">
								Sign in
							</a>
							<a href="#cta" className="btn btn-primary group">
								Start free
								<ArrowRight
									className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
									aria-hidden="true"
								/>
							</a>
						</div>

						{/* Mobile trigger */}
						<button
							type="button"
							className="btn btn-secondary lg:hidden !min-h-11 !px-3"
							aria-label={open ? "Close menu" : "Open menu"}
							aria-expanded={open}
							aria-controls="mobile-menu"
							onClick={() => setOpen((v) => !v)}
						>
							{open ? (
								<X className="h-5 w-5" aria-hidden="true" />
							) : (
								<Menu className="h-5 w-5" aria-hidden="true" />
							)}
						</button>
					</nav>
				</Shell>
			</div>

			{/* Mobile drawer */}
			<AnimatePresence>
				{open && (
					<>
						<motion.div
							className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.25 }}
							onClick={() => setOpen(false)}
							aria-hidden="true"
						/>
						<motion.div
							id="mobile-menu"
							className="fixed inset-x-3 top-[4.5rem] z-50 origin-top rounded-2xl border border-slate-200 bg-white p-4 shadow-lift lg:hidden"
							initial={{ opacity: 0, y: -12, scale: 0.98 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -12, scale: 0.98 }}
							transition={{ duration: 0.28, ease: EASE_REFINED }}
						>
							<ul className="flex flex-col gap-1">
								{NAV_LINKS.map((link) => (
									<li key={link.href}>
										<a
											href={link.href}
											onClick={() => setOpen(false)}
											className="block rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-700"
										>
											{link.label}
										</a>
									</li>
								))}
							</ul>
							<div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
								<a
									href="#top"
									onClick={() => setOpen(false)}
									className="btn btn-secondary w-full"
								>
									Sign in
								</a>
								<a
									href="#cta"
									onClick={() => setOpen(false)}
									className="btn btn-primary w-full"
								>
									Start free
								</a>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</header>
	);
}
