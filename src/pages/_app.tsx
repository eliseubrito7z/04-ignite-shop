import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { ShopContextProvider } from '../context/ShopContext'
import { globalStyles } from '../styles/global'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShopContextProvider>
      <Header />
      <Component {...pageProps} />
    </ShopContextProvider>
  )
}
