import type { Config } from 'vike/types'

export default {
  // https://vike.dev/cacheControl — let the host CDN cache the catalog HTML and pageContext.json.
  cacheControl: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
} satisfies Config
