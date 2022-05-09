import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { AccountFormDataType } from '../../../../types';

import cl from './Name.module.scss';

export type NameProps = {
  register: UseFormRegister<AccountFormDataType>;
};

const Name = ({ register }: NameProps) => {
  return (
    <div className={cl.container}>
      <label htmlFor="nameFieldId">Имя</label>
      <input
        {...register('name', {
          required: 'Поле имя не может быть пустым',
        })}
        placeholder="Введите имя"
        type="text"
        id="nameFieldId"
      />
    </div>
  );
};

export default Name;
