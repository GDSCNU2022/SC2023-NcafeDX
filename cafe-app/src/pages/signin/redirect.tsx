import { useEffect, useState } from 'react';
import {
        getAuth,
        signInWithEmailAndPassword, 
        signOut, 
        signInWithRedirect,
        getRedirectResult,
        GoogleAuthProvider,
        onAuthStateChanged,
        } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import router from 'next/router'
import { auth, provider } from '@src/firebase/client'

const Redirect = () => {

  const _provider = provider
  const _auth = auth

  // Google login
  const clickLogin = () => {
    signInWithRedirect(_auth, _provider)
    getRedirectResult(_auth)
    .then((result) => {
      if(result){

        // signed-in user info.
        const user = result.user;
        user.getIdTokenResult(true)
          .then((idTokenResult) => {
          if(idTokenResult.claims.admin) {
            router.push('/adminpages/AdminTop');
          } else {
            router.push('/');
          }
          }).catch((e) => {
            router.push('/signin')
          })
        }

    }).catch((err) => {
      // error handlings
      const errorCode = err.code
      const errorMessage = err.message
      const email = err.email
      router.push('/singin');
    })
}

  const checkLogin = () => {
  onAuthStateChanged(_auth, (user) => {
    if (user) {
      const uid = user.uid
      const email = user.email
      user.getIdTokenResult(true).then((idTokenResult) => {
        if(idTokenResult.claims.admin) {
          router.push('/adminpages/AdminTop');
        } else {
          router.push('/');
        }
      })
    } else {
      clickLogin()
    }
  })
  }
  useEffect(() => {
    checkLogin()
  }, []);

  return (
    <>
    </>
  )
};

export default Redirect; 