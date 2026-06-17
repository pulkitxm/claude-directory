/* Fixed, page-wide atmosphere. Three layers from the spec's z-index stack:
   1. perspective grid floor (z-0)
   2. floating blurred sun (z-0)
   ...content renders above these...
   5. CRT scanlines + RGB chromatic aberration (z-50)

   The scanline overlay is split out into <Scanlines /> so it can be the very
   last thing painted, sitting above all content. */

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
