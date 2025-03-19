import { createContext, useContext, useState, useRef, useEffect } from 'react'

/**
 * Context for managing notification state across the application
 * Handles temporary messages with auto-dismiss functionality
 */
const NotificationContext = createContext(undefined)

/**
 * Provider component for notification state management
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'info'
  })
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const show = (message, type = 'info', duration = 3000) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setNotification({ open: true, message, type })

    if (duration) {
      timeoutRef.current = window.setTimeout(() => {
        setNotification((prev) => ({ ...prev, open: false }))
      }, duration)
    }
  }

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setNotification((prev) => ({ ...prev, open: false }))
  }

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification: show, hideNotification: hide }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

/**
 * Hook for accessing notification state and actions
 * @returns {Object} Notification context value containing notification state and control functions
 * @throws {Error} If used outside of NotificationProvider
 */
export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
