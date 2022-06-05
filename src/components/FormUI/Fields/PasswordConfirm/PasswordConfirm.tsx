import React from 'react';

import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormDataType } from '../../types';

export type PasswordProps = {
  register: UseFormRegister<FormDataType>;
  watch: UseFormWatch<FormDataType>;
};

import cl from './PasswordConfirm.module.scss';

const PasswordConfirm = ({ register, watch }: PasswordProps) => {
  const { t } = useTranslation();

  return (
    <div className={cl.container}>
      <input
        {...register('passwordConfirm', {
          required: t('passwordField.required'),
          validate: (val: string) => {
            if (watch('password') != val) {
              return t('passwordField.doesNotMuch');
            }
          },
        })}
        type="password"
        placeholder={t('passwordField.confirmPlaceholder')}
      />
    </div>
  );
};

export default PasswordConfirm;
