import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The `@` alias mirrors the shadcn convention used in components.json so that
// imports like `@/components/ui/shape-landing-hero` and `@/lib/utils` resolve.
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
