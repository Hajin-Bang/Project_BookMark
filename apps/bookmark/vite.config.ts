import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@design-system": path.resolve(__dirname, "packages/design-system/src"),
    },
  },
  build: {
    outDir: "dist",
  },
  css: {
    postcss: path.resolve(__dirname, "apps/bookmark/postcss.config.js"),
  },
});
