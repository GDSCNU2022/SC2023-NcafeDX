import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase/client';
import { doc, collection, getDoc } from 'firebase/firestore';
import _MenuCard from './_menucard';
// Data Structure
// Collection{DaVinch}/Doc{Menu}/Collection{Teishoku, Noodle, Don}/Doc{MenuName}/Field{MenuProps}
// Users/

type Menus = {
    category: string
};

export type MenuProps = {
    name: string;
    category: string;
    nutrition: any;
    price: number;
    stars : number;
    imageURL?: string;
}

const menuTestProps: MenuProps = {
    name: "demo taro",
    category: "noodle",
    nutrition: [980, 50, 50, 30],
    price: 430,
    stars: 4.5,
    imageURL: "Image/Path/To/Storage"
}

const MenuCard = () => {
    const initMenuProps: MenuProps = {
        name: "",
        category: "",
        price: 0,
        stars: 0,
        nutrition:[],
        imageURL: ""
    }
    const [menus, setMenus] = useState<MenuProps>(initMenuProps);
    const targetRestaurant = 'DaVinch'
    
    // TODO:複数クエリに対応させる
    useEffect(() => {
        const get = async() => {
            const docRef = doc(db, targetRestaurant, 'rBj68cXpZ8ZkgepqrbT6');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                const newData = docSnap.data()
                // setMenus((menus) => docSnap.data() as MenuProps);
                setMenus(newData as MenuProps);
            } else {
                console.log("No such document.");
            }
        }
        get();
    }, []);
    return (<_MenuCard menuObject={menus}></_MenuCard>);
    
};

export default MenuCard;