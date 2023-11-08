import { getAuth, getRedirectResult } from 'firebase/auth'
import { createContext, useEffect, useState, useContext } from 'react'
import { auth } from '@src/firebase/client'

type AuthContextState = {}
type ReactNodeProps = {
  children: React.ReactNode
}
type User = {}

const FirebaseAuthContext = createContext<AuthContextState>({
  currentUser: undefined,
})

// Authentication Provider
const FirebaseAuthProvider = ({ children }: ReactNodeProps) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined)
  const _auth = auth
  useEffect(() => {
  // _auth is possibly null.
  const unsubscribed = _auth.onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user)
    }
    getRedirectResult(_auth)
  })
  return () => {
    unsubscribed()
  }
}, [_auth])
return (
  <FirebaseAuthContext.Provider value={{ currentUser: currentUser}}>
    {children}
  </FirebaseAuthContext.Provider>
)
  }

export { FirebaseAuthContext, FirebaseAuthProvider }
export const userFirebaseAuthContext = () => useContext(FirebaseAuthContext)

