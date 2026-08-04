import type Konva from "konva";
import { useEffect, useRef, useState } from "react";
import {
	Circle,
	Group,
	Image,
	Label,
	Layer,
	Line,
	Rect,
	Stage,
	Tag,
	Text,
	Transformer,
} from "react-konva";
import { CANVAS_SIZE, type CanvasItem, type MemeTemplate } from "./types";

interface MemeCanvasProps {
	template: MemeTemplate;
	uploadedImage: string | null;
	items: CanvasItem[];
	selectedId: string | null;
	onSelect: (id: string | null) => void;
	onChange: (item: CanvasItem) => void;
	stageRef: React.RefObject<Konva.Stage | null>;
}

function useLoadedImage(source: string | null) {
	const [image, setImage] = useState<HTMLImageElement | null>(null);

	useEffect(() => {
		if (!source) {
			setImage(null);
			return;
		}

		const nextImage = new window.Image();
		nextImage.onload = () => setImage(nextImage);
		nextImage.src = source;
	}, [source]);

	return image;
}

function TemplateArtwork({ template }: { template: MemeTemplate }) {
	if (template.id === "split") {
		return (
			<>
				<Rect width={540} height={CANVAS_SIZE} fill="#5c3ef2" />
				<Rect x={540} width={540} height={CANVAS_SIZE} fill="#ff67ce" />
				<Rect x={514} width={52} height={CANVAS_SIZE} fill="#17101f" />
				<Circle x={270} y={540} radius={210} fill="#351fb1" />
				<Circle x={810} y={540} radius={210} fill="#e82bae" />
				<Text
					x={100}
					y={478}
					width={340}
					text="A"
					align="center"
					fontSize={128}
					fontStyle="bold"
					fill="#ffffff"
					opacity={0.84}
				/>
				<Text
					x={640}
					y={478}
					width={340}
					text="B"
					align="center"
					fontSize={128}
					fontStyle="bold"
					fill="#ffffff"
					opacity={0.84}
				/>
			</>
		);
	}

	if (template.id === "breaking") {
		return (
			<>
				<Rect width={CANVAS_SIZE} height={CANVAS_SIZE} fill="#fff3dd" />
				<Rect width={CANVAS_SIZE} height={132} fill="#e23b22" />
				<Text
					x={48}
					y={33}
					text="FABLE NEWS NETWORK"
					fontSize={43}
					fontStyle="bold"
					fill="#fff3dd"
				/>
				<Rect y={760} width={CANVAS_SIZE} height={320} fill="#19131f" />
				<Circle x={540} y={445} radius={190} fill="#ffce56" />
				<Line points={[390, 530, 540, 310, 690, 530]} closed fill="#e23b22" />
				<Rect
					x={510}
					y={390}
					width={60}
					height={160}
					fill="#fff3dd"
					cornerRadius={28}
				/>
				<Circle x={540} y={585} radius={31} fill="#fff3dd" />
			</>
		);
	}

	if (template.id === "choice") {
		return (
			<>
				<Rect width={CANVAS_SIZE} height={CANVAS_SIZE} fill="#2149d8" />
				<Circle x={540} y={470} radius={310} fill="#18369f" />
				<Rect
					x={135}
					y={300}
					width={350}
					height={220}
					cornerRadius={44}
					fill="#ffd84a"
					shadowColor="#0b1e7c"
					shadowBlur={0}
					shadowOffset={{ x: 22, y: 26 }}
					shadowOpacity={1}
				/>
				<Rect
					x={595}
					y={300}
					width={350}
					height={220}
					cornerRadius={44}
					fill="#ff739d"
					shadowColor="#0b1e7c"
					shadowBlur={0}
					shadowOffset={{ x: 22, y: 26 }}
					shadowOpacity={1}
				/>
				<Text
					x={135}
					y={362}
					width={350}
					text="A"
					align="center"
					fontSize={92}
					fontStyle="bold"
					fill="#17214a"
				/>
				<Text
					x={595}
					y={362}
					width={350}
					text="B"
					align="center"
					fontSize={92}
					fontStyle="bold"
					fill="#421226"
				/>
			</>
		);
	}

	if (template.id === "receipt") {
		return (
			<>
				<Rect width={CANVAS_SIZE} height={CANVAS_SIZE} fill="#0d242a" />
				<Rect
					x={180}
					y={110}
					width={720}
					height={860}
					fill="#eef3e8"
					shadowColor="#000000"
					shadowBlur={44}
					shadowOpacity={0.35}
				/>
				<Text
					x={240}
					y={180}
					width={600}
					text="FABLE FORGE"
					align="center"
					fontSize={46}
					fontStyle="bold"
					fill="#10272d"
				/>
				<Line
					points={[250, 260, 830, 260]}
					stroke="#10272d"
					strokeWidth={5}
					dash={[12, 12]}
				/>
				{[340, 420, 500, 580, 660].map((y, index) => (
					<Group key={y}>
						<Rect
							x={250}
							y={y}
							width={280 + index * 38}
							height={22}
							fill="#9caaa6"
							cornerRadius={11}
						/>
						<Rect
							x={700}
							y={y}
							width={130}
							height={22}
							fill="#9caaa6"
							cornerRadius={11}
						/>
					</Group>
				))}
				<Line
					points={[250, 740, 830, 740]}
					stroke="#10272d"
					strokeWidth={5}
					dash={[12, 12]}
				/>
				<Text
					x={250}
					y={795}
					width={580}
					text="TOTAL  100% CULTURE"
					align="center"
					fontSize={34}
					fontStyle="bold"
					fill="#10272d"
				/>
			</>
		);
	}

	if (template.id === "afterhours") {
		return (
			<>
				<Rect width={CANVAS_SIZE} height={CANVAS_SIZE} fill="#0a0712" />
				<Circle
					x={790}
					y={285}
					radius={190}
					fill="#9b7bff"
					shadowColor="#9b7bff"
					shadowBlur={80}
					shadowOpacity={0.65}
				/>
				<Circle x={850} y={230} radius={190} fill="#0a0712" />
				{[
					[170, 230, 8],
					[280, 390, 5],
					[480, 190, 7],
					[410, 610, 5],
					[820, 690, 8],
					[170, 760, 6],
				].map(([x, y, radius]) => (
					<Circle
						key={`${x}-${y}`}
						x={x}
						y={y}
						radius={radius}
						fill="#ffffff"
						opacity={0.8}
					/>
				))}
				<Line
					points={[0, 840, 220, 710, 420, 810, 650, 655, 850, 770, 1080, 620]}
					stroke="#2d2147"
					strokeWidth={18}
					tension={0.3}
				/>
			</>
		);
	}

	return (
		<>
			<Rect
				width={CANVAS_SIZE}
				height={CANVAS_SIZE}
				fillLinearGradientStartPoint={{ x: 0, y: 0 }}
				fillLinearGradientEndPoint={{ x: CANVAS_SIZE, y: CANVAS_SIZE }}
				fillLinearGradientColorStops={
					template.id === "launchpad"
						? [0, "#26133a", 0.52, "#5f24a8", 1, "#e84fc8"]
						: [0, template.background, 1, template.accent]
				}
			/>
			<Circle
				x={540}
				y={540}
				radius={285}
				fill="#191020"
				shadowColor={template.accent}
				shadowBlur={100}
				shadowOpacity={0.65}
			/>
			<Circle
				x={540}
				y={540}
				radius={205}
				stroke={template.accent}
				strokeWidth={22}
				dash={[26, 20]}
			/>
			<Circle x={540} y={540} radius={84} fill={template.accent} />
			<Line
				points={[540, 130, 540, 360]}
				stroke="#ffffff"
				strokeWidth={13}
				lineCap="round"
			/>
			<Line
				points={[540, 720, 540, 950]}
				stroke="#ffffff"
				strokeWidth={13}
				lineCap="round"
			/>
		</>
	);
}

function UploadedArtwork({ source }: { source: string }) {
	const image = useLoadedImage(source);
	if (!image)
		return <Rect width={CANVAS_SIZE} height={CANVAS_SIZE} fill="#24192c" />;

	const scale = Math.max(CANVAS_SIZE / image.width, CANVAS_SIZE / image.height);
	const width = image.width * scale;
	const height = image.height * scale;

	return (
		<Image
			image={image}
			x={(CANVAS_SIZE - width) / 2}
			y={(CANVAS_SIZE - height) / 2}
			width={width}
			height={height}
		/>
	);
}

function CanvasNode({
	item,
	onSelect,
	onChange,
}: {
	item: CanvasItem;
	onSelect: () => void;
	onChange: (item: CanvasItem) => void;
}) {
	const shared = {
		id: item.id,
		x: item.x,
		y: item.y,
		rotation: item.rotation,
		scaleX: item.scaleX,
		scaleY: item.scaleY,
		draggable: true,
		onClick: onSelect,
		onTap: onSelect,
		onDragEnd: (event: Konva.KonvaEventObject<DragEvent>) => {
			onChange({ ...item, x: event.target.x(), y: event.target.y() });
		},
		onTransformEnd: (event: Konva.KonvaEventObject<Event>) => {
			const node = event.target;
			onChange({
				...item,
				x: node.x(),
				y: node.y(),
				rotation: node.rotation(),
				scaleX: node.scaleX(),
				scaleY: node.scaleY(),
			});
		},
	};

	if (item.kind === "sticker" && item.stickerStyle === "badge") {
		return (
			<Label {...shared}>
				<Tag fill={item.background ?? "#c5ff4a"} cornerRadius={28} />
				<Text
					text={item.text}
					width={item.width}
					padding={28}
					align="center"
					fontFamily="Arial"
					fontSize={item.fontSize}
					fontStyle="bold"
					fill={item.fill}
				/>
			</Label>
		);
	}

	return (
		<Text
			{...shared}
			text={item.text}
			width={item.width}
			align={item.align}
			fontFamily={item.kind === "sticker" ? "Arial" : "Arial Black, Arial"}
			fontSize={item.fontSize}
			fontStyle={item.fontStyle}
			fill={item.fill}
			stroke={item.stroke}
			strokeWidth={item.strokeWidth}
			lineJoin="round"
			wrap="word"
		/>
	);
}

function SelectionTransformer({ selectedId }: { selectedId: string | null }) {
	const transformerRef = useRef<Konva.Transformer>(null);

	useEffect(() => {
		const transformer = transformerRef.current;
		const layer = transformer?.getLayer();
		const node = selectedId ? layer?.findOne(`#${selectedId}`) : undefined;
		transformer?.nodes(node ? [node] : []);
		layer?.batchDraw();
	}, [selectedId]);

	return (
		<Transformer
			ref={transformerRef}
			name="selection-transformer"
			rotateEnabled
			flipEnabled={false}
			keepRatio
			anchorSize={28}
			anchorCornerRadius={8}
			anchorFill="#c5ff4a"
			anchorStroke="#120d18"
			borderStroke="#c5ff4a"
			borderStrokeWidth={4}
			boundBoxFunc={(oldBox, newBox) =>
				Math.abs(newBox.width) < 80 || Math.abs(newBox.height) < 40
					? oldBox
					: newBox
			}
		/>
	);
}

export function MemeCanvas({
	template,
	uploadedImage,
	items,
	selectedId,
	onSelect,
	onChange,
	stageRef,
}: MemeCanvasProps) {
	return (
		<Stage
			ref={stageRef}
			width={CANVAS_SIZE}
			height={CANVAS_SIZE}
			onMouseDown={(event) => {
				if (event.target === event.target.getStage()) onSelect(null);
			}}
			onTouchStart={(event) => {
				if (event.target === event.target.getStage()) onSelect(null);
			}}
		>
			<Layer listening={false}>
				{uploadedImage ? (
					<UploadedArtwork source={uploadedImage} />
				) : (
					<TemplateArtwork template={template} />
				)}
			</Layer>
			<Layer>
				{items.map((item) => (
					<CanvasNode
						key={item.id}
						item={item}
						onSelect={() => onSelect(item.id)}
						onChange={onChange}
					/>
				))}
				<SelectionTransformer selectedId={selectedId} />
			</Layer>
		</Stage>
	);
}
