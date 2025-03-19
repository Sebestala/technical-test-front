import '../styles/globals.css'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { theme } from '@theme/theme'
import { AppProviders } from '@context'
import { Layout } from '@components/features/layout/Layout'

/**
 * Main application component that wraps the entire app
 * Provides theme, global styles, and context providers
 * @param {Object} props
 * @param {React.Component} props.Component - Page component to render
 * @param {Object} props.pageProps - Props to pass to the page
 */
export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProviders>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProviders>
    </ThemeProvider>
  )
}
