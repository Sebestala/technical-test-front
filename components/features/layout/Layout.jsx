import { Box, Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Header } from './Header'
import { CartDrawer } from '@components/features/cart/CartDrawer'
import { NotificationSnackbar } from '@components/common/NotificationSnackbar'
import { useUI } from '@context'

/**
 * Styles for the main layout components
 */
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default
  },
  main: {
    flexGrow: 1,
    padding: theme.spacing(2, 0)
  }
}))

/**
 * Main layout component that wraps all pages
 * Includes header, cart drawer, and notification system
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content to render
 */
export function Layout({ children }) {
  const classes = useStyles()
  const { isCartOpen, closeCart } = useUI()

  return (
    <Box className={classes.root}>
      <Header />
      <Container
        component="main"
        maxWidth="lg"
        className={classes.main}
      >
        {children}
      </Container>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
      />
      <NotificationSnackbar />
    </Box>
  )
}
