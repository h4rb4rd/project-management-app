import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { LoginFormDataType } from '../../../../types';

import cl from './Email.module.scss';

export type EmailProps = {
  register: UseFormRegister<LoginFormDataType>;
};

const Email = ({ register }: EmailProps) => {
  return (
    <div className={cl.container}>
      <input
        {...register('email', {
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
        placeholder="Укажите адрес электронной почты"
        type="email"
      />
    </div>
  );
};

export default Email;
