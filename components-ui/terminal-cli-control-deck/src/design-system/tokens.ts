/**
 * Centralized semantic tokens (the TS counterpart to the CSS @theme block in
 * index.css). index.css is the single source of truth for *rendering* values
 * (colours, radii, fonts); this module owns the tokens that JS/TS must reason
 * about — namely the status taxonomy shared by StatusBadge, the node table and
 * the live log feed, so none of them hand-codes a label or colour tone.
 */

/** Semantic status → bracketed label + colour tone. */
export type StatusKind = "ok" | "warn" | "err" | "run";

export const status: Record<
	StatusKind,
	{ label: string; tone: "primary" | "secondary" | "error" }
> = {
	ok: { label: "OK", tone: "primary" },
	run: { label: "RUN", tone: "primary" },
	warn: { label: "WARN", tone: "secondary" },
	err: { label: "ERR", tone: "error" },
};
