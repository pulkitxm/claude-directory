import ThemeToggle from "./ThemeToggle";

const MENU_ITEMS = [
	{ label: "Home", href: "#", active: true },
	{ label: "Studio", href: "#studio", active: false },
	{ label: "About", href: "#about", active: false },
	{ label: "Journal", href: "#journal", active: false },
	{ label: "Reach Us", href: "#reach-us", active: false },
];

export default function Navbar() {
	return (
		<header className="relative z-10 bg-background/70 backdrop-blur-md">
			<nav
				aria-label="Primary"
				className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6"
			>
				<a
					href="#"
					className="font-display text-3xl tracking-tight text-ink"
				>
					Aethera<sup className="text-[0.45em]">&reg;</sup>
				</a>

				<ul className="hidden items-center gap-8 md:flex">
					{MENU_ITEMS.map(({ label, href, active }) => (
						<li key={label}>
							<a
								href={href}
								aria-current={active ? "page" : undefined}
								className={`text-sm transition-colors ${
									active ? "text-ink" : "text-muted hover:text-ink"
								}`}
							>
								{label}
							</a>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-2">
					<ThemeToggle />
					<button
						type="button"
						className="rounded-full bg-ink px-6 py-2.5 text-sm text-background transition-transform duration-300 ease-out hover:scale-103"
					>
						Begin Journey
					</button>
				</div>
			</nav>
		</header>
	);
}
