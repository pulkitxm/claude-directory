const BASE_URL = (import.meta as ImportMeta & { env: { BASE_URL: string } }).env
	.BASE_URL;

export default function Logo() {
	return (
		<a
			href={BASE_URL}
			className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
			aria-label="Datacore home"
		>
			<svg
				width="28"
				height="24"
				viewBox="0 0 28 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M1.04356 6.35771L13.6437 0.666504L26.2438 6.35771L13.6437 12.0489L1.04356 6.35771Z"
					fill="white"
				/>
				<path
					d="M1.04356 9.80249L12.0937 14.7933V23.3335L1.04356 18.3427V9.80249Z"
					fill="white"
				/>
				<path
					d="M26.2438 9.80249L15.1937 14.7933V23.3335L26.2438 18.3427V9.80249Z"
					fill="white"
				/>
			</svg>
			<span className="font-manrope text-[17px] font-bold tracking-tight text-white">
				Datacore
			</span>
		</a>
	);
}
