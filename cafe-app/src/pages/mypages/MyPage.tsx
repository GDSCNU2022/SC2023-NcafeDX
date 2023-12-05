import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth'
import { db } from '@src/firebase/client'
import { useState, useEffect } from 'react'
import { checkUser, getUser, newUser, UserProps } from '@src/pages/api/get-user'
import { doc, getDoc } from '@firebase/firestore'
import GlobalNavBar from '@src/components/User/GlobalNavBar'
import MyPageCard from '@src/components/User/mypage/MyPageCard'
import IsVotedTimeCard from '@src/components/User/mypage/IsVotedTimeCard'
import IsVotdeCategoryPerDayCard from '@src/components/User/mypage/IsVotedCategoryPerDayCard'
import { CouponCardProps } from './CouponCard'
import CouponCard from './CouponCard'
import router from 'next/router'

// TODO: funciton to load coupons from database
// TODO: write status of each user with uid and load/save functions.
// TODO: make UI
// TODO: function to submit a review and reflect isVoted per day, and reset them at other day.

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
    console.log("Called Mypage component")
    onAuthStateChanged(auth, (_user) => {
      if (_user) {
        console.log(_user.uid)
        setUser(() => _user)
        updateInfo(_user)
      }
    })
    const cleanUp = () => {clickLogout();}
    // return cleanUp();
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

    const clickLogout = async () => {
    signOut(auth).then(() => {
      console.log("ログアウトしました")
      router.push('/')
    })
    .catch((err) => {
      console.log(`エラーが発生しました (${err})`)
    })
  }

    console.log(`in updateInfo`)
    console.log(userInfo)

    // boolDay: boolean[morning, day, night]
    // votedCategoryPerDay: boolean[teishoku, noodle, don, curry]
    const couponProps: CouponCardProps = {title: "唐揚げ１個無料", couponCode: "AAAABBBBCCCCDDDD", duration: 'yyyy-mm-dd' }

  return (
    <>
    <GlobalNavBar/>
    <div className="text-center">
    <div className="m-10">
      <a className="text-2xl">
        こんにちは
      </a>
      <a className="text-2xl font-bold m-4">
        {user.displayName}
      </a>
      <a className="text-2xl">
        さん
      </a>
    </div>

      <div className="grid grid-cols-3 gap-4 m-4 mb-16">
        <MyPageCard title="ポイント" text={`${userInfo.points} pt`}/>
        <IsVotedTimeCard title="今日の投稿(時間帯)" boolDay={userInfo.boolDay}/>
        <IsVotdeCategoryPerDayCard title="今日の投稿(種類)" isVotedCategoryPerDay={userInfo.votedCategoryPerDay}/>
      </div>
      <a className="text-2xl">所持クーポン</a>
      <div className="grid grid-cols-2 gap-4mb-8 mx-8 bg-white border-4">
        <div className="flex mx-12 my-4">
          <CouponCard title={couponProps.title}
          couponCode={couponProps.couponCode}
          duration={couponProps.duration}/>
        </div>
      </div>
    </div>
    <div className="flex justify-center bg-gray-400 mt-4">
      <button onClick={() => {clickLogout()}}>ログアウト</button>
    </div>
    </>
  )
}

export default Mypage