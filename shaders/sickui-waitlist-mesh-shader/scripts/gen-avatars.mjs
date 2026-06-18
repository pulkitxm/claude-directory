#!/usr/bin/env node
/**
 * Generate the waitlist's social-proof avatars *locally* as self-contained SVGs.
 *
 * The prompt asks to "fill image assets with Unsplash stock images" — but this
 * sandbox blocks images.unsplash.com (host_not_allowed), and hotlinking a remote
 * URL would break the repo's "vendor everything, run offline" rule. So instead of
 * a broken <img src="https://images.unsplash.com/…">, we synthesise polished,
 * deterministic gradient avatars with monogram initials (the same visual idiom as
 * boringavatars / Linear / Vercel placeholder faces). Each is keyed off a name so
 * it is stable across runs and looks like a real, diverse roster of early users.
 *
 * Run: node scripts/gen-avatars.mjs   (writes assets/avatars/*.svg)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "assets", "avatars");
mkdirSync(OUT, { recursive: true });

// A small deterministic string hash -> 32-bit unsigned int.
function hash(str) {
	let h = 2166136261;
	for (let i = 0; i < str.length; i++) {
		h ^= str.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}

// Curated, on-brand gradient duos (deep blues, violets, cyans) so the avatars
// sit naturally on the SickUI mesh palette rather than fighting it.
const RAMPS = [
	["#3b82f6", "#1e3a8a"],
	["#6366f1", "#312e81"],
	["#22d3ee", "#0e7490"],
	["#8b5cf6", "#4c1d95"],
	["#0ea5e9", "#1e40af"],
	["#a855f7", "#1e1b4b"],
	["#38bdf8", "#1d4ed8"],
	["#7c3aed", "#0c4a6e"],
];

function initials(name) {
	const parts = name.trim().split(/\s+/);
	const first = parts[0]?.[0] ?? "";
	const last = parts.length > 1 ? parts[parts.length - 1][0] : (parts[0]?.[1] ?? "");
	return (first + last).toUpperCase();
}

function avatarSVG(name) {
	const h = hash(name);
	const [a, b] = RAMPS[h % RAMPS.length];
	const angle = (h >> 3) % 360;
	const mono = initials(name);
	const id = `g${h.toString(36)}`;
	// A soft inner highlight + diagonal sheen reads as a glossy photo-ish chip.
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" role="img" aria-label="${name}">
  <defs>
    <linearGradient id="${id}" gradientTransform="rotate(${angle} 0.5 0.5)">
      <stop offset="0%" stop-color="${a}"/>
      <stop offset="100%" stop-color="${b}"/>
    </linearGradient>
    <radialGradient id="${id}s" cx="32%" cy="28%" r="75%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.45"/>
      <stop offset="55%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="128" height="128" rx="64" fill="url(#${id})"/>
  <rect width="128" height="128" rx="64" fill="url(#${id}s)"/>
  <text x="64" y="64" dy="0.35em" text-anchor="middle"
        font-family="Onest, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
        font-size="48" font-weight="600" fill="#ffffff" fill-opacity="0.95"
        style="letter-spacing:-1px">${mono}</text>
</svg>
`;
}

// The roster shown stacked under the CTA. Names only; faces are synthesised.
const ROSTER = [
	{ file: "avatar-1.svg", name: "Maya Okonkwo" },
	{ file: "avatar-2.svg", name: "Diego Ramos" },
	{ file: "avatar-3.svg", name: "Aisha Karim" },
	{ file: "avatar-4.svg", name: "Lena Hoffmann" },
	{ file: "avatar-5.svg", name: "Sora Tanaka" },
];

for (const { file, name } of ROSTER) {
	writeFileSync(join(OUT, file), avatarSVG(name));
	console.log(`wrote ${file}  (${name})`);
}
console.log(`\n${ROSTER.length} avatars written to assets/avatars/`);
