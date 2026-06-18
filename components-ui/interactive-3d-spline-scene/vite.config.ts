import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// `@/*` resolves to `src/*` — this is the alias the shadcn component imports
// rely on (e.g. `@/components/ui/card`, `@/lib/utils`).
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					react: ["react", "react-dom"],
					motion: ["framer-motion"],
					spline: ["@splinetool/react-spline", "@splinetool/runtime"],
				},
			},
		},
	},
});
