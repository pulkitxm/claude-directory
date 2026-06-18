import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// shadcn convention: "@" resolves to ./src so imports like
// "@/components/ui/shield-shader" and "@/lib/utils" work exactly as the
// pasted component expects, with no edits to the drop-in.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
