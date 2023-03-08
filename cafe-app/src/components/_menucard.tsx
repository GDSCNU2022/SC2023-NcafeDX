import { MenuProps } from './get-firebase';
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
            {props ? (
                <ul>
                    <li>name {menuProps.name}</li>
                    <li>price {menuProps.price}</li>
                    <Image src={url} width={64} height={64} alt=""></Image>
                    <li>stars {menuProps.stars}</li>
                    <li>kcal {menuProps.nutrition[0]}</li>
                    <li>P {menuProps.nutrition[1]}</li>
                    <li>F {menuProps.nutrition[2]}</li>
                    <li>C {menuProps.nutrition[3]}</li>
                    <li>imageURL {menuProps.imageURl}</li>
                </ul>)
                : (<div>No Props</div>)}
        </div>
    );
}

export default _MenuCard;