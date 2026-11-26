import type { Server } from 'vike/types'

// Vike's built-in server (no `fetch` export). A +server file (instead of `server: true`)
// makes vite-plugin-vercel bundle the app into the function.
export default {
  prod: { port: Number(process.env.PORT ?? 3000) },
} satisfies Server
