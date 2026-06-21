import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The "@" alias is what makes the shadcn-style imports in the copied
// component (e.g. `@/components/ui/button`, `@/lib/utils`) resolve. It must be
// declared here for the bundler AND in tsconfig.json for the type-checker.
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
