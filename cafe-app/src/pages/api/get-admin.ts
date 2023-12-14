import { updateDoc, doc, addDoc, where, collection,
    query, getDocs, setDoc, onSnapshot, deleteDoc } from 'firebase/firestore';

type NewsProps = {
    text: string;
}
export const getAllNews = async (db: any, setFunc: Function) => {
    // Usage
    // getMenu(db, 'Restaurant/Menu').then((value) => {your processing}).catch().finally()
    // return Promise type
    const collRef = collection(db, "News");
    const q = query(collRef);
    const docSnap = await getDocs(q); 
    let newData: any;

    // docSnap は要素1, 条件検索のためqueryを使用
    docSnap.forEach((doc) => {
        if (doc.exists()) {
            setFunc(doc.data());
        } else {
        } 
    })

}

export const newNews = async (db: any, saveMenu: NewsProps) => {
    /* Usage
    newMenu(db, restaurantName, menuObject)
    */
    const collRef = collection(db, "News");
    await addDoc(collRef, saveMenu);
}

export const deleteNews = async (db: any, targetMenuName: string) => {
    const collRef = collection(db, "News");
    const q = query(collRef, where('name', '==', targetMenuName));
    const docSnap = await getDocs(q);
    docSnap.forEach((d) => {
        if(d.exists()) {
            const docRef = doc(db, "News", d.id);
            deleteDoc(docRef);
        } else {
        }
    })
}

export const listenNews = (db: any, setFunc: Function) => {
    const q = query(collection(db, "News"));
    // インスタンスの保持が必要
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setFunc(doc);
        })
    
    return unsubscribe;
}