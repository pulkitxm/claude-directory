import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Mirrors the path alias shadcn/ui projects use so the demo's
// `@/components/ui/shader-lines` import resolves exactly as written.
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
