import React from 'react';

import { UseFormRegister } from 'react-hook-form';
import { AccountFormDataType } from '../../../../types';

export type PasswordProps = {
  register: UseFormRegister<AccountFormDataType>;
};

import cl from './Password.module.scss';

const Password = ({ register }: PasswordProps) => {
  return (
    <div className={cl.container}>
      <label htmlFor="passwordFieldId">Пароль</label>
      <input
        {...register('password', {
          required: 'Поле пароль не может быть пустым',
          minLength: {
            value: 4,
            message: 'Пароль должен содержать не менее 4 символов',
          },
          maxLength: {
            value: 12,
            message: 'Пароль должен содержать не более 12 символов',
          },
        })}
        type="password"
        placeholder="Введите пароль"
        id="passwordFieldId"
      />
    </div>
  );
};

export default Password;
