import { cloudflare } from '@cloudflare/vite-plugin'
import netlify from '@netlify/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { defineConfig, type PluginOption } from 'vite'
import { vercel } from 'vite-plugin-vercel/vite'

const env = process.env
const isCloudflare = !!(env.CLOUDFLARE || env.WORKERS_CI || env.CF_PAGES)
const isNetlify = !!env.NETLIFY && !isCloudflare
const isVercel = !!env.VERCEL && !isNetlify && !isCloudflare

const hostPlugins: PluginOption[] = isCloudflare
  ? [cloudflare({ viteEnvironment: { name: 'ssr' } })]
  : isNetlify
    ? [netlify({ build: { enabled: true } })]
    : isVercel
      ? [
          vercel({
            // Hashed build assets never change: let browsers and the CDN keep them.
            headers: [
              {
                source: '/assets/(.*)',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
              },
            ],
          }),
        ]
      : []

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [vike(), react(), tailwindcss(), ...hostPlugins],
})
