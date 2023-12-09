import { auth } from '@src/firebase/client';
import { sendPasswordResetEmail, sendEmailVerification, updateEmail } from 'firebase/auth';

export const submitPasswordResetEmail = async (email: string) => {
  const actionCodeSettings = {
    // redirect URL
    url: "http://localhost:3000/signin",
    handleCodeInApp: false,
  };

  await auth;
    sendPasswordResetEmail(auth, email)
    .then((resp) => {
      // succeed
    })
    .catch((e) => {
      // failure
      console.log(e);
    });
};

export const sendEmailToCheck = async () => {
  await auth;
    sendEmailVerification(auth.currentUser)
    .then(() => {
      // succeed
    }).catch((e) => {
      // failure
      console.log(e);
    })
};

export const setNewEmail = async () => {
  await auth;
    updateEmail(auth.currentUser, auth.currentUser.email)
    .then(() => {
      // succeed
    }).catch((e) => {
      // failure
      console.log(e)
    })
};