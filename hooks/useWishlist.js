import { useContext } from 'react'
import { WishlistContext } from '@context/WishlistContext'

/**
 * Hook for accessing wishlist functionality
 * @returns {Object} Wishlist context containing items and management functions
 * @throws {Error} If used outside of WishlistProvider
 */
export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
