/* Centralized design-token access for inline styles.
 *
 * The wobbly border-radius technique requires per-element inline `borderRadius`
 * values (you can't express an irregular elliptical radius with Tailwind's
 * rounded-* scale). Rather than scatter magic strings through every component,
 * the reusable radii live here once and are imported where needed. The matching
 * CSS classes (.r-wobbly etc.) exist in index.css for the static cases; this map
 * covers the cases that must be inline (e.g. randomized per-card variety).
 */
export const radius = {
	wobbly: "255px 15px 225px 15px / 15px 225px 15px 255px",
	wobblyMd: "30px 8px 30px 8px / 8px 30px 8px 30px",
	wobblyLg: "60px 18px 60px 18px / 18px 60px 18px 60px",
	wobblyPill: "130px 22px 130px 22px / 22px 130px 22px 130px",
	blob: "47% 53% 70% 30% / 42% 38% 62% 58%",
	blob2: "63% 37% 41% 59% / 54% 49% 51% 46%",
	blob3: "38% 62% 56% 44% / 53% 38% 62% 47%",
	blob4: "70% 30% 46% 54% / 36% 60% 40% 64%",
} as const;

export const colors = {
	paper: "#fdfbf7",
	ink: "#2d2d2d",
	muted: "#e5e0d8",
	accent: "#ff4d4d",
	pen: "#2d5da1",
	postit: "#fff9c4",
	card: "#ffffff",
} as const;

/* A small deterministic set of "hand-placed" rotations so repeated elements
   (cards in a grid) each sit at a slightly different casual angle without
   relying on Math.random (which would change on every render). */
export const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"] as const;

export const blobRadii = [radius.blob, radius.blob2, radius.blob3, radius.blob4];
