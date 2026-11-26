import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'

export default {
  extends: [vikeReact],
  title: 'Vike Books',
  description:
    'Browse two million Goodreads books with Vike, server-rendered search, and URL-driven filters.',
  htmlAttributes: { lang: 'en' },
  // https://vike.dev/prefetch — on hover, prefetch the next page's assets and its
  // +data result (pageContext), reused for 30s.
  prefetch: { pageContext: 30_000, staticAssets: 'hover' },
  bodyAttributes: {
    class: 'bg-surface text-black antialiased dark:bg-surface-dark dark:text-white',
  },
} satisfies Config
