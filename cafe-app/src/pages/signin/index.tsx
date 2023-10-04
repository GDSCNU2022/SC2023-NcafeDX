import {
        getAuth,
        signInWithEmailAndPassword, 
        signOut, 
        signInWithRedirect,
        getRedirectResult,
        GoogleAuthProvider,
        onAuthStateChanged,
        } from 'firebase/auth'
import { NextPage } from 'next'
import { FC, useState, useEffect } from 'react'
import { FirebaseError } from 'firebase/app'
import router from 'next/router'
import { useForm } from 'react-hook-form'
import { LoginForm } from '@src/features/common/types'
import { auth, provider } from '@src/firebase/client'

export const GoogleLogin = () => {
  const _provider = provider
  const _auth = auth

  // Google login
  const clicklogin = () => {
    signInWithRedirect(_auth, _provider)
    getRedirectResult(_auth)
    .then((result) => {
      console.log(result)
      if(result !== null){
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential ? credential.accessToken : null
        console.log(token)

        // signed-in user info.
        const user = result.user
        console.log(user)
        console.log(user.uid)
        router.push('/MyPage')
      }
    }).catch((err) => {
      console.error(err)
      // error handlings
      const errorCode = err.code
      const errorMessage = err.message
      const email = err.email
      console.error(errorCode)
      console.error(errorMessage)
      console.error(email)
    })
}
  return (
    <>
    <button onClick={() => clicklogin()}>Googleログイン</button>
    </>  )
}

export const SignIn: FC<NextPage> = () => {
  const [error, setError] = useState('')
  const _auth = auth

  useEffect(() => {
    checkLogin()
  }, [])

  const isValid = async (data: LoginForm) => {
    try {
      await signInWithEmailAndPassword(_auth, data.email, data.password)
      router.push('/MyPage')
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
        if (e.code === 'auth/invalid-email') {
          setError('メールアドレスがまちがっています')
        } else if (e.code === 'auth/user-disabled') {
          setError('指定されたメールアドレスのユーザーは無効です')
        } else if (e.code === 'auth/user-not-found') {
          setError('指定されたメールアドレスにユーザーが見つかりません')
        } else if (e.code === 'auth/wrong-password') {
          setError('パスワードがまちがっています')
      }
      }
    }
  }

  const checkLogin = () => {
  onAuthStateChanged(_auth, (user) => {
    if (user) {
      const uid = user.uid
      const email = user.email
      console.log(uid)
      console.log(email)
      router.push('/MyPage')
    } else {
      console.log("signed out")
    }
  })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()
  return (
    <>
      <div className='flex'>
        <div className='mx-auto flex w-full flex-col items-center md:w-3/5 lg:w-2/3'>
          <h1 className='my-10 text-2xl font-bold '> ログイン </h1>
          <form className='mt-2 flex w-8/12 flex-col lg:w-1/2' onSubmit={handleSubmit(isValid)}>
            <div className='mb-4'>
              <label className='mb-1 block'>メールアドレス</label>
              <input
                className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm 
                focus:border-sky-300 focus:outline-none focus:ring focus:ring-sky-200  disabled:bg-gray-100'
                {...register('email', { required: 'メールアドレスを入力してください' })}
                placeholder='your@email.com'
                type={'email'}
              />
              <div className='mt-1 text-sm text-red-300'>{errors.email?.message}</div>
            </div>
            <div className='mb-4'>
              <label className='mb-1 block'>パスワード</label>
              <input
                className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 
                shadow-sm focus:border-sky-300 focus:outline-none focus:ring focus:ring-sky-200  disabled:bg-gray-100'
                {...register('password', {
                  required: 'パスワードを入力してください',
                  minLength: { value: 6, message: '6文字以上入力してください' },
                })}
                placeholder='Password'
                type={'password'}
              />
              <div className='mt-1 text-sm text-red-300'>{errors.password?.message}</div>
            </div>
            <div className='mb-6'>
              <button
                className='mt-4 w-full rounded bg-pink-400 py-4 text-center font-sans 
                text-xl font-bold leading-tight md:px-12 md:py-4 md:text-base text-white'
                type='submit'
              >
                ログインする
              </button>
            </div>
          </form>
          
          <GoogleLogin/>
          
          <button className='mt-4 w-full text-center' onClick={() => router.push('/signup')}>
            新規登録はこちら
          </button>
          <div className='mt-1 text-sm text-red-300'>{error ? <>{error}</> : <></>}</div>
        </div>
      </div>
    </>
  )
}
export default SignIn

export const logOut = async () => {
  const _auth = auth
  await signOut(_auth)
    .then(() => {
      router.push('/signin')
    })
    .catch((e) => {
      alert('ログアウトに失敗しました')
      console.log(e)
    })
}