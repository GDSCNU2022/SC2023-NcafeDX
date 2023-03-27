import { updateDoc, doc, addDoc, where, collection,
    query, getDocs, setDoc, onSnapshot, deleteDoc } from 'firebase/firestore';

export type Nutrition = {
    kcal: number;
    P: number;
    F: number;
    C: number;
}
export type MenuProps = {
    name: string;
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
    const collRef = collection(db, targetRestaurant);
    await addDoc(collRef, saveMenu);
    console.log(`Document uploaded at ${collRef.id}`);
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

