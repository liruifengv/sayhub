import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import image from '@astrojs/image'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// https://astro.build/config
export default defineConfig({
  site: 'http://sayhub.me',
  integrations: [
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
    mdx(),
    sitemap(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
  ],
  markdown: {
		extendDefaultPlugins: true,
	},
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
})
