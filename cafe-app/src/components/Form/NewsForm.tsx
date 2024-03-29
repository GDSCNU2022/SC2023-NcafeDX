import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { newNews } from '../../pages/api/get-news';
import { db } from '../../firebase/client';
import { Timestamp } from 'firebase/firestore';
import { Textarea } from '@material-tailwind/react';

export type NewsProps = {
    title: string;
    content: string;
    date?: Timestamp;
}

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
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
        
        <div className="grid grid-cols-none h-3/5 w-10/12">

        <div className="w-full mx-auto py-2">
            <label  htmlFor="dropdown" className="text-sm font-bold">件名</label>
            <input {...register('title',{required: true})} 
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
            <ErrorMessage errors={errors} name="title"/>
        </div>

        <div className="w-full mx-auto py-2">
            <label  htmlFor="dropdown" className="text-sm font-bold">本文</label>
            <textarea {...register('content',{required: true})} 
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
            <ErrorMessage errors={errors} name="content"/>
        </div>
            <div className="">
            <button type="submit"
            className=" w-24 py-2 bg-blue-500 text-white rounded-md shadow-sm 
            hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:ring-offset-2">Submit</button>
            </div>
        </div>



        </form>
    );
};

export default NewsForm;
