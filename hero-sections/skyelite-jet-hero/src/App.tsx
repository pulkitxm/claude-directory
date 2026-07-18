import { Menu, X } from "lucide-react";
import { type CSSProperties, useState } from "react";

const VIDEO_URL = `${import.meta.env.BASE_URL}assets/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4`;

const NAV_LINKS = ["Start", "Story", "Rates", "Benefits", "FAQ"] as const;

export default function App() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div className="min-h-screen bg-gray-50">
			<section className="relative h-screen overflow-hidden">
				{/* Full-viewport video background */}
				<video
					className="animate-video-reveal absolute inset-0 h-full w-full object-cover"
					src={VIDEO_URL}
					autoPlay
					muted
					loop
					playsInline
					aria-hidden="true"
					tabIndex={-1}
				/>

				{/* Content wrapper */}
				<div className="relative flex h-full flex-col">
					{/* Navigation */}
					<header className="relative">
						<nav
							className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6"
							aria-label="Primary"
						>
							<a
								href="#"
								className="animate-hero-rise text-2xl font-semibold text-gray-900 transition-colors hover:text-gray-700"
								style={{ "--rise-delay": "0.05s" } as CSSProperties}
							>
								SkyElite
							</a>

							{/* Desktop menu */}
							<ul className="hidden items-center gap-8 md:flex">
								{NAV_LINKS.map((link, i) => (
									<li
										key={link}
										className="animate-hero-rise"
										style={
											{ "--rise-delay": `${0.12 + i * 0.06}s` } as CSSProperties
										}
									>
										<a
											href={`#${link.toLowerCase()}`}
											className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
										>
											{link}
										</a>
									</li>
								))}
							</ul>

							{/* Mobile hamburger */}
							<button
								type="button"
								className="text-gray-900 transition-colors hover:text-gray-700 md:hidden"
								aria-expanded={menuOpen}
								aria-controls="mobile-menu"
								aria-label={menuOpen ? "Close menu" : "Open menu"}
								onClick={() => setMenuOpen((open) => !open)}
							>
								{menuOpen ? <X size={26} /> : <Menu size={26} />}
							</button>
						</nav>

						{/* Mobile dropdown */}
						{menuOpen && (
							<div
								id="mobile-menu"
								className="animate-menu-drop absolute inset-x-8 top-full z-10 rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-md md:hidden"
							>
								<ul className="flex flex-col gap-1">
									{NAV_LINKS.map((link) => (
										<li key={link}>
											<a
												href={`#${link.toLowerCase()}`}
												className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100 hover:text-gray-700"
												onClick={() => setMenuOpen(false)}
											>
												{link}
											</a>
										</li>
									))}
								</ul>
							</div>
						)}
					</header>

					{/* Main hero content */}
					<main className="flex flex-1 items-center justify-center">
						<div className="-mt-80 flex flex-col items-center px-8 text-center">
							<p
								className="animate-hero-rise mb-4 text-sm font-semibold uppercase tracking-wider text-gray-600"
								style={{ "--rise-delay": "0.25s" } as CSSProperties}
							>
								Private Jets
							</p>

							<h1 className="text-6xl font-normal leading-none tracking-tighter md:text-7xl lg:text-8xl">
								<span
									className="animate-hero-rise block text-gray-500"
									style={{ "--rise-delay": "0.35s" } as CSSProperties}
								>
									Premium.
								</span>
								<span
									className="animate-hero-rise block text-[#202A36]"
									style={
										{
											marginTop: "-12px",
											"--rise-delay": "0.45s",
										} as CSSProperties
									}
								>
									Accessible.
								</span>
							</h1>

							<p
								className="animate-hero-rise mb-6 mt-5 max-w-2xl text-lg text-gray-600 md:text-xl"
								style={{ "--rise-delay": "0.58s" } as CSSProperties}
							>
								Your dedication deserves recognition.
							</p>

							<div
								className="animate-hero-rise flex items-center justify-center gap-4"
								style={{ "--rise-delay": "0.7s" } as CSSProperties}
							>
								<button
									type="button"
									className="rounded-full bg-gray-300 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-400"
								>
									Discover
								</button>
								<button
									type="button"
									className="rounded-full bg-[#202A36] px-4 py-2 font-medium text-white transition-colors hover:bg-[#1a2229]"
								>
									Book Now
								</button>
							</div>
						</div>
					</main>
				</div>
			</section>
		</div>
	);
}
