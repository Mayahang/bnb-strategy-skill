import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/cmc': {
        target: 'https://pro-api.coinmarketcap.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cmc/, ''),
        headers: {
          'X-CMC_PRO_API_KEY': 'bf811c5ad0484fe0af959410a100fc6b',
        },
      },
    },
  },
})
