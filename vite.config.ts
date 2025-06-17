
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      // More aggressive file watching restrictions
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/build/**',
        '**/.next/**',
        '**/.nuxt/**',
        '**/.vscode/**',
        '**/.idea/**',
        '**/coverage/**',
        '**/*.log',
        '**/tmp/**',
        '**/temp/**',
        '**/.DS_Store',
        '**/Thumbs.db',
        '**/*.swp',
        '**/*.swo',
        '**/.*'
      ],
      usePolling: true,
      interval: 2000,
      binaryInterval: 5000,
      depth: 3,
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ['fsevents'],
    include: ['react', 'react-dom']
  },
  build: {
    rollupOptions: {
      external: ['fsevents']
    }
  }
}));
