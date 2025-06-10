import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))


// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    react(),
    tailwindcss()
  ],
    resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
