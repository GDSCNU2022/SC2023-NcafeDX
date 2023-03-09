import { MenuProps } from './get-menu';
import { useState, ReactNode, DetailedHTMLProps, LiHTMLAttributes } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/client';
import Image from 'next/image';

function _MenuCard(props: any) {
    const menuProps: any = props.menuObject
    const [url, setImage] = useState("");
    if (menuProps.imageURL !== "") {
    const gsRef = ref(storage, menuProps.imageURL);
    getDownloadURL(gsRef)
    .then((url) => {
        setImage(url);
    }).catch((err) => console.log(err));
}   
    // ここでメニューカードのレイアウト変更
    return (
        <div>
            登録済みのメニュー情報は以下です
            {props ? (
                <ul>
                    <li>name: {menuProps.name}</li>
                    <li>category: {menuProps.category}</li>
                    <li>price: {menuProps.price}</li>
                    <Image src={url} width={64} height={64} alt=""></Image>
                    <li>stars: {menuProps.stars}</li>
                    <li>kcal: {menuProps.nutrition.kcal}</li>
                    <li>P: {menuProps.nutrition.P}</li>
                    <li>F: {menuProps.nutrition.F}</li>
                    <li>C: {menuProps.nutrition.C}</li>
                    <li>imageURL: {menuProps.imageURL}</li>
                </ul>)
                : (<div>No Props</div>)}
        </div>
    );
}

export default _MenuCard;