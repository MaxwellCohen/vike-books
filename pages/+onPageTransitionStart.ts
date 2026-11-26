import type { PageContextClient } from 'vike/types'
import { startNavigation } from '@/lib/navigation-state'

export function onPageTransitionStart(pageContext: Partial<PageContextClient>) {
  startNavigation(pageContext.urlPathname ?? null)
}
