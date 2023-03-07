import {initializeApp, getApps } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = JSON.parse(process.env.FIREBASE_SERVICE_API_KEY as string);

if (!getApps()?.length) {
    initializeApp(firebaseConfig);
}

export const analytics = getAnalytics();
export const db = getFirestore();
export const storage = getStorage();
export const auth = getAuth();
export const functions = getFunctions();

