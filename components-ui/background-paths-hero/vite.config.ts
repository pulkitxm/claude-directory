import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));

// `@/…` resolves to `src/…`, matching the shadcn/ui convention the dropped-in
// component expects (`@/components/ui/button`, `@/lib/utils`).
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(root, "src"),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					react: ["react", "react-dom"],
					motion: ["framer-motion"],
				},
			},
		},
	},
});
