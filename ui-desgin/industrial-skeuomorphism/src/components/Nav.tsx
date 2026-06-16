import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button, Container, Led, cx } from "./primitives";

const LINKS = [
	{ label: "System", href: "#features" },
	{ label: "Assembly", href: "#how" },
	{ label: "Schematic", href: "#showcase" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Field Notes", href: "#testimonials" },
];

export function Nav() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Close drawer on Escape and lock scroll while open.
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		document.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<header className="sticky top-0 z-50 pt-3 md:pt-5">
			<Container>
				<nav
					aria-label="Primary"
					className={cx(
						"flex items-center justify-between rounded-xl bg-chassis px-4 py-2.5 transition-shadow duration-300 md:px-6",
					)}
					style={{
						boxShadow: scrolled
							? "var(--shadow-floating)"
							: "var(--shadow-card)",
					}}
				>
					<a
						href="#top"
						aria-label="SCHEMATIC home"
						className="rounded-lg"
					>
						<Logo />
					</a>

					{/* Desktop links */}
					<ul className="hidden items-center gap-1 lg:flex">
						{LINKS.map((l) => (
							<li key={l.href}>
								<a
									href={l.href}
									className="stamp rounded-md px-3 py-2 text-[0.7rem] text-label transition-colors duration-200 hover:text-ink"
								>
									{l.label}
								</a>
							</li>
						))}
					</ul>

					<div className="flex items-center gap-3">
						<span
							className="hidden items-center gap-2 rounded-full bg-chassis px-3 py-1.5 md:inline-flex"
							style={{ boxShadow: "var(--shadow-recessed-soft)" }}
						>
							<Led tone="online" size={8} label="systems online" />
							<span className="stamp text-[0.6rem] text-label">
								ONLINE
							</span>
						</span>

						<Button
							size="sm"
							className="hidden sm:inline-flex"
							onClick={() =>
								document
									.querySelector("#cta")
									?.scrollIntoView({ behavior: "smooth" })
							}
						>
							Deploy Unit
						</Button>

						{/* Mobile hamburger */}
						<button
							type="button"
							aria-label={open ? "Close menu" : "Open menu"}
							aria-expanded={open}
							aria-controls="mobile-drawer"
							onClick={() => setOpen((v) => !v)}
							className="grid h-11 w-11 place-items-center rounded-lg bg-chassis text-ink transition-[box-shadow,transform] duration-150 active:translate-y-[1px] lg:hidden"
							style={{ boxShadow: "var(--shadow-card)" }}
						>
							{open ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
						</button>
					</div>
				</nav>
			</Container>

			{/* Mobile drawer */}
			<AnimatePresence>
				{open && (
					<motion.div
						id="mobile-drawer"
						initial={{ opacity: 0, y: -12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -12 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="lg:hidden"
					>
						<Container>
							<ul
								className="mt-3 flex flex-col gap-1 rounded-xl bg-chassis p-3"
								style={{ boxShadow: "var(--shadow-floating)" }}
							>
								{LINKS.map((l) => (
									<li key={l.href}>
										<a
											href={l.href}
											onClick={() => setOpen(false)}
											className="stamp flex min-h-[48px] items-center rounded-lg px-4 text-xs text-label transition-colors hover:text-ink"
											style={{
												boxShadow:
													"var(--shadow-recessed-soft)",
											}}
										>
											{l.label}
										</a>
									</li>
								))}
								<li className="pt-1">
									<Button
										full
										size="md"
										onClick={() => {
											setOpen(false);
											document
												.querySelector("#cta")
												?.scrollIntoView({
													behavior: "smooth",
												});
										}}
									>
										Deploy Unit
									</Button>
								</li>
							</ul>
						</Container>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
