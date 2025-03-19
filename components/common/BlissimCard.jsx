import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

/**
 * Styles for the BlissimCard component
 * Includes responsive image handling for mobile and desktop views
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto'
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain'
  },
  [theme.breakpoints.down('md')]: {
    desktopImage: {
      display: 'none'
    }
  },
  [theme.breakpoints.up('md')]: {
    mobileImage: {
      display: 'none'
    }
  }
}))

/**
 * BlissimCard component displays responsive product images
 * Shows different images for mobile and desktop viewports
 */
export function BlissimCard() {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <img
        src="/static/images/card-component-mobile.png"
        alt="Blissim Box Mobile"
        className={`${classes.image} ${classes.mobileImage}`}
        loading="lazy"
      />
      <img
        src="/static/images/card-component.png"
        alt="Blissim Box Desktop"
        className={`${classes.image} ${classes.desktopImage}`}
        loading="lazy"
      />
    </Box>
  )
}
