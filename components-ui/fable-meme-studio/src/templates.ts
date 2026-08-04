import type { CanvasItem, MemeTemplate, StickerDefinition } from "./types";

export const templates: MemeTemplate[] = [
	{
		id: "launchpad",
		name: "Launchpad",
		kicker: "Maximum velocity",
		accent: "#c5ff4a",
		background: "#1c1129",
		captions: ["THEY SAID IT WAS TOO EARLY", "WE CALLED IT PERFECT TIMING"],
	},
	{
		id: "split",
		name: "Plot twist",
		kicker: "Expectation vs reality",
		accent: "#ff5edb",
		background: "#3920a9",
		captions: ["THE PLAN", "WHAT THE TIMELINE DID"],
	},
	{
		id: "breaking",
		name: "Breaking",
		kicker: "Newsroom energy",
		accent: "#ff5b31",
		background: "#fff3dd",
		captions: ["BREAKING: COMMUNITY SHIPS AGAIN", "MORE AT 11"],
	},
	{
		id: "choice",
		name: "Big decision",
		kicker: "Choose wisely",
		accent: "#ffd84a",
		background: "#2149d8",
		captions: ["SHIP THE FEATURE", "HOLD ANOTHER MEETING"],
	},
	{
		id: "receipt",
		name: "The receipt",
		kicker: "Proof on paper",
		accent: "#66e6ff",
		background: "#0d242a",
		captions: ["TODAY'S ORDER", "ONE INTERNET MOMENT"],
	},
	{
		id: "afterhours",
		name: "After hours",
		kicker: "Midnight thoughts",
		accent: "#9b7bff",
		background: "#0a0712",
		captions: ["ME AT 2:13 AM", "ONE MORE IDEA THEN I SLEEP"],
	},
];

export const freeStickers: StickerDefinition[] = [
	{ id: "fire", label: "Fire", value: "🔥", style: "emoji" },
	{ id: "rocket", label: "Rocket", value: "🚀", style: "emoji" },
	{ id: "brain", label: "Brain", value: "🧠", style: "emoji" },
	{ id: "chart", label: "Chart", value: "📈", style: "emoji" },
	{
		id: "cooked",
		label: "Cooked",
		value: "COOKED",
		style: "badge",
		background: "#ff5edb",
		color: "#190d20",
	},
	{
		id: "ship-it",
		label: "Ship it",
		value: "SHIP IT",
		style: "badge",
		background: "#c5ff4a",
		color: "#120d18",
	},
	{
		id: "one-hundred-x",
		label: "100x",
		value: "100X",
		style: "badge",
		background: "#ffffff",
		color: "#120d18",
	},
	{
		id: "gm",
		label: "Good morning",
		value: "GM",
		style: "badge",
		background: "#66e6ff",
		color: "#08232a",
	},
];

export const holderStickers: StickerDefinition[] = [
	{
		id: "diamond-hands",
		label: "Diamond hands",
		value: "DIAMOND HANDS",
		style: "badge",
		background: "#9b7bff",
		color: "#ffffff",
		holderOnly: true,
	},
	{
		id: "early",
		label: "Early",
		value: "EARLY",
		style: "badge",
		background: "#ffd84a",
		color: "#251600",
		holderOnly: true,
	},
	{
		id: "holder",
		label: "Verified holder",
		value: "VERIFIED HOLDER",
		style: "badge",
		background: "#c5ff4a",
		color: "#120d18",
		holderOnly: true,
	},
];

let nextId = 0;

export function makeId(prefix: string) {
	nextId += 1;
	return `${prefix}-${nextId}`;
}

export function makeTemplateCaptions(template: MemeTemplate): CanvasItem[] {
	return [
		{
			id: makeId("text"),
			kind: "text",
			text: template.captions[0],
			x: 70,
			y: 66,
			width: 940,
			fontSize: 64,
			fill: "#ffffff",
			stroke: "#120d18",
			strokeWidth: 8,
			rotation: 0,
			scaleX: 1,
			scaleY: 1,
			align: "center",
			fontStyle: "bold",
		},
		{
			id: makeId("text"),
			kind: "text",
			text: template.captions[1],
			x: 70,
			y: 890,
			width: 940,
			fontSize: 58,
			fill: "#ffffff",
			stroke: "#120d18",
			strokeWidth: 8,
			rotation: 0,
			scaleX: 1,
			scaleY: 1,
			align: "center",
			fontStyle: "bold",
		},
	];
}

export function makeSticker(definition: StickerDefinition): CanvasItem {
	const isEmoji = definition.style === "emoji";
	return {
		id: makeId("sticker"),
		kind: "sticker",
		text: definition.value,
		x: 420,
		y: 420,
		width: isEmoji ? 220 : Math.max(300, definition.value.length * 31),
		fontSize: isEmoji ? 160 : 52,
		fill: definition.color ?? "#ffffff",
		stroke: "",
		strokeWidth: 0,
		rotation: -4,
		scaleX: 1,
		scaleY: 1,
		align: "center",
		fontStyle: "bold",
		stickerStyle: definition.style,
		background: definition.background,
	};
}
