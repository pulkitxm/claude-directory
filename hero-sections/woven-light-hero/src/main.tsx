import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DemoOne from "./demo";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<DemoOne />
	</StrictMode>,
);
