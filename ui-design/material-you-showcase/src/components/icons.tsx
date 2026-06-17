import type { SVGProps } from "react";

/* ============================================================================
   ICONS — a small set of inline, rounded "Material Symbols"-style glyphs.
   Drawn locally (no icon font / no CDN) so the project is fully self-contained.
   `currentColor` strokes mean each icon inherits the surrounding text color.
   ========================================================================== */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 24, ...rest }: IconProps) {
	return {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round" as const,
		strokeLinejoin: "round" as const,
		"aria-hidden": true,
		...rest,
	};
}

export const ArrowRight = (p: IconProps) => (
	<svg {...base(p)}>
		<path d="M5 12h14M13 6l6 6-6 6" />
	</svg>
);

export const Sparkle = (p: IconProps) => (
	<svg {...base(p)}>
		<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
		<path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
	</svg>
);

export const Palette = (p: IconProps) => (
	<svg {...base(p)}>
		<path d="M12 3a9 9 0 1 0 0 18c1.7 0 2.2-1.3 1.5-2.3-.7-1-.3-2.2 1-2.2H17a4 4 0 0 0 4-4c0-4.5-4-7.5-9-7.5Z" />
		<circle cx="8" cy="11" r="1.1" fill="currentColor" stroke="none" />
		<circle cx="12" cy="8" r="1.1" fill="currentColor" stroke="none" />
		<circle cx="16" cy="11" r="1.1" fill="currentColor" stroke="none" />
	</svg>
);

export const Layers = (p: IconProps) => (
	<svg {...base(p)}>
		<path d="M12 3l9 5-9 5-9-5 9-5Z" />
		<path d="M3 13l9 5 9-5" />
	</svg>
);

export const Bolt = (p: IconProps) => (
	<svg {...base(p)}>
		<path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />
	</svg>
);

export const Shield = (p: IconProps) => (
	<svg {...base(p)}>
		<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
		<path d="m9 12 2 2 4-4" />
	</svg>
);

export const Wand = (p: IconProps) => (
	<svg {...base(p)}>
		<path d="m4 20 10-10" />
		<path d="m14 6 1.2-3L16.4 6 19.4 7l-3 1.2L15.2 11 14 8l-3-1 3-1Z" />
		<path d="M19 14h.01M5 9h.01" />
	</svg>
);

export const Heart = (p: IconProps) => (
	<svg {...base(p)}>
		<path d="M12 20s-7-4.3-7-9.3A3.7 3.7 0 0 1 12 8a3.7 3.7 0 0 1 7 2.7C19 15.7 12 20 12 20Z" />
	</svg>
);

export const Check = (p: IconProps) => (
	<svg {...base(p)}>
		<path d="m4 12 5 5L20 6" />
	</svg>
);

export const Plus = (p: IconProps) => (
	<svg {...base(p)}>
		<path d="M12 5v14M5 12h14" />
	</svg>
);

export const ChevronDown = (p: IconProps) => (
	<svg {...base(p)}>
		<path d="m6 9 6 6 6-6" />
	</svg>
);

export const Menu = (p: IconProps) => (
	<svg {...base(p)}>
		<path d="M4 7h16M4 12h16M4 17h16" />
	</svg>
);

export const Close = (p: IconProps) => (
	<svg {...base(p)}>
		<path d="M6 6l12 12M18 6 6 18" />
	</svg>
);

export const Tune = (p: IconProps) => (
	<svg {...base(p)}>
		<path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h8M16 18h4" />
		<circle cx="16" cy="6" r="2" />
		<circle cx="8" cy="12" r="2" />
		<circle cx="14" cy="18" r="2" />
	</svg>
);

export const Globe = (p: IconProps) => (
	<svg {...base(p)}>
		<circle cx="12" cy="12" r="9" />
		<path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
	</svg>
);

export const Clock = (p: IconProps) => (
	<svg {...base(p)}>
		<circle cx="12" cy="12" r="9" />
		<path d="M12 7v5l3 2" />
	</svg>
);

export const Star = (p: IconProps) => (
	<svg {...{ ...base(p), fill: "currentColor", stroke: "none" }}>
		<path d="M12 3.5l2.5 5.1 5.6.8-4.1 4 1 5.6L12 16.4 6.9 19l1-5.6-4-4 5.5-.8L12 3.5Z" />
	</svg>
);

export const PlayCircle = (p: IconProps) => (
	<svg {...base(p)}>
		<circle cx="12" cy="12" r="9" />
		<path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
	</svg>
);
