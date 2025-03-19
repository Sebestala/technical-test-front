import { AppBar, Toolbar, Typography, IconButton, Container, Badge, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ShoppingBasket as ShoppingBasketIcon } from '@mui/icons-material'
import { Favorite as FavoriteIcon } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUI, useWishlist, useCart } from '@context'

/**
 * Styles for the Header and its sub-components
 * Includes animations, hover effects and responsive design
 */
const useStyles = makeStyles((theme) => ({
  toolbar: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    position: 'relative',
    overflow: 'hidden',
    transition: 'letter-spacing 0.3s ease',
    '&:hover': {
      letterSpacing: '0.05em',
      '&::after': {
        transform: 'translateX(0)'
      }
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2px',
      backgroundColor: theme.palette.light,
      transform: 'translateX(-100%)',
      transition: 'transform 0.4s ease'
    }
  },
  titleActive: {
    '&::after': {
      transform: 'translateX(0)'
    }
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  logoContainer: {
    width: '180px'
  },
  navLink: {
    color: theme.palette.light,
    marginLeft: theme.spacing(4),
    position: 'relative',
    textTransform: 'uppercase',
    fontWeight: 500,
    letterSpacing: '0.05em',
    '&:hover': {
      backgroundColor: 'transparent',
      '&::after': {
        transform: 'scaleX(1)'
      }
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2px',
      backgroundColor: theme.palette.light,
      transform: 'scaleX(0)',
      transition: 'transform 0.3s ease',
      transformOrigin: 'left'
    }
  },
  navLinkActive: {
    '&::after': {
      transform: 'scaleX(1)'
    }
  },
  iconsContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    color: theme.palette.light,
    marginRight: theme.spacing(1),
    transition: 'all 0.3s ease'
  },
  iconButton: {
    '&:hover': {
      backgroundColor: 'transparent',
      '& .favoriteIcon': {
        transform: 'scale(1.2)',
        color: '#f06292'
      },
      '& .cartIcon': {
        transform: 'scale(1.2) rotate(5deg)'
      }
    }
  },
  badge: {
    '& .MuiBadge-badge': {
      right: 2,
      top: 0,
      padding: '0 4px',
      minWidth: 18,
      height: 18,
      fontSize: 12
    }
  }
}))

/**
 * Logo component with animated underline effect
 * @param {Object} props
 * @param {boolean} props.isActive - Whether the logo should show active state
 */
function Logo({ isActive }) {
  const classes = useStyles()

  return (
    <div className={classes.logoContainer}>
      <Link
        href="/"
        passHref
      >
        <a>
          <Typography
            variant="h4"
            className={`${classes.title} ${isActive ? classes.titleActive : ''}`}
          >
            SuperShop
          </Typography>
        </a>
      </Link>
    </div>
  )
}

/**
 * Navigation component with shop link and active state styling
 * @param {Object} props
 * @param {boolean} props.isShopActive - Whether the shop link should show active state
 */
function Navigation({ isShopActive }) {
  const classes = useStyles()

  return (
    <Link
      href="/boutique"
      passHref
    >
      <Button
        component="a"
        className={`${classes.navLink} ${isShopActive ? classes.navLinkActive : ''}`}
        disableRipple
      >
        Boutique
      </Button>
    </Link>
  )
}

/**
 * HeaderIcons component displaying cart and wishlist icons with item count badges
 */
function HeaderIcons() {
  const classes = useStyles()
  const { toggleCart } = useUI()
  const { cart } = useCart()
  const { wishlist } = useWishlist()

  const totalItems = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0

  return (
    <div className={classes.iconsContainer}>
      <Link
        href="/wishlist"
        passHref
      >
        <a>
          <IconButton
            size="large"
            className={classes.iconButton}
          >
            <Badge
              badgeContent={wishlist.length}
              color="secondary"
              className={classes.badge}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <FavoriteIcon className={`${classes.icon} favoriteIcon`} />
            </Badge>
          </IconButton>
        </a>
      </Link>
      <IconButton
        onClick={toggleCart}
        size="large"
        className={classes.iconButton}
      >
        <Badge
          badgeContent={totalItems}
          color="secondary"
          className={classes.badge}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <ShoppingBasketIcon className={`${classes.icon} cartIcon`} />
        </Badge>
      </IconButton>
    </div>
  )
}

/**
 * Main Header component with responsive layout and navigation elements
 */
export function Header() {
  const classes = useStyles()
  const router = useRouter()

  const isHomePage = router.pathname === '/'
  const isShopPage = router.pathname.startsWith('/boutique')

  return (
    <AppBar
      position="sticky"
      elevation={0}
    >
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <div className={classes.navContainer}>
            <Logo isActive={isHomePage} />
            <Navigation isShopActive={isShopPage} />
          </div>
          <HeaderIcons />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
