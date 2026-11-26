import { ArrowLeft } from 'lucide-react'
import { navigate } from 'vike/client/router'
import { useCatalogParams } from '@/hooks/use-catalog-params'
import { clientNavigationCount } from '@/lib/navigation-state'
import { buildHref } from '@/lib/url-state'
import { cn } from '@/lib/utils'

const linkClass =
  'text-muted hover:bg-card dark:hover:bg-card-dark -ml-1.5 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:text-black dark:hover:text-white'

export function BackToBooksLink({ className }: { className?: string }) {
  const { current } = useCatalogParams()

  return (
    <button
      className={cn(linkClass, className)}
      onClick={() => {
        if (clientNavigationCount() > 0) {
          window.history.back()
        } else {
          void navigate(buildHref(current))
        }
      }}
      type="button"
    >
      <ArrowLeft aria-hidden className="size-4" />
      Back to books
    </button>
  )
}
