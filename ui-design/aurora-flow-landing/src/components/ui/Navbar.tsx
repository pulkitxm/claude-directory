import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/primitives";

const LINKS = [
	{ label: "Ritual", href: "#ritual" },
	{ label: "Soundscapes", href: "#soundscapes" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Questions", href: "#faq" },
];

/** The wordmark — a three-line tide glyph + name. */
function Wordmark() {
	return (
		<a href="#top" className="flex items-center gap-2.5">
			<span className="relative flex h-7 w-7 items-center justify-center">
				<svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
					<path
						d="M4 18c2.2 0 2.2 2 4.4 2s2.2-2 4.4-2 2.2 2 4.4 2 2.2-2 4.4-2"
						fill="none"
						stroke="rgb(var(--glow))"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M4 13c2.2 0 2.2 2 4.4 2s2.2-2 4.4-2 2.2 2 4.4 2 2.2-2 4.4-2"
						fill="none"
						stroke="rgb(var(--tide))"
						strokeWidth="2"
						strokeLinecap="round"
						opacity="0.7"
					/>
					<path
						d="M4 8c2.2 0 2.2 2 4.4 2s2.2-2 4.4-2 2.2 2 4.4 2 2.2-2 4.4-2"
						fill="none"
						stroke="rgb(var(--coral))"
						strokeWidth="2"
						strokeLinecap="round"
						opacity="0.5"
					/>
				</svg>
			</span>
			<span className="font-display text-lg font-semibold tracking-tight text-foam">
				Tide
			</span>
		</a>
	);
}

export function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// lock scroll while the mobile sheet is open
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
			<motion.nav
				initial={{ y: -24, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
				className={cn(
					"flex w-full max-w-5xl items-center justify-between rounded-pill px-3 py-2.5 pl-5 transition-all duration-500 ease-tide",
					scrolled
						? "glass shadow-lift"
						: "border border-transparent bg-transparent",
				)}
			>
				<Wordmark />

				<ul className="hidden items-center gap-1 md:flex">
					{LINKS.map((l) => (
						<li key={l.href}>
							<a
								href={l.href}
								className="rounded-pill px-4 py-2 text-sm tracking-nav text-mist transition-colors duration-200 hover:text-foam"
							>
								{l.label}
							</a>
						</li>
					))}
				</ul>

				<div className="hidden items-center gap-2 md:flex">
					<a
						href="#faq"
						className="rounded-pill px-4 py-2 text-sm tracking-nav text-mist transition-colors duration-200 hover:text-foam"
					>
						Log in
					</a>
					<Button href="#cta" className="px-5 py-2.5">
						Start a session
					</Button>
				</div>

				<button
					type="button"
					onClick={() => setOpen((v) => !v)}
					aria-label={open ? "Close menu" : "Open menu"}
					aria-expanded={open}
					className="flex h-10 w-10 items-center justify-center rounded-pill text-foam transition-colors hover:bg-shelf/50 md:hidden"
				>
					{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</button>
			</motion.nav>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						className="fixed inset-0 top-0 z-40 flex flex-col bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
					>
						<ul className="flex flex-col gap-1">
							{LINKS.map((l, i) => (
								<motion.li
									key={l.href}
									initial={{ opacity: 0, x: -12 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.06 * i + 0.05 }}
								>
									<a
										href={l.href}
										onClick={() => setOpen(false)}
										className="block border-b border-line py-4 font-display text-2xl text-foam"
									>
										{l.label}
									</a>
								</motion.li>
							))}
						</ul>
						<div className="mt-auto flex flex-col gap-3">
							<Button
								href="#cta"
								onClick={() => setOpen(false)}
								className="w-full"
							>
								Start a session
							</Button>
							<Button
								href="#faq"
								variant="ghost"
								onClick={() => setOpen(false)}
								className="w-full"
							>
								Log in
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
