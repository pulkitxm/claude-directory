import type { Variants } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Centralized motion tokens. The design system is explicit about motion:
// fast and decisive, no bounce. Everything composes from these so timing stays
// consistent and the personality ("confident, direct") is enforced in one place.
// ─────────────────────────────────────────────────────────────────────────────

// Fast-out, crisp stop. Used for every transition in the system.
// Typed as a const tuple so framer-motion reads it as a cubic-bezier.
export const CRISP = [0.25, 0, 0, 1] as const;

// Single element entrance: opacity 0→1, slide up 20px→0 over 500ms.
export const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: CRISP },
	},
};

// Container that staggers its children by 80ms after a 100ms initial delay.
export const stagger: Variants = {
	hidden: {},
	visible: {
		transition: {
			delayChildren: 0.1,
			staggerChildren: 0.08,
		},
	},
};

// Shared viewport config: trigger once, 15% in view, -50px margin so reveals
// fire a touch before the element is fully on screen.
export const viewportOnce = {
	once: true,
	amount: 0.15,
	margin: "-50px",
} as const;
