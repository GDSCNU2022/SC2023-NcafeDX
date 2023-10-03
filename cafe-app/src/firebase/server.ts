import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase/storage';
if(!getApps()?.length) {
    initializeApp({
        credential: cert(
            JSON.parse(process.env.NEXT_PUBLIC_ACCOUNT_KEY as string)
        ),
    });
}

export const adminDB = getFirestore();
export const adminStorage = getStorage()