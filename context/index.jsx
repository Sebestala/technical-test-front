import { CartProvider } from './CartContext'
import { WishlistProvider } from './WishlistContext'
import { UIProvider } from './UIContext'
import { NotificationProvider } from './NotificationContext'

/**
 * Root provider component that combines all context providers
 * Providers are nested in a specific order to ensure proper dependency flow:
 * 1. UI state (for global UI elements)
 * 2. Notifications (depends on UI state)
 * 3. Wishlist (independent)
 * 4. Cart (may depend on notifications)
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to wrap with providers
 */
export function AppProviders({ children }) {
  return (
    <UIProvider>
      <NotificationProvider>
        <WishlistProvider>
          <CartProvider>{children}</CartProvider>
        </WishlistProvider>
      </NotificationProvider>
    </UIProvider>
  )
}

// Export hooks for easier importing
export { useUI } from './UIContext'
export { useWishlist } from './WishlistContext'
export { useNotification } from './NotificationContext'
export { useCart } from './CartContext'
