
import { useEffect, useState } from 'react';
import { MenuProps, getAllMenus, RestaurantType } from './get-menu';
import { db } from '../../firebase/client';

type Props = {
    props: RestaurantType;
}

const AdminMenuList = (props: Props) => {
    const [list, setList] = useState<Array<any>>([]);
    let newList: any[] = [];
    const updateList = (doc: any) => {
        newList.push(doc.data());
        setList(newList);
    };
    console.log(list);

    useEffect(() => {
        // strictModeのせいでマウント時に2回レンダリングされる
        newList = []
        getAllMenus(db, updateList, props.props);
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