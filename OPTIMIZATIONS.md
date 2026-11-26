# Optimizations (`optimized` branch)

Everything that differs from `main` (the naive build with Vike defaults). Each change is marked **framework** (a Vike / vike-react / Vike host-plugin feature, configured but not implemented here) or **hand-written** (app code or host config written for this port, mostly copied from the other `optimized` ports).

| # | Change | Kind | Where |
| --- | --- | --- | --- |
| 1 | Data prefetch on hover: Vike's `prefetch` setting fetches the next page's `+data` result (`pageContext.json`) as well as its JS/CSS when a link is hovered, and reuses it for 30 s. The default only prefetches static assets. | framework (Vike `+prefetch`, experimental) | `pages/+config.ts` |
| 2 | Viewport prefetch for always-visible links (home link, pagination): `data-prefetch-static-assets="viewport"` on links that opt in with `prefetch`. | framework (Vike per-link `prefetchStaticAssets` override) | `src/components/ui/fast-link.tsx` |
| 3 | CDN caching of HTML and `pageContext.json` for the catalog and book pages: `Cache-Control: public, max-age=0, s-maxage=3600, stale-while-revalidate=86400`. The default is `no-store`. Error and 404 pages keep `no-store`. Vercel and Netlify cache these at the edge; Cloudflare `workers.dev` does not cache Worker responses. | framework (Vike `+cacheControl`) | `pages/index/+config.ts`, `pages/@id/+config.ts` |
| 4 | Vercel ISR for book detail pages (1 h expiration). Vike passes the per-page setting to `vite-plugin-vercel`, which emits a prerender function for `/:id`. | framework (Vike `+vercel.isr` + `vite-plugin-vercel`) | `pages/@id/+config.ts` |
| 5 | Self-hosted Geist fonts (`@fontsource-variable/geist`, `@fontsource-variable/geist-mono`) bundled by Vite and served from the app origin instead of Google Fonts. Vike has no font feature. | hand-written (copied from the other optimized ports) | `src/styles/global.css`, `pages/+Head.tsx` |
| 6 | Catalog query cache: 1 h TTL with in-flight de-dup, in memory plus a per-host store (Vercel `getCache`, Netlify Blobs, Workers KV `CATALOG_CACHE`). Vike has no data cache. | hand-written (copied `catalog-cache.ts`; the Workers KV binding is now read from `cloudflare:workers`) | `src/lib/server/catalog-cache.ts`, `src/features/book/book-queries.server.ts`, `wrangler.jsonc` |
| 7 | `immutable` Cache-Control for hashed `/assets/*` on every host: `public/_headers` (Netlify, Cloudflare) and `vite-plugin-vercel`'s `headers` option (Vercel). | hand-written (header values), applied through `vite-plugin-vercel` on Vercel | `public/_headers`, `vite.config.ts` |

Not used, and why:

- **HTML streaming** (`+stream`): `+data` is awaited before rendering starts, so streaming sends nothing earlier. Vike only streams with a data extension such as `vike-react-query`, which would replace `+data`.
- **Pre-rendering** (`+prerender`): the catalog is query-string driven and backed by a live database.
- **Images, CSS inlining, early hints**: Vike has no built-in image or CSS-inlining feature, and the serverless hosts don't send the 103 early hints Vike computes.
