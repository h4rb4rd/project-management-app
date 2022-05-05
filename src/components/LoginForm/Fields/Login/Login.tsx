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
          required: 'Required',
          minLength: {
            value: 3,
            message: 'must be of length 3 to 10',
          },
          maxLength: {
            value: 10,
            message: 'must be of length 3 to 10',
          },
        })}
        placeholder="Введите логин"
        type="text"
      />
    </div>
  );
};

export default Login;
