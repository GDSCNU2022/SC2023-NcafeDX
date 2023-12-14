import { updateDoc, doc, addDoc, where, collection,
    query, getDocs, setDoc, onSnapshot, deleteDoc, Timestamp } from 'firebase/firestore';

type NewsProps = {
    content: string;
    date: Timestamp;
}
export const getAllNews = async (db: any, setFunc: Function, targetCollection: string) => {
    // Usage
    // getMenus(db, myFunc, 'Restaurant')
    // process: exec myFunc with argument in each document

    const collRef = collection(db, targetCollection);
    const querySnapshot = await getDocs(collRef);
    
    querySnapshot.forEach((doc) => {
        if (doc.exists()) {
            setFunc(doc);
        } else {
        } 
    })
}

export const newNews = async (db: any, targetCollection: string, saveNews: NewsProps) => {
    /* Usage
    newMenu(db, restaurantName, menuObject)
    */
    const getDate = Timestamp.now();
    const saveObj = {
        ...saveNews,
    }
    // update date
    saveObj.date = getDate;

    const collRef = collection(db, targetCollection);
    await addDoc(collRef, saveObj);
}

export const updateNewsWithDate = async (db: any, targetCollection: string, updateNews: {title: string, content: string, date: Timestamp}) => {
    const getDate = updateNews.date;
    const saveObj = {
        ...updateNews,
        date: Timestamp.now()
    }
    const q = query(collection(db, targetCollection), where('date', '==', getDate));
    const docSnap = await getDocs(q);

    docSnap.forEach((d) => {
        if(d.exists()) {
            const docRef = doc(db, targetCollection, d.id);
            updateDoc(docRef, saveObj);
        } else {
        }
    })
}

export const deleteNews = async (db: any, targetCollection: string, docID: any) => {
    const docRef = doc(db, targetCollection, docID);
    deleteDoc(docRef);
}

export const deleteNewsWithDate = async (db: any, targetRestaurant: string, newsDate: string) => {
    const collRef = collection(db, targetRestaurant);
    const q = query(collRef, where('date', '==', newsDate));
    const docSnap = await getDocs(q);
    let newData: any;

    // docSnap は要素1, 条件検索のためqueryを使用
    docSnap.forEach((d) => {
        if (d.exists()) {
            const docRef = doc(db, targetRestaurant, d.id);
            deleteDoc(docRef);
        } else {
        } 
    })
}

export const listenNews = (db: any, setFunc: Function, targetCollection: string) => {
    const q = query(collection(db, targetCollection));
    // インスタンスの保持が必要
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setFunc(doc);
        })
    
    return unsubscribe;
})}