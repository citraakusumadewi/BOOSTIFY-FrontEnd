import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Coba from './coba'
import { AuthProvider } from '../components/context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
