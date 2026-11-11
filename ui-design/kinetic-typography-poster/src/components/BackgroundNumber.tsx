type BackgroundNumberProps = {
	children: string;

	className?: string;
};


export function BackgroundNumber({
	children,
	className = "",
}: BackgroundNumberProps) {
	return (
		<span
			aria-hidden="true"
			className={`pointer-events-none select-none font-bold tracking-tighter ${className}`}
		>
			{children}
		</span>
	);
}
