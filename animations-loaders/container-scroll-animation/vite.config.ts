import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// `@` resolves to ./src so shadcn-style imports like
// `@/components/ui/container-scroll-animation` work exactly as authored.
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
