import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { SignUpFormDataType } from '../../../../types';

import cl from './Name.module.scss';

export type NameProps = {
  register: UseFormRegister<SignUpFormDataType>;
};

const Name = ({ register }: NameProps) => {
  return (
    <div className={cl.container}>
      <input
        {...register('name', {
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
        placeholder="Введите имя"
        type="text"
      />
    </div>
  );
};

export default Name;
