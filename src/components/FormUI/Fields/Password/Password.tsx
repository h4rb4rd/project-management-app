import React from 'react';

import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormDataType } from '../../types';

export type PasswordProps = {
  isLabel?: boolean;
  register: UseFormRegister<FormDataType>;
};

import cl from './Password.module.scss';

const Password = ({ isLabel = false, register }: PasswordProps) => {
  const { t } = useTranslation();

  return (
    <div className={cl.container}>
      {isLabel && <label htmlFor="passwordFieldId">{t('passwordField.label')}</label>}
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
        id="passwordFieldId"
      />
    </div>
  );
};

export default Password;
