import { MenuProps } from './get-firebase';
import { ReactNode, DetailedHTMLProps, LiHTMLAttributes } from 'react';

function _MenuCard(props: any) {
    console.log("in");
    console.log(props);
    console.log(props.menuObject);
    const menuProps: any = props.menuObject
    // ここでメニューカードのレイアウト変更
    return (
        <div>
            {props ? (
                <ul>
                    <li>name {menuProps.name}</li>
                    <li>price {menuProps.price}</li>
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