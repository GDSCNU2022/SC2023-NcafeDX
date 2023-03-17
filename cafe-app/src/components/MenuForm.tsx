import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { newMenu } from '../pages/api/get-menu';
import { db, storage } from '../../firebase/client';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

//TODO 名前で管理しているため名前の重複チェック必須(yup使用が主流)

const MenuForm = (props: any) => {
    const {register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
    const [uploadDataURL, setUploadDataURL] = useState('');
    const [image, setImage] = useState();
    const [data, setData] = useState();

    const handleChange = (e: any) => {
        setImage(e.target.files[0]);
    }
    const imageUpload = (file: any) => {
        try {
            const imageRef = ref(storage, `images/${file.name}`);
            uploadBytes(imageRef, file).then((snapshot) => {
                console.log("Uploaded a file.");
                console.log(snapshot);
            })
            getDownloadURL(imageRef).then((url: string) => {
                setUploadDataURL(() => url);
                console.log("upload data URL");
                console.log(url);
            });
        } catch(err) {
            console.log(err);
        }
    }

    const setList = props.parentProps;
    const onSubmit = async (data: any) => {
        console.log(data);
        imageUpload(image);
        const newData = {
            name: data.name,
            category: data.category,
            price: data.price,
            nutrition: {kcal: data.kcal, P: data.P, F: data.F, C: data.C},
            imageURL: uploadDataURL,
        }
        // firebaseへ入力データをアップロード
        newMenu(db, props.props, newData);
        setList((list: Array<any>) => [...list, newData]);
        reset();
        setUploadDataURL('');
    };

    const gender = [
        {label: '定食', value: 'teishoku'},
        {label: '丼', value: 'don'},
        {label: '麺類', value: 'noodle'},
        {label: 'カレー', value: 'curry'},
    ]
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-4">
                <div className="inline-flex">
                <div className="flex flex-col w-64 mx-auto py-2">
                    <label className="text-sm font-bold">メニュー名</label>
                <input {...register('name',{required: true, maxLength: 20})} 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                <ErrorMessage errors={errors} name="name" />
                </div>

                <div className="flex flex-col w-64 mx-auto py-2">
                    <label className="text-sm font-bold">価格</label>
                <input {...register('price',{required: true, maxLength: 20})} 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                <ErrorMessage errors={errors} name="price" />
                </div>
                </div>
                <div className="flex justify-start">
                    <div className="flex flex-col w-64 mx-auto py-2">
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
                </div>

                <div className="inline-flex">

                <div className="flex flex-col w-64 mx-auto py-2">
                <label className="text-sm font-bold">kcal</label>
                <input {...register('kcal',{ required: false, maxLength: 4,
                pattern: {value: /^[0-9]+$/, message: '文字形式が不正です'}})} 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                <ErrorMessage errors={errors} name="kcal" />
                </div>

                <div className="flex flex-col w-64 mx-auto py-2">
                    <label className="text-sm font-bold">Protein</label>
                    <input {...register('P',{ required: false, maxLength: 4,
                pattern: {value: /^[0-9]+$/, message: '文字形式が不正です'}})} 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                <ErrorMessage errors={errors} name="P" />
                </div>

                <div className="flex flex-col w-64 mx-auto py-2">
                    <label className="text-sm font-bold">Fat</label>
                    <input {...register('F',{required: false, maxLength: 4,
                pattern: {value: /^[0-9]+$/, message: '文字形式が不正です'}})} 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                <ErrorMessage errors={errors} name="F" />
                </div>

                <div className="flex flex-col w-64 mx-auto py-2">
                <label className="text-sm font-bold">Carbohydrate</label>
                <input {...register('C',{ required: false,  maxLength: 4,
                pattern: {value: /^[0-9]+$/, message: '文字形式が不正です'}})} 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                <ErrorMessage errors={errors} name="C" />
                </div>

                    </div>
                </div>
                
            <button type="submit"
            className="mt-4 py-2 px-4 m-2 bg-blue-500 text-white rounded-md shadow-sm 
        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-offset-2">Submit</button>

        <input type="file" onChange={handleChange}/>
        </form>

        </div>
    );
};

export default MenuForm;
