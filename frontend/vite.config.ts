import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  root: process.cwd(),
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    hmr: {
      port: 5000,
      host: "0.0.0.0",
    },
    allowedHosts: true,
    cors: true,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));