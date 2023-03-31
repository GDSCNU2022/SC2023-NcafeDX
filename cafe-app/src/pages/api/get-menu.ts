import { updateDoc, doc, addDoc, where, collection,
    query, getDocs, setDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import shortid from 'shortid';

export const categories = [
    { nameid: "teishoku", href: "/teishoku",name: "定食" },
    { nameid: "don"     , href: "/don"     ,name: "丼" },
    { nameid: "noodle"  , href: "/noodle"  ,name: "麺類" },
    { nameid: "curry"   , href: "/curry"   ,name: "カレー" },
  ];
  
export type Nutrition = {
    kcal: number;
    P: number;
    F: number;
    C: number;
}
export type MenuProps = {
    name: string;
    id: string;
    category: string;
    nutrition: Nutrition;
    price: number;
    starStorage: number[];
    stars? : number | null;
    imageURL?: string | null;
}

export type RestaurantType = "DaVinch" | "Faraday" | "Pascal";

export const getMenu: any = async (db: any, targetPath: string) => {
    // Usage
    // getMenu(db, 'Restaurant/MenuName').then((value) => {your processing}).catch().finally()
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

export const getAllMenus: any = async (db: any, setFunc: Function, restaurantName: string) => {
    // Usage
    // getMenus(db, myFunc, 'Restaurant')
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
export const getMenusInCategory: any = async (db: any, setFunc: Function, targetPath: string) => {
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
    const initId = shortid.generate();
    const docRef = doc(db, targetRestaurant, initId);
    const saveObj = {
        ...saveMenu,
        id: initId,
    }
    await setDoc(docRef, saveObj);
}

export const updateMenu = (db: any, targetPath: string, newMenuProps: MenuProps) => {
    /* Usage
    updateMenu(db, 'DaVinch/docId', {stars: 4.5});
    */
    
    const path: string = targetPath;
    const pathArr: string[] = path.split('/');
    const docRef = doc(db, pathArr[0], pathArr[1]);
    updateDoc(docRef, newMenuProps);
}

export const deleteMenuWithID = (db: any, targetRestaurant: string, docID: any) => {
    // フォームから追加した直後の要素はID不明
    const docRef = doc(db, targetRestaurant, docID);
    deleteDoc(docRef);
}

export const deleteMenuWithName = async (db: any, targetRestaurant: string, menuName: string) => {
    const collRef = collection(db, targetRestaurant);
    const q = query(collRef, where('name', '==', menuName));
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

export const listenMenus = (db: any, setFunc: Function,targetRestaurant: string) => {
    const q = query(collection(db, targetRestaurant));
    // インスタンスの保持が必要
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setFunc(doc);
        })
        console.log(`Current Document in ${targetRestaurant} Called`);
    }, (error) => { console.log(`Errors founded: ${error}`)})
    
    return unsubscribe;
}

export const listenMenusChange = (db: any, targetRestaurant: string) => {
    const q = query(collection(db, targetRestaurant));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                console.log("New Data: ", change.doc.data());
            }
            if (change.type === "modified") {
                console.log("Modified Data: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed Data: ", change.doc.data());
            }
        });
        console.log(`Current Document in ${targetRestaurant} Called`);
    }, (error) => { console.log(`Errors founded: ${error}`)});

    return unsubscribe;
}

export const detachMenu = (db: any, targetRestaurant: string) => {
    const unsubscribe = onSnapshot(collection(db, targetRestaurant), () => {
        // Respond to data
        // ...
    })
    console.log(`Detached Menus in ${targetRestaurant}`);

    return unsubscribe;
}

