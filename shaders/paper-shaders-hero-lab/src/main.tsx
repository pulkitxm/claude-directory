import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import interVar from "../assets/fonts/Inter-Variable.woff2?url"
import instrumentRegular from "../assets/fonts/InstrumentSerif-Regular.woff2?url"
import instrumentItalic from "../assets/fonts/InstrumentSerif-Italic.woff2?url"

/*
 * Register the vendored faces via the JS FontFace API instead of CSS @font-face.
 *   1. They resolve locally with no remote Google Fonts calls — the project is
 *      fully self-contained and runnable offline.
 *   2. A CSS @font-face can leave headless Chromium's `document.fonts.ready`
 *      promise stuck in "loading" on a continuously-animating (rAF/WebGL) page,
 *      which hangs the demo recorder / any headless check. Adding *already
 *      loaded* FontFaces via document.fonts.add() avoids that entirely.
 * The woff2 files are bundled by Vite (imported with ?url).
 */
async function loadFonts() {
	if (typeof document === "undefined" || !("fonts" in document)) return
	const faces: FontFace[] = [
		new FontFace("Inter", `url(${interVar}) format("woff2")`, {
			weight: "100 900",
			style: "normal",
			display: "swap",
		}),
		new FontFace("Instrument Serif", `url(${instrumentRegular}) format("woff2")`, {
			weight: "400",
			style: "normal",
			display: "swap",
		}),
		new FontFace("Instrument Serif", `url(${instrumentItalic}) format("woff2")`, {
			weight: "400",
			style: "italic",
			display: "swap",
		}),
	]
	await Promise.all(
		faces.map(async (face) => {
			try {
				await face.load()
				document.fonts.add(face)
			} catch {
				/* fall back to the system stack in index.css */
			}
		}),
	)
}
void loadFonts()

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
