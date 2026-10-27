import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // hasil build Vite masuk ke /static, supaya /assets tetap khusus foto & gambar milik Anda
    assetsDir: 'static',
  },
})
