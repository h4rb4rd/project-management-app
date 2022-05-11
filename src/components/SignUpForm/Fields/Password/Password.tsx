import React from 'react';

import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SignUpFormDataType } from '../../../../types';

export type PasswordProps = {
  register: UseFormRegister<SignUpFormDataType>;
};

import cl from './Password.module.scss';

const Password = ({ register }: PasswordProps) => {
  const { t } = useTranslation();

  return (
    <div className={cl.container}>
      <input
        {...register('password', {
          required: t('passwordField.required'),
          minLength: {
            value: 4,
            message: t('passwordField.minLength'),
          },
          maxLength: {
            value: 12,
            message: t('passwordField.maxLength'),
          },
        })}
        type="password"
        placeholder={t('passwordField.placeholder')}
      />
    </div>
  );
};

export default Password;
