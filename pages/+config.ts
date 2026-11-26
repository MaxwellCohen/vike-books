import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'

export default {
  extends: [vikeReact],
  title: 'Vike Books',
  description:
    'Browse two million Goodreads books with Vike, server-rendered search, and URL-driven filters.',
  htmlAttributes: { lang: 'en' },
  bodyAttributes: {
    class: 'bg-surface text-black antialiased dark:bg-surface-dark dark:text-white',
  },
} satisfies Config
