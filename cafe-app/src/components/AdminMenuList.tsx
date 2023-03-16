
import { useEffect, useState, useRef } from 'react';
import { MenuProps, getAllMenus, listenMenus, RestaurantType, deleteMenu } from '../pages/api/get-menu';
import { db } from '../../firebase/client';
import { database } from 'firebase-admin';
import InputCheckbox from './InputCheckbox';
import MenuForm from './MenuForm';

type Props = {
    restaurant: RestaurantType;
}

type NewProps = {
  name: string;
  price: number;
  category: "teishoku" | "don" | "noodle" | "curry";
  kcal: number;
  P: number;
  F: number;
  C: number;
  id: any;
}


const AdminMenuList = (props: Props) => {
    const [list, setList] = useState<Array<any>>([]);
    const [checkedData, setCheckedData] = useState<Array<boolean>>([]);
    const updateList = (doc: any) => {
        const docData = doc.data();
        const newObj = {
          ...docData,
          id: doc.id,
        };
        setList((list) => {
          return [...list, newObj];
        });
    };
    const handleDelete = () => {
      checkedData?.forEach((id) => {
        deleteMenu(db, props.restaurant, id);
        setList((prevState: any[]) => prevState.filter((obj: NewProps) => obj.id !== id));
      })
    }
    useEffect(() => {
        // strictModeのせいでマウント時に2回レンダリングされる
        getAllMenus(db, updateList, props.restaurant)
        return () => {
          console.log("unmounting...");
          setList((list) => [])};

    }, [])
    console.log('above return');
    console.log(list);
    return (
<div className="overflow-scroll h-128">
  <div className="p-12">
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead
                className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                <tr>
                  <th scope="col" className="px-6 py-4">名前</th>
                  <th scope="col" className="px-6 py-4">価格</th>
                  <th scope="col" className="px-6 py-4">種類</th>
                  <th scope="col" className="px-6 py-4">kcal</th>
                  <th scope="col" className="px-6 py-4">P</th>
                  <th scope="col" className="px-6 py-4">F</th>
                  <th scope="col" className="px-6 py-4">C</th>
                  <th scope="col" className="px-6 py-4">Image URL</th>
                  <th scope="col" className="px-6 py-4">
                    <button onClick={handleDelete}>Delete</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                list.map((data: any, i) => 
                    (<tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700" key={i}>
                      <td scope="col" className="px-6 py-4">{data.name}</td>
                      <td scope="col" className="px-6 py-4">{data.price}</td>
                      <td scope="col" className="px-6 py-4">{data.category}</td>
                      <td scope="col" className="px-6 py-4">{data.nutrition?.kcal}</td>
                      <td scope="col" className="px-6 py-4">{data.nutrition?.P}</td>
                      <td scope="col" className="px-6 py-4">{data.nutrition?.F}</td>
                      <td scope="col" className="px-6 py-4">{data.nutrition?.C}</td>
                      <td scope="col" className="px-6 py-4">{data.imageURL}</td>
                      <td scope="col" className="px-6 py-4">
                      <InputCheckbox props={[checkedData, setCheckedData, data.id]}/>
            
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MenuForm props={props.restaurant} parentProps={setList}></MenuForm>
</div>
)
}

export default AdminMenuList;