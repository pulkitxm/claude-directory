

export function Backdrop() {
	return (
		<div aria-hidden>
			<div className="grid-floor" />
			<div className="sun" />
		</div>
	);
}

export function Scanlines() {
	return <div className="scanlines" aria-hidden />;
}
