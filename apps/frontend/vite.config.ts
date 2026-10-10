import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const frontendDirectory = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [vue(), tailwindcss()],
    build: {
        outDir: resolve(frontendDirectory, '../../dist/html'),
        emptyOutDir: true,
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
        strictPort: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3001',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})
