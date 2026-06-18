import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import onestWoff2 from "../assets/fonts/Onest-Variable.woff2?url";

/*
 * Load the vendored Onest variable face (SIL OFL — see assets/fonts/Onest-OFL.txt)
 * via the JS FontFace API rather than a CSS @font-face. A CSS @font-face leaves
 * headless Chromium's `document.fonts.ready` promise stuck "loading" on a
 * continuously-animating (rAF / WebGL) page, which hangs the demo recorder and
 * any headless check. Adding an already-*loaded* FontFace with document.fonts.add()
 * sidesteps that. The woff2 is bundled by Vite (imported with ?url), so the app is
 * fully self-contained and runs offline with no remote font calls — the verbatim
 * component's `font-sans` resolves straight to this local file.
 */
async function loadFont() {
	if (typeof document === "undefined" || !("fonts" in document)) return;
	try {
		const face = new FontFace("Onest", `url(${onestWoff2}) format("woff2")`, {
			weight: "100 900",
			style: "normal",
			display: "swap",
		});
		await face.load();
		document.fonts.add(face);
	} catch {
		/* fall back to the system sans in the font stack */
	}
}
void loadFont();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
