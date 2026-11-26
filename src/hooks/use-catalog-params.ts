import { usePageContext } from 'vike-react/usePageContext'
import { navigate } from 'vike/client/router'
import { useNavigationState } from '@/lib/navigation-state'
import { buildHref, type SearchParams } from '@/lib/url-state'
import { cleanSearch, searchParamsFromUrl } from '@/lib/search-schema'

export function useCatalogParams() {
  const pageContext = usePageContext()
  const navigation = useNavigationState()
  const current = searchParamsFromUrl(new URLSearchParams(pageContext.urlParsed.searchOriginal ?? ''))
  const pending = navigation.pending && navigation.pathname === '/'

  function replace(next: SearchParams): Promise<void> {
    return navigate(buildHref(cleanSearch(next)), {
      keepScrollPosition: true,
      overwriteLastHistoryEntry: true,
    })
  }

  return { current, pending, replace }
}
