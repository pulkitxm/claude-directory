import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
const root = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
 base: "./",
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
