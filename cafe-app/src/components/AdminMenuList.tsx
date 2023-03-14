
import { useEffect, useState } from 'react';
import { MenuProps, getAllMenus, listenMenus, RestaurantType } from './get-menu';
import { db } from '../../firebase/client';


type Props = {
    props: RestaurantType;
}

const AdminMenuList = (props: Props) => {
    // get init data
    const voidFunc = () => {};

    const [list, setList] = useState<Array<any>>([, , ,]);
    let newList: any[] = [];
    const updateList = (doc: any) => {
        newList.push(doc.data());
        setList(newList);
    };
    console.log(list);
    const unsubscribe = listenMenus(db, updateList, props.props);

    useEffect(() => {
        // strictModeのせいでマウント時に2回レンダリングされる
        newList = [];
        unsubscribe();
        console.log("call useEffect");

    }, [])

    return (
        <div>
            <ul>
                {list.map((data: MenuProps, i) => 
                    (<li key={i}>{i}, {data.name}, {data.price}, {data.category}, {data.imageURL}</li>))
                }
            </ul>

        </div>
    )
}

export default AdminMenuList;