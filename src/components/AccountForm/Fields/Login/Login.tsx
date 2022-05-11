import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AccountFormDataType } from '../../../../types';

import cl from './Login.module.scss';

export type LoginProps = {
  register: UseFormRegister<AccountFormDataType>;
};

const Login = ({ register }: LoginProps) => {
  const { t } = useTranslation();

  return (
    <div className={cl.container}>
      <label htmlFor="loginFieldId">{t('loginField.label')}</label>
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
