/* eslint-disable import/no-extraneous-dependencies */
import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import vitePluginImp from 'vite-plugin-imp'

// https://vitejs.dev/config/

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    eslint(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style(name) {
            return `antd/es/${name}/style/index.css`
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
