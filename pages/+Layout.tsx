import '@/styles/global.css'
import type { ReactNode } from 'react'
import { MobileBookSidebar, MobileBookSidebarTrigger } from '@/components/mobile-book-sidebar'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { BookSearch } from '@/features/book/components/book-search'
import { BookSidebar } from '@/features/book/components/book-sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MobileBookSidebar sidebar={<BookSidebar idPrefix="mobile" mobile />}>
        <div className="group flex min-h-dvh">
          <aside
            className="border-divider bg-surface dark:border-divider-dark dark:bg-surface-dark sticky top-0 hidden h-dvh w-72 shrink-0 flex-col border-r px-5 py-5 md:flex"
            style={{ viewTransitionName: 'sidebar' }}
          >
            <BookSidebar idPrefix="desktop" />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <header
              className="border-divider bg-surface/80 dark:border-divider-dark dark:bg-surface-dark/80 sticky top-0 z-20 flex items-center gap-2 border-b px-4 py-3 backdrop-blur-md backdrop-saturate-150 sm:gap-3 sm:px-6"
              style={{ viewTransitionName: 'site-header' }}
            >
              <MobileBookSidebarTrigger />
              <BookSearch />
            </header>

            <main className="flex min-w-0 flex-1 flex-col">{children}</main>
          </div>
        </div>
      </MobileBookSidebar>
    </ThemeProvider>
  )
}
