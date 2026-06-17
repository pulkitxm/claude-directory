import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "./primitives";

const LINKS = [
	{ href: "#features", label: "Modules" },
	{ href: "#how", label: "Boot Seq" },
	{ href: "#benefits", label: "Filesystem" },
	{ href: "#pricing", label: "Licenses" },
	{ href: "#faq", label: "Readme" },
];

export function Nav() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

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
		<header
			className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ease-linear ${
				scrolled
					? "border-b border-[var(--color-edge)] bg-[var(--color-void)]/85 backdrop-blur-md"
					: "border-b border-transparent"
			}`}
		>
			{/* gradient accent bar at the very top */}
			<div className="h-0.5 w-full bg-gradient-to-r from-[var(--color-magenta)] to-[var(--color-cyan)]" />
			<nav className="shell flex h-16 items-center justify-between">
				<Logo />

				{/* Desktop links */}
				<div className="hidden items-center gap-7 md:flex">
					{LINKS.map((l) => (
						<a
							key={l.href}
							href={l.href}
							className="group relative font-mono text-sm uppercase tracking-widest text-[var(--color-chrome)]/80 transition-colors duration-200 ease-linear hover:text-[var(--color-cyan)]"
						>
							{l.label}
							<span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-cyan)] shadow-[0_0_8px_#00FFFF] transition-all duration-200 ease-linear group-hover:w-full" />
						</a>
					))}
				</div>

				<div className="hidden md:block">
					<ButtonLink href="#cta" variant="secondary" size="sm">
						Jack In
					</ButtonLink>
				</div>

				{/* Mobile toggle */}
				<button
					type="button"
					className="grid h-10 w-10 place-items-center border-2 border-[var(--color-magenta)] text-[var(--color-magenta)] transition-colors duration-200 ease-linear hover:bg-[var(--color-magenta)] hover:text-white md:hidden"
					aria-label={open ? "Close menu" : "Open menu"}
					aria-expanded={open}
					onClick={() => setOpen((v) => !v)}
				>
					{open ? <X size={20} /> : <Menu size={20} />}
				</button>
			</nav>

			{/* Mobile sheet */}
			{open && (
				<div className="border-t border-[var(--color-edge)] bg-[var(--color-void)]/97 backdrop-blur-md md:hidden">
					<div className="shell flex flex-col gap-1 py-4">
						{LINKS.map((l) => (
							<a
								key={l.href}
								href={l.href}
								onClick={() => setOpen(false)}
								className="border-l-2 border-[var(--color-edge)] py-3 pl-4 font-mono text-base uppercase tracking-widest text-[var(--color-chrome)] transition-colors duration-200 ease-linear hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
							>
								<span className="text-[var(--color-magenta)]">&gt; </span>
								{l.label}
							</a>
						))}
						<ButtonLink
							href="#cta"
							variant="secondary"
							className="mt-3 w-full"
							onClick={() => setOpen(false)}
						>
							Jack In
						</ButtonLink>
					</div>
				</div>
			)}
		</header>
	);
}
