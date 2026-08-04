import type Konva from "konva";
import {
	Check,
	CircleAlert,
	Download,
	ImagePlus,
	Layers3,
	LockKeyhole,
	Plus,
	RotateCcw,
	Share2,
	Sparkles,
	Trash2,
	Type,
	Upload,
	Wallet,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { MemeCanvas } from "./MemeCanvas";
import {
	compactAddress,
	connectAndCheckHolder,
	holderConfig,
	holderVerificationEnabled,
	type WalletState,
} from "./solana";
import {
	freeStickers,
	holderStickers,
	makeId,
	makeSticker,
	makeTemplateCaptions,
	templates,
} from "./templates";
import type { CanvasItem, MemeTemplate, StickerDefinition } from "./types";

const shareText =
	import.meta.env.VITE_SHARE_TEXT ||
	"Fresh from the Fable Meme Studio. Remix yours.";
const communityUrl =
	import.meta.env.VITE_COMMUNITY_URL || "https://pulkitxm.com";

function App() {
	const [template, setTemplate] = useState<MemeTemplate>(templates[0]);
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);
	const [items, setItems] = useState<CanvasItem[]>(() =>
		makeTemplateCaptions(templates[0]),
	);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [notice, setNotice] = useState("Canvas ready");
	const [wallet, setWallet] = useState<WalletState>({ status: "idle" });
	const uploadRef = useRef<HTMLInputElement>(null);
	const stageRef = useRef<Konva.Stage>(null);

	const selectedItem = useMemo(
		() => items.find((item) => item.id === selectedId) ?? null,
		[items, selectedId],
	);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const target = event.target as HTMLElement | null;
			if (target?.matches("input, textarea, select")) return;
			if ((event.key === "Delete" || event.key === "Backspace") && selectedId) {
				setItems((current) => current.filter((item) => item.id !== selectedId));
				setSelectedId(null);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [selectedId]);

	const updateItem = (nextItem: CanvasItem) => {
		setItems((current) =>
			current.map((item) => (item.id === nextItem.id ? nextItem : item)),
		);
	};

	const chooseTemplate = (nextTemplate: MemeTemplate) => {
		setTemplate(nextTemplate);
		setUploadedImage(null);
		setItems(makeTemplateCaptions(nextTemplate));
		setSelectedId(null);
		setNotice(`${nextTemplate.name} loaded`);
	};

	const resetCanvas = () => {
		setItems(makeTemplateCaptions(template));
		setSelectedId(null);
		setNotice("Canvas reset");
	};

	const addText = () => {
		const item: CanvasItem = {
			id: makeId("text"),
			kind: "text",
			text: "TYPE SOMETHING ICONIC",
			x: 190,
			y: 480,
			width: 700,
			fontSize: 58,
			fill: "#ffffff",
			stroke: "#120d18",
			strokeWidth: 8,
			rotation: 0,
			scaleX: 1,
			scaleY: 1,
			align: "center",
			fontStyle: "bold",
		};
		setItems((current) => [...current, item]);
		setSelectedId(item.id);
	};

	const addSticker = (definition: StickerDefinition) => {
		if (definition.holderOnly && wallet.status !== "holder") {
			setNotice("Connect a verified holder wallet to unlock this sticker");
			return;
		}
		const item = makeSticker(definition);
		setItems((current) => [...current, item]);
		setSelectedId(item.id);
		setNotice(`${definition.label} added`);
	};

	const connectWallet = async () => {
		setWallet({ status: "connecting" });
		setNotice("Checking wallet access");
		const nextWallet = await connectAndCheckHolder();
		setWallet(nextWallet);

		if (nextWallet.status === "holder") {
			setNotice(
				`Holder verified with ${nextWallet.balance} ${holderConfig.ticker}`,
			);
			return;
		}
		if (nextWallet.status === "not-holder") {
			setNotice(
				`Wallet connected with ${nextWallet.balance} ${holderConfig.ticker}`,
			);
			return;
		}
		if (nextWallet.status === "not-configured") {
			setNotice("Wallet connected. Add the token mint to enable verification.");
			return;
		}
		if (nextWallet.status === "no-wallet") {
			setNotice("Install Phantom to unlock holder perks");
			return;
		}
		if (nextWallet.status === "error") setNotice(nextWallet.message);
	};

	const deleteSelected = () => {
		if (!selectedId) return;
		setItems((current) => current.filter((item) => item.id !== selectedId));
		setSelectedId(null);
		setNotice("Layer removed");
	};

	const handleUpload = (file: File | undefined) => {
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			setNotice("Choose a PNG, JPG, or WebP image");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setUploadedImage(String(reader.result));
			setSelectedId(null);
			setNotice("Your image is now the template");
		};
		reader.readAsDataURL(file);
	};

	const renderPng = (pixelRatio = 1) => {
		const stage = stageRef.current;
		if (!stage) return null;
		const transformer = stage.findOne(".selection-transformer");
		transformer?.hide();
		stage.draw();
		const dataUrl = stage.toDataURL({ pixelRatio, mimeType: "image/png" });
		transformer?.show();
		stage.draw();
		return dataUrl;
	};

	const downloadPng = () => {
		const pixelRatio = wallet.status === "holder" ? 2 : 1;
		const dataUrl = renderPng(pixelRatio);
		if (!dataUrl) return;
		const link = document.createElement("a");
		link.download = `fable-meme-${Date.now()}.png`;
		link.href = dataUrl;
		link.click();
		setNotice(
			pixelRatio === 2
				? "Holder PNG downloaded at 2160 x 2160"
				: "PNG downloaded at 1080 x 1080",
		);
	};

	const shareOnX = () => {
		const dataUrl = renderPng();
		if (dataUrl) {
			const link = document.createElement("a");
			link.download = `fable-meme-${Date.now()}.png`;
			link.href = dataUrl;
			link.click();
		}
		const intent = new URL("https://x.com/intent/post");
		intent.searchParams.set("text", shareText);
		intent.searchParams.set("url", communityUrl);
		window.open(intent.toString(), "_blank", "noopener,noreferrer");
		setNotice("PNG downloaded. Attach it in the X composer.");
	};

	const walletLabel = (() => {
		if (wallet.status === "connecting") return "Checking...";
		if (
			wallet.status === "holder" ||
			wallet.status === "not-holder" ||
			wallet.status === "not-configured"
		) {
			return compactAddress(wallet.address);
		}
		return "Connect wallet";
	})();

	const holderUnlocked = wallet.status === "holder";

	return (
		<main className="app-shell">
			<header className="topbar">
				<a className="brand" href="#studio" aria-label="Fable Meme Studio home">
					<span className="brand-mark">F</span>
					<span>Fable Meme Studio</span>
				</a>
				<div className="topbar-actions">
					<span className="live-pill">
						<span /> Community edition
					</span>
					<button
						className={`wallet-button ${holderUnlocked ? "unlocked" : ""}`}
						type="button"
						onClick={connectWallet}
						disabled={wallet.status === "connecting"}
					>
						{holderUnlocked ? <Check size={16} /> : <Wallet size={16} />}
						{walletLabel}
					</button>
				</div>
			</header>

			<section className="intro" id="studio">
				<div>
					<p className="eyebrow">
						<Sparkles size={14} /> Community creative lab
					</p>
					<h1>Make the meme. Move the culture.</h1>
					<p className="intro-copy">
						Pick a format, drag in the punchline, and post a crisp community
						meme in minutes.
					</p>
				</div>
				<div className="step-row" aria-label="Creation steps">
					<span>01 Pick</span>
					<span>02 Remix</span>
					<span>03 Post</span>
				</div>
			</section>

			<section className="studio-grid">
				<aside className="panel template-panel">
					<div className="panel-heading">
						<div>
							<p className="panel-kicker">01 Template</p>
							<h2>Pick your format</h2>
						</div>
						<span className="count-pill">{templates.length}</span>
					</div>
					<div className="template-list">
						{templates.map((entry) => (
							<button
								className={`template-card ${template.id === entry.id && !uploadedImage ? "active" : ""}`}
								key={entry.id}
								type="button"
								onClick={() => chooseTemplate(entry)}
								aria-pressed={template.id === entry.id && !uploadedImage}
							>
								<span className={`template-art template-${entry.id}`}>
									<span />
								</span>
								<span>
									<strong>{entry.name}</strong>
									<small>{entry.kicker}</small>
								</span>
								{template.id === entry.id && !uploadedImage && (
									<Check size={15} />
								)}
							</button>
						))}
					</div>
					<input
						ref={uploadRef}
						className="visually-hidden"
						type="file"
						accept="image/png,image/jpeg,image/webp"
						onChange={(event) => handleUpload(event.target.files?.[0])}
					/>
					<button
						className="upload-button"
						type="button"
						onClick={() => uploadRef.current?.click()}
					>
						<ImagePlus size={18} />
						<span>
							<strong>Upload your own</strong>
							<small>PNG, JPG, or WebP</small>
						</span>
						<Upload size={15} />
					</button>
				</aside>

				<section className="canvas-column" aria-label="Meme canvas editor">
					<div className="canvas-toolbar">
						<div>
							<span className="status-dot" /> {notice}
						</div>
						<div className="toolbar-actions">
							<span>{holderUnlocked ? "2160 x 2160" : "1080 x 1080"}</span>
							<button
								type="button"
								onClick={resetCanvas}
								aria-label="Reset canvas"
							>
								<RotateCcw size={15} /> Reset
							</button>
						</div>
					</div>
					<div className="canvas-frame">
						<MemeCanvas
							template={template}
							uploadedImage={uploadedImage}
							items={items}
							selectedId={selectedId}
							onSelect={setSelectedId}
							onChange={updateItem}
							stageRef={stageRef}
						/>
					</div>
					<div className="export-row">
						<button
							className="secondary-button"
							type="button"
							onClick={shareOnX}
						>
							<Share2 size={18} /> Share on X
						</button>
						<button
							className="export-button"
							type="button"
							onClick={downloadPng}
						>
							<Download size={18} /> Export PNG
						</button>
					</div>
					<p className="share-note">
						X opens with your post copy. Your PNG downloads first so you can
						attach it.
					</p>
				</section>

				<aside className="panel editor-panel">
					<div className="panel-heading">
						<div>
							<p className="panel-kicker">02 Remix</p>
							<h2>Build the punchline</h2>
						</div>
						<Layers3 size={18} />
					</div>

					<div className="editor-section">
						<div className="section-title">
							<span>
								<Type size={15} /> Text
							</span>
							<button type="button" onClick={addText}>
								<Plus size={15} /> Add
							</button>
						</div>
						{selectedItem?.kind === "text" ? (
							<div className="text-controls">
								<label>
									Caption
									<textarea
										value={selectedItem.text}
										onChange={(event) =>
											updateItem({ ...selectedItem, text: event.target.value })
										}
										rows={3}
									/>
								</label>
								<label>
									Size <output>{selectedItem.fontSize}px</output>
									<input
										type="range"
										min="28"
										max="110"
										value={selectedItem.fontSize}
										onChange={(event) =>
											updateItem({
												...selectedItem,
												fontSize: Number(event.target.value),
											})
										}
									/>
								</label>
								<div className="color-row" aria-label="Text color">
									{["#ffffff", "#c5ff4a", "#ff5edb", "#ffd84a", "#120d18"].map(
										(color) => (
											<button
												key={color}
												className={selectedItem.fill === color ? "active" : ""}
												style={{ background: color }}
												type="button"
												aria-label={`Set text color to ${color}`}
												onClick={() =>
													updateItem({ ...selectedItem, fill: color })
												}
											/>
										),
									)}
								</div>
							</div>
						) : (
							<button
								className="add-caption-button"
								type="button"
								onClick={addText}
							>
								<Plus size={18} /> Add a draggable caption
							</button>
						)}
					</div>

					<div className="editor-section">
						<div className="section-title">
							<span>
								<Sparkles size={15} /> Stickers
							</span>
							<small>Tap to add</small>
						</div>
						<div className="sticker-grid">
							{freeStickers.map((sticker) => (
								<button
									key={sticker.id}
									className={
										sticker.style === "emoji"
											? "emoji-sticker"
											: "badge-sticker"
									}
									style={
										sticker.style === "badge"
											? { background: sticker.background, color: sticker.color }
											: undefined
									}
									type="button"
									onClick={() => addSticker(sticker)}
									aria-label={`Add ${sticker.label} sticker`}
								>
									{sticker.value}
								</button>
							))}
						</div>
					</div>

					<div
						className={`editor-section holder-section ${holderUnlocked ? "unlocked" : ""}`}
					>
						<div className="section-title">
							<span>
								{holderUnlocked ? (
									<Check size={15} />
								) : (
									<LockKeyhole size={15} />
								)}{" "}
								Holder pack
							</span>
							<small>{holderUnlocked ? "Unlocked" : "Locked"}</small>
						</div>
						<div className="holder-stickers">
							{holderStickers.map((sticker) => (
								<button
									key={sticker.id}
									className={holderUnlocked ? "unlocked" : ""}
									style={
										holderUnlocked
											? { background: sticker.background, color: sticker.color }
											: undefined
									}
									type="button"
									onClick={() => addSticker(sticker)}
								>
									{holderUnlocked ? (
										<Sparkles size={12} />
									) : (
										<LockKeyhole size={12} />
									)}{" "}
									{sticker.value}
								</button>
							))}
						</div>
						{!holderUnlocked && (
							<div className="unlock-card">
								<CircleAlert size={17} />
								<div>
									<strong>
										{holderVerificationEnabled
											? `Hold ${holderConfig.minimumBalance} ${holderConfig.ticker}`
											: "Holder verification ready"}
									</strong>
									<p>
										{holderVerificationEnabled
											? "Connect to check your public token balance. No signature required."
											: "Add your pump.fun mint in the site settings to switch this on."}
									</p>
								</div>
								<button
									type="button"
									onClick={connectWallet}
									disabled={wallet.status === "connecting"}
								>
									{wallet.status === "connecting" ? "Checking" : "Connect"}
								</button>
							</div>
						)}
					</div>

					<div className="layer-bar">
						<span>
							{selectedItem
								? `${selectedItem.kind} selected`
								: `${items.length} layers`}
						</span>
						<button
							type="button"
							onClick={deleteSelected}
							disabled={!selectedItem}
							aria-label="Delete selected layer"
						>
							<Trash2 size={16} />
						</button>
					</div>
				</aside>
			</section>
		</main>
	);
}

export default App;
