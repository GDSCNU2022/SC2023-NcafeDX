import { useState, useEffect } from 'react';
import { db } from '../../../firebase/client';
import { getMenu, MenuProps } from '../../pages/api/get-menu';
import Image from 'next/image';
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

const MenuCard = (props: any) => {
    const [menus, setMenus] = useState<MenuProps>();
    
    // ignite when mounted
    useEffect(() => {
        getMenu(db, props.props).then((value: any) => {
            setMenus(() => value);
            
        });
    }, []);
    return (
        <div className="bg-gray-400">
            <div>
            登録済みのメニュー情報は以下です
            {menus ? (
                <ul>
                    <li>name: {menus.name}</li>
                    <li>category: {menus.category}</li>
                    <li>price: {menus.price}</li>
                    <li>stars: {menus?.stars}</li>
                    <li>kcal: {menus.nutrition?.kcal}</li>
                    <li>P: {menus.nutrition?.P}</li>
                    <li>F: {menus.nutrition?.F}</li>
                    <li>C: {menus.nutrition?.C}</li>
                    <li>imageURL: {menus.imageURL}</li>
                </ul>)
                : (<div>No Props</div>)}
        </div>
        {menus && menus.imageURL ?  <img src={menus.imageURL as string} width={64} height={64} alt=""/> : <></>}

        </div>

    );
};

export default MenuCard;