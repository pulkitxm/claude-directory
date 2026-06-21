import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, nav } from "../data/content";
import { Button } from "./Button";
import { cn } from "./Primitives";

/* The house wordmark — Playfair caps with a gold pip between the names. */
function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
	return (
		<a
			href="#top"
			className="group inline-flex items-baseline gap-1.5 font-display leading-none tracking-tight text-foreground"
			aria-label={`${brand.name} — home`}
		>
			<span className={cn(size === "lg" ? "text-2xl" : "text-xl")}>Roman</span>
			<span className="text-accent transition-transform duration-300 group-hover:rotate-12">
				&amp;
			</span>
			<span className={cn(size === "lg" ? "text-2xl" : "text-xl")}>Quill</span>
		</a>
	);
}

export function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Lock body scroll while the mobile menu is open.
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<header
			className={cn(
				"fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
				scrolled
					? "border-b border-border bg-background/85 backdrop-blur-md"
					: "border-b border-transparent bg-transparent",
			)}
		>
			<div className="container-wide flex h-16 items-center justify-between md:h-20">
				<Wordmark />

				{/* Desktop nav — small-caps, tracked, growing gold underline. */}
				<nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
					{nav.map((item) => (
						<a
							key={item.href}
							href={item.href}
							className="small-caps text-[0.7rem] text-muted-foreground transition-colors duration-200 hover:text-foreground"
						>
							<span className="link-underline !text-current">{item.label}</span>
						</a>
					))}
				</nav>

				<div className="flex items-center gap-3">
					<Button
						href="#pricing"
						variant="primary"
						className="hidden px-5 sm:inline-flex"
					>
						Request an invitation
					</Button>
					<button
						type="button"
						onClick={() => setOpen(true)}
						aria-label="Open menu"
						aria-expanded={open}
						className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted lg:hidden"
					>
						<Menu size={20} strokeWidth={1.5} />
					</button>
				</div>
			</div>

			{/* Mobile overlay menu */}
			<div
				className={cn(
					"fixed inset-0 z-50 transition-opacity duration-300 lg:hidden",
					open
						? "pointer-events-auto opacity-100"
						: "pointer-events-none opacity-0",
				)}
				aria-hidden={!open}
			>
				<div
					className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
					onClick={() => setOpen(false)}
				/>
				<div
					className={cn(
						"absolute right-0 top-0 flex h-full w-[min(86vw,360px)] flex-col bg-background shadow-lg transition-transform duration-300 ease-editorial",
						open ? "translate-x-0" : "translate-x-full",
					)}
				>
					<div className="flex h-16 items-center justify-between border-b border-border px-6">
						<Wordmark />
						<button
							type="button"
							onClick={() => setOpen(false)}
							aria-label="Close menu"
							className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
						>
							<X size={20} strokeWidth={1.5} />
						</button>
					</div>
					<nav
						className="flex flex-1 flex-col gap-1 px-6 py-8"
						aria-label="Mobile"
					>
						{nav.map((item, i) => (
							<a
								key={item.href}
								href={item.href}
								onClick={() => setOpen(false)}
								className="group flex items-center justify-between border-b border-border/70 py-4 font-display text-2xl text-foreground transition-colors hover:text-accent"
							>
								{item.label}
								<span className="small-caps text-muted-foreground transition-colors group-hover:text-accent">
									{String(i + 1).padStart(2, "0")}
								</span>
							</a>
						))}
					</nav>
					<div className="px-6 pb-10">
						<Button
							href="#pricing"
							variant="primary"
							className="w-full"
							onClick={() => setOpen(false)}
						>
							Request an invitation
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
