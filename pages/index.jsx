import { Button, Container, Typography, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Link from 'next/link'
import { BlissimCard } from '@components/common/BlissimCard'

/**
 * Styles for the home page components
 */
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5)
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(5)
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(5)
  },
  shopButton: {
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 500,
    padding: theme.spacing(1, 3),
    borderRadius: 4,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }
}))

/**
 * Button component that links to the shop page
 */
function ShopButton() {
  const classes = useStyles()
  return (
    <Link
      href="/boutique"
      passHref
    >
      <Button
        variant="contained"
        className={classes.shopButton}
        component="a"
        size="large"
      >
        LA BOUTIQUE
      </Button>
    </Link>
  )
}

/**
 * Home page component displaying the landing page with shop access
 */
export default function Home() {
  const classes = useStyles()

  return (
    <Container
      maxWidth="lg"
      className={classes.root}
    >
      <Typography
        component="h1"
        variant="h2"
        className={classes.title}
      >
        SuperShop
      </Typography>

      <Box className={classes.content}>
        <BlissimCard />
        <ShopButton />
      </Box>
    </Container>
  )
}
