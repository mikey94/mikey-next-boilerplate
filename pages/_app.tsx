import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Helmet } from 'react-helmet'
import App from 'next/app'

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props
    const title = "Hello Buwa!"
    return (
      <>
      <Helmet>
        <title>{title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta property='og:title' content={title} />
      </Helmet>
      <Component router={router} {...pageProps} />
      </>
    )
  }
}

export default MyApp
