import '@src/styles/globals.css'
import type { AppProps } from 'next/app'
import { FirebaseAuthProvider } from '@src/firebase/auth'
import { getAuth } from '@firebase/auth'
import { signIn } from '@src/firebase/hooks'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const auth = getAuth()
  useEffect(() => {
    signIn()
  }, [auth])
  
  
  return (
  <FirebaseAuthProvider>
  <Component {...pageProps} />
  </FirebaseAuthProvider>
  )
}
