import { ASSETS } from "../lib/assets";

const NAV_ITEMS = ["Advisors", "What we do", "AI Intelligence", "Tools"];

export default function Navbar() {
	return (
		<nav
			className="site-nav"
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 50,
				padding: "16px 32px",
			}}
		>
			<div
				className="site-nav-row"
				style={{
					position: "relative",
					display: "flex",
					alignItems: "center",
					height: 48,
				}}
			>
				{/* Left: logo */}
				<a
					className="site-logo"
					href="#"
					style={{ display: "inline-flex", alignItems: "center" }}
				>
					<img
						src={ASSETS.logoLov}
						alt="Synergeus"
						style={{ height: 28, width: "auto" }}
					/>
				</a>

				{/* Center pill nav */}
				<div
					className="font-heading site-nav-links"
					style={{
						position: "absolute",
						left: "50%",
						transform: "translateX(-50%)",
						display: "flex",
						alignItems: "center",
						gap: 4,
						background: "rgba(28,28,28,0.75)",
						backdropFilter: "blur(12px)",
						WebkitBackdropFilter: "blur(12px)",
						border: "1px solid rgba(255,255,255,0.10)",
						borderRadius: 9999,
						padding: "6px 8px",
					}}
				>
					{NAV_ITEMS.map((item) => (
						<a
							key={item}
							href="#"
							className="font-heading"
							style={{
								fontSize: 14,
								fontWeight: 400,
								color: "rgba(255,255,255,0.80)",
								padding: "8px 16px",
								borderRadius: 9999,
								textDecoration: "none",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = "rgba(255,255,255,0.10)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = "transparent";
							}}
						>
							{item}
						</a>
					))}
				</div>

				{/* Right: login + CTA */}
				<div
					className="site-nav-actions"
					style={{
						marginLeft: "auto",
						display: "flex",
						alignItems: "center",
						gap: 8,
					}}
				>
					<a
						href="#"
						className="font-heading"
						style={{
							fontSize: 14,
							color: "rgba(255,255,255,0.80)",
							padding: "8px 16px",
							textDecoration: "none",
						}}
					>
						Login
					</a>
					<button
						type="button"
						className="font-heading"
						style={{
							background: "#fff",
							color: "#000",
							fontSize: 14,
							fontWeight: 500,
							padding: "10px 20px",
							borderRadius: 9999,
							border: "none",
							cursor: "pointer",
						}}
					>
						Find an advisor
					</button>
				</div>
			</div>
		</nav>
	);
}
