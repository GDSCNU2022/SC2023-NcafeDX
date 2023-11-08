
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { updateNewsWithDate } from '../../pages/api/get-news';
import { db } from '../../firebase/client';
import { Textarea } from '@material-tailwind/react';
import { NewsProps } from '../Form/NewsForm';
import { Timestamp } from 'firebase/firestore';
import { list } from 'firebase/storage';

type Props = {
    restaurant: string;
    close?: () => void;
    parentHandlerSubmit?: Function;
    data: {title: string, content: string, date: Timestamp};
}
const Panel = (props: Props) => {
    const { setValue, reset, register, handleSubmit, formState: { errors } } = useForm();
    const [focusedObj, setFocusedObj] = useState();

    const onSubmit = (d: any) => {
        const currentDate = props.data.date;
        const updateData = {
            title: d.title,
            content: d.content,
            date: Timestamp.now()
        }
        updateNewsWithDate(db, props.restaurant, updateData);
        if(props.parentHandlerSubmit){
            props.parentHandlerSubmit((list: any) => {
            list.map((obj: any, i: number) => {
                if(obj.date === currentDate){
                    list[i] = updateData;
                }
            })

            return [...list];
            }
            );

        }

        console.log(updateData);

        if(props.close){
            props.close();
        }
        

        //TODO: フォーム値を取得して，日付追加して更新

    }

    return (
        <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col mx-auto py-2">
            <label  htmlFor="dropdown" className="text-sm font-bold">件名</label>
        <input {...register('title',{required: true, value: props.data.title})} 
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
        <ErrorMessage errors={errors} name="title"/>
        </div>

        <div className="flex flex-col mx-auto py-2">
        <label  htmlFor="dropdown" className="text-sm font-bold">本文</label>
        <textarea {...register('content',{required: true, value: props.data.content})} 
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        <ErrorMessage errors={errors} name="content"/>
        </div>

        <button type="submit"
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm 
        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-offset-2">Submit</button>

        </form>
        </div>
    )
};

export default Panel;