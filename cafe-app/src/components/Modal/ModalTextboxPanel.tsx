
import { useState } from 'react';
import { useForm,  SubmitHandler, Field } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { db } from '../../firebase/client';
import { Textarea } from '@material-tailwind/react';
import { updateMenu } from '@src/pages/api/get-menu'

type Props = {
    restaurant: string;
    close?: () => void;
    parentObj: any;
    targetId: string;
    handleSubmit: SubmitHandler<Field>;
}
const ModalTextboxPanel = (props: Props) => {
    const { setValue, reset, register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (d: any) => {
        if(props.parentObj){
          console.log("Edit Text")
          const newObj = {
            ...props.parentObj,
            text: d.text
          };
          updateMenu(db, `${props.restaurant}/${props.targetId}`, newObj)
        }

        if(props.close){
            props.close();
        }
    }

    return (
        <div className="w-[40rem] md:w-[30rem] sm:w-[20rem]">
        <form onSubmit={handleSubmit(props.handleSubmit)}>
        <div className="flex flex-col mx-auto py-2">
        <label className="text-sm font-bold">本文</label>
        <textarea {...register('text',{required: true, value: props.parentObj.text})} 
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
        <ErrorMessage errors={errors} name="text"/>
        </div>

        <button type="submit"
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm 
        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-offset-2">登録</button>

        </form>
        </div>
    )
};

export default ModalTextboxPanel;