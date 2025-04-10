import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  preview: {
    port: 80,
    strictPort: true
  },
  server: {
    cors: true,
    port: 80,
    host: true,
    strictPort: true,
    hmr: {
      host: `changelog.${process.env.DOMAIN}`,
      protocol: "wss",
      clientPort: 443
    },
    watch: { usePolling: true }
  },
})
