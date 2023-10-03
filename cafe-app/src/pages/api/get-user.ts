import { doc, updateDoc, setDoc, addDoc, where, collection, query, getDocs, getDoc } from 'firebase/firestore';


type BoolDay = {
    morning: boolean;
    day: boolean;
    night: boolean;
}
type VotedCategory = {
    teishoku: boolean;
    noodle: boolean;
    don: boolean;
    curry: boolean;
}

export type UserProps = {
    uid: string;
    points: number;
    couponID: string[];
    boolDay: boolean[];
    votedCategoryPerDay: boolean[];
}

export const checkUser: any = async(db: any, uid: string) => {
    const collRef = collection(db, 'Users');
    const q = query(collRef, where('uid', '==', uid));
    const docSnap = await getDocs(q);

    docSnap.forEach((doc) => {
        if (doc.exists()) {
            console.log("user was found")
            return true
        } else {
            console.log("No such document.");
            return false
        } 
    })

}

export const getUser: any = async(db: any, uid: string, setFunc: Function) => {
    /* Usage
    getUser(db, uid).then((value) => {your processing})
    */
    const docRef = doc(db, 'Users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data()){
        setFunc(docSnap.data())
    } else {
        console.log("No such document.");
    }
}

export const newUser = async (db: any, uid:string, saveUser: UserProps) => {
    /* Usage
    newMenu(db, uid, userObject)
    */
    const _saveUser = saveUser
    const d = doc(db, 'Users', uid)
    await setDoc(d, _saveUser);
    console.log(`Document uploaded at ${uid}`)
}

export const updateUser = async(db: any, userMail: string, newUserProps: UserProps) => {
    /* Usage
    updateMenu(db, user{stars: 4.5});
    */
    const newUser = newUserProps
    const collRef = collection(db, 'Users');
    try{
    const q = query(collRef, where('mail', '==', userMail));
    const docSnap = await getDocs(q);

    // docSnap は要素1, 条件検索のためqueryを使用
    docSnap.forEach((d) => {
        if (d.exists()) {
            const docRef = doc(db, 'User', d.id);
            updateDoc(docRef, newUser);
            console.log("Document data:", d.data());
        } else {
            console.log("No such document.");
        } 
    })

    } catch (error) {
        console.log("That User doesn't exist.");
    }

}