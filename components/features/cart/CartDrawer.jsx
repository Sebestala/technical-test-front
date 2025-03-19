import { Drawer, Box, Typography, IconButton, Button, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Close, ShoppingBasket } from '@mui/icons-material'
import { useCart, useNotification } from '@context'
import { CartItem } from './CartItem'

/**
 * Styles for the cart drawer components using Material-UI's makeStyles
 */
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 380,
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  productCount: {
    marginLeft: theme.spacing(1),
    fontSize: '0.85rem',
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(1),
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  closeButton: {
    color: theme.palette.primary.contrastText
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center'
  },
  productListContainer: {
    padding: theme.spacing(2),
    overflowY: 'auto',
    height: 'calc(100vh - 64px - 80px)',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 64px - 80px - env(safe-area-inset-bottom))'
    }
  },
  emptyCartMessage: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  emptyCartIcon: {
    fontSize: 60,
    color: theme.palette.text.disabled,
    marginBottom: theme.spacing(2)
  },
  drawerFooter: {
    position: 'sticky',
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    zIndex: 2
  },
  totalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1.5, 2),
    backgroundColor: theme.palette.primary.default,
    borderRadius: theme.spacing(1),
    '& .MuiTypography-root': {
      color: theme.palette.primary.main,
      fontSize: '1.1rem'
    }
  }
}))

/**
 * Displays the cart header with item count and close button
 * @param {Object} props - Component props
 * @param {number} props.itemCount - Number of items in cart
 * @param {Function} props.onClose - Handler for closing the drawer
 */
function CartHeader({ itemCount, onClose }) {
  const classes = useStyles()
  return (
    <Box className={classes.drawerHeader}>
      <Box className={classes.headerContent}>
        <Typography
          variant="h6"
          component="h2"
        >
          Cart
        </Typography>
        {itemCount > 0 && (
          <Box
            component="span"
            className={classes.productCount}
          >
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Box>
        )}
      </Box>
      <IconButton
        onClick={onClose}
        className={classes.closeButton}
        size="large"
        aria-label="Close cart"
      >
        <Close />
      </IconButton>
    </Box>
  )
}

/**
 * Displays a message when the cart is empty
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Handler for closing the drawer
 */
function EmptyCartMessage({ onClose }) {
  const classes = useStyles()

  return (
    <Box className={classes.emptyCartMessage}>
      <ShoppingBasket className={classes.emptyCartIcon} />
      <Typography variant="h6">Your cart is empty</Typography>
      <Typography
        variant="body2"
        color="textSecondary"
      >
        Add products to your cart to see them here
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        sx={{ mt: 2 }}
        onClick={onClose}
      >
        Continue Shopping
      </Button>
    </Box>
  )
}

/**
 * Displays the cart footer with total amount and checkout button
 * @param {Object} props - Component props
 * @param {number} props.total - Total amount of items in cart
 * @param {Function} props.onCheckout - Handler for checkout action
 */
function CartFooter({ total, onCheckout }) {
  const classes = useStyles()
  return (
    <Paper
      elevation={2}
      className={classes.drawerFooter}
    >
      <Box className={classes.totalContainer}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
        >
          Total
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={600}
        >
          {total.toFixed(2)} €
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={onCheckout}
      >
        Checkout
      </Button>
    </Paper>
  )
}

/**
 * Displays the list of items in the cart
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of cart items
 */
function CartItemList({ items }) {
  const classes = useStyles()
  return (
    <Box className={classes.productListContainer}>
      {items.map((product) => (
        <CartItem
          key={product.id}
          product={product}
        />
      ))}
    </Box>
  )
}

/**
 * Main cart drawer component that slides in from the right
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the drawer is open
 * @param {Function} props.onClose - Handler for closing the drawer
 */
export function CartDrawer({ isOpen, onClose }) {
  const classes = useStyles()
  const cartContext = useCart()
  const { showNotification } = useNotification()

  const handleClearCart = () => {
    cartContext.clearCart()
    showNotification('Cart cleared', 'success')
    onClose()
  }

  const hasItems = cartContext.cart && cartContext.cart.length > 0
  const itemCount = cartContext.cart
    ? cartContext.cart.reduce((total, item) => total + item.quantity, 0)
    : 0
  const total = cartContext.cart
    ? cartContext.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0

  const handleCheckout = () => {
    handleClearCart()
    showNotification('Checkout completed successfully!', 'success')
  }

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      className={classes.drawer}
    >
      <Box className={classes.drawer}>
        <CartHeader
          itemCount={itemCount}
          onClose={onClose}
        />

        {!hasItems ? (
          <EmptyCartMessage onClose={onClose} />
        ) : (
          <>
            <CartItemList items={cartContext.cart} />
            <CartFooter
              total={total}
              onCheckout={handleCheckout}
            />
          </>
        )}
      </Box>
    </Drawer>
  )
}
