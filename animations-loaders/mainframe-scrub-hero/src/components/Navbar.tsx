import { useEffect, useState } from "react";

const NAV_LINKS = ["Labs", "Studio", "Openings", "Shop"];

export function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsMobileMenuOpen(false);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	return (
		<header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
			<a href="#spade-hero" className="flex flex-row items-center gap-3">
				<span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
					Mainframe&reg;
				</span>
				<span
					aria-hidden="true"
					className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1"
				>
					&#10033;
				</span>
			</a>

			<nav
				aria-label="Primary"
				className="hidden md:flex flex-row text-[23px] text-black"
			>
				{NAV_LINKS.map((link, index) => (
					<span key={link} className="flex flex-row">
						<a
							href="#spade-hero"
							className="hover:opacity-60 transition-opacity"
						>
							{link}
						</a>
						{index < NAV_LINKS.length - 1 && (
							<span className="opacity-40">,&nbsp;</span>
						)}
					</span>
				))}
			</nav>

			<a
				href="#spade-hero"
				className="hidden md:inline text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
			>
				Get in touch
			</a>

			<button
				type="button"
				aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
				aria-expanded={isMobileMenuOpen}
				aria-controls="mainframe-mobile-menu"
				onClick={() => setIsMobileMenuOpen((open) => !open)}
				className="md:hidden relative z-10 flex flex-col items-center justify-center gap-[5px] w-10 h-10 -mr-2"
			>
				<span
					className={`w-6 h-[2px] bg-black transition-all duration-300 ${
						isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
					}`}
				/>
				<span
					className={`w-6 h-[2px] bg-black transition-all duration-300 ${
						isMobileMenuOpen ? "opacity-0" : ""
					}`}
				/>
				<span
					className={`w-6 h-[2px] bg-black transition-all duration-300 ${
						isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
					}`}
				/>
			</button>

			<div
				id="mainframe-mobile-menu"
				data-testid="mobile-overlay"
				aria-hidden={!isMobileMenuOpen}
				className={`md:hidden fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm transition-opacity duration-300 ${
					isMobileMenuOpen
						? "visible opacity-100 pointer-events-auto"
						: "invisible opacity-0 pointer-events-none"
				}`}
			>
				<nav
					aria-label="Mobile"
					className="h-full flex flex-col justify-center items-start gap-2 px-8"
				>
					{NAV_LINKS.map((link, index) => (
						<a
							key={link}
							href="#spade-hero"
							tabIndex={isMobileMenuOpen ? 0 : -1}
							onClick={() => setIsMobileMenuOpen(false)}
							className="flex items-baseline gap-3 text-4xl tracking-tight text-black py-2 hover:opacity-60 transition-opacity"
						>
							<span className="text-xs text-[#738273] tabular-nums">
								0{index + 1}
							</span>
							{link}
						</a>
					))}
					<a
						href="#spade-hero"
						tabIndex={isMobileMenuOpen ? 0 : -1}
						onClick={() => setIsMobileMenuOpen(false)}
						className="mt-8 text-lg text-black underline underline-offset-4 hover:opacity-60 transition-opacity"
					>
						Get in touch
					</a>
					<span
						aria-hidden="true"
						className="absolute bottom-8 right-8 text-5xl text-[#1C2E1E]/15 select-none"
					>
						&#10033;
					</span>
				</nav>
			</div>
		</header>
	);
}
