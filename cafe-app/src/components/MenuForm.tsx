import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { newMenu } from './get-menu';
import UploadImage from './image-upload';
import { db } from '../../firebase/client';

const JobForm = (props: any) => {
    const {register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = async (data: any) => {
        console.log(data);
        // firebaseへ入力データをアップロード
        newMenu(db, props.props, data);
        reset();
    };
    const gender = [
        {label: '定食', value: 'teishoku'},
        {label: '丼', value: 'don'},
        {label: '麺類', value: 'noodle'},
        {label: 'カレー', value: 'curry'},
    ]
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-64 mx-auto">
            <label  htmlFor="dropdown" className="text-sm font-bold">メニュー名</label>
        <input {...register('name',{required: true, maxLength: 20})} 
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
        <ErrorMessage errors={errors} name="name" />
        </div>

        <div className="flex flex-col w-64 mx-auto">
            <label  htmlFor="dropdown" className="text-sm font-bold">価格</label>
        <input {...register('price',{required: true, maxLength: 20})} 
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
        <ErrorMessage errors={errors} name="price" />
        </div>

        <div className="flex flex-col w-64 mx-auto">
        <label  htmlFor="dropdown" className="text-sm font-bold">カテゴリー</label>
        <select {...register('category', { required: true })}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            {gender.map((item, i) => (
                <option value={item.value} key={item.value}>{item.label}</option>
            ))}
        </select>
        {errors.gender && <p className="text-white" role="alert" >{errors.gender?.message as string}</p>}

        <div className="flex flex-col w-64 mx-auto">
            <label className="text-sm font-bold">kcal</label>
            <input {...register('kcal',{ required: false, maxLength: 4,
        pattern: {value: /^[0-9]+$/, message: '文字形式が不正です'}})} 
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
        <ErrorMessage errors={errors} name="kcal" />
        </div>

        <div className="flex flex-col w-64 mx-auto">
            <label className="text-sm font-bold">Protein</label>
            <input {...register('P',{ required: false, maxLength: 4,
        pattern: {value: /^[0-9]+$/, message: '文字形式が不正です'}})} 
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
        <ErrorMessage errors={errors} name="P" />
        </div>

        <div className="flex flex-col w-64 mx-auto">
            <label className="text-sm font-bold">Fat</label>
            <input {...register('F',{required: false, maxLength: 4,
        pattern: {value: /^[0-9]+$/, message: '文字形式が不正です'}})} 
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
        <ErrorMessage errors={errors} name="F" />
        </div>

        <div className="flex flex-col w-64 mx-auto">
            <label className="text-sm font-bold">Carbohydrate</label>
            <input {...register('C',{ required: false,  maxLength: 4,
        pattern: {value: /^[0-9]+$/, message: '文字形式が不正です'}})} 
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
        <ErrorMessage errors={errors} name="C" />
        </div>
        
        <button type="submit"
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm 
        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-offset-2">Submit</button>

        </div>
        </form>
    );
};

export default JobForm;
