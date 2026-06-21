import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { nav } from "../lib/content";
import { Button } from "./Button";
import { Logo } from "./Logo";

/**
 * Sticky floating pill navigation with glassmorphism. The bar detaches slightly
 * from the top and frosts the content scrolling beneath it. On mobile it
 * collapses to a hamburger that opens an organically-rounded dropdown panel.
 */
export function Navbar() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const reduced = useReducedMotion();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Close the mobile menu when resizing up to desktop.
	useEffect(() => {
		const onResize = () => window.innerWidth >= 768 && setOpen(false);
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	return (
		<header className="sticky top-4 z-50 px-4 sm:px-6">
			<nav
				aria-label="Primary"
				className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border/60 bg-card/70 px-4 py-2.5 backdrop-blur-md transition-shadow duration-500 ease-organic sm:px-5 ${
					scrolled ? "shadow-soft" : "shadow-none"
				}`}
			>
				<Logo />

				{/* desktop links */}
				<ul className="hidden items-center gap-1 md:flex">
					{nav.map((item) => (
						<li key={item.href}>
							<a
								href={item.href}
								className="rounded-full px-4 py-2 text-sm font-bold text-foreground/75 transition-colors duration-300 hover:bg-primary/10 hover:text-primary"
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-2">
					<Button size="sm" className="hidden sm:inline-flex">
						<ShoppingBag size={17} />
						Shop blends
					</Button>
					<button
						type="button"
						className="grid h-11 w-11 place-items-center rounded-full border border-border/60 bg-card text-foreground transition-colors duration-300 hover:bg-primary/10 hover:text-primary md:hidden"
						aria-expanded={open}
						aria-controls="mobile-menu"
						aria-label={open ? "Close menu" : "Open menu"}
						onClick={() => setOpen((v) => !v)}
					>
						{open ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</nav>

			{/* mobile dropdown */}
			<AnimatePresence>
				{open && (
					<motion.div
						id="mobile-menu"
						initial={reduced ? false : { opacity: 0, y: -12, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={
							reduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }
						}
						transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
						className="mx-auto mt-3 max-w-6xl overflow-hidden rounded-[2rem] border border-border/60 bg-card/95 p-3 shadow-float backdrop-blur-md md:hidden"
					>
						<ul className="flex flex-col">
							{nav.map((item) => (
								<li key={item.href}>
									<a
										href={item.href}
										onClick={() => setOpen(false)}
										className="block rounded-2xl px-5 py-3.5 text-base font-bold text-foreground/80 transition-colors duration-300 hover:bg-primary/10 hover:text-primary"
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
						<div className="p-2">
							<Button className="w-full" onClick={() => setOpen(false)}>
								<ShoppingBag size={18} />
								Shop blends
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
