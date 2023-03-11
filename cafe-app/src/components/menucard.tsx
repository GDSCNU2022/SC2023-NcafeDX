import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase/client';
import _MenuCard from './_menucard';
import { getMenu, MenuProps } from './get-menu';
// Data Structure
// Collection{DaVinch}/Doc{Menu}/Collection{Teishoku, Noodle, Don}/Doc{MenuName}/Field{MenuProps}
// Users/

// テスト用オブジェクト
const menuTestProps: MenuProps = {
    name: "demo taro",
    category: "noodle",
    nutrition: {kcal:980, P:50, F:50, C:30},
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
        nutrition:{},
        imageURL: ""
    }
    const [menus, setMenus] = useState<MenuProps>(initMenuProps);
    const dataPath: string = "DaVinch/shiru-nashi-tantan";
    
    // ignite when mounted
    useEffect(() => {
        getMenu(db, dataPath).then((value: any) => setMenus(value));
    }, []);
    return (<_MenuCard menuObject={menus}></_MenuCard>);
};

export default MenuCard;