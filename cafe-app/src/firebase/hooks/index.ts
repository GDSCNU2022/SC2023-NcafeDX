import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import router from 'next/router'
import { auth } from '@src/firebase/client'

export const signIn = () => {
  const _auth = auth
  const unsubscribed = _auth.onAuthStateChanged(async (user) => {
    if (user === null) {
      await router.push('/signin')
    }
    unsubscribed()
  })
}