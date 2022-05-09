import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { AccountFormDataType } from '../../../../types';

import cl from './Login.module.scss';

export type LoginProps = {
  register: UseFormRegister<AccountFormDataType>;
};

const Login = ({ register }: LoginProps) => {
  return (
    <div className={cl.container}>
      <label htmlFor="loginFieldId">Логин</label>
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
        id="loginFieldId"
      />
    </div>
  );
};

export default Login;
