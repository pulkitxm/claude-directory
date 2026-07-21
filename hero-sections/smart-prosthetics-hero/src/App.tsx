const VIDEO_URL = `${import.meta.env.BASE_URL}assets/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4`;

const NAV_LINKS = ["Story", "Products", "Help", "Support"];

function Logo() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 256 256"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill="rgb(84, 84, 84)"
				d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z"
			/>
		</svg>
	);
}

export default function App() {
	return (
		<div className="relative min-h-screen overflow-hidden bg-[#f0f0ee]">
			<video
				className="absolute inset-0 w-full h-full object-cover"
				src={VIDEO_URL}
				autoPlay
				muted
				loop
				playsInline
			/>

			<div className="relative z-10 flex flex-col min-h-screen">
				<nav className="flex items-center justify-center pt-4 sm:pt-6 px-4 sm:px-8 gap-2 sm:gap-3">
					<div
						className="flex items-center justify-center rounded-full w-10 h-10 sm:w-11 sm:h-11 shrink-0"
						style={{ backgroundColor: "#EDEDED" }}
					>
						<Logo />
					</div>
					<div
						className="flex items-center gap-4 sm:gap-10 rounded-xl px-4 sm:px-8 py-2.5 sm:py-3"
						style={{ backgroundColor: "#EDEDED" }}
					>
						{NAV_LINKS.map((link) => (
							<a
								key={link}
								href="#"
								className="text-[12px] sm:text-[14px] font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
							>
								{link}
							</a>
						))}
					</div>
				</nav>

				<div className="flex-1 flex items-end pb-10 sm:pb-16 lg:pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
					<div className="max-w-xs">
						<a
							href="#"
							className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-blue-500 hover:text-blue-600 transition-colors mb-3 group"
						>
							Seen on Shark Tank in India
							<span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
								→
							</span>
						</a>

						<h1 className="text-[1.5rem] sm:text-[1.75rem] leading-[1.15] font-medium text-gray-900 tracking-tight mb-3">
							Simple, smart prosthetics made for people who keep fighting.
						</h1>

						<p className="text-[13px] text-gray-400 font-normal mb-3">
							Reclaim your movement now.
						</p>

						<a
							href="#"
							className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-500 border border-blue-400 rounded-full px-5 py-2.5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group"
						>
							Try a free fitting
							<span className="transition-transform duration-200 group-hover:translate-x-0.5">
								→
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
