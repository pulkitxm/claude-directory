import { Globe } from "lucide-react";

const NAV_LINKS = ["Dashboard", "Assets", "Analytics", "Markets"] as const;
const BASE_URL = import.meta.env.BASE_URL;

/**
 * Fixed top navbar. A 3-column CSS grid keeps the middle nav block
 * mathematically centered to the viewport regardless of the side cells' widths.
 */
export default function Navbar() {
	return (
		<nav
			className="fixed left-0 right-0 top-0 z-50 grid grid-cols-3 items-center"
			style={{
				backgroundColor: "rgba(242,242,240,0.85)",
				backdropFilter: "blur(12px)",
				WebkitBackdropFilter: "blur(12px)",
				padding: "16px 40px",
			}}
		>
			{/* Left — wordmark */}
			<div className="justify-self-start">
				<a
					href="#"
					aria-label="Synex home"
					className="inline-flex items-center"
				>
					<img
						src={`${BASE_URL}assets/logo.svg`}
						alt="Synex"
						style={{ height: "28px", width: "auto" }}
						draggable={false}
					/>
				</a>
			</div>

			{/* Middle — nav links, centered to the viewport */}
			<div className="hidden justify-self-center md:flex md:items-center">
				{NAV_LINKS.map((label) => (
					<a
						key={label}
						href="#"
						className="uppercase transition-opacity duration-200 hover:opacity-[0.55]"
						style={{
							fontWeight: 600,
							fontSize: "13px",
							letterSpacing: "1.5px",
							color: "#111111",
							padding: "8px 14px",
						}}
					>
						{label}
					</a>
				))}
			</div>

			{/* Right — language selector + CTA */}
			<div className="flex items-center justify-self-end gap-4">
				<div className="hidden items-center gap-2 sm:flex">
					<Globe size={16} color="#111111" strokeWidth={1.75} />
					<span
						style={{
							fontWeight: 400,
							fontSize: "13px",
							color: "#111111",
						}}
					>
						English
					</span>
				</div>

				<button
					type="button"
					className="group inline-flex items-center gap-2 bg-[#111111] transition-colors duration-200 hover:bg-[#333333]"
					style={{
						borderRadius: "9999px",
						padding: "10px 20px",
					}}
				>
					{/* circular indicator */}
					<span
						className="flex items-center justify-center"
						style={{
							width: "18px",
							height: "18px",
							borderRadius: "9999px",
							backgroundColor: "rgba(255,255,255,0.20)",
						}}
					>
						<span
							style={{
								width: "6px",
								height: "6px",
								borderRadius: "9999px",
								backgroundColor: "#ffffff",
							}}
						/>
					</span>
					<span
						style={{
							fontWeight: 600,
							fontSize: "13px",
							color: "#ffffff",
						}}
					>
						Launch app
					</span>
				</button>
			</div>
		</nav>
	);
}
