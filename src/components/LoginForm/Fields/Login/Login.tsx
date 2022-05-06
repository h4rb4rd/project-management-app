import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { LoginFormDataType } from '../../../../types';

import cl from './Login.module.scss';

export type LoginProps = {
  register: UseFormRegister<LoginFormDataType>;
};

const Login = ({ register }: LoginProps) => {
  return (
    <div className={cl.container}>
      <input
        {...register('login', {
          required: 'Поле логин не может быть пустым',
          minLength: {
            value: 3,
            message: 'Логин должен содержать не менее 3 символов',
          },
          maxLength: {
            value: 10,
            message: 'Логин должен содержать не более 10 символов',
          },
        })}
        placeholder="Введите логин"
        type="text"
      />
    </div>
  );
};

export default Login;
