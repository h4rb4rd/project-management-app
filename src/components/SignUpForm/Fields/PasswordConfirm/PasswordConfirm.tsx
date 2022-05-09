import React from 'react';

import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { SignUpFormDataType } from '../../../../types';

export type PasswordProps = {
  register: UseFormRegister<SignUpFormDataType>;
  watch: UseFormWatch<SignUpFormDataType>;
};

import cl from './PasswordConfirm.module.scss';

const PasswordConfirm = ({ register, watch }: PasswordProps) => {
  return (
    <div className={cl.container}>
      <input
        {...register('passwordConfirm', {
          required: 'Поле пароль не может быть пустым',
          minLength: {
            value: 4,
            message: 'Пароль должен содержать не менее 4 символов',
          },
          maxLength: {
            value: 12,
            message: 'Пароль должен содержать не более 12 символов',
          },
          validate: (val: string) => {
            if (watch('password') != val) {
              return 'Пароли не совпадают';
            }
          },
        })}
        type="password"
        placeholder="Подтвердите пароль"
      />
    </div>
  );
};

export default PasswordConfirm;
