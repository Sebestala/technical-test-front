import { useState } from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  Button,
  Divider,
  Paper
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Delete, ShoppingBasket } from '@mui/icons-material'
import { useWishlist, useCart, useNotification } from '@context'

/**
 * Styles for the wishlist page components
 */
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6)
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(4)
  },
  productCard: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateY(-4px)'
    }
  },
  productImage: {
    width: 120,
    height: '100%',
    objectFit: 'contain',
    padding: theme.spacing(2)
  },
  productDetails: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  productTitle: {
    fontWeight: 600,
    fontSize: '1rem',
    marginBottom: theme.spacing(1)
  },
  productPrice: {
    fontWeight: 700,
    color: theme.palette.primary.main
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 'auto',
    padding: theme.spacing(1, 2)
  },
  iconButton: {
    color: theme.palette.primary.light,
    marginLeft: theme.spacing(1),
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  deleteButton: {
    color: theme.palette.error.main,
    marginLeft: theme.spacing(1),
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  summary: {
    padding: theme.spacing(3),
    position: 'sticky',
    top: theme.spacing(2)
  }
}))

/**
 * Component displayed when the wishlist is empty
 */
function EmptyWishlist() {
  return (
    <Box sx={{ textAlign: 'center', py: 6 }}>
      <Typography
        variant="h6"
        gutterBottom
      >
        Votre liste de souhaits est vide
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/boutique"
      >
        Continuer mes achats
      </Button>
    </Box>
  )
}

/**
 * Individual wishlist item component
 * @param {Object} props
 * @param {Object} props.product - Product data
 * @param {Function} props.onRemove - Handler for removing item
 * @param {Function} props.onAddToCart - Handler for adding item to cart
 * @param {boolean} props.isRemoving - Whether the item is being removed
 */
function WishlistItem({ product, onRemove, onAddToCart, isRemoving }) {
  const classes = useStyles()

  return (
    <Card
      className={classes.productCard}
      sx={{ opacity: isRemoving ? 0.5 : 1 }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        className={classes.productImage}
      />
      <Box className={classes.productDetails}>
        <CardContent>
          <Typography className={classes.productTitle}>{product.title}</Typography>
          <Typography className={classes.productPrice}>{product.price.toFixed(2)} €</Typography>
        </CardContent>

        <Box className={classes.actions}>
          <IconButton
            onClick={() => onAddToCart(product)}
            className={classes.iconButton}
          >
            <ShoppingBasket />
          </IconButton>
          <IconButton
            onClick={() => onRemove(product.id)}
            className={classes.deleteButton}
          >
            <Delete />
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
}

/**
 * Summary component showing total items and add all to cart action
 * @param {Object} props
 * @param {number} props.itemCount - Total number of items
 * @param {Function} props.onAddAll - Handler for adding all items to cart
 */
function WishlistSummary({ itemCount, onAddAll }) {
  const classes = useStyles()

  return (
    <Paper className={classes.summary}>
      <Typography
        variant="h6"
        gutterBottom
      >
        Résumé
      </Typography>
      <Divider />
      <Box sx={{ my: 2 }}>
        <Typography>Total articles : {itemCount}</Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={onAddAll}
        startIcon={<ShoppingBasket />}
      >
        Tout ajouter au panier
      </Button>
    </Paper>
  )
}

/**
 * Wishlist page component showing saved products
 */
export default function Wishlist() {
  const classes = useStyles()
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addItem } = useCart()
  const { showNotification } = useNotification()
  const [removingItemId, setRemovingItemId] = useState(null)

  const handleRemove = (productId) => {
    setRemovingItemId(productId)
    setTimeout(() => {
      removeFromWishlist(productId)
      showNotification('Produit retiré de la liste', 'success')
      setRemovingItemId(null)
    }, 300)
  }

  const handleAddToCart = (product) => {
    addItem({ ...product, quantity: 1 })
    showNotification('Produit ajouté au panier', 'success')
  }

  const handleAddAll = () => {
    wishlist.forEach((product) => {
      addItem({ ...product, quantity: 1 })
    })
    showNotification('Tous les produits ont été ajoutés au panier', 'success')
  }

  if (wishlist.length === 0) {
    return <EmptyWishlist />
  }

  return (
    <Container className={classes.root}>
      <Typography
        variant="h4"
        className={classes.title}
      >
        Ma liste de souhaits
      </Typography>

      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          xs={12}
          md={8}
        >
          {wishlist.map((product) => (
            <WishlistItem
              key={product.id}
              product={product}
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
              isRemoving={removingItemId === product.id}
            />
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          <WishlistSummary
            itemCount={wishlist.length}
            onAddAll={handleAddAll}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
