import { usePageContext } from 'vike-react/usePageContext'
import { Button, buttonClasses } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { ErrorState } from '@/components/ui/error-state'
import { BackToBooksLink } from '@/features/book/components/back-to-books-link'
import { BookNotFound } from '@/features/book/components/book-not-found'

export function Page() {
  const { abortReason, is404, urlPathname } = usePageContext()
  const isBookPath = /^\/[^/]+\/?$/.test(urlPathname)

  if (is404 && abortReason === 'book') {
    return (
      <div className="flex flex-1 flex-col px-4 py-5 sm:px-6">
        <BackToBooksLink className="mb-6" />
        <BookNotFound />
      </div>
    )
  }

  if (is404) {
    return (
      <EmptyState body="That page doesn't exist." title="Page not found">
        <a className={buttonClasses({ className: 'mt-1', variant: 'secondary' })} href="/">
          Back to the shelf
        </a>
      </EmptyState>
    )
  }

  const retry = (
    <Button className="mt-1" onClick={() => window.location.reload()} size="sm" variant="secondary">
      Try again
    </Button>
  )

  if (urlPathname === '/') {
    return (
      <ErrorState title="Can't load books">{retry}</ErrorState>
    )
  }

  if (isBookPath) {
    return (
      <div className="flex flex-1 flex-col px-4 py-5 sm:px-6">
        <BackToBooksLink className="mb-6" />
        <ErrorState title="Can't load this book">{retry}</ErrorState>
      </div>
    )
  }

  return (
    <ErrorState title="Something went wrong">
      <Button className="mt-1" onClick={() => window.location.assign('/')} size="sm" variant="secondary">
        Back to the shelf
      </Button>
    </ErrorState>
  )
}
