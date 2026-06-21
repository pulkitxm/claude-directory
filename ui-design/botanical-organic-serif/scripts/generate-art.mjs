#!/usr/bin/env node
/**
 * generate-art.mjs
 * ----------------------------------------------------------------------------
 * Bespoke, fully-offline botanical artwork for the "Verdant" Botanical / Organic
 * Serif design-system showcase.
 *
 * Stock-photo CDNs are not on this environment's network allowlist, and a
 * remotely-hosted generated image could not be vendored locally anyway. So,
 * faithful to the design philosophy ("hand-touched, sun-warmed, naturally
 * crafted"), every image on the page is a hand-built, layered SVG illustration
 * rendered in the exact earthy token palette. They are deterministic (seeded
 * PRNG) so re-running reproduces byte-identical art, and they live as real
 * vendored files in /public/images. Nothing is fetched at runtime.
 *
 * Run:  npm run gen:art
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../public/images");
fs.mkdirSync(OUT, { recursive: true });

/* --- Earthbound palette (mirrors the design tokens) ----------------------- */
const C = {
	paper: "#F9F8F4",
	forest: "#2D3A31",
	forestDeep: "#222C25",
	sage: "#8C9A84",
	sageLt: "#A7B29F",
	sageDk: "#6E7C66",
	clay: "#DCCFC2",
	clayLt: "#E8DFD4",
	stone: "#E6E2DA",
	terracotta: "#C27B66",
	terracottaDk: "#A8624E",
	cream: "#F2F0EB",
	moss: "#5C6B4E",
	wheat: "#D8C9A8",
};

/* --- Tiny seeded PRNG (mulberry32) ---------------------------------------- */
function rng(seed) {
	let a = seed >>> 0;
	return () => {
		a |= 0;
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}
const r2 = (n) => Math.round(n * 100) / 100;

/* --- SVG helpers ---------------------------------------------------------- */

// A single tapered leaf as a closed bezier "eye" shape, with a centre vein.
function leaf(cx, cy, len, wid, angleDeg, fill, vein, veinW = 1) {
	const a = (angleDeg * Math.PI) / 180;
	const dx = Math.cos(a);
	const dy = Math.sin(a);
	// tip and base along the leaf axis
	const tx = cx + dx * len;
	const ty = cy + dy * len;
	// perpendicular for the belly control points
	const px = -dy;
	const py = dx;
	const bx = cx + dx * len * 0.5 + px * wid;
	const by = cy + dy * len * 0.5 + py * wid;
	const b2x = cx + dx * len * 0.5 - px * wid;
	const b2y = cy + dy * len * 0.5 - py * wid;
	const d = `M ${r2(cx)} ${r2(cy)} Q ${r2(bx)} ${r2(by)} ${r2(tx)} ${r2(ty)} Q ${r2(b2x)} ${r2(b2y)} ${r2(cx)} ${r2(cy)} Z`;
	let s = `<path d="${d}" fill="${fill}"/>`;
	if (vein) {
		s += `<path d="M ${r2(cx)} ${r2(cy)} L ${r2(tx)} ${r2(ty)}" stroke="${vein}" stroke-width="${veinW}" fill="none" stroke-linecap="round" opacity="0.5"/>`;
	}
	return s;
}

// A frond / branch: a gently curving stem with paired leaves marching up it.
function frond(x, y, height, lean, rand, opts = {}) {
	const {
		stem = C.moss,
		leafFill = C.sage,
		leafVein = C.forestDeep,
		leaves = 7,
		leafLen = 34,
		flip = 1,
	} = opts;
	const topX = x + lean;
	const topY = y - height;
	const ctrlX = x + lean * 0.35 + flip * 18;
	const ctrlY = y - height * 0.55;
	let s = `<path d="M ${r2(x)} ${r2(y)} Q ${r2(ctrlX)} ${r2(ctrlY)} ${r2(topX)} ${r2(topY)}" stroke="${stem}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
	for (let i = 1; i <= leaves; i++) {
		const t = i / (leaves + 1);
		// point on the quadratic bezier
		const bx = (1 - t) * (1 - t) * x + 2 * (1 - t) * t * ctrlX + t * t * topX;
		const by = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * ctrlY + t * t * topY;
		const ll = leafLen * (1 - t * 0.45) * (0.85 + rand() * 0.3);
		const base = -90 + lean * 0.4;
		s += leaf(bx, by, ll, ll * 0.32, base - 42 * flip, leafFill, leafVein);
		s += leaf(bx, by, ll, ll * 0.32, base + 42 * flip, leafFill, leafVein);
	}
	// crown leaf
	s += leaf(
		topX,
		topY,
		leafLen * 0.7,
		leafLen * 0.22,
		-90 + lean * 0.4,
		leafFill,
		leafVein,
	);
	return s;
}

// A terracotta pot (trapezoid with a rim).
function pot(cx, baseY, topW, botW, h, fill, rim, shade) {
	const tl = cx - topW / 2;
	const tr = cx + topW / 2;
	const bl = cx - botW / 2;
	const br = cx + botW / 2;
	const rimH = h * 0.16;
	return `
	<path d="M ${r2(tl)} ${r2(baseY - h)} L ${r2(tr)} ${r2(baseY - h)} L ${r2(br)} ${r2(baseY)} L ${r2(bl)} ${r2(baseY)} Z" fill="${fill}"/>
	<path d="M ${r2(cx)} ${r2(baseY - h)} L ${r2(br)} ${r2(baseY)} L ${r2(bl)} ${r2(baseY)} L ${r2(cx)} ${r2(baseY - h)} Z" fill="${shade}" opacity="0.35"/>
	<rect x="${r2(tl - topW * 0.06)}" y="${r2(baseY - h - rimH)}" width="${r2(topW * 1.12)}" height="${r2(rimH * 1.05)}" rx="${r2(rimH * 0.4)}" fill="${rim}"/>`;
}

function svgDoc(w, h, body, defs = "") {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">
${defs}
${body}
</svg>`;
}

function grainDefs(id) {
	return `<filter id="grain-${id}"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>`;
}
function grainRect(id, w, h, op = 0.04) {
	return `<rect width="${w}" height="${h}" filter="url(#grain-${id})" opacity="${op}"/>`;
}

// soft sun disc with rays as a backdrop
function sun(cx, cy, rad, color, op) {
	let rays = "";
	for (let i = 0; i < 18; i++) {
		const a = (i / 18) * Math.PI * 2;
		const r1 = rad * 1.25;
		const r2v = rad * 2.4;
		rays += `<line x1="${r2(cx + Math.cos(a) * r1)}" y1="${r2(cy + Math.sin(a) * r1)}" x2="${r2(cx + Math.cos(a) * r2v)}" y2="${r2(cy + Math.sin(a) * r2v)}" stroke="${color}" stroke-width="1.4" opacity="${op * 0.7}" stroke-linecap="round"/>`;
	}
	return `${rays}<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${color}" opacity="${op}"/>`;
}

/* ========================================================================== */
/* 1. HERO — an arched greenhouse window full of light & foliage              */
/* ========================================================================== */
function buildHero() {
	const W = 900;
	const H = 1200;
	const rand = rng(7);
	const archTop = 120;
	const archR = W / 2;
	// Arch interior clip
	const clip = `<clipPath id="heroArch"><path d="M 0 ${H} L 0 ${archTop + 0} Q 0 ${archTop - archR + archR} 0 ${archTop} A ${archR} ${archR} 0 0 1 ${W} ${archTop} L ${W} ${H} Z"/></clipPath>`;
	// Simpler, correct arch path: vertical sides + semicircle cap.
	const archPath = `M 0 ${H} L 0 ${archTop} A ${archR} ${archR} 0 0 1 ${W} ${archTop} L ${W} ${H} Z`;
	const defs = `<defs>
		${grainDefs("hero")}
		<clipPath id="heroArch"><path d="${archPath}"/></clipPath>
		<linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="${C.clayLt}"/>
			<stop offset="0.55" stop-color="${C.cream}"/>
			<stop offset="1" stop-color="${C.stone}"/>
		</linearGradient>
		<radialGradient id="heroGlow" cx="0.5" cy="0.28" r="0.6">
			<stop offset="0" stop-color="${C.wheat}" stop-opacity="0.9"/>
			<stop offset="1" stop-color="${C.wheat}" stop-opacity="0"/>
		</radialGradient>
	</defs>`;

	let body = `<rect width="${W}" height="${H}" fill="${C.cream}"/>`;
	body += `<g clip-path="url(#heroArch)">`;
	body += `<rect width="${W}" height="${H}" fill="url(#heroSky)"/>`;
	body += sun(W * 0.5, archTop + 150, 120, C.wheat, 0.55);
	body += `<rect width="${W}" height="${H}" fill="url(#heroGlow)"/>`;

	// Hanging vines from the arch crown
	for (let i = 0; i < 6; i++) {
		const x = 80 + i * ((W - 160) / 5) + (rand() - 0.5) * 30;
		const len = 220 + rand() * 260;
		let d = `M ${r2(x)} ${archTop} `;
		const segs = 6;
		let cy = archTop;
		let cx = x;
		for (let s = 0; s < segs; s++) {
			const ny = cy + len / segs;
			const nx = x + Math.sin((s + i) * 1.1) * 26;
			d += `Q ${r2((cx + nx) / 2 + (rand() - 0.5) * 18)} ${r2((cy + ny) / 2)} ${r2(nx)} ${r2(ny)} `;
			// little leaves along the vine
			body += leaf(
				nx,
				ny,
				18 + rand() * 8,
				7,
				200 + rand() * 50,
				C.sage,
				C.forestDeep,
			);
			body += leaf(
				nx,
				ny,
				16 + rand() * 8,
				6,
				-20 + rand() * 50,
				C.sageLt,
				C.forestDeep,
			);
			cx = nx;
			cy = ny;
		}
		body += `<path d="${d}" stroke="${C.moss}" stroke-width="2" fill="none" opacity="0.85"/>`;
	}

	// A grand monstera-ish plant in a terracotta pot, lower third
	const potBaseY = H - 70;
	body += `<ellipse cx="${W / 2}" cy="${potBaseY + 8}" rx="230" ry="34" fill="${C.forestDeep}" opacity="0.10"/>`;
	// big fronds behind the pot
	body += frond(W * 0.5 - 40, potBaseY - 150, 430, -150, rand, {
		leafFill: C.sageDk,
		leafVein: C.forestDeep,
		leaves: 6,
		leafLen: 64,
		flip: 1,
	});
	body += frond(W * 0.5 + 40, potBaseY - 150, 470, 150, rand, {
		leafFill: C.moss,
		leafVein: C.forestDeep,
		leaves: 6,
		leafLen: 70,
		flip: -1,
	});
	body += frond(W * 0.5, potBaseY - 160, 520, 10, rand, {
		leafFill: C.sage,
		leafVein: C.forestDeep,
		leaves: 7,
		leafLen: 72,
		flip: 1,
	});
	body += frond(W * 0.5 - 110, potBaseY - 150, 360, -250, rand, {
		leafFill: C.sageLt,
		leafVein: C.forestDeep,
		leaves: 5,
		leafLen: 56,
		flip: 1,
	});
	body += frond(W * 0.5 + 110, potBaseY - 150, 380, 250, rand, {
		leafFill: C.sage,
		leafVein: C.forestDeep,
		leaves: 5,
		leafLen: 58,
		flip: -1,
	});
	body += pot(
		W / 2,
		potBaseY,
		260,
		200,
		190,
		C.terracotta,
		C.terracottaDk,
		C.terracottaDk,
	);

	// Side foliage creeping in
	body += frond(40, H - 30, 360, 60, rand, {
		leafFill: C.sageDk,
		leafVein: C.forestDeep,
		leaves: 6,
		leafLen: 50,
		flip: -1,
	});
	body += frond(W - 40, H - 30, 360, -60, rand, {
		leafFill: C.moss,
		leafVein: C.forestDeep,
		leaves: 6,
		leafLen: 50,
		flip: 1,
	});

	body += grainRect("hero", W, H, 0.05);
	body += `</g>`;
	// Arch frame outline
	body += `<path d="${archPath}" fill="none" stroke="${C.stone}" stroke-width="2"/>`;
	body += `<path d="M 14 ${H} L 14 ${archTop + 6} A ${archR - 14} ${archR - 14} 0 0 1 ${W - 14} ${archTop + 6} L ${W - 14} ${H}" fill="none" stroke="${C.clay}" stroke-width="1.5" opacity="0.7"/>`;

	return svgDoc(W, H, body, defs);
	// (clip var kept above is intentionally unused; archPath supersedes it)
	void clip;
}

/* ========================================================================== */
/* 2. FEATURE / COLLECTION panels (3) — tall arched botanical vignettes        */
/* ========================================================================== */
function buildFeature(seed, scheme) {
	const W = 800;
	const H = 1000;
	const rand = rng(seed);
	const id = `feat${seed}`;
	const defs = `<defs>
		${grainDefs(id)}
		<linearGradient id="bg${id}" x1="0" y1="0" x2="0.3" y2="1">
			<stop offset="0" stop-color="${scheme.bgA}"/>
			<stop offset="1" stop-color="${scheme.bgB}"/>
		</linearGradient>
	</defs>`;
	let body = `<rect width="${W}" height="${H}" fill="url(#bg${id})"/>`;
	body += sun(W * (0.3 + rand() * 0.4), H * 0.24, 90, scheme.sun, 0.4);

	// ground arc
	body += `<path d="M -20 ${H - 130} Q ${W / 2} ${H - 220} ${W + 20} ${H - 130} L ${W + 20} ${H + 20} L -20 ${H + 20} Z" fill="${scheme.ground}" opacity="0.9"/>`;

	if (scheme.kind === "pots") {
		// A trio of potted plants on a clay shelf — ceramics-studio feeling
		const xs = [W * 0.28, W * 0.55, W * 0.78];
		const hs = [150, 200, 130];
		xs.forEach((x, i) => {
			const by = H - 150 + (i === 1 ? 6 : 0);
			body += `<ellipse cx="${x}" cy="${by + 6}" rx="${70 - i * 4}" ry="14" fill="${C.forestDeep}" opacity="0.10"/>`;
			body += frond(x, by - hs[i] * 0.5, hs[i] + 80, (i - 1) * 30, rand, {
				leafFill: i === 1 ? scheme.leafA : scheme.leafB,
				leafVein: C.forestDeep,
				leaves: 5 + i,
				leafLen: 42 + i * 6,
				flip: i % 2 === 0 ? 1 : -1,
			});
			body += pot(
				x,
				by,
				96 - i * 6,
				74 - i * 6,
				86 - i * 4,
				scheme.potA,
				scheme.potB,
				C.terracottaDk,
			);
		});
		// hanging plant top-left
		body += `<path d="M 90 0 L 90 70" stroke="${C.moss}" stroke-width="2" fill="none"/>`;
		body += frond(90, 150, 120, 0, rand, {
			leafFill: scheme.leafA,
			leafVein: C.forestDeep,
			leaves: 5,
			leafLen: 30,
			flip: 1,
		});
	} else if (scheme.kind === "garden") {
		// A meadow of mixed fronds — botanical garden feeling
		for (let i = 0; i < 9; i++) {
			const x = 60 + i * ((W - 120) / 8) + (rand() - 0.5) * 30;
			const h = 230 + rand() * 320;
			body += frond(x, H - 130, h, (rand() - 0.5) * 120, rand, {
				leafFill:
					i % 3 === 0 ? scheme.leafA : i % 3 === 1 ? scheme.leafB : C.sageDk,
				leafVein: C.forestDeep,
				leaves: 5 + Math.floor(rand() * 4),
				leafLen: 34 + rand() * 26,
				flip: i % 2 === 0 ? 1 : -1,
			});
		}
		// a few floating seed-heads / blooms
		for (let i = 0; i < 5; i++) {
			const x = 90 + rand() * (W - 180);
			const y = 160 + rand() * 360;
			body += `<circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(7 + rand() * 6)}" fill="${scheme.bloom}" opacity="0.85"/>`;
			body += `<line x1="${r2(x)}" y1="${r2(y)}" x2="${r2(x)}" y2="${r2(y + 50 + rand() * 40)}" stroke="${C.moss}" stroke-width="1.4"/>`;
		}
	} else {
		// "foliage": a dense canopy of large overlapping leaves from the top
		for (let i = 0; i < 22; i++) {
			const x = rand() * W;
			const y = -20 + rand() * (H * 0.7);
			const len = 90 + rand() * 150;
			const ang = -200 + rand() * 220;
			const fill = [scheme.leafA, scheme.leafB, C.sageDk, C.moss][
				Math.floor(rand() * 4)
			];
			body += leaf(x, y, len, len * 0.34, ang, fill, C.forestDeep, 1.4);
		}
		// a single bold stem rising from the ground
		body += frond(W * 0.4, H - 130, 360, 60, rand, {
			leafFill: scheme.leafA,
			leafVein: C.forestDeep,
			leaves: 6,
			leafLen: 56,
			flip: 1,
		});
	}

	body += grainRect(id, W, H, 0.045);
	return svgDoc(W, H, body, defs);
}

/* ========================================================================== */
/* 3. STORY — a wide ceramics-studio windowsill scene                          */
/* ========================================================================== */
function buildStory() {
	const W = 1000;
	const H = 1100;
	const rand = rng(31);
	const defs = `<defs>
		${grainDefs("story")}
		<linearGradient id="storyBg" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="${C.clayLt}"/>
			<stop offset="1" stop-color="${C.cream}"/>
		</linearGradient>
	</defs>`;
	let body = `<rect width="${W}" height="${H}" fill="url(#storyBg)"/>`;
	body += sun(W * 0.78, H * 0.2, 110, C.wheat, 0.5);

	// window frame
	const fx = 80;
	const fy = 70;
	const fw = W - 160;
	const fh = 560;
	body += `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="${fw / 2}" ry="${fw / 2}" fill="${C.sage}" opacity="0.16"/>`;
	// Mullion arch — turn the window into two arches
	body += `<rect x="${fx}" y="${fy + fh / 2}" width="${fw}" height="${fh / 2}" fill="${C.clayLt}" opacity="0.4"/>`;
	body += `<line x1="${W / 2}" y1="${fy}" x2="${W / 2}" y2="${fy + fh}" stroke="${C.stone}" stroke-width="6"/>`;
	body += `<rect x="${fx - 6}" y="${fy - 6}" width="${fw + 12}" height="${fh + 12}" rx="${fw / 2}" fill="none" stroke="${C.clay}" stroke-width="6"/>`;

	// shelf
	const shelfY = H - 250;
	body += `<rect x="0" y="${shelfY}" width="${W}" height="26" fill="${C.wheat}"/>`;
	body += `<rect x="0" y="${shelfY + 26}" width="${W}" height="12" fill="${C.terracottaDk}" opacity="0.25"/>`;

	// row of pots & vases on the shelf
	const items = [
		{
			x: 170,
			tw: 120,
			bw: 92,
			h: 150,
			fill: C.terracotta,
			rim: C.terracottaDk,
			leaf: C.sageDk,
			n: 6,
			ll: 56,
		},
		{
			x: 360,
			tw: 90,
			bw: 110,
			h: 200,
			fill: C.clay,
			rim: C.stone,
			leaf: C.moss,
			n: 5,
			ll: 64,
		},
		{
			x: 540,
			tw: 70,
			bw: 70,
			h: 120,
			fill: C.sage,
			rim: C.sageDk,
			leaf: C.sageLt,
			n: 7,
			ll: 40,
		},
		{
			x: 720,
			tw: 130,
			bw: 96,
			h: 170,
			fill: C.terracotta,
			rim: C.terracottaDk,
			leaf: C.sage,
			n: 6,
			ll: 60,
		},
		{
			x: 880,
			tw: 80,
			bw: 64,
			h: 110,
			fill: C.clay,
			rim: C.stone,
			leaf: C.sageDk,
			n: 5,
			ll: 38,
		},
	];
	items.forEach((it, i) => {
		const by = shelfY + 2;
		body += `<ellipse cx="${it.x}" cy="${by + 4}" rx="${it.bw / 1.5}" ry="10" fill="${C.forestDeep}" opacity="0.10"/>`;
		body += frond(it.x, by - it.h * 0.5, it.h + 120, (i - 2) * 26, rand, {
			leafFill: it.leaf,
			leafVein: C.forestDeep,
			leaves: it.n,
			leafLen: it.ll,
			flip: i % 2 === 0 ? 1 : -1,
		});
		body += pot(it.x, by, it.tw, it.bw, it.h, it.fill, it.rim, C.terracottaDk);
	});

	body += grainRect("story", W, H, 0.05);
	return svgDoc(W, H, body, defs);
}

/* ========================================================================== */
/* 4. JOURNAL thumbnails (3) — landscape botanical flatlays                     */
/* ========================================================================== */
function buildJournal(seed, scheme) {
	const W = 800;
	const H = 600;
	const rand = rng(seed);
	const id = `jrn${seed}`;
	const defs = `<defs>${grainDefs(id)}<linearGradient id="jb${id}" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="${scheme.a}"/><stop offset="1" stop-color="${scheme.b}"/></linearGradient></defs>`;
	let body = `<rect width="${W}" height="${H}" fill="url(#jb${id})"/>`;

	if (scheme.kind === "sprig") {
		// single elegant sprig across the frame
		body += frond(W * 0.2, H - 40, 360, 220, rand, {
			leafFill: scheme.leaf,
			leafVein: C.forestDeep,
			leaves: 8,
			leafLen: 50,
			flip: 1,
		});
		body += frond(W * 0.85, 40, 280, -160, rand, {
			leafFill: scheme.leaf2,
			leafVein: C.forestDeep,
			leaves: 6,
			leafLen: 42,
			flip: -1,
		});
	} else if (scheme.kind === "blooms") {
		// scattered dried flowers
		for (let i = 0; i < 7; i++) {
			const x = 80 + rand() * (W - 160);
			const y = 100 + rand() * (H - 200);
			const pr = 14 + rand() * 14;
			body += `<line x1="${r2(x)}" y1="${r2(y)}" x2="${r2(x + (rand() - 0.5) * 40)}" y2="${r2(H - 20)}" stroke="${C.moss}" stroke-width="1.6" opacity="0.7"/>`;
			for (let p = 0; p < 6; p++) {
				const a = (p / 6) * Math.PI * 2;
				body += leaf(
					x,
					y,
					pr,
					pr * 0.4,
					(a * 180) / Math.PI,
					p % 2 ? scheme.leaf : scheme.leaf2,
					C.forestDeep,
				);
			}
			body += `<circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(pr * 0.32)}" fill="${scheme.center}"/>`;
		}
	} else {
		// "stack": pot with overflowing trailing plant
		const by = H - 50;
		body += `<ellipse cx="${W * 0.5}" cy="${by + 4}" rx="120" ry="16" fill="${C.forestDeep}" opacity="0.10"/>`;
		body += frond(W * 0.5, by - 60, 220, 0, rand, {
			leafFill: scheme.leaf,
			leafVein: C.forestDeep,
			leaves: 6,
			leafLen: 50,
			flip: 1,
		});
		// trailing vines spilling left & right
		for (const dir of [-1, 1]) {
			let d = `M ${W * 0.5 + dir * 60} ${by - 80} `;
			let cx = W * 0.5 + dir * 60;
			let cy = by - 80;
			for (let s = 0; s < 5; s++) {
				const nx = cx + dir * (40 + rand() * 20);
				const ny = cy + 50 + rand() * 20;
				d += `Q ${r2(cx + dir * 30)} ${r2((cy + ny) / 2)} ${r2(nx)} ${r2(ny)} `;
				body += leaf(
					nx,
					ny,
					22,
					8,
					dir > 0 ? 20 : 160,
					scheme.leaf2,
					C.forestDeep,
				);
				cx = nx;
				cy = ny;
			}
			body += `<path d="${d}" stroke="${C.moss}" stroke-width="2" fill="none"/>`;
		}
		body += pot(
			W * 0.5,
			by,
			150,
			110,
			110,
			C.terracotta,
			C.terracottaDk,
			C.terracottaDk,
		);
	}

	body += grainRect(id, W, H, 0.045);
	return svgDoc(W, H, body, defs);
}

/* ========================================================================== */
/* 5. AVATARS (3) — soft botanical portraits in pale circles                    */
/* ========================================================================== */
function buildAvatar(seed, scheme) {
	const S = 240;
	const rand = rng(seed);
	const id = `av${seed}`;
	const defs = `<defs>${grainDefs(id)}<clipPath id="c${id}"><circle cx="${S / 2}" cy="${S / 2}" r="${S / 2}"/></clipPath></defs>`;
	let body = `<g clip-path="url(#c${id})">`;
	body += `<rect width="${S}" height="${S}" fill="${scheme.bg}"/>`;
	// shoulders
	body += `<path d="M ${S * 0.5 - 90} ${S} Q ${S * 0.5} ${S * 0.62} ${S * 0.5 + 90} ${S} Z" fill="${scheme.cloth}"/>`;
	body += `<path d="M ${S * 0.5 - 90} ${S} Q ${S * 0.5} ${S * 0.7} ${S * 0.5 + 90} ${S}" fill="none" stroke="${scheme.clothDk}" stroke-width="3" opacity="0.5"/>`;
	// neck + head
	body += `<rect x="${S * 0.5 - 16}" y="${S * 0.56}" width="32" height="40" rx="14" fill="${scheme.skin}"/>`;
	body += `<circle cx="${S / 2}" cy="${S * 0.46}" r="${S * 0.22}" fill="${scheme.skin}"/>`;
	// hair
	body += `<path d="M ${S * 0.5 - 56} ${S * 0.5} Q ${S * 0.5 - 60} ${S * 0.16} ${S * 0.5} ${S * 0.16} Q ${S * 0.5 + 60} ${S * 0.16} ${S * 0.5 + 56} ${S * 0.5} Q ${S * 0.5 + 40} ${S * 0.3} ${S * 0.5} ${S * 0.3} Q ${S * 0.5 - 40} ${S * 0.3} ${S * 0.5 - 56} ${S * 0.5} Z" fill="${scheme.hair}"/>`;
	// a small sprig tucked behind the ear / botanical motif
	body += leaf(S * 0.74, S * 0.42, 30, 10, -50, C.sage, C.forestDeep);
	body += leaf(S * 0.74, S * 0.42, 26, 9, -10, C.sageLt, C.forestDeep);
	body += grainRect(id, S, S, 0.05);
	body += `</g>`;
	body += `<circle cx="${S / 2}" cy="${S / 2}" r="${S / 2 - 1}" fill="none" stroke="${C.stone}" stroke-width="2"/>`;
	return svgDoc(S, S, body, defs);
}

/* ========================================================================== */
/* Write everything                                                            */
/* ========================================================================== */
const files = {
	"hero.svg": buildHero(),
	"feature-ceramics.svg": buildFeature(101, {
		kind: "pots",
		bgA: C.clayLt,
		bgB: C.cream,
		sun: C.wheat,
		ground: C.clay,
		leafA: C.sageDk,
		leafB: C.moss,
		potA: C.terracotta,
		potB: C.terracottaDk,
	}),
	"feature-garden.svg": buildFeature(202, {
		kind: "garden",
		bgA: "#EAECE3",
		bgB: C.cream,
		sun: C.wheat,
		ground: C.sage,
		leafA: C.sageDk,
		leafB: C.moss,
		bloom: C.terracotta,
	}),
	"feature-foliage.svg": buildFeature(303, {
		kind: "foliage",
		bgA: "#E4E8DD",
		bgB: C.clayLt,
		sun: C.wheat,
		ground: C.moss,
		leafA: C.sage,
		leafB: C.sageDk,
	}),
	"story.svg": buildStory(),
	"journal-01.svg": buildJournal(401, {
		kind: "sprig",
		a: C.clayLt,
		b: C.cream,
		leaf: C.sageDk,
		leaf2: C.sage,
	}),
	"journal-02.svg": buildJournal(402, {
		kind: "blooms",
		a: "#EAE6DD",
		b: C.cream,
		leaf: C.terracotta,
		leaf2: C.wheat,
		center: C.terracottaDk,
	}),
	"journal-03.svg": buildJournal(403, {
		kind: "stack",
		a: "#E6EAE0",
		b: C.cream,
		leaf: C.sageDk,
		leaf2: C.moss,
	}),
	"avatar-01.svg": buildAvatar(501, {
		bg: C.clayLt,
		cloth: C.sage,
		clothDk: C.sageDk,
		skin: "#E8C9A8",
		hair: "#5C4A38",
	}),
	"avatar-02.svg": buildAvatar(502, {
		bg: "#E7E3DA",
		cloth: C.terracotta,
		clothDk: C.terracottaDk,
		skin: "#D8A87E",
		hair: "#2D2620",
	}),
	"avatar-03.svg": buildAvatar(503, {
		bg: "#E4E8DD",
		cloth: C.clay,
		clothDk: C.stone,
		skin: "#EBD0B4",
		hair: "#7A6A52",
	}),
};

for (const [name, content] of Object.entries(files)) {
	fs.writeFileSync(path.join(OUT, name), content.trim() + "\n", "utf8");
	console.log(`wrote ${name}  (${(content.length / 1024).toFixed(1)} kB)`);
}
console.log(`\n${Object.keys(files).length} botanical SVGs written to ${OUT}`);
