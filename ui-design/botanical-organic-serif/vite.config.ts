import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	base: "./",
	plugins: [
		{
			name: "nested-public-assets",
			renderChunk(code) {
				return code.replaceAll('"/images/', '"./images/');
			},
		},
		react(),
		tailwindcss(),
	],
});
