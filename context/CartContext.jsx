import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { useStorage } from '@hooks/useStorage'

/**
 * Context for managing shopping cart state across the application
 * Persists data in local storage
 */
export const CartContext = createContext(undefined)

const CART_STORAGE_KEY = 'cart'

/**
 * Custom hook for cart operations
 * @param {Object} storage - Storage interface for persistence
 * @returns {Object} Cart operations and state
 */
const useCartOperations = (storage) => {
  const [cart, setCart] = useState([])

  // Initial load from storage
  useEffect(() => {
    const storedCart = storage.getItem(CART_STORAGE_KEY, [])
    if (storedCart?.length > 0) {
      setCart(storedCart)
    }
  }, [])

  // Persist to storage on changes
  useEffect(() => {
    storage.setItem(CART_STORAGE_KEY, cart)
  }, [cart])

  const addItem = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id)

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        )
      }

      return [...currentCart, { ...product, quantity: product.quantity || 1 }]
    })
  }

  const removeItem = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(productId)
      return
    }

    setCart((currentCart) =>
      currentCart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const total = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  )

  const totalItems = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart])

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    totalItems
  }
}

/**
 * Provider component for cart state management
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function CartProvider({ children }) {
  const storage = useStorage()
  const cartOperations = useCartOperations(storage)

  return <CartContext.Provider value={cartOperations}>{children}</CartContext.Provider>
}

/**
 * Hook for accessing cart state and actions
 * @returns {Object} Cart context value containing cart items and management functions
 * @throws {Error} If used outside of CartProvider
 */
export const useCart = () => {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
