import { createContext, useContext, useState } from 'react'

/**
 * Context for managing UI state across the application
 */
export const UIContext = createContext(undefined)

/**
 * Provider component for UI state management
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function UIProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const value = {
    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    toggleCart: () => setIsCartOpen((prev) => !prev)
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

/**
 * Hook for accessing UI state and actions
 * @returns {Object} UI context value containing cart state and actions
 * @throws {Error} If used outside of UIProvider
 */
export const useUI = () => {
  const context = useContext(UIContext)

  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider')
  }

  return context
}
