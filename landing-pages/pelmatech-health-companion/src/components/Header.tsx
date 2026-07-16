import { Menu, X } from "lucide-react";
import * as React from "react";
import logoWhite from "@/assets/logo.svg";
import logoDark from "@/assets/logo-dark.svg";

const NAV_ITEMS = ["Home", "Artists", "Releases", "Contact"] as const;

export function Header() {
	const [scrolledPastHero, setScrolledPastHero] = React.useState(false);
	const [menuOpen, setMenuOpen] = React.useState(false);

	React.useEffect(() => {
		const onScroll = () => {
			setScrolledPastHero(window.scrollY > window.innerHeight - 80);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	React.useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setMenuOpen(false);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	return (
		<header className="pel-header fixed top-6 left-0 right-0 z-50 px-8 flex items-center justify-between">
			<img
				src={scrolledPastHero ? logoDark : logoWhite}
				alt="Pelmatech"
				className="h-8 w-auto transition-opacity"
			/>

			<nav
				className="pel-nav flex items-center gap-1 backdrop-blur-md text-white rounded-full pl-2 pr-2 py-2"
				style={{ background: "var(--header-bg)" }}
			>
				<div className="pel-nav-links flex items-center gap-1">
					{NAV_ITEMS.map((item, i) => (
						<a
							key={item}
							href={`#${item.toLowerCase()}`}
							className={
								i === 0
									? "px-5 py-2 text-sm rounded-full bg-white/10 font-medium"
									: "px-5 py-2 text-sm rounded-full opacity-80 hover:opacity-100 transition"
							}
						>
							{item}
						</a>
					))}
				</div>
				<button
					type="button"
					className="pel-menu-toggle ml-2 flex items-center gap-2 px-4 py-2 text-sm rounded-full hover:bg-white/10 transition"
					onClick={() => setMenuOpen((open) => !open)}
					aria-expanded={menuOpen}
					aria-controls="pel-mobile-menu"
					aria-label={menuOpen ? "Close navigation" : "Open navigation"}
				>
					{menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
					Menu
				</button>
			</nav>

			<div
				id="pel-mobile-menu"
				className={`pel-mobile-menu ${menuOpen ? "is-open" : ""}`}
				aria-hidden={!menuOpen}
			>
				{NAV_ITEMS.map((item) => (
					<a
						key={item}
						href={`#${item.toLowerCase()}`}
						tabIndex={menuOpen ? 0 : -1}
						onClick={() => setMenuOpen(false)}
					>
						{item}
					</a>
				))}
			</div>
		</header>
	);
}
