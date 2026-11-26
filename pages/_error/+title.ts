import type { PageContext } from 'vike/types'

export function title(pageContext: PageContext) {
  return pageContext.is404 ? 'Not found · Vike Books' : 'Vike Books'
}
