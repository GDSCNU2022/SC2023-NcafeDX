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
            console.log("Document data:", doc.data());
            setFunc(doc);
        } else {
            console.log("No such document.");
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
        date: getDate,
    }
    const collRef = collection(db, targetCollection);
    await addDoc(collRef, saveObj);
    console.log(`Document uploaded at ${collRef.id}`);
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
            console.log("Document data:", d.data());
        } else {
            console.log("No such document.");
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
        console.log(`Current Document in News Called`);
    }, (error) => { console.log(`Errors founded: ${error}`)})
    
    return unsubscribe;
}