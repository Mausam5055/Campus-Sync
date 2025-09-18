import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function usePageLoading(delay: number = 800) {
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, delay)

    return () => clearTimeout(timer)
  }, [location.pathname, delay])

  return isLoading
}