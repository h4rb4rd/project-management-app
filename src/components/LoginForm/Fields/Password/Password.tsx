import React from 'react';

import { UseFormRegister } from 'react-hook-form';
import { LoginFormDataType } from '../../../../types';

export type PasswordProps = {
  register: UseFormRegister<LoginFormDataType>;
};

import cl from './Password.module.scss';

const Password = ({ register }: PasswordProps) => {
  return (
    <div className={cl.container}>
      <input
        {...register('password', {
          // required: 'Required',
          // minLength: {
          //   value: 3,
          //   message: 'must be of length 3 to 10',
          // },
          // maxLength: {
          //   value: 10,
          //   message: 'must be of length 3 to 10',
          // },
        })}
        type="password"
        placeholder="Введите пароль"
      />
    </div>
  );
};

export default Password;
