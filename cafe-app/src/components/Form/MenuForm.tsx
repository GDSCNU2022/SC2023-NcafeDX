import React, { useState, ChangeEvent} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { newMenu, MenuProps } from '../../pages/api/get-menu';
import {db} from '../../../firebase/client';
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
    imageURL: string;
}

const MenuForm = (props: any) => {
    const {register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
    const [imageUrl, setImageUrl] = useState('');

    const setList = props.parentProps;
    const onSubmit = (data: any) => {
        if(!data.imageURL){data.imageURL = '';}
        const newData: MenuProps = {
            name: data.name,
            category: data.category,
            price: data.price,
            nutrition: {kcal: data.kcal, P: data.P, F: data.F, C: data.C},
            imageURL: data.imageURL,
        }
        console.log(`newData: ${newData}`);
        console.log(newData);
        // firebaseへ入力データをアップロード
        newMenu(db, props.props, newData);
        setList((list: Array<any>) => [...list, newData]);
        reset();
        console.log("reset imageUrl");
        
    };

    const gridHandlerSubmit = (url: string) => {
        console.log("in gridHandler")
        console.log(url);
        setValue('imageURL', url);
    }

    return(
        <div>
            <ModalImageGrid parentHandlerSubmit={gridHandlerSubmit}></ModalImageGrid>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-4">
                <div className="inline-flex">
                    <div className="flex flex-col w-42 mx-auto py-2">
                        <label className="text-sm font-bold">メニュー名</label>
                        <input {...register('name',{required: true, maxLength: 20})} 
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                        <ErrorMessage errors={errors} name="name" />
                    </div>

                    <div className="flex flex-col w-24 mx-auto py-2">
                        <label className="text-sm font-bold">価格</label>
                        <input {...register('price',{required: true, maxLength: 20})} 
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                        <ErrorMessage errors={errors} name="price" />
                        </div>

                    <div className="flex flex-col w-24 mx-auto py-2">
                        <label  htmlFor="dropdown" className="text-sm font-bold">カテゴリー</label>
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

                    <div className="flex flex-col w-64 mx-auto py-2">
                        <label className="text-sm font-bold">Image URL</label>
                        <input {...register('imageURL',{ required: false, disabled: true})}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-400 border border-gray-300 rounded-md shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                        <ErrorMessage errors={errors} name="imageURL" />
                        </div>

                    <div className="flex flex-col mx-auto py-2">
                        <button type="submit"
                        className="flex flex-col mt-4 py-2 px-4 m-2 bg-blue-500 text-white rounded-md shadow-sm 
                        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:ring-offset-2 h-10">Submit</button>
                        </div>

                </div>
            </div>
        </form>


    </div>
    );
};

export default MenuForm;