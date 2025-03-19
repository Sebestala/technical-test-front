import { createContext, useContext, useState, useEffect } from 'react'
import { useStorage } from '@hooks/useStorage'

/**
 * Context for managing wishlist state across the application
 * Persists data in local storage
 */
const WishlistContext = createContext(undefined)

const STORAGE_KEY = 'wishlist'

/**
 * Provider component for wishlist state management
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])
  const { getItem, setItem } = useStorage()

  useEffect(() => {
    const stored = getItem(STORAGE_KEY, [])
    if (stored?.length) {
      setWishlist(stored)
    }
  }, [])

  useEffect(() => {
    setItem(STORAGE_KEY, wishlist)
  }, [wishlist])

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev
      return [...prev, product]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId))
  }

  const toggleWishlist = (product) => {
    let added = false
    setWishlist((prevWishlist) => {
      const isInWishlist = prevWishlist.some((item) => item.id === product.id)

      if (isInWishlist) {
        added = false
        return prevWishlist.filter((item) => item.id !== product.id)
      } else {
        added = true
        return [...prevWishlist, product]
      }
    })
    return added
  }

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId)
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

/**
 * Hook for accessing wishlist state and actions
 * @returns {Object} Wishlist context value containing wishlist items and management functions
 * @throws {Error} If used outside of WishlistProvider
 */
export const useWishlist = () => {
  const context = useContext(WishlistContext)

  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }

  return context
}
