import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { newNews } from '../pages/api/get-news';
import UploadImage from './UploadImage';
import { db } from '../../firebase/client';
import { Timestamp } from 'firebase/firestore';

const NewsForm = (props: any) => {
    const {register, formState: { errors }, handleSubmit, reset } = useForm();
    const setList = props.parentProps;
    const onSubmit = async (data: any) => {
        console.log(data);
        const newData = {
            title: data.title,
            content: data.content,
            date: Timestamp.now(),
        }
        // firebaseへ入力データをアップロード
        newNews(db, props.props, newData);
        setList((prev: any) => [...prev, newData]);
        reset();
    };
    return(
        <form onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col w-2/5 mx-auto py-2">
            <label  htmlFor="dropdown" className="text-sm font-bold">件名</label>
        <input {...register('title',{required: true})} 
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
        <ErrorMessage errors={errors} name="title"/>
        </div>

        <div className="flex flex-col w-3/5 h-2/5 mx-auto py-2">
            <label  htmlFor="dropdown" className="text-sm font-bold">本文</label>
        <input {...register('content',{required: true})} 
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
        <ErrorMessage errors={errors} name="content"/>
        </div>

        <button type="submit"
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm 
        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-offset-2">Submit</button>

        </form>
    );
};

export default NewsForm;
