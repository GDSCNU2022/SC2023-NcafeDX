import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth'
import { auth } from '@src/firebase/client'
import { NextPage } from 'next'
import { FC } from 'react'
import { FirebaseError } from 'firebase/app'
import router from 'next/router'
import { useForm } from 'react-hook-form'
import { LoginForm } from '@src/features/common/types'
import { useState } from 'react'

export const SignUp: FC<NextPage> = () => {
  const [error, setError] = useState('')
  
  const isValid = async (data: LoginForm) => {
    try {
      const _auth = auth
      const userCredential = await createUserWithEmailAndPassword(_auth, data.email, data.password)
      updateProfile(userCredential.user, {
        displayName: data.username,
      })
      await sendEmailVerification(userCredential.user)
      // route mypage after login
      router.push('/mypages/MyPage')
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
        if(e.code === 'auth/invalid-email') {
          setError('メールアドレスが間違っています')
        } else if (e.code === 'auth/user-disabled') {
          setError('指定されたメールアドレスは無効です')
        } else if (e.code === 'auth/user-not-found') {
          setError('指定されたメールアドレスが見つかりません')
        } else if (e.code === 'auth/wrong-password') {
          setError('パスワードが間違っています')
        }
      }
    }
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
          <h1 className='my-10 text-2xl font-bold'> 新規登録 </h1>
          <form className='mt-2 flex w-8/12 flex-col lg:w-1/2' onSubmit={handleSubmit(isValid)}>
            <div className='mb-4'>
              <label className='mb-1 block'>ユーザー名</label>
              <input
                className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 
                shadow-sm focus:border-sky-300 focus:outline-none focus:ring focus:ring-sky-200
                disabled:bg-gray-100'
                {...register('username', { required: 'ユーザー名を入力してください' })}
                placeholder='User Name'
                type='text'
              />
              <div className='mt-1 text-sm text-red-300'>{errors.username?.message}</div>
            </div>
            <div className='mb-4'>
              <label className='mb-1 block'>メールアドレス</label>
              <input
                className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 
                shadow-sm focus:border-sky-300 focus:outline-none focus:ring focus:ring-sky-200  disabled:bg-gray-100'
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
                className='mt-4 w-full rounded bg-sky-200 py-4 text-center font-sans text-xl 
                font-bold leading-tight text-white md:px-12 md:py-4 md:text-base'
                type='submit'
              >
                新規登録
              </button>
            </div>
          </form>
          <button className='mt-4 w-full text-center' onClick={() => router.push('/signin')}>
            ログインの方はこちら
          </button>
            <div className='mt-1 text-sm text-red-300'>{error ? <>{error}</> : <></>}</div>
        </div>
      </div>
    </>
  )
}
export default SignUp

export const signIn = () => {
  const _auth = auth
  const unsubscribed = _auth.onAuthStateChanged(async (user) => {
    if (user === null) {
      await router.push('/signin')
    }
    unsubscribed()
  })
}