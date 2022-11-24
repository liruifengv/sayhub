import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import image from '@astrojs/image'
import sitemap from '@astrojs/sitemap'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// https://astro.build/config
export default defineConfig({
  site: 'http://sayhub.me',
  integrations: [
    mdx(),
    sitemap(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
})
