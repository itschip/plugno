import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import AppHeader from '../features/header/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <AppHeader>
        <Component {...pageProps} />
      </AppHeader>
    </MantineProvider>
  )
}

export default MyApp
