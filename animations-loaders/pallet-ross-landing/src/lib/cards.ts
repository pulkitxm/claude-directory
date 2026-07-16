export const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const hoverEase: [number, number, number, number] = [
	0.34, 1.56, 0.64, 1,
];

export const HERO_ROW_Y = 522;

export const CARD_SIZE = 220;

export type Slot = {
	x: number;
	y: number;
	rotate: number;
	scale: number;
	z: number;
};

export const SLOTS: Slot[] = [
	{ x: -480, y: 18, rotate: -18, scale: 0.88, z: 1 },
	{ x: -310, y: 6, rotate: -10, scale: 0.92, z: 2 },
	{ x: -155, y: -2, rotate: -4, scale: 0.96, z: 3 },
	{ x: 0, y: -8, rotate: 0, scale: 1, z: 4 },
	{ x: 160, y: -2, rotate: 5, scale: 0.96, z: 3 },
	{ x: 320, y: 6, rotate: 12, scale: 0.92, z: 2 },
	{ x: 480, y: 18, rotate: 20, scale: 0.88, z: 1 },
];

export type Cascade = {
	top: number;
	left: number;
	rotate: number;
	z: number;
};

export const CASCADE: Cascade[] = Array.from({ length: 7 }, (_, i) => ({
	top: 300 + i * 70,
	left: 20 + i * 150,
	rotate: -3 + i * 3,
	z: 7 - i,
}));

function cubicBezierY(t: number, p1y: number, p2y: number): number {
	const mt = 1 - t;

	return 3 * mt * mt * t * p1y + 3 * mt * t * t * p2y + t * t * t;
}

function cubicBezierX(t: number, p1x: number, p2x: number): number {
	const mt = 1 - t;
	return 3 * mt * mt * t * p1x + 3 * mt * t * t * p2x + t * t * t;
}

export function getTimeForProgress(
	progress: number,
	ease: [number, number, number, number],
): number {
	const [p1x, p1y, p2x, p2y] = ease;
	const target = Math.min(1, Math.max(0, progress));

	let lo = 0;
	let hi = 1;
	let t = target;
	for (let i = 0; i < 32; i++) {
		t = (lo + hi) / 2;
		const y = cubicBezierY(t, p1y, p2y);
		if (Math.abs(y - target) < 1e-5) break;
		if (y < target) lo = t;
		else hi = t;
	}
	return cubicBezierX(t, p1x, p2x);
}

const assetBase = (import.meta as ImportMeta & { env: { BASE_URL: string } })
	.env.BASE_URL;

export const CARD_SRCS = Array.from(
	{ length: 7 },
	(_, i) => `${assetBase}card-${i + 1}.png`,
);
