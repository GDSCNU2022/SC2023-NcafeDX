import { doc, updateDoc, addDoc, where, collection, query, getDocs } from 'firebase/firestore'
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
}

export const newUser = async (db: any, targetRestaurant: string, saveMenu: MenuProps) => {
    /* Usage
    newMenu(db, restaurantName, menuObject)
    */
    const collRef = collection(db, targetRestaurant)
    await addDoc(collRef, saveMenu);
    console.log(`Document uploaded at ${collRef.id}`)
}

export const updateUser = async(db: any, targetPath: string, newMenuProps: MenuProps) => {
    /* Usage
    updateMenu(db, 'DaVinch/shiru-nashi-tantan', {stars: 4.5});
    */
    
    const path: string = targetPath;
    const pathArr: string[] = path.split('/');
    const lenArr: number = pathArr.length;
    const collRef = collection(db, pathArr[0]);
    const q = query(collRef, where('name', '==', pathArr[1]));
    const docSnap = await getDocs(q);
    let newData: any;

    // docSnap は要素1, 条件検索のためqueryを使用
    docSnap.forEach((d) => {
        if (d.exists()) {
            const docRef = doc(db, pathArr[0], d.id);
            updateDoc(docRef, newMenuProps);
            console.log("Document data:", d.data());
        } else {
            console.log("No such document.");
        } 
    })
}