import { useMemo, useRef, useEffect } from 'react'

/**
 * Hook that creates a debounced version of a callback function
 * @param {Function} callback - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced version of the callback
 */
export function useDebounce(callback, delay) {
  const timeoutRef = useRef(null)
  const callbackRef = useRef(callback)

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return useMemo(
    () =>
      (...args) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
          callbackRef.current(...args)
        }, delay)
      },
    [delay]
  )
}
