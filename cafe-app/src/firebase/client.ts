import {initializeApp, getApps } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_API_KEY as string);

if (!getApps()?.length) {
    initializeApp(firebaseConfig);
}

export const analytics = 
    process.env.NODE_ENV === "production" && typeof window !== "undefined"
    ? getAnalytics()
    : undefined;

export const db = getFirestore();
export const storage = getStorage();
export const auth = getAuth();
export const functions = getFunctions();
export const provider = new GoogleAuthProvider();

