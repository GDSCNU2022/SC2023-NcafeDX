
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { MenuProps, getAllMenus, listenMenus, RestaurantType, deleteMenuWithName, updateMenu } from '../pages/api/get-menu';
import { db } from '../../firebase/client';
import { database } from 'firebase-admin';
import InputCheckbox from './InputCheckbox';
import MenuForm, {gender} from './MenuForm';
import Image from 'next/image';
import { isTemplateExpression } from 'typescript';

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
    const {register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
    const [list, setList] = useState<Array<any>>([]);
    const [checkedData, setCheckedData] = useState<Array<string>>([]);

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
    // フォームから追加した直後の要素はID不明なので名前で管理
    const handleDelete = () => {
      checkedData?.forEach((name) => {
        //　nameフィールドでトリガー
        deleteMenuWithName(db, props.restaurant, name);
        setList((prevState: any[]) => prevState.filter((obj: NewProps) => obj.name !== name));
      })
    }

    const handleCategory = (category: string) => {
      if(category === "teishoku") return "定食";
      if(category === "don") return "丼";
      if(category === "noodle") return "麺類";
      if(category === "curry") return "カレー";
    }
    const onChangeInput = (e: any, id: number) => {
      const targetName = list[id].name;
      const {name, value} = e.target;

      setList((d: any) => {
        console.log("call setList");
        const newList = [...d];
        newList.map((obj: any) => {
        if(targetName === obj.name && name) {
          if(name === "kcal"|| name === "P"|| name === "F"|| name === "C"){
            console.log("Edit Nutrition");
            obj["nutrition"][name] = value;
            
          } else {
            obj[name] = value;
          
          }
          console.log(obj);
        }
      }
        )
        return newList;
          })

      // 必ずstateを書き換えた後に実行するよう（objが更新されないため）
      const update = () => {
        console.log("call update");
        list.map((obj) => {
          if(obj.name === targetName){
            updateMenu(db, `${props.restaurant}/${obj.name}`, obj);
            console.log(`${name}: ${value}`);
            // [var]: value 鉤括弧大事
            reset({[name]: value});
          }
        })
      }

      update();
      
    }
    useEffect(() => {
        // strictModeのせいでマウント時に2回レンダリングされる
        getAllMenus(db, updateList, props.restaurant)
        return () => {
          console.log("unmounting...");
          setList((list) => [])};

    }, [])
    return (
<div>
<div className="overflow-auto h-128 max-h-128 my-12 mx-6">
  <div className="">
    <div className="flex flex-col">
      <div className="sm:-mx-6 lg:-mx-8">
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
                  <th scope="col" className="px-6 py-4">登録画像</th>
                  <th scope="col" className="px-6 py-4">
                    <button onClick={handleDelete} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm 
        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-offset-2">Delete</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                list.map((data: any, i) => 
                    (<tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700" key={i}>
                      <td scope="col" className="px-6 py-4 truncate">
                        <input
                          type="text"
                          {...register(`name`, {
                          onChange: (e: any) => onChangeInput(e, i),
                          value: data.name
                        }
                          )}/>
                          </td>
                      <td scope="col" className="px-6 py-4">
                        <input
                          type="number"
                          {...register(`price`, {
                          onChange: (e: any) => onChangeInput(e, i),
                          value: data.price
                        }
                          )}/>
                        </td>
                      <td scope="col" className="px-6 py-4">
                        <select
                          {...register(`category`, {
                          onChange: (e: any) => onChangeInput(e, i),
                          value: data.category
                        }
                          )}>
                            {gender.map((item, i) => (
                            <option value={item.value} key={item.value}>{item.label}</option>
                        ))}
                          </select>
                      </td>
                      <td scope="col" className="px-6 py-4">
                        <input
                          type="number"
                          {...register(`kcal`, {
                          onChange: (e: any) => onChangeInput(e, i),
                          value: data.nutrition?.kcal
                        }
                          )}/>
                      </td>
                      <td scope="col" className="px-6 py-4">
                        <input
                          type="number"
                          {...register(`P`, {
                          onChange: (e: any) => onChangeInput(e, i),
                          value: data.nutrition?.P
                        }
                          )}/>
                      </td>
                      <td scope="col" className="px-6 py-4">
                        <input
                          type="number"
                          {...register(`F`, {
                          onChange: (e: any) => onChangeInput(e, i),
                          value: data.nutrition?.F
                        }
                          )}/>
                      </td>
                      <td scope="col" className="px-6 py-4">
                        <input
                          type="number"
                          {...register(`C`, {
                          onChange: (e: any) => onChangeInput(e, i),
                          value: data.nutrition?.C
                        }
                          )}/>
                      </td>
                      <td scope="col" className="px-6 py-4">
                        <div className="w-64 m-2 truncate">
                        <span><Image src={data.imageURL} width={64} height={64} alt="画像登録なし" className="dark:bg-neutral-900"/></span>
                        </div></td>
                      <td scope="col" className="px-6 py-4">
                      <InputCheckbox props={[checkedData, setCheckedData, data.name]}/>
            
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
</div>
  <MenuForm props={props.restaurant} parentProps={setList}></MenuForm>
</div>
)
}

export default AdminMenuList;