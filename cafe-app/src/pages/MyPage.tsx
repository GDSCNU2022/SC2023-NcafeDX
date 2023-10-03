import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { db } from '@src/firebase/client'
import { useState, useEffect } from 'react'
import { checkUser, getUser, newUser, UserProps } from '@src/pages/api/get-user'
import { doc, getDoc } from '@firebase/firestore'
import GlobalNavBar from '@src/components/User/GlobalNavBar'
// TODO: write status of each user with uid and load/save functions.
// TODO: make UI

const Mypage = () => {
  const auth = getAuth()
  const initInfo: UserProps = {
    uid: '',
    points: 0, 
    couponID: [], 
    boolDay: [false, false, false], 
    votedCategoryPerDay: [false, false, false, false]}
  const [user, setUser] = useState<any>({displayName: ''})
  const [userInfo, setUserInfo] = useState<UserProps>(initInfo)

  useEffect(() => {
    onAuthStateChanged(auth, (_user) => {
      if (_user) {
        console.log(_user.uid)
        setUser(() => _user)
        updateInfo(_user)
      }
    })

  }, [])

  const updateUser = async (user: any) => {
    //　apiが動かないので応急処置
    const docRef = doc(db, 'Users', user.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists() && docSnap.data()){
      return docSnap.data()
    } else {
        console.log("No such document.");
    }
  }

  const updateInfo = (user:any) => {
    updateUser(user).then((data) => {
      console.log(data)
      setUserInfo(data as UserProps)

      // make new user documents
      if (!data){
      const boolDay = [false, false, false]
      const votedCategoryPerDay = [false, false, false, false]
      const newObj: UserProps = {
        uid: user.uid,
        points: 0,
        couponID:[],
        boolDay: boolDay,
        votedCategoryPerDay: votedCategoryPerDay
      }
      if (newObj != undefined){
        newUser(db, user.uid, newObj)
        console.log("New user has been added")
      }
      // setUserInfo(() => newObj)

      } 

    })
    }

    console.log(`in updateInfo`)
    console.log(userInfo)

  return (
    <>
    <GlobalNavBar/>
    <div>
      こんにちは {user.displayName} さん
      <div>
        {userInfo.points}pt
      </div>
      <div>
        クーポン{userInfo.couponID}
      </div>
      <div>
        今日の投稿{userInfo.boolDay}
      </div>
      <div>
        今日の投稿（カテゴリ別）{userInfo.votedCategoryPerDay}
      </div>
    </div>
    </>
  )
}

export default Mypage