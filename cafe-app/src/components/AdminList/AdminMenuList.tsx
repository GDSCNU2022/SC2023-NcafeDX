
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { MenuProps, getAllMenus, listenMenus, RestaurantType, deleteMenuWithID, updateMenu } from '../../pages/api/get-menu';
import { db } from '../../firebase/client';
import { database } from 'firebase-admin';
import InputCheckbox from './InputCheckbox';
import MenuForm, {gender} from '../Form/MenuForm';
import Image from 'next/image';
import ModalImageGrid from '../Modal/ModalImageGrid';
import ModalTextboxPanel from '../Modal/ModalTextboxPanel';
import ModalTextboxWindow from '../Modal/ModalTextboxWindow';

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
  shrimp: boolean;
  crab: boolean;
  walnut: boolean;
  wheat: boolean;
  soba: boolean;
  egg: boolean;
  dairy: boolean;
  peanut: boolean;
  text: string;
  id: any;
}

type AllergenProps = {
  shrimp: boolean;
  crab: boolean;
  walnut: boolean;
  wheat: boolean;
  soba: boolean;
  egg: boolean;
  dairy: boolean;
  peanut: boolean;
}

const AdminMenuList = (props: Props) => {
    const {register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
    const [list, setList] = useState<Array<any>>([]);
    const [checkedData, setCheckedData] = useState<Array<string>>([]);
    const [inputCheckedList, setInputCheckedList] = useState<boolean[]>([]);

    const initAllergenObj: AllergenProps = {
      shrimp: false,
      crab: false,
      walnut: false,
      wheat: false,
      soba: false,
      egg: false,
      dairy: false,
      peanut: false,
    }

    const [isAllergenObj, setIsAllergenObj] = useState<AllergenProps>(initAllergenObj);

    const updateList = (doc: any) => {
        const docData = doc.data();
        const newObj = {
          ...docData,
          id: doc.id
        };
        setList((list) => {
          return [...list, newObj];
        });
    };

    // フォームから追加した直後の要素はID不明なので名前で管理
    const handleDelete = () => {
      checkedData?.forEach((id) => {
        //　nameフィールドでトリガー
        deleteMenuWithID(db, props.restaurant, id);
        setList((prevState: any[]) => prevState.filter((obj: NewProps) => obj.id !== id));
        reset();
      })
      console.log(inputCheckedList);
      inputCheckedList?.forEach((b) => {
        setInputCheckedList((list: Array<boolean>) => list.filter((bool: boolean) => !bool));
      })
    }

    const handleCategory = (category: string) => {
      if(category === "teishoku") return "定食";
      if(category === "don") return "丼";
      if(category === "noodle") return "麺類";
      if(category === "curry") return "カレー";
    }

    const handleImageEdit = (url: string, i: number) => {
      setList((d: any) => {
        const obj = d[i];
        const newObj = {
          ...obj,
          imageURL: url
        }
        const newList = [...d];
        newList[i] = newObj;
        updateMenu(db, `${props.restaurant}/${obj.id}`, newObj);
        reset();
        console.log(`Updated URL: ${obj.imageURL}`);
        return newList;
      })

    };
    
    const handleTextEdit = (text: string, i: number) => {
      setList((d: any) => {
        const obj = d[i];
        const newObj = {
          ...obj,
          text: text
        }
        const newList = [...d];
        newList[i] = newObj;
        updateMenu(db, `${props.restaurant}/${obj.id}`, newObj);
        reset();
        console.log(`Updated text: ${obj.text}`);
        return newList;
      })
    };

    // stateはイベント処理が終わるまで更新されないことに注意
    const onChangeInput = (e: any, id: number) => {
      const targetId = list[id].id;
      const targetName = list[id].name;
      const {name, value} = e.target;
      console.log(id);
      console.log(targetId);
      console.log(targetName);
      console.log(`name:${name}`);
      const field = name.split('-')[0];

      setList((l: any) => {
        const newList = [...l];
        newList.map((obj: any , i: number) => {
        if(targetId && (targetId === obj.id) && field) {
          console.log(field)
          if(field === "kcal"|| field === "P"|| field === "F"|| field === "C"){
            console.log("Edit Nutrition");
            const newObj = {
              ...obj,
              nutrition: {...obj.nutrition, [field]: value}
            };
            updateMenu(db, `${props.restaurant}/${obj.id}`, newObj);
          } else {
            console.log("Edit Misc props")
            console.log(`${obj[field]} => ${value}`);
            const newObj = {
              ...obj,
              [field]: value
            };
            updateMenu(db, `${props.restaurant}/${obj.id}`, newObj);
          } 
        }
      }
        )
        return newList;
          })
    }

    const onChangeAllergens = (e:any, id:number) => {
      const targetId = list[id].id;
      const targetName = list[id].name;
      const {name, value} = e.target;
      const field = name.split('-')[0];
      const isAllergens = ['shrimp', 'crab', 'walnut', 'wheat', 'soba', 'egg', 'dairy', 'peanut']

      console.log("Edit Allergens");
      isAllergenObj[field] = !isAllergenObj[field]
      setIsAllergenObj(() => isAllergenObj);
      const newList = [...list];
      const newObj = {
        ...newList[id],
        allergens: isAllergenObj,
      }
      newList.map((obj: any, i: number) => {
        if(targetId && (targetId === obj.id) && field) {
          updateMenu(db, `${props.restaurant}/${obj.id}`, newObj);
        }
      })

      setList(() => {
        newList[id].allergens = isAllergenObj
        return newList
      });

      return ;
    }

    useEffect(() => {
        // strictModeのせいでマウント時に2回レンダリングされる
        getAllMenus(db, updateList, props.restaurant)

        return () => {
          console.log("unmounting...");
          setList((list) => [])};

    }, [])
    return (
<div className="">
<div className="overflow-auto h-128 max-h-128 m-4">
  <div className="">
    <div className="flex flex-col">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="table-auto text-left text-sm font-light">
              <thead
                className="border-b  bg-neutral-200 font-medium">
                <tr>
                  {['名前', '価格', '種類', 'kcal', 'P', 'F', 'C', 'えび', 'かに', 'くるみ', '小麦', 'そば', '卵', '乳', '落花生', '紹介文', '登録画像'].map((inp: string) => (
                  <th scope="col" className="px-4 py-2">{inp}</th>
                  ))}
                  <th scope="col" className="px-4 py-2 flex justify-center">
                    <button onClick={handleDelete} className="py-1 px-4 bg-blue-500 text-white rounded-md shadow-sm 
        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-offset-2">Delete</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                list.map((data: any, i: number) => 
                    (<tr className="border-b bg-neutral-100" key={i}>
                      <td scope="col" className="px-4 py-2 truncate">
                        <input
                          type="text"
                          {...register(`name-${i}`, {
                          onChange: (e: any) => onChangeInput(e, i),
                          value: data.name
                        }
                          )}
                          className='bg-neutral-200'/>
                          </td>
                      <td scope="col" className="px-4 py-2">
                        <input
                          className="w-14 bg-neutral-200"
                          type="number"
                          {...register(`price-${i}`, {
                          onChange: (e: any) => onChangeInput(e, i),
                          value: data.price
                        }
                          )}/>
                        </td>
                      <td scope="col" className="px-4 py-2">
                        <select
                          {...register(`category-${i}`, {
                          onChange: (e: any) => onChangeInput(e, i),
                          value: data.category
                        }
                          )}
                          className='bg-neutral-200'>
                            {gender.map((item, i) => (
                            <option value={item.value} key={item.value}>{item.label}</option>
                        ))}
                          </select>
                      </td>
                      <td scope="col" className="px-4 py-2">
                        <input
                          className="w-14 bg-neutral-200"
                          type="number"
                          {...register(`kcal-${i}`, {
                          onChange: (e: any) => onChangeInput(e, i),
                          value: data.nutrition?.kcal
                        }
                          )}
                          />
                      </td>
                      <td scope="col" className="px-4 py-2">
                        <input
                          className="w-14 bg-neutral-200"
                          type="number"
                          {...register(`P-${i}`, {
                          onChange: (e: any) => onChangeInput(e, i),
                          value: data.nutrition?.P
                        }
                          )}/>
                      </td>
                      <td scope="col" className="px-4 py-2">
                        <input
                          className="w-14 bg-neutral-200"
                          type="number"
                          {...register(`F-${i}`, {
                          onChange: (e: any) => onChangeInput(e, i),
                          value: data.nutrition?.F
                        }
                          )}/>
                      </td>
                      <td scope="col" className="px-4 py-2">
                        <input
                          className="w-14 bg-neutral-200"
                          type="number"
                          {...register(`C-${i}`, {
                          onChange: (e: any) => onChangeInput(e, i),
                          value: data.nutrition?.C
                        }
                          )}/>
                      </td>

                      <td scope="col" className="px-4 py-2">
                        <input
                          className="w-14 bg-neutral-200"
                          type="checkbox"
                          defaultChecked={data.allergens?.shrimp}
                          {...register(`shrimp-${i}`, {
                          onChange: (e: any) => onChangeAllergens(e, i),
                          value: isAllergenObj.shrimp,
                        }
                          )}/>
                      </td>
                      <td scope="col" className="px-4 py-2">
                        <input
                          className="w-14 bg-neutral-200"
                          type="checkbox"
                          defaultChecked={data.allergens?.crab}
                          value={data.allergens?.crab}
                          {...register(`crab-${i}`, {
                          onChange: (e: any) => onChangeAllergens(e, i),
                          value: data.allergens?.crab
                        }
                          )}/>
                      </td>
                      <td scope="col" className="px-4 py-2">
                        <input
                          className="w-14 bg-neutral-200"
                          type="checkbox"
                          defaultChecked={data.allergens?.walnut}
                          value={data.allergens?.walnut}
                          {...register(`walnut-${i}`, {
                          onChange: (e: any) => onChangeAllergens(e, i),
                          value: data.allergens?.walnut
                        }
                          )}/>
                      </td>
                      <td scope="col" className="px-4 py-2">
                        <input
                          className="w-14 bg-neutral-200"
                          type="checkbox"
                          defaultChecked={data.allergens?.wheat}
                          value={data.allergens?.wheat}
                          {...register(`wheat-${i}`, {
                          onChange: (e: any) => onChangeAllergens(e, i),
                          value: data.allergens?.wheat
                        }
                          )}/>
                      </td>
                      <td scope="col" className="px-4 py-2">
                        <input
                          className="w-14 bg-neutral-200"
                          type="checkbox"
                          defaultChecked={data.allergens?.soba}
                          value={data.allergens?.soba}
                          {...register(`soba-${i}`, {
                          onChange: (e: any) => onChangeAllergens(e, i),
                          value: data.allergens?.soba
                        }
                          )}/>
                      </td>

                      <td scope="col" className="px-4 py-2">
                        <input
                          className="w-14 bg-neutral-200"
                          type="checkbox"
                          defaultChecked={data.allergens?.egg}
                          value={data.allergens?.egg}
                          {...register(`egg-${i}`, {
                          onChange: (e: any) => onChangeAllergens(e, i),
                          value: data.allergens?.egg
                        }
                          )}/>
                      </td>
                      <td scope="col" className="px-4 py-2">
                        <input
                          className="w-14 bg-neutral-200"
                          type="checkbox"
                          defaultChecked={data.allergens?.dairy}
                          value={data.allergens?.dairy}
                          {...register(`dairy-${i}`, {
                          onChange: (e: any) => onChangeAllergens(e, i),
                          value: data.allergens?.dairy
                        }
                          )}/>
                      </td>
                      <td scope="col" className="px-4 py-2">
                        <input
                          className="w-14 bg-neutral-200"
                          type="checkbox"
                          defaultChecked={data.allergens?.peanut}
                          value={data.allergens?.peanut}
                          {...register(`peanut-${i}`, {
                          onChange: (e: any) => onChangeAllergens(e, i),
                          value: data.allergens?.peanut
                        }
                          )}/>
                      </td>
                      <td scope="col" className="px-4 py-2">
                        <ModalTextboxWindow
                        parentObj={data} targetId={data.id} restaurant={props.restaurant} handleSubmit={handleTextEdit}/>
                      </td>

                      <td scope="col" className="px-4 py-2 inline-grid">
                          <ModalImageGrid parentHandlerSubmit={handleImageEdit} src={data.imageURL} index={i}/>

                        </td>
                      <td scope="col" className="px-6 py-4">
                      <InputCheckbox props={[setCheckedData, data.id, inputCheckedList, setInputCheckedList, i]}/>
            
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