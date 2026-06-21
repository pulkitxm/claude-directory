import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			// shadcn/ui default alias — `@` points at the project src root so imports
			// like `@/components/ui/shader-animation` resolve everywhere.
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
