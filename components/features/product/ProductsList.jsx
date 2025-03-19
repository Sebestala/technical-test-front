import { Grid, Typography, Skeleton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ProductCard } from './ProductCard'
import { useProducts } from '@hooks/useProducts'
import { useEffect } from 'react'

/**
 * Styles for the products list components
 */
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  message: {
    textAlign: 'center',
    marginTop: theme.spacing(4),
    color: theme.palette.text.secondary
  }
}))

/**
 * Loading placeholder component for products
 */
function ProductSkeleton() {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
    >
      <Skeleton
        variant="rectangular"
        height={200}
      />
      <Skeleton
        variant="text"
        height={48}
        sx={{ mt: 1 }}
      />
      <Skeleton
        variant="text"
        width="40%"
      />
    </Grid>
  )
}

/**
 * Component that displays a grid of products with loading and error states
 * @param {Object} props
 * @param {string} props.selectedCategory - Currently selected category filter
 * @param {Array} props.initialProducts - Initial products data
 */
export function ProductsList({ selectedCategory, initialProducts }) {
  const classes = useStyles()
  const { products, loading, error, setCategory } = useProducts(selectedCategory, initialProducts)

  useEffect(() => {
    setCategory(selectedCategory)
  }, [selectedCategory, setCategory])

  if (error) {
    return <Typography className={classes.message}>{error}</Typography>
  }

  if (loading) {
    return (
      <Grid
        container
        spacing={3}
        className={classes.root}
      >
        {[...Array(8)].map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </Grid>
    )
  }

  if (products.length === 0) {
    return <Typography className={classes.message}>No products found in this category</Typography>
  }

  return (
    <Grid
      container
      spacing={3}
      className={classes.root}
    >
      {products.map((product) => (
        <Grid
          key={product.id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
