import { where, collection, query, getDocs } from 'firebase/firestore';
import _MenuCard from './_menucard';

export type MenuProps = {
    name: string;
    category: string;
    nutrition: any;
    price: number;
    stars : number;
    imageURL?: string;
}

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
    console.log("newData");
    console.log(newData);
    return newData;
}
// Collection{DaVinch}/Doc{Menus}/Field{MenuProps}
export const getMenusInCategory: any = async (db: any,setFunc: Function, targetPath: string) => {
    // Usage
    // getMenusInCategory(db, myFunc(doc), 'Restaurant/Category').then().catch().finally()
    
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

