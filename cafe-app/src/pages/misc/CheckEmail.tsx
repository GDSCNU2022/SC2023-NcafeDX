import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { CheckEmail } from '@src/features/common/types';
import router from 'next/router';
import handler from '../api/hello';
import { submitPasswordResetEmail } from '../api/verifications';

const CheckEmail = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckEmail>();

  const submitHandler = async (data: CheckEmail) => {
    submitPasswordResetEmail(data.email);
    router.push('/misc/ResetPassword');
    console.log("reset password with email")
  };
  
  return (
    <div className="section">
      <h1 className="flex justify-center p-4">登録しているメールアドレスを入力してください</h1>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(submitHandler)}>
        <input
        className="flex justify-center border px-2 mx-2"
        {...register('email', { required: 'メールアドレスを入力してください'})}
        placeholder='your@email.com'
        type={'email'}/>
        <button
        className="px-2 mx-2 mt-2 bg-slate-400 border "
        type="submit"
        >送信</button>
        </form>
      </div>
  

    </div>
  );
};

export default CheckEmail;