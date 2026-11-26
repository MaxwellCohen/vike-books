import { useData } from 'vike-react/useData'
import { BackToBooksLink } from '@/features/book/components/back-to-books-link'
import { BookDetail } from '@/features/book/components/book-detail'
import type { Data } from './+data'

export function Page() {
  const { book } = useData<Data>()
  return (
    <div className="flex flex-1 flex-col px-4 py-5 sm:px-6">
      <BackToBooksLink className="mb-6" />
      <BookDetail book={book} />
    </div>
  )
}
