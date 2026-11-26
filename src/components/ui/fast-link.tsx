import { startTransition, useRef, type ReactNode } from 'react'

type Props = {
  children?: ReactNode
  className?: string
  href: string
  onPressNavigate?: () => void
  prefetch?: boolean | 'intent' | 'viewport' | 'render'
  'aria-label'?: string
}

export function FastLink({
  children = null,
  href,
  onPressNavigate,
  prefetch: _prefetch,
  className,
  ...rest
}: Props) {
  const navigatedOnMouseDown = useRef(false)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  return (
    <a
      className={className}
      href={href}
      {...rest}
      onMouseDown={(event) => {
        const interactiveTarget =
          event.target instanceof Element
            ? event.target.closest(
                'button, input, select, textarea, [contenteditable="true"], [role="button"]',
              )
            : null
        const shouldNavigate =
          !interactiveTarget &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey &&
          !event.currentTarget.hasAttribute('download') &&
          event.button === 0

        if (!shouldNavigate) return

        startTransition(() => {
          onPressNavigate?.()
          event.currentTarget.click()
          navigatedOnMouseDown.current = true
          clearTimeout(resetTimer.current)
          resetTimer.current = setTimeout(() => {
            navigatedOnMouseDown.current = false
          }, 500)
        })
        event.preventDefault()
      }}
      onClick={(event) => {
        if (navigatedOnMouseDown.current) {
          clearTimeout(resetTimer.current)
          navigatedOnMouseDown.current = false
          event.preventDefault()
        }
      }}
    >
      {children}
    </a>
  )
}
