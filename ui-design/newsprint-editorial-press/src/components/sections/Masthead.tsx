import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV = [
	{ label: "Front Page", href: "#front-page" },
	{ label: "The Brief", href: "#the-brief" },
	{ label: "Desks", href: "#desks" },
	{ label: "How It's Filed", href: "#how-its-filed" },
	{ label: "Dispatches", href: "#dispatches" },
	{ label: "Subscribe", href: "#subscribe" },
];

const EDITION_DATE = new Date().toLocaleDateString("en-US", {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
});

export function Masthead() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<header className="sticky top-0 z-40 bg-paper">
			{/* Top edition strip — the dateline that runs above every masthead. */}
			<div className="border-b border-ink bg-ink text-paper">
				<div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4 py-1.5">
					<p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] sm:text-[0.65rem]">
						Vol. 1 — No. 037
					</p>
					<p className="hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] sm:block sm:text-[0.65rem]">
						{EDITION_DATE} · New York Edition
					</p>
					<p className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] sm:text-[0.65rem]">
						<span className="inline-block h-1.5 w-1.5 animate-pulse bg-editorial" />
						Late City Final
					</p>
				</div>
			</div>

			{/* Masthead title + nameplate. */}
			<div
				className={cn(
					"border-b-4 border-ink transition-all duration-200",
					scrolled ? "py-2" : "py-4",
				)}
			>
				<div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4">
					<a
						href="#top"
						className="group flex items-baseline gap-3"
						aria-label="The Newsprint — back to top"
					>
						<span
							className={cn(
								"font-serif font-black uppercase leading-none tracking-tight transition-all duration-200",
								scrolled ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl",
							)}
						>
							The&nbsp;Newsprint
						</span>
						<span className="hidden h-3 w-3 bg-editorial transition-transform duration-200 group-hover:scale-150 sm:inline-block" />
					</a>

					<nav
						className="hidden items-center gap-1 lg:flex"
						aria-label="Primary"
					>
						{NAV.map((item) => (
							<a
								key={item.href}
								href={item.href}
								className="px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink transition-colors duration-200 hover:text-editorial"
							>
								{item.label}
							</a>
						))}
					</nav>

					<div className="flex items-center gap-2">
						<button
							type="button"
							aria-label="Search the archive"
							className="hidden h-11 w-11 items-center justify-center border border-ink text-ink transition-all duration-200 hover:bg-ink hover:text-paper sm:flex"
						>
							<Search className="h-4 w-4" strokeWidth={1.5} />
						</button>
						<Button
							variant="primary"
							size="sm"
							className="hidden sm:inline-flex"
						>
							Subscribe
						</Button>
						<button
							type="button"
							aria-label={open ? "Close menu" : "Open menu"}
							aria-expanded={open}
							onClick={() => setOpen((v) => !v)}
							className="flex h-11 w-11 items-center justify-center border border-ink text-ink transition-all duration-200 hover:bg-ink hover:text-paper lg:hidden"
						>
							{open ? (
								<X className="h-5 w-5" strokeWidth={1.5} />
							) : (
								<Menu className="h-5 w-5" strokeWidth={1.5} />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile drawer — full-bleed index of sections. */}
			<div
				className={cn(
					"overflow-hidden border-b-4 border-ink bg-paper transition-[max-height,opacity] duration-300 ease-out lg:hidden",
					open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
				)}
			>
				<nav
					className="mx-auto max-w-screen-xl divide-y divide-ink/20 px-4 py-2"
					aria-label="Mobile"
				>
					{NAV.map((item, i) => (
						<a
							key={item.href}
							href={item.href}
							onClick={() => setOpen(false)}
							className="flex min-h-[52px] items-center justify-between py-2 font-serif text-2xl font-bold transition-colors hover:text-editorial"
						>
							<span>{item.label}</span>
							<span className="font-mono text-xs tracking-widest text-ink/40">
								{String(i + 1).padStart(2, "0")}
							</span>
						</a>
					))}
					<div className="pt-4">
						<Button variant="primary" size="lg" className="w-full">
							Subscribe — $4 / week
						</Button>
					</div>
				</nav>
			</div>
		</header>
	);
}
