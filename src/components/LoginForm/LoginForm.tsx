import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { LoginFormDataType } from '../../types';
import Login from './Fields/Login';
import Password from './Fields/Password';

import cl from './LoginForm.module.scss';

interface LoginFormProps {
  submitData: (data: LoginFormDataType) => void;
}

const LoginForm = ({ submitData }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormDataType>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<LoginFormDataType> = (data) => {
    const userData = {
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
      <Login register={register} />
      <Password register={register} />
      <button className={cl.submit}>Войти</button>
      <hr className={cl.selector} />
      <Link to="/signup">Зарегистрировать аккаунт</Link>
    </form>
  );
};

export default LoginForm;
