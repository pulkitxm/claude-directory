import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./routes";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Home />
	</StrictMode>,
);
