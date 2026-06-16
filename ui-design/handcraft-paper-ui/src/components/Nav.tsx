import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LinkButton, cx } from "./primitives";
import { radius } from "../lib/tokens";

const LINKS = [
	{ label: "Features", href: "#features" },
	{ label: "How it works", href: "#how" },
	{ label: "Board", href: "#product" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Notes", href: "#notes" },
];

export function Nav() {
	const [open, setOpen] = useState(false);

	/* Lock body scroll while the mobile sheet is open. */
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
			<nav
				className="mx-auto flex max-w-5xl items-center justify-between border-2 border-ink bg-paper/90 px-4 py-2.5 shadow-[var(--shadow-hard-sm)] backdrop-blur md:px-6"
				style={{ borderRadius: radius.wobblyPill }}
			>
				<a href="#top" aria-label="Scribbly home" className="shrink-0">
					<Logo />
				</a>

				{/* Desktop links with wavy underline on hover. */}
				<ul className="hidden items-center gap-7 md:flex">
					{LINKS.map((l) => (
						<li key={l.href}>
							<a
								href={l.href}
								className="text-lg text-ink/80 transition-colors duration-100 hover:text-ink hover:underline-wavy"
							>
								{l.label}
							</a>
						</li>
					))}
				</ul>

				<div className="hidden md:block">
					<LinkButton href="#pricing" className="h-11 px-5 text-lg">
						Grab a marker
					</LinkButton>
				</div>

				{/* Mobile hamburger */}
				<button
					type="button"
					aria-label={open ? "Close menu" : "Open menu"}
					aria-expanded={open}
					onClick={() => setOpen((v) => !v)}
					className="grid h-11 w-11 place-items-center border-2 border-ink bg-card shadow-[var(--shadow-hard-sm)] transition-transform duration-100 active:translate-x-[2px] active:translate-y-[2px] md:hidden"
					style={{ borderRadius: radius.wobblyMd }}
				>
					{open ? <X size={24} strokeWidth={2.75} /> : <Menu size={24} strokeWidth={2.75} />}
				</button>
			</nav>

			{/* Mobile sheet — a pinned sticky-note stack of links. */}
			<div
				className={cx(
					"md:hidden",
					open ? "pointer-events-auto" : "pointer-events-none",
				)}
			>
				<div
					className={cx(
						"mx-auto mt-3 max-w-5xl origin-top border-2 border-ink bg-card p-4 shadow-[var(--shadow-hard)] transition-all duration-150",
						open
							? "translate-y-0 scale-100 opacity-100"
							: "-translate-y-3 scale-95 opacity-0",
					)}
					style={{ borderRadius: radius.wobblyLg }}
				>
					<ul className="flex flex-col gap-2">
						{LINKS.map((l, i) => (
							<li key={l.href}>
								<a
									href={l.href}
									onClick={() => setOpen(false)}
									className={cx(
										"block border-2 border-ink px-4 py-3 text-xl shadow-[var(--shadow-hard-sm)] transition-transform duration-100 active:translate-x-[2px] active:translate-y-[2px]",
										i % 2 === 0 ? "bg-postit" : "bg-card",
										i % 2 === 0 ? "-rotate-1" : "rotate-1",
									)}
									style={{ borderRadius: radius.wobblyMd }}
								>
									{l.label}
								</a>
							</li>
						))}
						<li className="mt-1">
							<LinkButton
								href="#pricing"
								onClick={() => setOpen(false)}
								className="w-full"
							>
								Grab a marker
							</LinkButton>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}
