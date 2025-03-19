import { useState } from 'react'
import { Box, Typography, IconButton, Grid, Avatar, ButtonGroup, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Add, Remove, Delete } from '@mui/icons-material'
import { useCart, useNotification } from '@context'

/**
 * Styles for the cart item components using Material-UI's makeStyles
 */
const useStyles = makeStyles((theme) => ({
  productItem: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.2s ease',
    backgroundColor: '#fff',
    position: 'relative',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-2px)'
    }
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: theme.spacing(1),
    objectFit: 'cover',
    marginRight: theme.spacing(2),
    border: '1px solid #eee'
  },
  productTitle: {
    fontWeight: 600,
    fontSize: '1rem',
    marginBottom: theme.spacing(0.5),
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical'
  },
  productPrice: {
    fontSize: '0.9rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5)
  },
  actionsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1)
  },
  deleteButton: {
    color: '#f44336',
    padding: theme.spacing(0.5),
    marginLeft: theme.spacing(1.5),
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(244, 67, 54, 0.08)'
    },
    '&:disabled': {
      color: '#bdbdbd'
    }
  },
  quantityButton: {
    color: theme.palette.primary.light,
    borderColor: theme.palette.primary.light,
    '&:hover': {
      borderColor: theme.palette.primary.main,
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    },
    '&.Mui-disabled': {
      color: theme.palette.primary.light,
      borderColor: theme.palette.primary.light
    }
  },
  quantityText: {
    color: theme.palette.primary.light,
    borderColor: theme.palette.primary.light,
    '&.Mui-disabled': {
      color: theme.palette.primary.light,
      borderColor: theme.palette.primary.light
    }
  }
}))

/**
 * Displays the product image in a rounded avatar format
 * @param {Object} props - Component props
 * @param {string} props.image - URL of the product image
 * @param {string} props.title - Product title used as alt text
 */
function ProductImage({ image, title }) {
  const classes = useStyles()
  return (
    <Avatar
      src={image}
      alt={title}
      variant="rounded"
      className={classes.productImage}
    />
  )
}

/**
 * Displays the product title and price information
 * @param {Object} props - Component props
 * @param {string} props.title - Product title
 * @param {number} props.price - Product price
 */
function ProductInfo({ title, price }) {
  const classes = useStyles()
  return (
    <>
      <Typography
        variant="subtitle1"
        className={classes.productTitle}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        className={classes.productPrice}
      >
        {price.toFixed(2)} €
      </Typography>
    </>
  )
}

/**
 * Controls for adjusting product quantity with increment/decrement buttons
 * @param {Object} props - Component props
 * @param {number} props.quantity - Current product quantity
 * @param {Function} props.onIncrement - Handler for increasing quantity
 * @param {Function} props.onDecrement - Handler for decreasing quantity
 * @param {Function} props.onRemove - Handler for removing item when quantity reaches 1
 * @param {boolean} props.disabled - Whether the controls are disabled
 */
function QuantityControls({ quantity, onIncrement, onDecrement, onRemove, disabled }) {
  const classes = useStyles()
  return (
    <ButtonGroup
      size="small"
      variant="outlined"
    >
      <Button
        size="small"
        onClick={quantity === 1 ? onRemove : onDecrement}
        disabled={disabled}
        className={classes.quantityButton}
      >
        <Remove fontSize="small" />
      </Button>
      <Button
        disabled
        sx={{ minWidth: 40 }}
        className={classes.quantityText}
      >
        {quantity}
      </Button>
      <Button
        size="small"
        onClick={onIncrement}
        disabled={disabled}
        className={classes.quantityButton}
      >
        <Add fontSize="small" />
      </Button>
    </ButtonGroup>
  )
}

/**
 * Delete button for removing the product from cart
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Handler for delete action
 * @param {boolean} props.disabled - Whether the button is disabled
 */
function DeleteButton({ onClick, disabled }) {
  const classes = useStyles()
  return (
    <IconButton
      size="small"
      className={classes.deleteButton}
      onClick={onClick}
      disabled={disabled}
      aria-label="Remove product"
    >
      <Delete fontSize="small" />
    </IconButton>
  )
}

/**
 * Cart item component displaying product information and quantity controls
 * @param {Object} props - Component props
 * @param {Object} props.product - Product object containing id, title, price, image, and quantity
 */
export function CartItem({ product }) {
  const classes = useStyles()
  const cart = useCart()
  const { showNotification } = useNotification()
  const [isDeleting, setIsDeleting] = useState(false)

  if (!product) return null

  const handleRemove = () => {
    if (isDeleting) return
    setIsDeleting(true)
    cart.removeItem(product.id)
    showNotification('Product removed from cart', 'success')
  }

  const handleIncrement = () => {
    cart.updateQuantity(product.id, product.quantity + 1)
  }

  const handleDecrement = () => {
    cart.updateQuantity(product.id, product.quantity - 1)
  }

  return (
    <Box className={classes.productItem}>
      <Grid
        container
        alignItems="center"
      >
        <Grid item>
          <ProductImage
            image={product.image}
            title={product.title}
          />
        </Grid>
        <Grid
          item
          xs
        >
          <ProductInfo
            title={product.title}
            price={product.price}
          />

          <Box className={classes.actionsContainer}>
            <QuantityControls
              quantity={product.quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
              disabled={isDeleting}
            />
            <DeleteButton
              onClick={handleRemove}
              disabled={isDeleting}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
