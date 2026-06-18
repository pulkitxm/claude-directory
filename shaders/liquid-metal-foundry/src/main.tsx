import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import spaceGrotesk from "../assets/fonts/SpaceGrotesk-Variable.woff2?url";
import jetbrainsMono from "../assets/fonts/JetBrainsMono-Variable.woff2?url";

/*
 * Load the vendored variable faces (Space Grotesk + JetBrains Mono, both SIL OFL
 * — see the .txt licenses in assets/fonts) via the JS FontFace API instead of a
 * CSS @font-face. A CSS @font-face leaves headless Chromium's
 * `document.fonts.ready` promise stuck in "loading" on a continuously-animating
 * (rAF / WebGL) page, which hangs the demo recorder and any headless check.
 * Adding an already-*loaded* FontFace via document.fonts.add() avoids that. The
 * woff2 files are bundled by Vite (imported with ?url), so the app stays fully
 * self-contained and runs offline.
 */
async function loadFonts() {
	if (typeof document === "undefined" || !("fonts" in document)) return;
	const faces: Array<[string, string]> = [
		["Space Grotesk", spaceGrotesk],
		["JetBrains Mono", jetbrainsMono],
	];
	await Promise.all(
		faces.map(async ([family, url]) => {
			try {
				const face = new FontFace(family, `url(${url}) format("woff2")`, {
					weight: "100 900",
					style: "normal",
					display: "swap",
				});
				await face.load();
				document.fonts.add(face);
			} catch {
				/* fall back to the system stack in index.css */
			}
		}),
	);
}
void loadFonts();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
