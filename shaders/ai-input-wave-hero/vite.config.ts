import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// shadcn-style "@/..." alias resolves to ./src so the verbatim component can be
// imported exactly as written in the prompt:
//   "@/components/ui/ai-input-hero" and "@/components/ui/mini-navbar".
export default defineConfig({
	base: "./",
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
