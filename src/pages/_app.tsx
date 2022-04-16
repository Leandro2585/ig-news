import { SessionProvider } from 'next-auth/react'
import { Header } from '../application/components/header'
import '../application/styles/global.scss'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header/>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
