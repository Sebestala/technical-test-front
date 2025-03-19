import { Card, CardContent, CardActions, Typography, IconButton, Badge } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ShoppingBasket, Favorite, FavoriteBorder } from '@mui/icons-material'
import { useState } from 'react'
import Image from 'next/image'
import { useWishlist, useNotification, useCart } from '@context'

/**
 * Styles for the ProductCard component
 * Includes hover effects, image container, typography and button styling
 */
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 12,
    transition: 'transform 0.3s ease',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-4px)'
    }
  },
  content: {
    flex: 1,
    padding: theme.spacing(2)
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    marginTop: theme.spacing(2),
    height: '2.8em',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical'
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1)
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2)
  },
  iconButton: {
    color: theme.palette.primary.light,
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  favoriteActive: {
    color: '#f44336'
  },
  badge: {
    '& .MuiBadge-badge': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontSize: '0.75rem',
      minWidth: '20px',
      height: '20px',
      padding: '0 6px'
    }
  }
}))

/**
 * ProductCard component displays a product with its image, title, price
 * and actions to add to cart or wishlist
 * @param {Object} props
 * @param {Object} props.product - Product data containing id, title, price, and image
 */
export function ProductCard({ product }) {
  const classes = useStyles()
  const { cart, addItem } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { showNotification } = useNotification()
  const [isLoading, setIsLoading] = useState(false)

  if (!product) return null

  const getItemQuantity = (productId) => {
    const item = cart?.find((item) => item.id === productId)
    return item ? item.quantity : 0
  }

  const quantity = getItemQuantity(product.id)

  const handleAddToCart = () => {
    if (isLoading) return
    setIsLoading(true)
    addItem(product)
    showNotification('Product added to cart', 'success')
    setIsLoading(false)
  }

  const handleToggleWishlist = () => {
    if (isLoading) return
    setIsLoading(true)

    const inWishlist = isInWishlist(product.id)
    if (inWishlist) {
      removeFromWishlist(product.id)
      showNotification('Product removed from wishlist', 'success')
    } else {
      addToWishlist(product)
      showNotification('Product added to wishlist', 'success')
    }

    setIsLoading(false)
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.imageContainer}>
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="contain"
            loading="lazy"
          />
        </div>

        <Typography className={classes.title}>{product.title}</Typography>

        <Typography className={classes.price}>{product.price.toFixed(2)} €</Typography>
      </CardContent>

      <CardActions className={classes.actions}>
        <Badge
          badgeContent={quantity || 0}
          className={classes.badge}
          invisible={!quantity}
        >
          <IconButton
            onClick={handleAddToCart}
            disabled={isLoading}
            className={classes.iconButton}
            aria-label="Add to cart"
          >
            <ShoppingBasket />
          </IconButton>
        </Badge>

        <IconButton
          onClick={handleToggleWishlist}
          disabled={isLoading}
          className={classes.iconButton}
          aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isInWishlist(product.id) ? (
            <Favorite className={classes.favoriteActive} />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
      </CardActions>
    </Card>
  )
}
