import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const getIsMobile = React.useCallback(() => {
    if (typeof window === 'undefined') return true
    return window.innerWidth < MOBILE_BREAKPOINT
  }, [])

  const [isMobile, setIsMobile] = React.useState<boolean>(getIsMobile())

  React.useEffect(() => {
    const onChange = () => setIsMobile(getIsMobile())
    const mql = typeof window !== 'undefined' ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`) : null

    window.addEventListener('resize', onChange)
    mql?.addEventListener("change", onChange)
    onChange()
    return () => {
      window.removeEventListener('resize', onChange)
      mql?.removeEventListener("change", onChange)
    }
  }, [getIsMobile])

  return isMobile
}
