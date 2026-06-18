import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "@/App";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{/* The TargetingUI reads `useTheme()` from next-themes; force dark so the
		    reticle resolves its dark palette without a hydration flash. */}
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
			<App />
		</ThemeProvider>
	</StrictMode>,
);
