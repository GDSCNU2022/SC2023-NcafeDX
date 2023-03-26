import { doc, updateDoc, addDoc, where, collection, query, getDocs } from 'firebase/firestore';


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
    name: string;
    mail: string;
    points: number;
    couponID: string;
    boolDay: BoolDay;
    votedCategory: VotedCategory;
}
export const getUser: any = async(db: any, targetPath: string) => {
    /* Usage
    getUser(db, 'example@gmail.com').then((value) => {your processing})
    */
    const path: string = targetPath;
    const pathArr: string[] = path.split('/');
    const lenArr: number = pathArr.length;
    const collRef = collection(db, 'Users');
    try {
    const q = query(collRef, where('mail', '==', pathArr[0]));
    const docSnap = await getDocs(q);
    let newData: any;

    // docSnap は要素1, 条件検索のためqueryを使用
    docSnap.forEach((doc) => {
        if (doc.exists()) {
            console.log("Document data:", doc.data());
            newData = doc.data();
        } else {
            console.log("No such document.");
        } 
    })
    return newData;
    } catch (error) {
        console.log("That User doesn't exist.");
    }
}

export const newUser = async (db: any, saveUser: UserProps) => {
    /* Usage
    newMenu(db, userObject)
    */
    const collRef = collection(db, 'Users')
    await addDoc(collRef, saveUser);
    console.log(`Document uploaded at ${collRef.id}`)
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