import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormDataType } from '../../types';

import cl from './Login.module.scss';

export type LoginProps = {
  isLabel?: boolean;
  register: UseFormRegister<FormDataType>;
};

const Login = ({ isLabel = false, register }: LoginProps) => {
  const { t } = useTranslation();

  return (
    <div className={cl.container}>
      {isLabel && <label htmlFor="loginFieldId">{t('loginField.label')}</label>}
      <input
        {...register('login', {
          required: t('loginField.required'),
          minLength: {
            value: 3,
            message: t('loginField.minLength'),
          },
          maxLength: {
            value: 10,
            message: t('loginField.maxLength'),
          },
        })}
        placeholder={t('loginField.placeholder')}
        type="text"
        id="loginFieldId"
      />
    </div>
  );
};

export default Login;
