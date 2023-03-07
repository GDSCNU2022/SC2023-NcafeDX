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

type Nutritions = [number, number, number, number];

export type MenuProps = {
    name: string;
    nutrition: Nutritions;
    price: number;
    stars : number;
    imageURL?: string;
}


const menuTestProps: MenuProps = {
    name: "demo taro",
    nutrition: [980, 50, 50, 30],
    price: 430,
    stars: 4.5,
    imageURL: "Image/Path/To/Storage"
}

const MenuCard = () => {
    const [menus, setMenus] = useState<MenuProps>(menuTestProps);
    const targetRestaurant = 'DaVinch'

    useEffect(() => {
        (async() => {
            const docRef = doc(db, targetRestaurant, 'Menu', 'Noodle', 'siru-nashi-tantan');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setMenus(docSnap.data() as MenuProps);
            } else {
                console.log("No such document.");
            }
        })
        
    }, []);
    console.log(menus);
    return (<_MenuCard props={menus}></_MenuCard>);
    
};

export default MenuCard;