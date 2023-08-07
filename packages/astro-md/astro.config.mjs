import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from "@astrojs/vercel/serverless";
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// https://astro.build/config
export default defineConfig({
  site: 'https://sayhub.me/',
  experimental: {
    assets: true
  },
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
  ],
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      },
    },
  },
  output: 'server',
  adapter: vercel({
    analytics: true,
  }),
});
