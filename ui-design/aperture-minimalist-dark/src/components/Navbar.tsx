import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/cn";
import { Button } from "./Primitives";
import { Logo } from "./Logo";

const LINKS = [
	{ label: "Product", href: "#features" },
	{ label: "Workflow", href: "#workflow" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Customers", href: "#testimonials" },
	{ label: "FAQ", href: "#faq" },
];

export function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Lock body scroll while the mobile sheet is open.
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<header className="fixed inset-x-0 top-0 z-50">
			<div
				className={cn(
					"transition-all duration-300 ease-out-soft",
					scrolled
						? "border-b border-white/[0.06] bg-background/70 backdrop-blur-xl"
						: "border-b border-transparent bg-transparent",
				)}
			>
				<nav className="container-x flex h-16 items-center justify-between md:h-[72px]">
					<a
						href="#top"
						className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
						aria-label="Aperture home"
					>
						<Logo className="h-7 w-7" />
						<span className="font-display text-lg font-semibold tracking-tight text-foreground">
							Aperture
						</span>
					</a>

					<div className="hidden items-center gap-8 md:flex">
						{LINKS.map((l) => (
							<a key={l.href} href={l.href} className="nav-link">
								{l.label}
							</a>
						))}
					</div>

					<div className="hidden items-center gap-2 md:flex">
						<Button variant="ghost" href="#" className="h-10 px-4">
							Sign in
						</Button>
						<Button variant="primary" href="#pricing" className="h-10 px-5">
							Start free
						</Button>
					</div>

					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						className="btn-ghost grid h-10 w-10 place-items-center rounded-md md:hidden"
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
					>
						{open ? (
							<X size={20} strokeWidth={1.5} />
						) : (
							<Menu size={20} strokeWidth={1.5} />
						)}
					</button>
				</nav>
			</div>

			{/* Mobile sheet */}
			<div
				className={cn(
					"fixed inset-0 top-16 z-40 origin-top transition-all duration-300 ease-out-soft md:hidden",
					open
						? "pointer-events-auto opacity-100"
						: "pointer-events-none opacity-0",
				)}
			>
				<div
					className="absolute inset-0 bg-background/80 backdrop-blur-xl"
					onClick={() => setOpen(false)}
				/>
				<div
					className={cn(
						"relative mx-4 mt-3 overflow-hidden rounded-xl border border-white/[0.08] bg-background-alt/90 p-2 shadow-xl backdrop-blur-xl transition-all duration-300 ease-out-soft",
						open ? "translate-y-0" : "-translate-y-3",
					)}
				>
					{LINKS.map((l) => (
						<a
							key={l.href}
							href={l.href}
							onClick={() => setOpen(false)}
							className="flex items-center justify-between rounded-lg px-4 py-3 font-display text-base text-foreground transition-colors hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none"
						>
							{l.label}
							<span className="font-mono text-xs text-muted-foreground">→</span>
						</a>
					))}
					<div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/[0.06] p-2 pt-3">
						<Button variant="secondary" href="#" onClick={() => setOpen(false)}>
							Sign in
						</Button>
						<Button
							variant="primary"
							href="#pricing"
							onClick={() => setOpen(false)}
						>
							Start free
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
