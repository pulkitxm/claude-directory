import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// `@/` resolves to `/src` so the shadcn-style imports (`@/lib/utils`,
// `@/components/ui/bloom`) work exactly as written in the prompt.
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
