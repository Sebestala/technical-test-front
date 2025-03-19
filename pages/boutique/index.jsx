import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import productsData from '../../data/products.json'
import { ProductCard } from '@components/features/product/ProductCard'

/**
 * Styles for the shop page components
 */
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  title: {
    marginBottom: theme.spacing(4)
  },
  filterPaper: {
    padding: theme.spacing(2)
  },
  filterListContainer: {
    marginTop: theme.spacing(2)
  },
  categoryWithMargin: {
    marginTop: theme.spacing(1)
  }
}))

/**
 * Shop page component displaying products with category filtering
 * @param {Object} props
 * @param {Array} props.products - List of products to display
 */
export default function Boutique({ products }) {
  const classes = useStyles()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'men clothing', label: 'Men Clothing' },
    { id: 'women clothing', label: 'Women Clothing' },
    { id: 'jewelery', label: 'Jewelery' },
    { id: 'electronics', label: 'Electronics' }
  ]

  /**
   * Updates the selected category filter
   * @param {string} categoryId - ID of the selected category
   */
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  /**
   * Filters products based on selected category
   * @param {string} category - Category to filter by
   * @returns {Array} Filtered products
   */
  const filterByCategory = (category) => {
    if (category === 'all') return products
    return products.filter((product) => product.category === category)
  }

  const filteredProducts = filterByCategory(selectedCategory)

  return (
    <Container className={classes.root}>
      <Typography
        variant="h4"
        component="h1"
        className={classes.title}
      >
        Our Products
      </Typography>

      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          xs={12}
          md={3}
        >
          <Paper className={classes.filterPaper}>
            <Typography
              variant="h6"
              component="h2"
            >
              Categories
            </Typography>
            <Divider />
            <div className={classes.filterListContainer}>
              <List>
                {categories.map((category, index) => (
                  <ListItem
                    key={category.id}
                    disablePadding
                    className={index > 0 ? classes.categoryWithMargin : ''}
                  >
                    <ListItemButton
                      onClick={() => handleCategoryClick(category.id)}
                      selected={selectedCategory === category.id}
                    >
                      <ListItemText
                        primary={category.label}
                        primaryTypographyProps={{
                          style: {
                            fontWeight: selectedCategory === category.id ? 700 : 400
                          }
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
        >
          <Grid
            container
            spacing={3}
          >
            {filteredProducts.map((product) => (
              <Grid
                item
                key={product.id}
                xs={12}
                sm={6}
                md={4}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

/**
 * Server-side props function to load initial products data
 * @returns {Object} Props containing products data
 */
export async function getServerSideProps() {
  return {
    props: {
      products: productsData.products
    }
  }
}
