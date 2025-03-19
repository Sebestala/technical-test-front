import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@mui/styles'
import { theme } from '@theme/theme'

/**
 * Custom Document component for Next.js
 * Handles server-side rendering of Material-UI styles
 */
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={theme.palette.primary.main}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

/**
 * Inject server-side rendered styles into the initial HTML
 */
MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
  }
}
