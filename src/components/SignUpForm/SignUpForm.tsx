import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { SignUpFormDataType } from '../../types';
import Login from './Fields/Login';
import Name from './Fields/Name';
import Password from './Fields/Password';

import cl from './SignUpForm.module.scss';

interface SignUpFormProps {
  submitData: (data: SignUpFormDataType) => void;
}

const SignUpForm = ({ submitData }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SignUpFormDataType>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<SignUpFormDataType> = (data) => {
    const userData = {
      name: data.name,
      login: data.login,
      password: data.password,
    };

    submitData(userData);
    reset();
  };

  return (
    <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      {(errors.login || errors.password) && (
        <span className={cl.error}>Указан неверный адрес и/или пароль.</span>
      )}
      <Name register={register} />
      <Login register={register} />
      <Password register={register} />
      <button className={cl.submit}>Войти</button>
      <hr className={cl.selector} />
      <Link to="/login">Уже есть аккаунт? Войти</Link>
    </form>
  );
};

export default SignUpForm;
