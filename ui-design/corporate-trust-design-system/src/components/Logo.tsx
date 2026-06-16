/* Northwind wordmark — a gradient "compass" mark + name. The mark is an inline
   SVG so it inherits the brand gradient and scales crisply at any size. */
export function Logo({
	className,
	tone = "light",
}: {
	className?: string;
	tone?: "light" | "dark";
}) {
	return (
		<span
			className={`inline-flex items-center gap-2.5 font-extrabold tracking-tight ${className ?? ""}`}
		>
			<svg
				width="34"
				height="34"
				viewBox="0 0 34 34"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="shrink-0"
				aria-hidden="true"
			>
				<defs>
					<linearGradient
						id="nw-mark"
						x1="2"
						y1="2"
						x2="32"
						y2="32"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#4F46E5" />
						<stop offset="1" stopColor="#7C3AED" />
					</linearGradient>
				</defs>
				<rect width="34" height="34" rx="9" fill="url(#nw-mark)" />
				{/* Stylised "N" / compass needle */}
				<path
					d="M10 24V10l7 8 7-8v14"
					stroke="#fff"
					strokeWidth="2.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<span
				className={`text-lg ${tone === "dark" ? "text-white" : "text-slate-900"}`}
			>
				Northwind
			</span>
		</span>
	);
}
