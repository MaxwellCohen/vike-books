import { parseSearchParams, type SearchParams } from '@/lib/url-state'

export type CatalogSearch = SearchParams

export function cleanSearch(params: SearchParams): CatalogSearch {
  const next: CatalogSearch = {}
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      next[key as keyof CatalogSearch] = value
    }
  }
  return next
}

export function searchParamsFromUrl(url: URL | URLSearchParams): CatalogSearch {
  const params = url instanceof URL ? url.searchParams : url
  return cleanSearch(parseSearchParams(Object.fromEntries(params)))
}
