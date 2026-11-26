import type { Config } from 'vike/types'

export default {
  // https://vike.dev/cacheControl — let the host CDN cache book pages and pageContext.json.
  cacheControl: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
  // https://vike.dev/vercel#isr — Vercel ISR (ignored on other hosts).
  vercel: { isr: { expiration: 3600 } },
} satisfies Config
