export type WarpShape = "checks" | "stripes" | "edge";
export interface WarpConfig {
	proportion: number;
	softness: number;
	distortion: number;
	swirl: number;
	swirlIterations: number;
	shapeScale: number;
	scale: number;
	rotation: number;
	speed: number;
	shape: WarpShape;
	colors: [string, string, string, string];
}
export const DEFAULT_WARP: WarpConfig = {
	proportion: 0.45,
	softness: 1,
	distortion: 0.25,
	swirl: 0.8,
	swirlIterations: 10,
	shapeScale: 0.1,
	scale: 1,
	rotation: 0,
	speed: 1,
	shape: "checks",
	colors: [
		"hsl(203, 100%, 62%)",
		"hsl(255, 100%, 72%)",
		"hsl(158, 99%, 59%)",
		"hsl(264, 100%, 61%)",
	],
};
export const WARP_SHAPES: WarpShape[] = ["checks", "stripes", "edge"];
export interface WarpControl {
	key: keyof Pick<
		WarpConfig,
		| "proportion"
		| "softness"
		| "distortion"
		| "swirl"
		| "swirlIterations"
		| "shapeScale"
		| "scale"
		| "rotation"
		| "speed"
	>;
	label: string;
	min: number;
	max: number;
	step: number;
	hint: string;
}
export const WARP_CONTROLS: WarpControl[] = [
	{
		key: "speed",
		label: "Speed",
		min: 0,
		max: 3,
		step: 0.01,
		hint: "Clock rate of the warp animation",
	},
	{
		key: "swirl",
		label: "Swirl",
		min: 0,
		max: 1.5,
		step: 0.01,
		hint: "Strength of the rotational push",
	},
	{
		key: "distortion",
		label: "Distortion",
		min: 0,
		max: 1,
		step: 0.01,
		hint: "Domain warp applied to the checks",
	},
	{
		key: "swirlIterations",
		label: "Swirl Iter",
		min: 1,
		max: 20,
		step: 1,
		hint: "How many times the swirl folds back",
	},
	{
		key: "proportion",
		label: "Proportion",
		min: 0,
		max: 1,
		step: 0.01,
		hint: "Balance between the colour bands",
	},
	{
		key: "softness",
		label: "Softness",
		min: 0,
		max: 1,
		step: 0.01,
		hint: "Edge feathering of the checks",
	},
	{
		key: "shapeScale",
		label: "Shape Scale",
		min: 0.02,
		max: 0.6,
		step: 0.01,
		hint: "Size of the repeating motif",
	},
	{
		key: "scale",
		label: "Scale",
		min: 0.3,
		max: 2.5,
		step: 0.01,
		hint: "Overall zoom of the field",
	},
	{
		key: "rotation",
		label: "Rotation",
		min: 0,
		max: 360,
		step: 1,
		hint: "Static rotation of the whole field (deg)",
	},
];
export interface WarpPreset {
	id: string;
	name: string;
	blurb: string;
	config: WarpConfig;
}
export const WARP_PRESETS: WarpPreset[] = [
	{
		id: "prism",
		name: "Prism",
		blurb: "The brief's initial blue · violet · green · purple checks",
		config: DEFAULT_WARP,
	},
	{
		id: "tide",
		name: "Tide",
		blurb: "Cool aqua checks, slow tidal drift",
		config: {
			...DEFAULT_WARP,
			shape: "checks",
			shapeScale: 0.13,
			swirl: 0.55,
			swirlIterations: 8,
			distortion: 0.18,
			speed: 0.7,
			scale: 1.1,
			colors: [
				"hsl(190, 95%, 22%)",
				"hsl(168, 90%, 62%)",
				"hsl(205, 90%, 35%)",
				"hsl(150, 95%, 70%)",
			],
		},
	},
	{
		id: "ember",
		name: "Ember",
		blurb: "Warm stripes, molten swirl",
		config: {
			...DEFAULT_WARP,
			shape: "stripes",
			shapeScale: 0.14,
			swirl: 1.05,
			swirlIterations: 7,
			distortion: 0.34,
			speed: 0.9,
			scale: 1.05,
			colors: [
				"hsl(14, 95%, 12%)",
				"hsl(28, 100%, 60%)",
				"hsl(8, 90%, 32%)",
				"hsl(45, 100%, 72%)",
			],
		},
	},
	{
		id: "obsidian",
		name: "Obsidian",
		blurb: "Monochrome edges, near-still",
		config: {
			...DEFAULT_WARP,
			shape: "edge",
			shapeScale: 0.1,
			swirl: 0.4,
			swirlIterations: 6,
			distortion: 0.15,
			speed: 0.4,
			colors: [
				"hsl(225, 16%, 7%)",
				"hsl(225, 10%, 72%)",
				"hsl(225, 14%, 22%)",
				"hsl(225, 8%, 94%)",
			],
		},
	},
];
export function warpProps(config: WarpConfig) {
	return {
		proportion: config.proportion,
		softness: config.softness,
		distortion: config.distortion,
		swirl: config.swirl,
		swirlIterations: config.swirlIterations,
		shape: config.shape,
		shapeScale: config.shapeScale,
		scale: config.scale,
		rotation: config.rotation,
		speed: config.speed,
		colors: config.colors,
	};
}
export function parseHsl(s: string): {
	h: number;
	s: number;
	l: number;
} | null {
	const m = s.match(/hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/i);
	if (!m) return null;
	return {
		h: Number(m[1]),
		s: Number(m[2]),
		l: Number(m[3]),
	};
}
