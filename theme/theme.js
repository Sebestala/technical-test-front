import { createTheme } from '@mui/material/styles'

const colors = {
  navy: '#283149',
  slate: '#404b69',
  teal: '#00818a',
  ice: '#dbedf3'
}

const typography = {
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif'
  ].join(',')
}

const shape = {
  borderRadius: 8
}

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.navy
    },
    secondary: {
      main: colors.slate
    },
    accent: colors.teal,
    light: colors.ice,
    background: {
      default: '#fff',
      paper: '#fff'
    }
  },
  typography,
  shape,
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.navy
        }
      }
    }
  }
})

// Colors
// #283149
// #404b69
// #00818a
// #dbedf3
