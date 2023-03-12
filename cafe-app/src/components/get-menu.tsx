import { updateDoc, doc, addDoc, where, collection, query, getDocs, setDoc } from 'firebase/firestore';
import _MenuCard from './_menucard';

export type MenuProps = {
    name: string;
    category: string;
    nutrition: any;
    price: number;
    stars : number;
    imageURL?: string;
}

export type RestaurantType = "DaVinch" | "Faraday" | "Pascal";

export const getMenu: any = async (db: any, targetPath: string) => {
    // Usage
    // getMenu(db, 'Restaurant/Menu').then((value) => {your processing}).catch().finally()
    // return Promise type
    const path: string = targetPath;
    const pathArr: string[] = path.split('/');
    const collRef = collection(db, pathArr[0]);
    const q = query(collRef, where('name', '==', pathArr[1]));
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

export const getAllMenus: any = async (db: any,setFunc: Function, restaurantName: string) => {
    // Usage
    // getMenusInCategory(db, myFunc, 'Restaurant')
    // process: exec myFunc with argument in each document

    const collRef = collection(db, restaurantName);
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

// Collection{DaVinch}/Doc{Menus}/Field{MenuProps}
export const getMenusInCategory: any = async (db: any,setFunc: Function, targetPath: string) => {
    // Usage
    // getMenusInCategory(db, myFunc, 'Restaurant/Category')
    // process: exec myFunc with argument in each document
    
    const path: string = targetPath;
    const pathArr: string[] = path.split('/');
    const lenArr: number = pathArr.length;
    const collRef = collection(db, pathArr[0]);
    const querySnapshot = lenArr >= 3 ?
            await getDocs(query(collRef, where('category','==', pathArr[1])))
            : await getDocs(collRef);
    
    querySnapshot.forEach((doc) => {
        if (doc.exists()) {
            console.log("Document data:", doc.data());
            setFunc(doc);
        } else {
            console.log("No such document.");
        } 
    })
}

export const newMenu = async (db: any, targetRestaurant: string, saveMenu: MenuProps) => {
    /* Usage
    newMenu(db, restaurantName, menuObject)
    */
    const collRef = collection(db, targetRestaurant)
    await addDoc(collRef, saveMenu);
    console.log(`Document uploaded at ${collRef.id}`)
}

export const updateMenu = async(db: any, targetPath: string, newMenuProps: MenuProps) => {
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


