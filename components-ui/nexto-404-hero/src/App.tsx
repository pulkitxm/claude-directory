import { type ReactNode, useState } from "react";

const LOGO_URL = `${import.meta.env.BASE_URL}assets/logoipsum-415.svg`;

const NAV_LINKS = ["Our Team", "Solutions", "Showcase", "News"];

function CtaButton({
	onClick,
	tabIndex,
}: {
	onClick?: () => void;
	tabIndex?: number;
}) {
	return (
		<a
			href="#connect"
			className="cta-button"
			onClick={onClick}
			tabIndex={tabIndex}
		>
			<span className="cta-arrow" aria-hidden="true">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2.4}
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M9 18l6-6-6-6" />
				</svg>
			</span>
			Let&apos;s Connect
		</a>
	);
}

function Logo() {
	return (
		<a href="#home" className="logo" aria-label="nexto home">
			<img src={LOGO_URL} alt="" className="select-none" draggable={false} />
			<span className="logo-text whitespace-nowrap">nexto.</span>
		</a>
	);
}

function Navbar({
	menuOpen,
	onToggleMenu,
}: {
	menuOpen: boolean;
	onToggleMenu: () => void;
}) {
	return (
		<header className="navbar">
			<Logo />

			<nav className="nav-links" aria-label="Primary">
				{NAV_LINKS.map((label) => (
					<a key={label} href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}>
						{label}
						{label === "Solutions" && (
							<span className="drop-arrow" aria-hidden="true">
								&#9662;
							</span>
						)}
					</a>
				))}
			</nav>

			<CtaButton />

			<button
				type="button"
				className={`hamburger select-none${menuOpen ? " active" : ""}`}
				aria-label="Toggle navigation menu"
				aria-expanded={menuOpen}
				onClick={onToggleMenu}
			>
				<span />
				<span />
				<span />
			</button>
		</header>
	);
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
	return (
		<nav
			className={`mobile-nav${open ? " open" : ""}`}
			aria-label="Mobile"
			aria-hidden={!open}
		>
			{NAV_LINKS.map((label) => (
				<a
					key={label}
					className="mobile-nav-link"
					href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
					onClick={onClose}
					tabIndex={open ? 0 : -1}
				>
					{label}
				</a>
			))}
			<CtaButton onClick={onClose} tabIndex={open ? 0 : -1} />
		</nav>
	);
}

function HouseIcon() {
	return (
		<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
			<path
				d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
				fill="#1a1a1a"
			/>
			<path d="M9 21V12h6v9" fill="#ffffff" />
		</svg>
	);
}

function CircleDotIcon() {
	return (
		<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
			<circle cx="12" cy="12" r="9" fill="#1a1a1a" />
			<circle cx="12" cy="12" r="3.5" fill="#ffffff" />
		</svg>
	);
}

function NavCard({
	href,
	icon,
	title,
	subtitle,
}: {
	href: string;
	icon: ReactNode;
	title: string;
	subtitle: string;
}) {
	return (
		<a href={href} className="nav-card">
			<span className="card-left">
				<span className="card-icon">{icon}</span>
				<span>
					<p className="card-title">{title}</p>
					<p className="card-sub">{subtitle}</p>
				</span>
			</span>
			<span className="card-arrow" aria-hidden="true">
				&rsaquo;
			</span>
		</a>
	);
}

export default function App() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			<Navbar menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
			<MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

			<main className="main-content">
				<p className="lost-text">Seems you&apos;ve wandered off...</p>

				<div className="title-wrapper">
					<span
						className="material-symbols-rounded deco deco-cloud pointer-events-none select-none"
						aria-hidden="true"
					>
						cloud
					</span>
					<h1 className="title">Whoops! Nothing here yet</h1>
					<span
						className="material-symbols-rounded deco deco-heart pointer-events-none select-none"
						aria-hidden="true"
					>
						favorite
					</span>
				</div>

				<p className="subtext">
					Grab a 30-minute <span className="tag">chat</span> to explore your
					ideas, scope, and vision. We&apos;ll find common ground, sync and{" "}
					<span className="tag">define</span> a clear roadmap.
				</p>

				<div className="nav-cards">
					<NavCard
						href="#home"
						icon={<HouseIcon />}
						title="Main Page"
						subtitle="Back where it all begins..."
					/>
					<NavCard
						href="#showcase"
						icon={<CircleDotIcon />}
						title="Showcase"
						subtitle="Where we walk the walk"
					/>
				</div>
			</main>
		</>
	);
}
