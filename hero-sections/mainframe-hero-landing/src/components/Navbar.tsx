import { useEffect, useState } from "react";

export function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	const links = ["LABS", "STUDIO", "OPENINGS", "SHOP"];

	useEffect(() => {
		if (!menuOpen) return;
		const close = (event: KeyboardEvent) => {
			if (event.key === "Escape") setMenuOpen(false);
		};
		window.addEventListener("keydown", close);
		return () => window.removeEventListener("keydown", close);
	}, [menuOpen]);

	return (
		<>
			<nav className="fixed top-0 left-0 right-0 z-10 flex flex-row justify-between items-center px-5 sm:px-8 py-4 sm:py-5">
				<div className="flex flex-row items-center gap-3">
					<span
						className="text-[21px] sm:text-[26px] tracking-tight text-black"
						style={{ fontFamily: "var(--font-heading)" }}
					>
						MAINFRAME®
					</span>
					<span
						className="text-[25px] sm:text-[30px] text-black select-none"
						style={{ letterSpacing: "-0.02em" }}
						aria-hidden="true"
					>
						✳︎
					</span>
				</div>

				<div className="hidden md:flex flex-row items-center text-[23px] text-black">
					{links.map((link, i) => (
						<span key={link}>
							<a href="#" className="hover:opacity-60 transition-opacity">
								{link}
							</a>
							{i < links.length - 1 && <span className="mr-1">,</span>}
						</span>
					))}
				</div>

				<a
					href="#"
					className="hidden md:block text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
				>
					GET IN TOUCH
				</a>

				<button
					type="button"
					className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Toggle menu"
					aria-expanded={menuOpen}
					aria-controls="mobile-menu"
				>
					<span
						className="w-6 h-[2px] bg-black block transition-all duration-300 origin-center"
						style={{
							transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
						}}
					/>
					<span
						className="w-6 h-[2px] bg-black block transition-all duration-300"
						style={{
							opacity: menuOpen ? 0 : 1,
						}}
					/>
					<span
						className="w-6 h-[2px] bg-black block transition-all duration-300 origin-center"
						style={{
							transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
						}}
					/>
				</button>
			</nav>

			<div
				id="mobile-menu"
				className="md:hidden fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm flex flex-col justify-center items-start px-8 gap-8 transition-all duration-300"
				aria-hidden={!menuOpen}
				style={{
					opacity: menuOpen ? 1 : 0,
					pointerEvents: menuOpen ? "auto" : "none",
					visibility: menuOpen ? "visible" : "hidden",
				}}
			>
				{links.map((link) => (
					<a
						key={link}
						href="#"
						className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
						onClick={() => setMenuOpen(false)}
					>
						{link}
					</a>
				))}
				<a
					href="#"
					className="text-[32px] font-medium text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
					onClick={() => setMenuOpen(false)}
				>
					GET IN TOUCH
				</a>
			</div>
		</>
	);
}
