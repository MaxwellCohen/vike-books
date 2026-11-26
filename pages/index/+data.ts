import type { PageContextServer } from 'vike/types'
import { toBookFilters, toBookQuery } from '@/features/book/book-utils'
import { getBooksCount, getBooksPage } from '@/features/book/book-queries.server'
import { waitForApiDelay } from '@/lib/api-delay'
import { searchParamsFromUrl } from '@/lib/search-schema'
import { getApiDelayMs } from '@/lib/url-state'

export type Data = Awaited<ReturnType<typeof data>>

export async function data(pageContext: PageContextServer) {
  const searchParams = searchParamsFromUrl(new URLSearchParams(pageContext.urlParsed.searchOriginal ?? ''))
  await waitForApiDelay(getApiDelayMs(searchParams))
  const query = toBookQuery(searchParams)
  const [books, totalResults] = await Promise.all([
    getBooksPage(query),
    getBooksCount(toBookFilters(query)),
  ])
  return { books, searchParams, totalResults }
}
