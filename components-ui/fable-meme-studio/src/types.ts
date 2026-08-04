export const CANVAS_SIZE = 1080;

export type TemplateId =
	| "launchpad"
	| "split"
	| "breaking"
	| "choice"
	| "receipt"
	| "afterhours";

export type StickerStyle = "emoji" | "badge";

export interface MemeTemplate {
	id: TemplateId;
	name: string;
	kicker: string;
	accent: string;
	background: string;
	captions: [string, string];
}

export interface CanvasItem {
	id: string;
	kind: "text" | "sticker";
	text: string;
	x: number;
	y: number;
	width: number;
	fontSize: number;
	fill: string;
	stroke: string;
	strokeWidth: number;
	rotation: number;
	scaleX: number;
	scaleY: number;
	align: "left" | "center" | "right";
	fontStyle: "normal" | "bold";
	stickerStyle?: StickerStyle;
	background?: string;
}

export interface StickerDefinition {
	id: string;
	label: string;
	value: string;
	style: StickerStyle;
	background?: string;
	color?: string;
	holderOnly?: boolean;
}
