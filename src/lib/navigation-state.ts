import { useSyncExternalStore } from 'react'

type NavigationState = { pending: boolean; pathname: string | null; count: number }

let state: NavigationState = { count: 0, pathname: null, pending: false }
const listeners = new Set<() => void>()

function emit(next: NavigationState) {
  state = next
  for (const listener of listeners) listener()
}

export function startNavigation(pathname: string | null) {
  emit({ ...state, pathname, pending: true })
}

export function endNavigation() {
  emit({ count: state.count + 1, pathname: null, pending: false })
}

/** Number of client-side navigations since the first page load. */
export function clientNavigationCount() {
  return state.count
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const serverState: NavigationState = { count: 0, pathname: null, pending: false }

export function useNavigationState(): NavigationState {
  return useSyncExternalStore(subscribe, () => state, () => serverState)
}
