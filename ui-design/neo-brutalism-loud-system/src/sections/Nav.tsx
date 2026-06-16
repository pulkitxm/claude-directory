import { useEffect, useState } from "react";
import { Menu, Star, X } from "lucide-react";
import { NAV_LINKS } from "../content";

/* Sticky top nav. Logo is a bordered accent box. Desktop links snap in a
   border + red fill + shadow on hover. Mobile collapses to a bordered
   hamburger square that opens a stacked, bordered slide-in drawer. */
export function Nav() {
	const [open, setOpen] = useState(false);

	// Lock body scroll while the mobile drawer is open.
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<header className="sticky top-0 z-50 border-b-4 border-neo-ink bg-neo-bg">
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
				aria-label="Primary"
			>
				{/* Logo */}
				<a
					href="#top"
					className="group flex items-center gap-2 rounded-none focus-visible:outline-none"
				>
					<span className="flex h-10 w-10 items-center justify-center border-4 border-neo-ink bg-neo-accent neo-shadow-sm transition-transform duration-200 ease-out group-hover:rotate-12">
						<Star className="h-5 w-5 fill-neo-ink stroke-neo-ink" strokeWidth={3} />
					</span>
					<span className="text-xl font-bold uppercase tracking-tighter text-neo-ink">
						Loudhouse
					</span>
				</a>

				{/* Desktop links */}
				<ul className="hidden items-center gap-1 md:flex">
					{NAV_LINKS.map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								className="inline-block border-4 border-transparent px-3 py-1.5 text-sm font-bold uppercase tracking-wide text-neo-ink transition-all duration-100 ease-out hover:border-neo-ink hover:bg-neo-accent hover:shadow-neo-sm"
							>
								{link.label}
							</a>
						</li>
					))}
				</ul>

				{/* Desktop CTA */}
				<a
					href="#pricing"
					className="hidden h-11 items-center border-4 border-neo-ink bg-neo-secondary px-5 text-sm font-bold uppercase tracking-wide text-neo-ink shadow-neo-sm transition-all duration-100 ease-out hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-neo active:translate-x-[4px] active:translate-y-[4px] active:shadow-none md:inline-flex"
				>
					Get The Kit
				</a>

				{/* Mobile hamburger */}
				<button
					type="button"
					aria-label={open ? "Close menu" : "Open menu"}
					aria-expanded={open}
					aria-controls="mobile-drawer"
					onClick={() => setOpen((v) => !v)}
					className="flex h-11 w-11 items-center justify-center border-4 border-neo-ink bg-neo-white neo-shadow-sm transition-all duration-100 ease-out active:translate-x-[4px] active:translate-y-[4px] active:shadow-none md:hidden"
				>
					{open ? (
						<X className="h-6 w-6 stroke-neo-ink" strokeWidth={3} />
					) : (
						<Menu className="h-6 w-6 stroke-neo-ink" strokeWidth={3} />
					)}
				</button>
			</nav>

			{/* Mobile slide-in drawer */}
			{open && (
				<div
					id="mobile-drawer"
					className="border-t-4 border-neo-ink bg-neo-bg px-4 pb-6 pt-4 md:hidden"
				>
					<ul className="flex flex-col gap-3">
						{NAV_LINKS.map((link) => (
							<li key={link.href}>
								<a
									href={link.href}
									onClick={() => setOpen(false)}
									className="block border-4 border-neo-ink bg-neo-white px-4 py-3 text-base font-bold uppercase tracking-wide text-neo-ink neo-shadow-sm transition-all duration-100 ease-out active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
								>
									{link.label}
								</a>
							</li>
						))}
						<li>
							<a
								href="#pricing"
								onClick={() => setOpen(false)}
								className="block border-4 border-neo-ink bg-neo-accent px-4 py-3 text-center text-base font-bold uppercase tracking-wide text-neo-ink neo-shadow-sm transition-all duration-100 ease-out active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
							>
								Get The Kit
							</a>
						</li>
					</ul>
				</div>
			)}
		</header>
	);
}
