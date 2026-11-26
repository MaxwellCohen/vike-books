import type { PageContextServer } from 'vike/types'
import { render } from 'vike/abort'
import { useConfig } from 'vike-react/useConfig'
import { getBookById } from '@/features/book/book-queries.server'
import { waitForApiDelay } from '@/lib/api-delay'
import { getApiDelayMs, parseSearchParams } from '@/lib/url-state'

export type Data = Awaited<ReturnType<typeof data>>

// The book is awaited so unknown ids return a real HTTP 404.
export async function data(pageContext: PageContextServer) {
  const config = useConfig()
  const search = parseSearchParams(pageContext.urlParsed.search)
  await waitForApiDelay(getApiDelayMs(search))
  const book = await getBookById(pageContext.routeParams.id!)
  if (!book) throw render(404, 'book')
  config({ title: `${book.title} · Vike Books` })
  return { book }
}
