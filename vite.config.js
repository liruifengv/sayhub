import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  // base 仅仅是为了 github-pages，部署到自己网站时不需要，要注释掉。想想怎么自动化处理
  base: process.env.NODE_ENV === 'development' ? '' : '/sayhub/', 
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
