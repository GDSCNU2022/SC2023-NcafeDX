import React, { useState, ChangeEvent} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { newMenu, MenuProps } from '../../pages/api/get-menu';
import { db } from '../../firebase/client';
import UploadImageForm from './UploadImageForm';
import ModalImageGrid from '../Modal/ModalImageGrid';
//TODO 名前で管理しているため名前の重複チェック必須(yup使用が主流)

export const gender = [
        {label: '定食', value: 'teishoku'},
        {label: '丼', value: 'don'},
        {label: '麺類', value: 'noodle'},
        {label: 'カレー', value: 'curry'},
    ]

type FormMenuProps = {
    name: string;
    price: number;
    category: string;
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
    imageURL: string;
}

const MenuForm = (props: any) => {
    const {register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
    const [imageUrl, setImageUrl] = useState('');

    const setList = props.parentProps;
    const onSubmit = async (data: any) => {
        console.log(data);
        if(data.imageURL){
            const newData: MenuProps = {
                name: data.name,
                id: data.id,
                category: data.category,
                price: data.price,
                starStorage: [],
                stars: 0,
                nutrition: {kcal: data.kcal, P: data.P, F: data.F, C: data.C},
                allergens: {shrimp: data.shrimp, crab: data.crab, walnut: data.walnut, wheat: data.wheat, soba: data.soba, egg: data.egg, dairy: data.dairy, peanut: data.peanut},
                dayOfWeek: {mon: data.mon, tues: data.tues, wed: data.wed, thur: data.thur, fri: data.fri, sat: data.sat},
                text: data.text,
                imageURL: data.imageURL,
            }
        console.log(`newData: ${newData}`);
        console.log(newData);
        // firebaseへ入力データをアップロード
        await newMenu(db, props.props, newData);
        setList((list: Array<any>) => [...list, newData]);
        reset();
        console.log("reset imageUrl");
        } else {
            console.log("Url is undefined!");
            reset();
        }
        
    };

    const gridHandlerSubmit = (url: string) => {
        console.log("in gridHandler")
        console.log(url);
        if(url) setValue('imageURL', url);
    }

    const checkboxStyle = ""

    return(
        <div className="flex justify-center grid">
            <div className="">
                <ModalImageGrid parentHandlerSubmit={gridHandlerSubmit} text="商品画像を登録"/>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="overflow-auto border border-8">
                <div className="grid grid-rows-4 grid-cols-1 m-4 p-2 w-fit">
                    <div className="inline-flex w-fit">
                    <div className="flex flex-col w-42 mx-auto py-2">
                        <label className="text-sm font-bold">メニュー名</label>
                        <input {...register('name',{required: true, maxLength: 20})} 
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                        <ErrorMessage errors={errors} name="name" />
                    </div>

                    <div className="flex flex-col mx-auto py-2 w-24">
                        <label className="text-sm font-boldw-24">価格</label>
                        <input {...register('price',{required: true, maxLength: 20})} 
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                        <ErrorMessage errors={errors} name="price" />
                        </div>

                    <div className="flex flex-col w-32 mx-auto py-2">
                        <label  htmlFor="dropdown" className="text-sm font-bold">種類</label>
                        <select {...register('category', { required: true })}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            {gender.map((item, i) => (
                                <option value={item.value} key={item.value}>{item.label}</option>
                            ))}
                        </select>
                        {errors.gender && <p className="text-white" role="alert" >{errors.gender?.message as string}</p>}

                        </div>

                    <div className="flex flex-col w-24 mx-auto py-2">
                        <label className="text-sm font-bold">kcal</label>
                        <input {...register('kcal',{ required: false, maxLength: 4,
                        pattern: {value: /^[0-9]+$/, message: '文字形式が不正です'}})} 
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                        <ErrorMessage errors={errors} name="kcal" />
                    </div>

                    <div className="flex flex-col w-24 mx-auto py-2">
                        <label className="text-sm font-bold">P</label>
                        <input {...register('P',{ required: false, maxLength: 4,
                        pattern: {value: /^[0-9]+$/, message: '文字形式が不正です'}})} 
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                        <ErrorMessage errors={errors} name="P" />
                        </div>

                    <div className="flex flex-col w-24 mx-auto py-2">
                        <label className="text-sm font-bold">F</label>
                        <input {...register('F',{required: false, maxLength: 4,
                        pattern: {value: /^[0-9]+$/, message: '文字形式が不正です'}})} 
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                        <ErrorMessage errors={errors} name="F" />
                        </div>

                    <div className="flex flex-col w-24 mx-auto py-2">
                        <label className="text-sm font-bold">C</label>
                        <input {...register('C',{ required: false,  maxLength: 4,
                        pattern: {value: /^[0-9]+$/, message: '文字形式が不正です'}})} 
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                        <ErrorMessage errors={errors} name="C" />
                        </div>
                    </div>
                    
                    <div id="allergens" className="w-full inline-flex">
                    <div className="flex flex-col w-24 mx-auto py-2">
                        <label className="text-sm font-bold">えび</label>
                        <input type="checkbox" {...register('shrimp',{ required: false,})}
                        className={checkboxStyle}></input>
                        </div>

                    <div className="flex flex-col w-24 mx-auto py-2">
                        <label className="text-sm font-bold">かに</label>
                        <input type="checkbox" {...register('crab',{ required: false,})}
                        className={checkboxStyle}></input>
                        </div>

                    <div className="flex flex-col w-24 mx-auto py-2">
                        <label className="text-sm font-bold">くるみ</label>
                        <input type="checkbox" {...register('walnut',{ required: false,})}
                        className={checkboxStyle}></input>
                        </div>
                    
                    <div className="flex flex-col w-24 mx-auto py-2">
                        <label className="text-sm font-bold">小麦</label>
                        <input type="checkbox" {...register('wheat',{ required: false,})}
                        className={checkboxStyle}></input>
                        </div>

                    <div className="flex flex-col w-24 mx-auto py-2">
                        <label className="text-sm font-bold">そば</label>
                        <input type="checkbox" {...register('soba',{ required: false,})}
                        className={checkboxStyle}></input>
                        </div>

                    <div className="flex flex-col w-24 mx-auto py-2">
                        <label className="text-sm font-bold">卵</label>
                        <input type="checkbox" {...register('egg',{ required: false,})}
                        className={checkboxStyle}></input>
                        </div>

                    <div className="flex flex-col w-24 mx-auto py-2">
                        <label className="text-sm font-bold">乳</label>
                        <input type="checkbox" {...register('dairy',{ required: false,})}
                        className={checkboxStyle}></input>
                        </div>

                    <div className="flex flex-col w-24 mx-auto py-2">
                        <label className="text-sm font-bold">落花生</label>
                        <input type="checkbox" {...register('peanut',{ required: false,})}
                        className={checkboxStyle}></input>
                        </div>
                    </div>

                    <div className="flex">
                        {['mon', 'tues', 'wed', 'thur', 'fri', 'sat'].map((day: string) => {
                            const label = day === "mon" ? "月"
                            : day === "tues" ? "火"
                            : day === "wed" ? "水"
                            : day === "thur" ? "木"
                            : day === "fri" ? "金"
                            : "土";
                        return (
                        <div className="flex flex-col w-24 mx-auto py-2">
                            <label className="text-sm font-bold">{label}</label>
                            <input
                            className={checkboxStyle}
                            type="checkbox"
                            {...register(`${day}`, {required: false,})}/>
                        </div>)
                        })}
                    </div>
                    
                    <div id="text" className="w-1/3">
                        <div className="grid py-2">
                            <label className="text-sm font-bold">テキスト</label>
                            <textarea className="border" {...register('text', {required: false, disabled: false})}/>
                            </div>
                    </div>

                    <div id="image-registration" className="">
                        <div className="w-64 py-2">
                            <label className="text-sm font-bold">登録した画像パス</label>
                            <input {...register('imageURL',{ required: false, disabled: true})}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-400 border border-gray-300 rounded-md shadow-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                            <ErrorMessage errors={errors} name="imageURL" />
                            </div>
                    </div>

                        <div className="p-4">
                        <button type="submit"
                        className="py-2 mt-6 w-24 bg-blue-500 text-white rounded-md shadow-sm 
                        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:ring-offset-2 h-10">商品登録</button>
                        </div>
            </div>
        </form>


    </div>
    );
};

export default MenuForm;
