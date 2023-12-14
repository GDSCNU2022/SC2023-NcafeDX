import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const JobForm = () => {
    const {register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = async (data: any) => {
        const fields = { fields: data };
        reset();
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>メニュー名
            <input {...register('name', {required: true})} />
            </div>
            <div>カテゴリー
            <input {...register('category', {required: true})}></input>
            </div>
            <div>kcal
            <input {...register('kcal')}></input>
            </div>
            <div>P
            <input {...register('P')}></input>
            </div>
            <div>F
            <input {...register('F')}></input>
            </div>
            <div>C
            <input {...register('C')}></input>
            </div>
        <input
            {...register('email', {
            required: true,
            maxLength: 60,
            pattern: {
                value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*$/,
                message: '入力した文字列の形式が不正です',
            },
            })}
        />
        <ErrorMessage errors={errors} name="email" />
        <button type="submit">Submit</button>
        </form>
    );
};

export default JobForm;
