import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// shadcn convention: "@" resolves to ./src so the component's own import
// `@/components/ui/celestial-sphere-shader` works verbatim, exactly as shipped.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
