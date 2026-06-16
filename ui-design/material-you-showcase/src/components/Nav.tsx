import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ButtonLink } from "./primitives";
import { Close, Menu } from "./icons";

const LINKS = [
	{ label: "Features", href: "#benefits" },
	{ label: "How it works", href: "#how" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Journal", href: "#journal" },
	{ label: "FAQ", href: "#faq" },
];

/* Sticky header: tonal, with the spec's signature border-bottom + backdrop-blur.
   The mobile drawer slides down on a state-driven height transition. */
export function Nav() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Close the drawer on resize up to desktop so state can't get stuck open.
	useEffect(() => {
		const onResize = () => window.innerWidth >= 768 && setOpen(false);
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	return (
		<header
			className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
				scrolled
					? "border-[var(--color-md-outline-variant)] bg-[color-mix(in_srgb,var(--color-md-bg)_82%,transparent)] shadow-[var(--shadow-md-1)] backdrop-blur-xl"
					: "border-transparent bg-[color-mix(in_srgb,var(--color-md-bg)_60%,transparent)] backdrop-blur-md"
			}`}
		>
			<div className="shell flex h-18 items-center justify-between py-3.5">
				<a
					href="#top"
					className="focus-ring rounded-full"
					aria-label="Lumi — home"
				>
					<Logo />
				</a>

				<nav
					aria-label="Primary"
					className="hidden items-center gap-1 md:flex"
				>
					{LINKS.map((l) => (
						<a
							key={l.href}
							href={l.href}
							className="focus-ring rounded-full px-4 py-2 text-[0.9375rem] font-medium text-[var(--color-md-on-variant)] transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-[color-mix(in_srgb,var(--color-md-primary)_10%,transparent)] hover:text-[var(--color-md-primary)]"
						>
							{l.label}
						</a>
					))}
				</nav>

				<div className="hidden items-center gap-2 md:flex">
					<ButtonLink href="#" variant="text">
						Sign in
					</ButtonLink>
					<ButtonLink href="#cta" variant="filled">
						Get Lumi
					</ButtonLink>
				</div>

				<button
					type="button"
					className="btn btn-tonal !h-11 !w-11 !px-0 md:hidden"
					aria-label={open ? "Close menu" : "Open menu"}
					aria-expanded={open}
					onClick={() => setOpen((v) => !v)}
				>
					{open ? <Close size={22} /> : <Menu size={22} />}
				</button>
			</div>

			{/* Mobile drawer — height transition, no layout jump. */}
			<div
				className={`overflow-hidden border-t border-[var(--color-md-outline-variant)] bg-[var(--color-md-bg)] transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] md:hidden ${
					open ? "max-h-[26rem] opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<nav aria-label="Mobile" className="shell flex flex-col gap-1 py-4">
					{LINKS.map((l) => (
						<a
							key={l.href}
							href={l.href}
							onClick={() => setOpen(false)}
							className="focus-ring rounded-2xl px-4 py-3 text-base font-medium text-[var(--color-md-on-bg)] transition-colors duration-200 hover:bg-[var(--color-md-container)]"
						>
							{l.label}
						</a>
					))}
					<div className="mt-2 flex flex-col gap-2">
						<ButtonLink href="#" variant="tonal" className="w-full">
							Sign in
						</ButtonLink>
						<ButtonLink
							href="#cta"
							variant="filled"
							className="w-full"
							onClick={() => setOpen(false)}
						>
							Get Lumi
						</ButtonLink>
					</div>
				</nav>
			</div>
		</header>
	);
}
