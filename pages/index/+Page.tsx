import { useData } from 'vike-react/useData'
import { BookGrid } from '@/features/book/components/book-grid'
import { BookPagination } from '@/features/book/components/book-pagination'
import type { Data } from './+data'

export function Page() {
  const { books, searchParams, totalResults } = useData<Data>()
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 px-4 py-5 transition-opacity duration-200 ease-out group-has-[[data-filtering]]:opacity-60 sm:px-6">
        <BookGrid books={books} searchParams={searchParams} />
      </div>
      <footer className="border-divider dark:border-divider-dark mt-auto border-t px-4 py-3 sm:px-6">
        <BookPagination searchParams={searchParams} totalResults={totalResults} />
      </footer>
    </div>
  )
}
