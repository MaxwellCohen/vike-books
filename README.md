# Vike Books

Goodreads catalog demo built with [Vike](https://vike.dev) + `vike-react` (SSR, filesystem routing, `+data` hooks, client routing), Tailwind CSS v4, and Drizzle on Neon Postgres. Port of the shared "Books" app.

## Environment

Copy `.env.example` to `.env`.

- `POSTGRES_URL` — Postgres connection string. Leave empty to serve the built-in preview catalog.
- `API_DELAY_MS` — optional artificial server latency in milliseconds.

## Commands

- `pnpm dev` — dev server on port 3000
- `pnpm build` — production build (Node server at `dist/server/index.mjs` when no host flag is set)
- `pnpm preview` — build and serve the production build
- `pnpm typecheck` — `tsc`

## Deployment

| Host | URL | Build flag |
| --- | --- | --- |
| Vercel | https://vike-books.vercel.app | `VERCEL=1` (set by Vercel) |
| Netlify | https://vike-books.netlify.app | `NETLIFY=1` |
| Cloudflare Workers | https://vike-books.to-email-max.workers.dev | `CLOUDFLARE=1` (or `WORKERS_CI`, set by Workers Builds) |

- Vercel and Netlify are connected to this repo: a push to `main` builds and deploys to both. Cloudflare is deployed with `pnpm deploy:cloudflare`.
- The app uses Vike's built-in server (`pages/+server.ts` without a `fetch` export); the Vite plugin for the host adapts it: `vite-plugin-vercel`, `@netlify/vite-plugin`, or `@cloudflare/vite-plugin` (`main: "vike:server"`). With no flag it targets Node.
- `POSTGRES_URL` is set on every host (Vercel and Netlify environment variable, Cloudflare secret). Without it the app serves the preview catalog.
- Manual deploys: `pnpm deploy:vercel`, `pnpm deploy:netlify`, `pnpm deploy:cloudflare`.
