import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { useState } from 'react'

// TODO: write status of each user with uid and load/save functions.
// TODO: make UI

const Mypage = () => {
  const auth = getAuth()
  const [user, setUser] = useState<string>()
  onAuthStateChanged(auth, (user) => {
    if(user) {
      const name = user.displayName
      if (name) setUser(name)
    }
  })

  return (
    <>
    This page is my page.
    <div>
      {user}
    </div>
    </>
  )
}

export default Mypage